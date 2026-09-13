import { defineConfig } from '@playwright/test';
export default defineConfig({
  testDir: './tests', workers: 1, timeout: 90000,
  use: { baseURL: 'http://127.0.0.1:4173', channel: 'chrome', reducedMotion: 'reduce', headless: true },
  reporter: [['list'], ['json', { outputFile: 'artifacts/test-results.json' }]],
});
