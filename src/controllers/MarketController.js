import Market from '../models/Market';
import User from '../models/User';
import * as Yup from 'yup';

class MarketController{

  async index(req, res){

    const { status} = req.query;

    const markets = await Market.find({ status});

    return res.json(markets);

  }

  async store(req, res){

   

    const schema = Yup.object().shape({

      description: Yup.string().required,
      price: Yup.number().required,
      status: Yup.boolean().required,

    });


    

    const { filename } = req.file;
    const { description, price , status} = req.body;
    const { user_id } = req.headers;

    if(!(await schema.isValid(req.body))){

      return res.status(401).json({ error: " bad request"});
    }




    const market = await Market.create({

    user: user_id,
    thumbnail: filename,
    description,
    price,
    status,

    });
 

        return res.json(market);
      

    }

    async update(req, res){

      const { filename } = req.file;
      const { market_id} =req.params;
      const { description, price , status} = req.body;
      const { user_id} = req.headers;

      const user = await User.findById(user_id);
      const markets = await Market.findById(market_id);


     console.log( "Edited with User "+ await user._id);

      if( String(user._id) !== String(markets.user)){
        return res.status(401).json({ error: 'User not authorised!'});
      }

       await Market.updateOne( {_id: market_id},{

        user: user_id,
        thumbnail: filename,
        description,
        price,
        status,
     });
      
      return res.send();

    }

    async destroy(req, res){


      const { market_id} = req.body;

      const { user_id} = req.headers;

      const user = await User.findById(user_id);
      const markets = await Market.findById(market_id);

      if( String(user._id) !== String(markets.user)){ 
        return res.status(401).json({ error: 'User is not authorised'});
      }
      console.log( "Deleted with user  "+ await user._id);

      await Market.findByIdAndDelete({ _id: market_id});

      return res.json({ message: 'Deleted with Success'});
    }

}
export default new MarketController();