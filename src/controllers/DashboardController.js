import Market from "../models/Market";



class DashboardController{

    async show(req, res){

       

        const {user_id} = req.headers;

        const markets = await Market.find({ user: user_id})


 return res.json(markets);


    }

}

export default new DashboardController();