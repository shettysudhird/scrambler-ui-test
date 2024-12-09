import { BasePage } from '../base/base_page';

export class CreatePage extends BasePage {
    private locators = {
        promptInput: '[name="prompt"]',
        generateButton: 'button:has-text("Generate")',
        generatedImage: 'div[class="md:grid md:grid-cols-2 gap-4"] img',
        imageSelector: '.generated-image-selector',
    }

    async fillPrompt(prompt: string) {
        await this.fillInput(this.locators.promptInput, prompt)
    }

    async clickGenerate(buttonText: string) {
        await this.clickButtonByText(buttonText);
    }

    async waitForImages() {
        await this.waitForSelector(this.locators.generatedImage, 60000);
    }

    async verifyGeneratedImagesCount(expectedCount: number) {
        const images = await this.page.$$(this.locators.generatedImage); // Fetch all matching elements
        if (images.length !== expectedCount) {
            throw new Error(`Expected ${expectedCount} images, but found ${images.length}`);
        }
    }    

    async getGeneratedImagesCount() {
        return await this.page.$$eval(this.locators.generatedImage, (images) => images.length);
    }   
}