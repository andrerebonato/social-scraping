import ResponseType from '../Helpers/ResponseType';
import { IAuthRequestBody } from './Interfaces/Interfaces';
import { Request, Response } from 'express';
import { AuthJwtService } from '../Services/Auth/AuthJwtService';
import { GenericCrawler } from '../Modules/GenericCrawler/GenericCrawler';
import { configs } from '../Configs/configs';
import * as BrowserSessionMockData from '../Helpers/BrowserSessionsMock/BrowserSessionMockData';

export class AuthController {
    public static async generateToken(req: Request, res: Response): Promise<Response> {
        const { email, password }: IAuthRequestBody = req.body;

        if(email === "admin" && password === "admin") {
            const token = AuthJwtService.generateToken({ email, password });
            await AuthController.launchUserInstances(token);
            return res.status(200).json(ResponseType.loginSuccess("Autenticado com sucesso", token, new Object({ email })));
        }
    }

    public static async launchUserInstances(token: string): Promise<any> {
        const browser = await GenericCrawler.openBrowser();
        BrowserSessionMockData.addSession(browser, token);
        /* 
            futuramente adicionar o bloco de código abaixo em um estrutura de repetição
            para realizar o login em cada conta do usuario, seja no twitter ou linkedin,
            no mesmo browser. Cada sessão terá um browser, até a expiração do token.
        */
        const page = await GenericCrawler.generatePage(browser);
        await GenericCrawler.doLogin(
            configs.crawler.twitter.signInUrl, page,
            configs.crawler.twitter.inputUserSelector,
            configs.crawler.twitter.inputPasswordSelector,
            configs.crawler.twitter.accessAccount.email,
            configs.crawler.twitter.accessAccount.password,
            configs.crawler.twitter.signInButton
        );
        BrowserSessionMockData.addPageOnSession(token, page);
    }
}