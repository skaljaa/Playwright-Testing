import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class LoginPage extends BasePage {
    readonly emailInput: Locator;
    readonly passwordInput: Locator;
    readonly loginButton: Locator;

    constructor(page: Page) {
        super(page);
        // Email input - use type selector which should always work
        this.emailInput = page.locator('input[type="email"]');
        
        // Password input - in case needed
        this.passwordInput = page.locator('input[type="password"]');
        
        // Login button - text-based selector is most reliable
        this.loginButton = page.locator('button:has-text("Login")');
    }

    async navigateToLogin() {
        await this.navigate('/login');
    }

    async fillEmail(email: string) {
        await this.emailInput.waitFor({ state: 'visible' });
        await this.emailInput.fill(email);
    }

    async fillPassword(password: string) {
        await this.passwordInput.waitFor({ state: 'visible' });
        await this.passwordInput.fill(password);
    }

    async clickLogin() {
        await this.loginButton.waitFor({ state: 'visible' });
        await this.loginButton.click();
        // Wait for potential navigation
        await this.page.waitForLoadState('networkidle');
    }

    async login(email: string, password: string = 'password123') {
        await this.fillEmail(email);
        await this.fillPassword(password);
        await this.clickLogin();
    }

    async isLoggedIn(): Promise<boolean> {
        // Wait a moment for any redirect
        await this.page.waitForTimeout(1000);
        
        // Check if we're NOT on login page anymore
        const url = await this.getCurrentURL();
        return !url.includes('/login');
    }

    async isOnLoginPage(): Promise<boolean> {
        const url = await this.getCurrentURL();
        return url.includes('/login');
    }
}