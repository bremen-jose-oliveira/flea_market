import { Schema, model} from "mongoose";

const PurchaseSchema = new Schema({

    date: String,
    user:{
        type: Schema.Types.ObjectId,
        ref: 'User'
    },

    market:{
        type: Schema.Types.ObjectId,
        ref: 'Market'
}

});

export default model('Purchase', PurchaseSchema);