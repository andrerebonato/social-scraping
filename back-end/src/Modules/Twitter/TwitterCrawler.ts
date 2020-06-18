import { configs } from '../../Configs/configs';
import { GenericCrawler } from '../GenericCrawler/GenericCrawler';

export class TwitterCrawler {
    public static async execute() {
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
    }

    public static async tweet(content: string, page: any, type: number = configs.crawler.twitter.tweet.types.normal): Promise<any> {
        await page.goto(configs.crawler.twitter.homeUrl);
        await page.waitForSelector(configs.crawler.twitter.tweet.textLabel);
        await page.type(configs.crawler.twitter.tweet.textLabel, content);
        
        if(type === configs.crawler.twitter.tweet.types.normal) {
            await page.click(configs.crawler.twitter.tweet.submit);
        } else {
            await page.click(configs.crawler.twitter.tweet.submitRetweetWithComment);
        }
    }

    public static async follow(profile: string, page:any): Promise<any> {
        await page.goto(profile);
        await page.waitForSelector(configs.crawler.twitter.profile.followButton);
        await page.click(configs.crawler.twitter.profile.followButton);
    }

    public static async sendMessage(profile: string, page: any, message: string): Promise<any> {
        await page.goto(profile);
        await page.waitForSelector(configs.crawler.twitter.profile.sendMessageButton);
        await page.click(configs.crawler.twitter.profile.sendMessageButton);
        await page.waitForSelector(configs.crawler.twitter.inbox.input);
        await page.click(configs.crawler.twitter.inbox.input);
        await page.type(configs.crawler.twitter.inbox.input, message, { delay:100 });
        await page.waitForSelector(configs.crawler.twitter.inbox.submitMessageButton);
        await page.click(configs.crawler.twitter.inbox.submitMessageButton);
    }

    public static async favorite(tweetUrl: string, page: any): Promise<any> {
        await page.goto(tweetUrl);
        await page.waitForSelector(configs.crawler.twitter.tweet.fav);
        await page.click(configs.crawler.twitter.tweet.fav);
    }

    public static async retweetWithoutComment(tweetUrl: string, page: any): Promise<any> {
        await page.goto(tweetUrl);
        await page.waitForSelector(configs.crawler.twitter.tweet.reetweetButton);
        await page.click(configs.crawler.twitter.tweet.reetweetButton);
        await page.waitForSelector(configs.crawler.twitter.tweet.retweetWithoutComment);
        await page.click(configs.crawler.twitter.tweet.retweetWithoutComment);
    }

    public static async retweetWithComment(tweetUrl: string, page: any, comment: string): Promise<any>{
        await page.goto(tweetUrl);
        await page.waitForSelector(configs.crawler.twitter.tweet.reetweetButton);
        await page.click(configs.crawler.twitter.tweet.reetweetButton);
        await page.waitForSelector(configs.crawler.twitter.tweet.retweetWithComment);
        await page.click(configs.crawler.twitter.tweet.retweetWithComment);
        await this.tweet(comment, page, configs.crawler.twitter.tweet.types.retweetWithComment);
    }

}