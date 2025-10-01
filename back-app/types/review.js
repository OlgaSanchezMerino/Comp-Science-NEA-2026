//1. Import Mongoose libraries, and the required data types
import mongoose, { Schema } from "mongoose"

//2. Define Mongoose schema, as it is in MongoD
const ReviewSchema = new mongoose.Schema({
    rating: Number,
    createdAt: {type:Date, default: Date.now},
    film:  {type: Schema.Types.ObjectId, ref:"films"},
    user:  {type: Schema.Types.ObjectId, ref:"users"},
})

//3. Export the schema into the variable users, that is supposed to be defined in index.js
export default mongoose.model("reviews", ReviewSchema)