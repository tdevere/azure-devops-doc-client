import fs from 'node:fs/promises';
import path from 'node:path';
import { getDocument } from 'pdfjs-dist/legacy/build/pdf.mjs';

const [, , inputFile, outputFile, startArg, endArg] = process.argv;

if (!inputFile || !outputFile) {
  console.error('Usage: node scripts/extract-pdf.mjs <input.pdf> <output.txt> [startPage] [endPage]');
  process.exit(1);
}

const startPage = Number.parseInt(startArg ?? '1', 10);
const endPageArg = Number.parseInt(endArg ?? '0', 10);

const loadingTask = getDocument(inputFile);
const document = await loadingTask.promise;
const lastPage = endPageArg > 0 ? Math.min(endPageArg, document.numPages) : document.numPages;
const pages = [];

for (let pageNumber = startPage; pageNumber <= lastPage; pageNumber += 1) {
  const page = await document.getPage(pageNumber);
  const textContent = await page.getTextContent();
  const pageText = textContent.items
    .map((item) => ('str' in item ? item.str : ''))
    .join(' ')
    .replace(/\s+/g, ' ')
    .trim();

  pages.push(`--- PAGE ${pageNumber} ---\n${pageText}`);
}

await fs.mkdir(path.dirname(outputFile), { recursive: true });
await fs.writeFile(outputFile, `${pages.join('\n\n')}\n`, 'utf8');

console.log(`Extracted pages ${startPage}-${lastPage} from ${path.basename(inputFile)} to ${outputFile}`);