import { Router} from 'express' ;
import multer from 'multer';
import uploadConfig from './config/upload';
import SessionController from './controllers/SessionController';
import MarketController from './controllers/MarketController';
import multer from 'multer';


const routes = new Router();
const upload = multer(uploadConfig);


//Routes Type Get

//Routes type Post
routes.post('/sessions' , SessionController.store);
routes.post('/markets' , upload.single('thumbnail'), MarketController.store);

export  default routes;