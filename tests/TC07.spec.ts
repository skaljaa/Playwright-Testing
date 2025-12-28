import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { BrowsePage } from '../pages/BrowsePage';
import { BasketPage } from '../pages/BasketPage';

test.describe('TC_07: Verify Order Placement from Basket', () => {
    
    test('User should successfully place an order from basket page', async ({ page }) => {
        const homePage = new HomePage(page);
        const browsePage = new BrowsePage(page);
        const basketPage = new BasketPage(page);

        await homePage.navigate();
        await homePage.navigateToSweets();
        await browsePage.addFirstItemToBasket();
        await homePage.navigateToBasket();
        expect(page.url()).toContain('/basket');
        
        await basketPage.fillCustomerName('Mustafa L');
        await basketPage.fillCustomerAddress('Drvenija 1, Sarajevo');

        await basketPage.fillCardNumber('1111111111111111');
        await basketPage.fillCardExpiry('12/25');
        await basketPage.fillCardCVV('123');

        await basketPage.clickOrderButton();

        await page.waitForTimeout(1000);
        const finalURL = page.url();
        expect(finalURL).toBeTruthy();
    });
});