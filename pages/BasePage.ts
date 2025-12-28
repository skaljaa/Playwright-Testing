import {Page} from '@playwright/test';

export class BasePage{
    readonly page: Page;
    readonly baseURL = 'https://sweetshop.netlify.app';

    constructor(page:Page){
        this.page = page;
    }

    async navigate(path: string=''){
        const url = path ? '${this.baseURL}${path}' : this.baseURL;
        await this.page.goto(url);
    }

    async waitForPageLoad(){
        await this.page.waitForLoadState('networkidle');
    }

    async getCurrentURL(): Promise<string>{
        return this.page.url();
    }
}