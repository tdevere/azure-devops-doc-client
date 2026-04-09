import fs from 'node:fs/promises';
import path from 'node:path';
import { getDocument } from 'pdfjs-dist/legacy/build/pdf.mjs';

const [, , inputFile, outputFile, flavor = 'services'] = process.argv;

if (!inputFile || !outputFile) {
  console.error('Usage: node scripts/inventory-pdf.mjs <input.pdf> <output.json> [services|server]');
  process.exit(1);
}

function normalizeText(text) {
  return text.replace(/\s+/g, ' ').trim();
}

function extractUrls(text) {
  const methodPattern = 'GET|POST|PUT|PATCH|DELETE|HEAD|OPTIONS';
  const urlMatches = [
    ...text.matchAll(
      new RegExp(
        `\\b(${methodPattern})\\s+(https:\\/\\/.+?)(?=(?:\\b(?:${methodPattern})\\b\\s+https:\\/\\/)|URI Parameters|Request Body|Responses|Security|Examples|Sample request|Sample response|$)`,
        'g',
      ),
    ),
  ];

  return urlMatches.map((match) => ({
    method: match[1],
    url: match[2].replace(/\s+/g, ''),
  }));
}

function parseOperation(text, page) {
  const match = text.match(/^(.+?) - (.+?) Service: (.+?) API Version: ([0-9A-Za-z.-]+)/);
  if (!match) {
    return null;
  }

  const [, group, action, service, apiVersion] = match;
  return {
    kind: 'operation',
    page,
    group: group.trim(),
    action: action.trim(),
    service: service.trim(),
    apiVersion,
    flavor,
    requests: extractUrls(text),
  };
}

function parseService(text, page) {
  const match = text.match(/^(.+?) Service: (.+?) API Version: ([0-9A-Za-z.-]+)/);
  if (!match || text.includes(' - ')) {
    return null;
  }

  const [, name, service, apiVersion] = match;
  return {
    kind: 'service',
    page,
    name: name.trim(),
    service: service.trim(),
    apiVersion,
    flavor,
  };
}

function parseArticle(text, page) {
  const match = text.match(/^(.+?) Article •/);
  if (!match) {
    return null;
  }

  return {
    kind: 'article',
    page,
    name: match[1].trim(),
    flavor,
  };
}

const loadingTask = getDocument(inputFile);
const document = await loadingTask.promise;
const inventory = [];

for (let pageNumber = 1; pageNumber <= document.numPages; pageNumber += 1) {
  const page = await document.getPage(pageNumber);
  const textContent = await page.getTextContent();
  const pageText = normalizeText(
    textContent.items.map((item) => ('str' in item ? item.str : '')).join(' '),
  );

  const operation = parseOperation(pageText, pageNumber);
  if (operation) {
    inventory.push(operation);
    continue;
  }

  const service = parseService(pageText, pageNumber);
  if (service) {
    inventory.push(service);
    continue;
  }

  const article = parseArticle(pageText, pageNumber);
  if (article) {
    inventory.push(article);
  }
}

const output = {
  source: path.basename(inputFile),
  flavor,
  pageCount: document.numPages,
  entries: inventory,
};

await fs.mkdir(path.dirname(outputFile), { recursive: true });
await fs.writeFile(outputFile, JSON.stringify(output, null, 2), 'utf8');

const operationCount = inventory.filter((entry) => entry.kind === 'operation').length;
const serviceCount = inventory.filter((entry) => entry.kind === 'service').length;

console.log(`Indexed ${operationCount} operations and ${serviceCount} services from ${path.basename(inputFile)}`);