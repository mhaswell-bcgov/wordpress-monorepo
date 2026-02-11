import { defineConfig, devices } from '@playwright/test';
import baseConfig from '@wordpress/scripts/config/playwright.config.js';

const config = defineConfig( {
    ...baseConfig,
    projects: [
        {
            name: 'chromium',
            use: { ...devices['Desktop Chrome'] },
        },
    ],
    testDir: 'tests/e2e',
} );

export default config;
