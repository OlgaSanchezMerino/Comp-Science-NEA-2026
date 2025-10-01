///////////////////////////////////////
//     USER DATA TYPE DEFINITION     //
///////////////////////////////////////
/*
1. Import Mongoose libraries, and the required data types
2. Define Mongoose schema, as it is in MongoDB
3. Export the schema into the variable users, that is supposed to be defined in index.js
*/

//1. Import Mongoose libraries, and the required data types
import mongoose from "mongoose"

//2. Define Mongoose schema, as it is in MongoD

const GenreSelectionType = {
    genre: String,
    numRating: Number,
    percentage: Number,
}

const UserSchema = new mongoose.Schema({
    name: String,
    lastname: String,
    username: String,
    password: String,
    email: String,
    //Note: favGenres is actually an array of interfaces that include pairs of genre and percentage attributes         
    favGenres: [GenreSelectionType],
})

//3. Export the schema into the variable users, that is supposed to be defined in index.js
export default mongoose.model("users", UserSchema)

