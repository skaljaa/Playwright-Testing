import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';

test.describe('TC09: Verify Design - usability test', () => {
    test('All UI elements should display correctly and be', async({page})=>{
        const homePage = new HomePage(page);
        await homePage.navigate();
        await homePage.waitForPageLoad();

        await expect(homePage.sweetsLink).toBeVisible();
        await expect(homePage.aboutLink).toBeVisible();
        await expect(homePage.loginLink).toBeVisible();
        await expect(homePage.basketLink).toBeVisible();
        await expect(homePage.browseSweetsButton).toBeVisible();

        const navbar = page.locator('nav, .navbar, header');
        await expect(navbar.first()).toBeVisible();

        const headings = page.locator('h1, h2, h3, h4');
        const headingCount = await headings.count();
        expect(headingCount).toBeGreaterThan(0);

        const mainHeading = page.locator('h1').first();
        await expect(mainHeading).toBeVisible();
        const headingText = await mainHeading.textContent();
        expect(headingText).toBeTruthy();
 
        await expect(homePage.basketLink).toBeVisible();
        await expect(homePage.basketLink).toBeEnabled();

        const basketCount = await homePage.getBasketCount();
        expect(basketCount).toMatch(/^\d+$/);

        const addToBasketButtons = page.locator('button:has-text("Add to Basket"), a:has-text("Add to Basket")');
        const buttonCount = await addToBasketButtons.count();
        expect(buttonCount).toBeGreaterThan(0);
        await expect(addToBasketButtons.first()).toBeVisible();

    })
})