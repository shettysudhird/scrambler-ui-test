import { BasePage } from '../base/base_page';

export class SubmitPage extends BasePage {
    // Locators
    private locators = {
        firstNameInput: '[name="firstName"]',
        lastNameInput: '[name="lastName"]',
        emailInput: '[name="email"]',
        countryDropdown: '[aria-label="Select Country"]',
        marketingCheckbox: 'button#terms-check',
        preferencesCheckbox: 'button#privacy-policy-check',
        submitButton: 'button[type="submit"]',
        // submitButton: 'button:has-text("Submit")',
        submitTransition: 'button:has-text("Generate Again")',
    };

    // Functions

    async fillFirstName(firstName: string) {
        await this.fillInput(this.locators.firstNameInput, firstName);
    }

    async fillLastName(lastName: string) {
        await this.fillInput(this.locators.lastNameInput, lastName);
    }

    async fillEmail(email: string) {
        await this.fillInput(this.locators.emailInput, email);
    }

    async selectCountry(country: string) {
        await this.page.selectOption('select[name="country"]', { value: country });
    }

    async checkMarketingActivities() {
        const isChecked = await this.page.isChecked(this.locators.marketingCheckbox);
        if (!isChecked) {
            await this.page.check(this.locators.marketingCheckbox);
        }
    }

    async checkPreferences() {
        const isChecked = await this.page.isChecked(this.locators.preferencesCheckbox);
        if (!isChecked) {
            await this.page.check(this.locators.preferencesCheckbox);
        }
    }

    async clickSubmit(index: number = 0) {
        // Use the index to click the specific submit button
        await this.page.locator(this.locators.submitButton).nth(index).click({force: true});
    }

    async fillDetailsAndSubmit(details: {
        firstName: string;
        lastName: string;
        email: string;
        country: string;
    }) {
        await this.fillFirstName(details.firstName);
        await this.fillLastName(details.lastName);
        await this.fillEmail(details.email);
        await this.selectCountry(details.country);
        await this.checkMarketingActivities();
        await this.checkPreferences();
        await this.clickSubmit();
    }
}
