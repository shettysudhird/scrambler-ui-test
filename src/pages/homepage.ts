import { BasePage } from '../base/base_page';
import * as testData from '../../test-data/input.json'

export class HomePage extends BasePage {
    // Locators
    private locators = {
        startToCreateButton: 'role=link[name="Start to create"]'
    }
    
    // Methods
    async navigate() {
        await this.navigateTo(testData.baseUrl);
    }

    async clickStartToCreate() {
        await this.clickElement(this.locators.startToCreateButton)
    }

}