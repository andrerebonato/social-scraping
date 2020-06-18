import puppeteer from 'puppeteer-core';
import { configs } from '../../Configs/configs';
import { GenericCrawler } from '../GenericCrawler/GenericCrawler';

export class LinkedInCrawler {
    public static async execute() {
        const browser = await puppeteer.launch(configs.puppeteer.chromeOptions);
        const page = await this.generatePage(browser);
        await GenericCrawler.doLogin(
            configs.crawler.linkedIn.signInUrl, page,
            configs.crawler.linkedIn.inputEmailSelector,
            configs.crawler.linkedIn.inputPasswordSelector,
            configs.crawler.linkedIn.accessAccount.email,
            configs.crawler.linkedIn.accessAccount.password,
            configs.crawler.linkedIn.signInButton
        );
    }

    public static async generatePage(browser: any, ): Promise<any> {
        const page = await browser.newPage();
        return page;
    }

}