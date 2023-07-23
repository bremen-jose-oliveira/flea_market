import Purchase from "../models/Purchase";
import User from "../models/User";
import Market from "../models/Market";




class PurchaseController{

    async index(req,res){
         const {user_id} = req.headers;

         const purchases = await Purchase.find({ user: user_id}).populate('market')        
         return res.json( purchases);

    }

    async store(req, res){

        const { user_id } = req.headers;
        const { market_id } = req.params;
        const { date } = req.body;

        
        const market = await Market.findById(market_id);
        if (!market){
            return res.status(400).json({ error:'This item does not exist'})
        }

        if(market.status !== true){
            return res.status(400).json({ error: 'item is reserved'})
        }
        
        const user = await User.findById(user_id);
        if (String(user._id) === String(market.user)){
            return res.status(401).json( {error: 'You can not buy your own item'})
        }


        const purchase = await Purchase.create({
            user: user_id,
            market: market_id,
            date,
        });
        await purchase.populate(['market', 'user']);

        return res.json(purchase);

    }

    async destroy(req, res){


        const { purchase_id} = req.body;

        await Purchase.findByIdAndDelete({_id: purchase_id})
        
        return res.send();
    }


}

export default new PurchaseController();







