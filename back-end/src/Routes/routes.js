import { Router } from 'express';
import UserController from '../Controllers/UserController';
import { TwitterCrawlerController } from '../Controllers/TwitterCrawlerController';
import { AuthController } from '../Controllers/AuthController';
import { configs } from '../Configs/configs';

const routes = Router();

routes.get(configs.routes.user.getAll, UserController.getAll);
routes.post(configs.routes.twitter.sendTweet, TwitterCrawlerController.tweet);
routes.post(configs.routes.auth.login, AuthController.generateToken);

export default routes;