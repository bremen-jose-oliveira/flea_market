import market from "../models/Market";


class DashboardController{

    async show(req, res){

        return res.json({ok: true});



    }

}

export default new DashboardController();