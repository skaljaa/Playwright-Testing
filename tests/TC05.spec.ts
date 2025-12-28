import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';

test.describe('TC05: Verify Navigation Between Pages (Usability Test)', () => {
    
    test('All navigation links should work correctly and pages should load', async ({ page }) => {
        const homePage = new HomePage(page);
        
        await homePage.navigate();
        let currentURL = await homePage.getCurrentURL();
        expect(currentURL).toContain('sweetshop.netlify.app');
        
        await homePage.navigateToSweets();
        await homePage.waitForPageLoad();
        currentURL = await homePage.getCurrentURL();
        expect(currentURL).toContain('/sweets');
        
        await homePage.navigateToAbout();
        await homePage.waitForPageLoad();
        currentURL = await homePage.getCurrentURL();
        expect(currentURL).toContain('/about');
        
        await homePage.navigateToLogin();
        await homePage.waitForPageLoad();
        currentURL = await homePage.getCurrentURL();
        expect(currentURL).toContain('/login');
        
        await homePage.navigateToBasket();
        await homePage.waitForPageLoad();
        currentURL = await homePage.getCurrentURL();
        expect(currentURL).toContain('/basket');
    
        await homePage.navigateToHome();
        await homePage.waitForPageLoad();
        currentURL = await homePage.getCurrentURL();

        expect(currentURL).toBe('https://sweetshop.netlify.app/');
        
    });
});