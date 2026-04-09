import { config as loadDotEnv } from 'dotenv';

import type { AzureDevOpsClientOptions } from '../types.js';

export function loadAzureDevOpsClientOptionsFromEnv(): AzureDevOpsClientOptions {
  loadDotEnv();

  return {
    accessToken: process.env.AZDO_ACCESS_TOKEN,
    pat: process.env.AZDO_PAT,
    defaults: {
      organization: process.env.AZDO_ORGANIZATION,
      project: process.env.AZDO_PROJECT,
      team: process.env.AZDO_TEAM,
      instance: process.env.AZDO_INSTANCE,
      collection: process.env.AZDO_COLLECTION,
    },
    retryCount: parseNumber(process.env.AZDO_RETRY_COUNT),
    retryDelayMs: parseNumber(process.env.AZDO_RETRY_DELAY_MS),
    timeoutMs: parseNumber(process.env.AZDO_TIMEOUT_MS),
    userAgent: process.env.AZDO_USER_AGENT,
  };
}

function parseNumber(value: string | undefined): number | undefined {
  if (!value) {
    return undefined;
  }

  const parsed = Number.parseInt(value, 10);
  return Number.isFinite(parsed) ? parsed : undefined;
}
