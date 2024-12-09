import { PlaywrightTestConfig } from '@playwright/test';

const config: PlaywrightTestConfig = {
    use: {
        headless: false, // Run in non-headless mode for debugging
        viewport: { width: 1280, height: 720 }, // Set viewport size
        video: 'on', // Capture video for all tests
        screenshot: 'on', // Capture screenshots for all tests
        trace: 'on', // Enable tracing for debugging
    },
    projects: [
        {
            name: 'chromium',
            use: { browserName: 'chromium' }
        },
        {
            name: 'firefox',
            use: { browserName: 'firefox' }
        },
        {
            name: 'webkit',
            use: { browserName: 'webkit' }
        }
    ],
    reporter: [['html', { open: 'never' }]] // Optional: HTML reporter for test results
};

export default config;
