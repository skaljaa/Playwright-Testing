import {test, expect} from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { LoginPage } from '../pages/LoginPage';

test.describe('TC03:  verify login with invalid email format - negative test', () =>{
    test('System should reject login with invalid email format', async({page}) =>{
        const homePage = new HomePage(page);
        const loginPage = new LoginPage(page);

        await homePage.navigate();
        await homePage.navigateToLogin();
        await expect(page).toHaveURL(/\/login/);

        await loginPage.fillEmail('invalidmail');
        await loginPage.fillPassword('password123');

        await loginPage.clickLogin();

        const currentURL = await loginPage.getCurrentURL();

        const isLoggedIn = await loginPage.isLoggedIn();
        expect(isLoggedIn).toBeFalsy();
        
    })
})