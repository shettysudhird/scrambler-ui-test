import { BasePage } from '../base/base_page';
import * as fs from 'fs';
import * as path from 'path';
import sharp from 'sharp'; // Image processing library for resolution check


export class ImagePage extends BasePage {
    // Locators
    private locators = {
        generatedImages: 'button > img[alt="generated image"]', // Images within buttons
        nextButton: '.primary-button:has-text("Next")', // Button with "Next" text
        downloadButton: 'button.secondary-button:has-text("DOWNLOAD")' // Button with 'DOWNLOAD' text
    };

    // Function to select an image by index (0-based)
    async selectGeneratedImage(index: number) {
        const images = await this.page.$$(this.locators.generatedImages);
        if (index < 0 || index >= images.length) {
            throw new Error(`Invalid image index: ${index}. Total images available: ${images.length}`);
        }
        await images[index].click();
    }

    // Function to click the "Next" button
    async clickNext() {
        const isDisabled = await this.page.isDisabled(this.locators.nextButton);
        if (isDisabled) {
            throw new Error('The "Next" button is currently disabled.');
        }
        await this.clickElement(this.locators.nextButton);
    }

    // Function to click the "Download" button and handle the download
    async downloadImageAndVerifyResolution(downloadDir: string, expectedWidth: number, expectedHeight: number) {
        // Set the download behavior
        const [download] = await Promise.all([
            this.page.waitForEvent('download'), // Wait for the download event
            this.clickElement(this.locators.downloadButton) // Click the download button
        ]);

        // Save the downloaded file to the specified directory
        const filePath = path.join(downloadDir, await download.suggestedFilename());
        await download.saveAs(filePath);

        // Verify the resolution of the downloaded image
        await this.verifyImageResolution(filePath, expectedWidth, expectedHeight);
    }

    // Function to verify the resolution of the downloaded image
    async verifyImageResolution(filePath: string, expectedWidth: number, expectedHeight: number) {
        if (!fs.existsSync(filePath)) {
            throw new Error(`File not found: ${filePath}`);
        }

        // Use Sharp to get the resolution of the image
        const metadata = await sharp(filePath).metadata();
        if (metadata.width !== expectedWidth || metadata.height !== expectedHeight) {
            throw new Error(
                `Expected resolution ${expectedWidth}x${expectedHeight}, but got ${metadata.width}x${metadata.height}`
            );
        }

        console.log(`Image resolution verified: ${metadata.width}x${metadata.height}`);
    }
}
