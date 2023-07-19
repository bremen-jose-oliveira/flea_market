import { Router} from'express' ;
import SessionController from './controllers/SessionController';
import MarketController from './controllers/MarketController';
import multer from 'multer';
import upload from './config/upload';

const routes = new Router();

routes.post('/sessions' , SessionController.store);
routes.post('/markets' , MarketController.store);

export  default routes;