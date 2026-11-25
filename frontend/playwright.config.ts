import { defineConfig } from '@playwright/test';

const port = Number(process.env.RCGA_TEST_PORT || 4173);
const baseURL = `http://127.0.0.1:${port}`;

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  workers: 2,
  use: { baseURL, browserName: 'chromium', channel: 'chrome', headless: true },
  webServer: {
    command: `npm run preview -- --port ${port} --strictPort`,
    url: baseURL,
    reuseExistingServer: false,
  },
});
