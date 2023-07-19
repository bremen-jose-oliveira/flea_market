import express from 'express';
import mongoose from 'mongoose';
import routes from'./routes';

class App{
    constructor(){
        this.server = express();
        mongoose.connect('mongodb+srv://fleamarket:flea123@fleamarket.kgsvkbp.mongodb.net/fleamarket?retryWrites=true&w=majority'
          

        );

        this.middlewares();
        this.routes();
}


middlewares(){
 this.server.use(express.json())

}

routes(){

    this.server.use(routes);

 }

}
export default new App().server;