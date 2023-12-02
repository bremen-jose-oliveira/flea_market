import { Schema, model} from "mongoose";

const MarketSchema = new Schema({

    thumbnail: String,
    description: String,
    price: Number,
    status: Boolean,
    user:{
        type: Schema.Types.ObjectId,
        ref: 'User'
    },

}, {

    toJSON: {
      virtuals: true
    }

  });
  
  
MarketSchema.virtual('thumbnail_url').get(function(){

return `http://localhost:3030/files/${this.thumbnail}`;
  })

export default model('Market', MarketSchema);