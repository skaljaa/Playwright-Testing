import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class BasketPage extends BasePage {
    constructor(page: Page) {
        super(page);
    }

    async navigateToBasket() {
        await this.navigate('/basket');
    }

    async fillCustomerName(name: string) {
        const nameInput = this.page.locator('input:not([type="radio"])').first();
        await nameInput.fill(name);
    }

    async fillCustomerAddress(address: string) {
        const addressInput = this.page.locator('textarea, input:not([type="radio"])').nth(1);
        await addressInput.fill(address);
    }

    async fillCardNumber(cardNumber: string) {
        const cardInput = this.page.locator('input:not([type="radio"])').nth(2);
        await cardInput.fill(cardNumber);
    }

    async fillCardExpiry(expiry: string) {
        const expiryInput = this.page.locator('input:not([type="radio"])').nth(3);
        await expiryInput.fill(expiry);
    }

    async fillCardCVV(cvv: string) {
        const cvvInput = this.page.locator('input:not([type="radio"])').nth(4);
        await cvvInput.fill(cvv);
    }

    async selectDeliveryType(deliveryType: string) {
        const deliverySelect = this.page.locator('select').first();
        await deliverySelect.selectOption(({index: 0}));
    }

    async clickOrderButton() {
        const orderButton = this.page.locator('button:has-text("Order"), button[type="submit"]').first();
        await orderButton.click();
    }
}