import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class HomePage extends BasePage {
    readonly sweetsLink: Locator;
    readonly aboutLink: Locator;
    readonly loginLink: Locator;
    readonly basketLink: Locator;
    readonly homeLink: Locator;
    readonly browseSweetsButton: Locator;

    constructor(page: Page) {
        super(page);
        // Navigation links - use .first() to avoid strict mode violations
        this.sweetsLink = page.locator('a[href="/sweets"]').first();
        this.aboutLink = page.locator('a[href="/about"]');
        this.loginLink = page.locator('a[href="/login"]');
        this.basketLink = page.locator('a[href="/basket"]');
        this.homeLink = page.locator('a[href="/"]').first();
        
        // Browse button on home page
        this.browseSweetsButton = page.locator('a:has-text("Browse Sweets")');
    }

    async navigateToSweets() {
        await this.sweetsLink.click();
    }

    async navigateToAbout() {
        await this.aboutLink.click();
    }

    async navigateToLogin() {
        await this.loginLink.click();
    }

    async navigateToBasket() {
        await this.basketLink.click();
    }

    async navigateToHome() {
        await this.homeLink.click();
    }

    async clickBrowseSweets() {
        await this.browseSweetsButton.click();
    }

    async getBasketCount(): Promise<string> {
        // Wait a moment for counter to update
        await this.page.waitForTimeout(500);
        
        // Basket link shows "X Basket" where X is the count
        const text = await this.basketLink.textContent();
        
        // Extract number - try to find any digit
        const match = text?.trim().match(/(\d+)/);
        const count = match ? match[1] : '0';
        
        console.log(`Basket text: "${text?.trim()}" → Extracted count: ${count}`);
        return count;
    }
}