import { Schema, model} from "mongoose";

const MarketSchema = new Schema({

    thumbnail: String,
    decription: String,
    price: Number,
    status: Boolean,
    user:{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }

})

export default model('Market', UserSchema);