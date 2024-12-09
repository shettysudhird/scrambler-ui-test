import { Page } from '@playwright/test';

export class BasePage {
    protected page: Page;

    constructor(page: Page){
        if (!page) {
            throw new Error('Page object is undefined. Ensure it is passed correctly.');
        }
        this.page = page;
    }

    async navigateTo(url: string) {
        await this.page.goto(url);
    }

    async waitForSelector(selector:string, timeout: number = 30000) {
        await this.page.waitForSelector(selector, { timeout });
    }

    async clickElement(selector: string) {
        await this.page.click(selector);
    }

    async fillInput(selector: string, value: string) {
        await this.page.fill(selector, value)
    }

    async clickButtonByText(buttonText: string) {
        await this.page.click(`button:has-text("${buttonText}")`);
    }

}