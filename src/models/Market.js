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

}, {

    toJSON: {
      virtuals: true
    }

  });
  
  
MarketSchema.virtual('thumnail_url').get(function(){

return `http://localhost:3030/files/${this.thumnail}`;
  })

export default model('Market', MarketSchema);