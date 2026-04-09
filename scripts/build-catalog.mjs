import fs from 'node:fs/promises';
import path from 'node:path';

const inventoryFiles = [
  { file: 'tmp/rest-inventory.json', flavor: 'services' },
  { file: 'tmp/server-inventory.json', flavor: 'server' },
];

function toWords(input) {
  return input
    .replace(/([a-z0-9])([A-Z])/g, '$1 $2')
    .replace(/[^A-Za-z0-9]+/g, ' ')
    .trim()
    .split(/\s+/)
    .filter(Boolean);
}

function toKey(input) {
  const words = toWords(input);
  if (words.length === 0) {
    return 'unnamed';
  }

  const [first, ...rest] = words.map((word) => word.toLowerCase());
  const key = [first, ...rest.map((word) => word[0].toUpperCase() + word.slice(1))].join('');

  return /^\d/.test(key) ? `n${key}` : key;
}

function toIdPart(input) {
  const key = toKey(input);
  return key.replace(/[A-Z]/g, (character) => `-${character.toLowerCase()}`);
}

function extractPlaceholders(urlTemplate) {
  return [...urlTemplate.matchAll(/\{([^}]+)\}/g)].map((match) => match[1]);
}

function dedupeTemplates(templates) {
  const seen = new Set();
  const unique = [];

  for (const template of templates) {
    const signature = `${template.method} ${template.urlTemplate}`;
    if (seen.has(signature)) {
      continue;
    }

    seen.add(signature);
    unique.push(template);
  }

  return unique;
}

function summarizeByService(entries) {
  const map = new Map();

  for (const entry of entries) {
    const key = `${entry.flavor}:${entry.service}`;
    map.set(key, (map.get(key) ?? 0) + 1);
  }

  return [...map.entries()]
    .map(([key, count]) => {
      const [flavor, service] = key.split(':');
      return { flavor, service, count };
    })
    .sort((left, right) => right.count - left.count || left.service.localeCompare(right.service));
}

async function loadInventory(filePath) {
  const fullPath = path.resolve(filePath);
  const contents = await fs.readFile(fullPath, 'utf8');
  return JSON.parse(contents);
}

const inventories = await Promise.all(inventoryFiles.map((entry) => loadInventory(entry.file)));
const generatedAt = new Date().toISOString();
const operations = [];

for (const inventory of inventories) {
  for (const entry of inventory.entries) {
    if (entry.kind !== 'operation') {
      continue;
    }

    const requestTemplates = dedupeTemplates(
      entry.requests.map((request) => ({
        method: request.method,
        urlTemplate: request.url,
        placeholders: extractPlaceholders(request.url),
      })),
    );

    const serviceKey = toKey(entry.service);
    const groupKey = toKey(entry.group);
    const actionKey = toKey(entry.action);

    operations.push({
      id: `${entry.flavor}.${toIdPart(entry.service)}.${toIdPart(entry.group)}.${toIdPart(entry.action)}`,
      flavor: entry.flavor,
      service: entry.service,
      serviceKey,
      group: entry.group,
      groupKey,
      action: entry.action,
      actionKey,
      apiVersion: entry.apiVersion,
      page: entry.page,
      isPreview: String(entry.apiVersion).includes('preview'),
      requestTemplates,
    });
  }
}

operations.sort((left, right) => left.id.localeCompare(right.id));

const counts = {
  totalOperations: operations.length,
  servicesOperations: operations.filter((entry) => entry.flavor === 'services').length,
  serverOperations: operations.filter((entry) => entry.flavor === 'server').length,
  uniqueServices: new Set(operations.map((entry) => `${entry.flavor}:${entry.service}`)).size,
  uniqueGroups: new Set(operations.map((entry) => `${entry.flavor}:${entry.service}:${entry.group}`)).size,
  previewOperations: operations.filter((entry) => entry.isPreview).length,
};

const catalogSource = `import type { CatalogMetadata, OperationCatalogEntry } from '../types.js';\n\nexport const catalogMetadata: CatalogMetadata = ${JSON.stringify(
  {
    generatedAt,
    ...counts,
  },
  null,
  2,
)};\n\n// eslint-disable-next-line @typescript-eslint/no-explicit-any -- generated catalog is too large for direct annotation\nconst _operationCatalog: any[] = ${JSON.stringify(operations, null, 2)} as const;\n\nexport const operationCatalog: OperationCatalogEntry[] = _operationCatalog;\n`;

const coverageLines = [
  '# Coverage Summary',
  '',
  `Generated at: ${generatedAt}`,
  '',
  `- Total operations: ${counts.totalOperations}`,
  `- Azure DevOps Services operations: ${counts.servicesOperations}`,
  `- Azure DevOps Server operations: ${counts.serverOperations}`,
  `- Unique service namespaces: ${counts.uniqueServices}`,
  `- Unique service/group namespaces: ${counts.uniqueGroups}`,
  `- Preview operations: ${counts.previewOperations}`,
  '',
  '## Largest Service Namespaces',
  '',
  '| Flavor | Service | Operations |',
  '| --- | --- | ---: |',
  ...summarizeByService(operations).slice(0, 25).map((entry) => `| ${entry.flavor} | ${entry.service} | ${entry.count} |`),
  '',
];

await fs.mkdir('src/generated', { recursive: true });
await fs.mkdir('docs', { recursive: true });
await fs.writeFile('src/generated/catalog.ts', catalogSource, 'utf8');
await fs.writeFile('docs/coverage.md', `${coverageLines.join('\n')}\n`, 'utf8');

console.log(`Generated catalog with ${counts.totalOperations} operations.`);