import { Before, After, setDefaultTimeout } from '@cucumber/cucumber';
import { chromium, firefox, webkit, Browser, Page, BrowserContext } from '@playwright/test';

let browser: Browser;
let context: BrowserContext;
let page: Page;

// Set the default timeout to 60 seconds
setDefaultTimeout(60000); // Timeout in milliseconds (60 seconds)

Before(async function ()  {
    console.log('Initializing Playwright browser and page...');
    const browserType = process.env.BROWSER === 'firefox'
        ? firefox
        : process.env.BROWSER === 'webkit'
        ? webkit
        : chromium;

    browser = await browserType.launch({
        headless: process.env.HEADLESS !== 'false', // Control headless mode
        slowMo: process.env.SLOW_MO ? parseInt(process.env.SLOW_MO, 10) : undefined, // Slow-motion debugging
        // args: ['--start-maximized'],
    });

    context = await browser.newContext();
    page = await context.newPage();

    // Assign to the Cucumber object
    this.browser = browser;
    this.context = context;
    this.page = page;

    console.log('Browser and page initialized successfully.');
});

After(async function () {
    console.log('Closing Playwright browser...');
    await this.page.close();
    await this.context.close();
    await this.browser.close();
    console.log('Browser and page closed successfully.');
});
