import ResponseType from '../Helpers/ResponseType';
import { GenericCrawler } from '../Modules/GenericCrawler/GenericCrawler';
import { TwitterCrawler } from '../Modules/Twitter/TwitterCrawler';
import { configs } from '../Configs/configs';
import { Request, Response } from 'express';
import { ITweetBodyRequest, IFollowBodyRequest } from './Interfaces/Interfaces';
import { BrowserSession } from '../Helpers/BrowserSessionsMock/BrowserSession';
import * as BrowserSessionMockData from '../Helpers/BrowserSessionsMock/BrowserSessionMockData';

export class TwitterCrawlerController {

    public static async tweet(req: Request, res: Response): Promise<Response> {
        const { content, token }: ITweetBodyRequest = req.body;

        const session: BrowserSession = BrowserSessionMockData.getBrowserSessionObjectByToken(token);
        console.log(session)
        const browser: any = session.browser;
        const pages = session.pages;
        
        await TwitterCrawler.tweet(content, pages[0], configs.crawler.twitter.tweet.types.normal);

        return res.status(200).json(ResponseType.success("Tweet enviado com sucesso!", new Object({ content })));
    }

    public static async follow(req: Request, res: Response): Promise<Response> {
        const { profile }: IFollowBodyRequest = req.body;

        const browser = await GenericCrawler.openBrowser();
        const page = await GenericCrawler.generatePage(browser);
        await GenericCrawler.doLogin(
            configs.crawler.twitter.signInUrl, page,
            configs.crawler.twitter.inputUserSelector,
            configs.crawler.twitter.inputPasswordSelector,
            configs.crawler.twitter.accessAccount.email,
            configs.crawler.twitter.accessAccount.password,
            configs.crawler.twitter.signInButton
        );

        await TwitterCrawler.follow(profile, page);
        await GenericCrawler.closeBrowser(browser);

        return res.status(200).json(ResponseType.success("Follow realizado com sucesso!", new Object({ profile })));
    }

}