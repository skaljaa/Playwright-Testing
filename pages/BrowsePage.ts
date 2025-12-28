import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class BrowsePage extends BasePage {
    readonly addToBasketButtons: Locator;

    constructor(page: Page) {
        super(page);
        // "Add to Basket" buttons - use flexible selector
        this.addToBasketButtons = page.locator('button:has-text("Add to Basket"), a:has-text("Add to Basket")');
    }

    async navigateToBrowse() {
        await this.navigate('/sweets');
    }

    async addFirstItemToBasket() {
        await this.addToBasketButtons.first().waitFor({ state: 'visible' });
        await this.addToBasketButtons.first().click();
        // Wait for basket to update
        await this.page.waitForTimeout(1500);
    }

    async addItemToBasketByIndex(index: number) {
        await this.addToBasketButtons.nth(index).waitFor({ state: 'visible' });
        await this.addToBasketButtons.nth(index).click();
        await this.page.waitForTimeout(1500);
    }

    async addMultipleItems(count: number) {
        const totalItems = await this.addToBasketButtons.count();
        for (let i = 0; i < count && i < totalItems; i++) {
            await this.addItemToBasketByIndex(i);
        }
    }

    async getProductCount(): Promise<number> {
        return await this.addToBasketButtons.count();
    }
}