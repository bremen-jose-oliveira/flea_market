import { Router} from 'express' ;
import multer from 'multer';
import uploadConfig from './config/upload';
import SessionController from './controllers/SessionController';
import MarketController from './controllers/MarketController';
import DashboardController
 from './controllers/DashboardController';



const routes = new Router();
const upload = multer(uploadConfig);


//Routes Type Get(show)
routes.get( '/markets', MarketController.index);
routes.get('/dashboard', DashboardController.show);

//Routes type Post
routes.post('/sessions' , SessionController.store);
routes.post('/markets' , upload.single('thumbnail'), MarketController.store);

//routes type put (update)

routes.put('/markets/:market_id', upload.single('thumbnail'), MarketController.update);

// routs type Delete (destroy)

routes.delete('/markets', MarketController.destroy );

export  default routes;