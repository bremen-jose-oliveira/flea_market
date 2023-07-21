import Market from '../models/Market';

class MarketController{

  async store(req, res){

    const { filename } = req.file;
    const { description, price , status} = req.body;
    const { user_id } = req.headers;

    const market = await Market.create({

    user: user_id,
    thumbnail: filename,
    description,
    price,
    status,

    });

        return res.json(market);

    }
}
export default new MarketController();