import { Given, When, Then } from '@cucumber/cucumber';
import { test } from '@playwright/test';
import { HomePage } from '../pages/homepage';
import { CreatePage } from '../pages/create_page';
import { SubmitPage } from '../pages/submit_page';
import { ImagePage } from '../pages/image_page';
import * as testData from '../../test-data/input.json';
import * as fs from 'fs';
import * as path from 'path';


let homepage: HomePage;
let createPage: CreatePage;
let submitPage: SubmitPage;
let imagePage: ImagePage;

Given('I am on the Ducati Scrambler website', async function () {
    homepage = new HomePage(this.page);
    await homepage.navigate();
});

When('I click {string}', async function (buttonText: string) {
    if (buttonText === 'Start to Create') {
        await homepage.clickStartToCreate();
    } else if (buttonText === 'Submit') {
        await submitPage.clickSubmit();
    } else {
        throw new Error(`Unrecognized button text: ${buttonText}`);
    }
});

Then('I should see the {string} page', async function (pageTitle: string) {
    const title = await this.page.title();
    if (!title.includes(pageTitle)) 
        throw new Error(`Expected page title to include: ${pageTitle}`);
});

Given('I am on the image creation page', async function () {
    createPage = new CreatePage(this.page);
});

When('I fill in the prompt and click {string}', async function (buttonText: string) {
    const prompt = testData.prompts[0]; // Use the first prompt from input.json
    await createPage.fillPrompt(prompt);
    await createPage.clickGenerate(buttonText);
});

When('I wait for the generation process to complete', async function (){
    await createPage.waitForImages();
});

Then('I should see the {int} generated images', async function (imageCount: number) {
    await createPage.verifyGeneratedImagesCount(imageCount);
});

Given('the {int} images have been generated and are visible', async function (imageCount: number) {
    await createPage.verifyGeneratedImagesCount(imageCount);
});

When('I fill in my details and accept the terms', async function () {
    submitPage = new SubmitPage(this.page);
    const userDetails = testData.userDetails; // Fetch user details from input.json
    await submitPage.fillDetailsAndSubmit(userDetails);
});

Then('I should be able to choose one of the {int} images', async function (imageCount: number) {
    imagePage = new ImagePage(this.page);
    // Select the first image (index 0) by default
    await imagePage.selectGeneratedImage(0); 
    await imagePage.clickNext();
});

Then('the resolution of the saved file should be {int} x {int}', async function (width: number, height: number) {
    const downloadDir = path.resolve('./downloads'); // Specify the download directory
    if (!fs.existsSync(downloadDir)) {
        fs.mkdirSync(downloadDir); // Create the directory if it doesn't exist
    }

    await imagePage.downloadImageAndVerifyResolution(downloadDir, width, height);
});
