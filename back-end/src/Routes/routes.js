import { Router } from 'express';
import UserController from '../Controllers/UserController';
import { configs } from '../Configs/configs';

const routes = Router();

routes.get(configs.routes.user.getAll, UserController.getAll);

export default routes;