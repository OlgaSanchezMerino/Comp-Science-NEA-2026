///////////////////////////////////////
//     FILM DATA TYPE DEFINITION     //
///////////////////////////////////////
/*
1. Import Mongoose libraries, and the required data types
2. Define Mongoose schema as it is in MongoDB
3. Export the schema into the variable films that is supposed to be defined in index.js
*/

//1. Import Mongoose libraries, and the required data types
import mongoose from "mongoose"

//2. Define Mongoose schema as it is in MongoDB
const FilmSchema = new mongoose.Schema({
    genre: [String],
    title: String,
    year: Number,
    imdbRating: Number,
    plot: String,
    images:[String],
    director: String,
    rated: String,
    actors:[String],
})

//3. Export the schema into the variable films that is supposed to be defined in index.js
export default mongoose.model("films", FilmSchema)