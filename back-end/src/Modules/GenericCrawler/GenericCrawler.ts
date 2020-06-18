import puppeteer from 'puppeteer-core';
import { configs } from '../../Configs/configs';

export class GenericCrawler {

    public static async openBrowser(): Promise<any> {
        const browser = await puppeteer.launch(configs.puppeteer.chromeOptions);
        return browser;
    }

    public static async closeBrowser(browser: any): Promise<any> {
        setTimeout(async() => {
            await browser.close();
        }, 2000);
    }

    public static async doLogin(
        pageUrl: string, page: any, inputCredentialsSelector: string, inputPasswordSelector: string,
        user: string, password: string, buttonSelector: string): Promise<any>{
        await page.goto(pageUrl);
        await page.waitForSelector(inputCredentialsSelector);
        await page.type(inputCredentialsSelector, user);
        await page.click(inputPasswordSelector);
        await page.type(inputPasswordSelector, password);
        await page.click(buttonSelector);
    }

    public static async generatePage(browser: any): Promise<any>{
        const page = await browser.newPage();
        return page;
    }
}
