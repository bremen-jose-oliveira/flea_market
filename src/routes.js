import { Router} from 'express' ;
import multer from 'multer';
import uploadConfig from './config/upload';
import SessionController from './controllers/SessionController';
import MarketController from './controllers/MarketController';
import DashboardController
 from './controllers/DashboardController';
 import PurchaseController from './controllers/PurchaseController';



const routes = new Router();
const upload = multer(uploadConfig);


//Routes Type Get(show)
routes.get('/markets', MarketController.index);
routes.get('/dashboard', DashboardController.show);
routes.get('/purchase', PurchaseController.index);

//Routes type Post
routes.post('/sessions' , SessionController.store);
routes.post('/markets' , upload.single('thumbnail'), MarketController.store);

routes.post('/markets/:market_id/purchase', PurchaseController.store );

//routes type put (update)

routes.put('/markets/:market_id', upload.single('thumbnail'), MarketController.update);

// routs type Delete (destroy)

routes.delete('/markets', MarketController.destroy );
routes.delete('/purchase/cancel', PurchaseController.destroy);

export  default routes;