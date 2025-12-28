import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { LoginPage } from '../pages/LoginPage';

test.describe('TC01: Verify valid login',()=>{
    test('user should successfully login with valid email format',async({page})=>{

        const homePage = new HomePage(page);
        const loginPage = new LoginPage(page);

        await homePage.navigate();
        await homePage.navigateToLogin();
        await loginPage.login('user@example.com','password123');
        const isLoggedIn = await loginPage.isLoggedIn();
        expect(isLoggedIn).toBeTruthy;

        const currentURL = await loginPage.getCurrentURL();
        expect(currentURL).not.toContain('/login');

    })
})