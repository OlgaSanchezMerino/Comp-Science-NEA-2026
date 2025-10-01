//////////////////////////////////
//     BACK-APP APPLICATION      //
//////////////////////////////////
/*
1.Import libraries: Express, CORS and Mongoose libraries, and the required data types:film, user and review
2.Connect to MongoDB through mongoose
3a.Create the general Expess listener
3b.Use CORS library to fix an error in browser due to the back end working with a white list access by default, where evrything was blocked from entering. CORS allows all requests to enter.
4.Implementing the definition of REST API
    4a.GET films by genre REST API - Create the Expess listener handler (route) to get films fromthe MongoDB of specific genre.
    4b.GET film by id REST API - Create the Expess listener handler (route) to get a specific film from the MongoDB with a specific Id
    4c.GET users REST API
    4d.GET user REST API (NEW)
    4e.GET reviews REST API
    4f.function updateFavGenres (updatedGenres, newGenre)
    4g.SET reviews REST API
    4h.SEARCH film - GET films by any parameter from Actor, Director, Year, Rated Age,...
    4i. Define PATCH user REST API     
5.Open the Expess listener in port 5000
*/

//1. Imports
//Import Express library, that allows to create Server backend that stays listenting, without closing the execution. 
//By default, the listeners don't keep open during the execution of back-end
import express from "express"
//Import CORS library to allow back-end to accept requests from any IP address. By default, only IP addresses in the white list are allowed to request.
import cors from "cors"
//Import Mongoose library, that allows the back-end application to connect with MongoDB Atlas database. It is called "DB connector" 
import mongoose from "mongoose"
//Import the types defined in the back-end
import Film from "./types/film.js"
import User from "./types/user.js"
import Review from "./types/review.js"

//2. Connect to MongoDB through mongoose
//Connect with backend to MongoDB. It passes the connection string that is provided by MongoDB (URL+parameters).
//However, we include the name of our DB "/what2watch" at the end of the URL, and before the parameters 
mongoose.connect("mongodb+srv://olgasanchezmer:F2zTOcmYxNGKSj5E@cluster0.ujrbh5g.mongodb.net/what2watch?retryWrites=true&w=majority&appName=Cluster0")


//3a. Create the expess listener
//3b. CORS allows all requests to enter.
const app = express()
app.use(express.json()) // esto habilita que pueda hacer POST con body en formato JSON
app.use(cors()) // esto habilita que pueda hacer llamadas a la api desde otro origen (por ejemplo la web que estamos haciendo en vue)

//4a. GET films by genre REST API - Create the Expess listener handler (route) to get films fromthe MongoDB of specific genre.
//Params: the request (req) and response (res) objects
async function responderFilms(req,res){
    // DEBUG: Managing filters in the query attribute of the request (req) object. We use "query" when we have pairs key=value parameters separated by "&" and "?" for the first pair.
    //console.log(req.query)

    // 4a.1. Connect with database and fetch the films, that match with the filter in the query attribute.
    // "query" is an attribute of the request, "req" object. 
    // "g" is an attribute of the query, and represent the name of the key in the pairs (key,value) that is passed in the front-end's query.  
    const films = await Film.find({"genre.0": req.query.g})
    // 4a.2. The object res get the filterd films, in json format
    res.json(films)
}
app.get("/films-favourites", responderFilms)

//4b. GET film by id REST API - Create the Expess listener handler (route) to get a specific film from the MongoDB with a specific Id
//Params: the request (req) and response (res) objects
async function responderFilm(req,res){
    // DEBUG: Managing filters in the "params" attribute of the request (req) object. We use "params" when we have only one parameter, "_id", separated by "/"
    //console.log(req.params.id)

    // 4b.1. Connect with database and fetch the films, which "id" match with the parameter that is passed in the "params" attribute.
    // findById method is used to get the the specific element that match with the id in the params attribute.
    // "params" is an attribute of the request, "req" objet. 
    // "id" is an attribute of the params, and represent the identification of the film that is passed in the query
    const films = await Film.findById(req.params.id)
    // 4b.2. The object res get the filterd films, in json format
    res.json(films)
}
app.get("/films/:id", responderFilm)


//4c. GET users REST API - Create the Expess listener handler (route) to get users from the MongoDB    
async function responderUsers(req,res){
    // 4c.1. Connect with database and fetch the users. At this moment there is only one user and there is no need to filter using the "query" attribute.
    // find method is used to get all the elements. At this moment there is only one user and there is no need to filter using the "query" attribute.
    const users = await User.find()
    // 4c.2. The object res get the users, in json format.
    res.json(users)
}
app.get("/users", responderUsers)

//4d. GET User by ID REST API - Create the Expess listener handler (route) to get user by user_id to the MongoDB
async function responderUser(req,res){
    // 4d.1. Connect with database and fetch the user, which "id" match with the parameter that is passed in the "params" attribute.
    // findById method (from Mongoose) is used to get the the specific user that match with the id in the params attribute.
    // "params" is an attribute of the request, "req" objet. 
    // "id" is an attribute of the params, and represent the identification of the user that is passed in the query
    const user = await User.findById(req.params.id)
    // 4b.2. The object res get the filterd user, in json format
    res.json(user)
}
app.get("/user/:id", responderUser)

//4e. Define get reviews REST API - Create the Expess listener handler (route) to get reviews to the MongoDB      
async function responderReviews(req,res){
    // 4d.1. Connect with database and fetch the "reviews" of a specific user and , which "id" match with the parameter that is passed in the "params" attribute
    // "user" are populated into the find method to fetch only those reviews related to the specific user that were filtered.
    //"film" are populated into the find method 
    const reviews = await Review.find().populate("film").populate("user")
    // 4d.2. The object res get the reviews, in json format.
    res.json(reviews)
}
app.get("/reviews", responderReviews)

//4f. Define the internal function"updateFavGenres (genres, newGenre)" function to initiate the genres based on the chosen genre      
function updateFavGenres (genres, newGenre){
    //1. Check if genre of the selected film (i.e., newGenre) already exists in the user's favourite genres array (i.e., genres) and update the array increasing the rating counter.
    let alreadyExist = false
    let i = 0
    //Go through the genres array to see if the new genre is already there. if I found it then it increase the rating counter by one, else keep going through
    while (i < genres.length && !alreadyExist) {
        if (genres[i].genre == newGenre) {
            alreadyExist = true
            genres[i].numRating = genres[i].numRating + 1
        } else {
            i = i + 1    //i++
        }
    }
    //2.-If the genre is not in the user's favourite genre, we will need to add the new favourite genre with the numRating =1, in the corresponding place
    //The corresponding place will be behind the one that has a higher numRating. If equal, put it in front 
    let placeFound = false
    let newFavGenre = {
        genre: newGenre,
        numRating: 1,
        percentage: 0,
    }
    i = 0
    while (i < genres.length && !alreadyExist && !placeFound) {
        //Move in the array until I found the first genre with numRating 1 or 0 
        if (genres[i].numRating > 1) {
            i = i + 1
            if (i == genres.length) {
                placeFound = true
                genres.push(newFavGenre) //Can I use push to add an object into an array?                
            }
        } else {
            placeFound = true
            genres.splice(i, 0, newFavGenre) //Can I use splice to add an object into an array?
        }
    }        

    //3. Calculate the new percentages for all the genres in the array
    let totalRatings = 0
    //Get the total num rating
    for (let i = 0; i < genres.length; i++) {
        totalRatings = totalRatings + genres[i].numRating
    }
    //Re-calculate and write the new percentages
    for (let i = 0; i < genres.length; i++) {
        genres[i].percentage = (genres[i].numRating / totalRatings) * 100
    }
    //At this moment, it is assumed that genres paramter is prperly updated and accessible from saveReview method
    return genres 
}

//4g. Define SET reviews REST API - Create the Expess listener handler (route) to post a review and update the user's favourite genre to the MongoDB
/*
1.- Add Review. Create a review object with parameter and insert it in the MongoDB 
2.- Get user and film from bd. Get the film.genre from selected rated film, that comes from parameters, and Get current favGenres from user, that comes from parameter.
3.- Updating algorithm funtion that returns the updated user's favGenres.
4.- Update (PATCH) the user's favGenres in the user table of MongoDB
*/
async function insertarReview(req,res) {
    //1.- Add Review. Create a review object with parameter and insert it in the MongoDB 
    console.log(req.body);
    const newReview = new Review( {
        rating: req.body.rating,
        film: req.body.film,
        user: req.body.user,
        createdAt: new Date(),
    })
    await newReview.save()

    //2.- get user and film from bd
    let user =  await User.findById(req.body.user)
    const film = await Film.findById(req.body.film)
    const userGenres = user.favGenres

    //3.- Updating algorithm funtion. It returns the new user's afavourite genre array. Overwrite user favGenres array with the new one.
    //It receives as parameter the user's current favgenres from user and the main genre from film.
    user.favGenres = updateFavGenres(userGenres, film.genre[0])

    //4.- override. Update (PATCH) the user's favGenres in the user table of MongoDB 
    await user.save()

    // fin actualizar generos de usuario
    res.json({
        msg: "insertion OK",
    })
}
app.post("/reviews", insertarReview)
/*
//4.- Update (PATCH) the favGenres in the user table of MongoDB, through back-app
const user: User = {
    //user: "userStore.user._id",
    favGenres: updatedGenres,
}
await fetch("http://localhost:5000/setUser/" + userStore.user._id", {
    method: "PATCH",
    body: JSON.stringify(user),
    headers: { "Content-Type": "application/json" }
})
*/    



//4h. Define the get search result REST API - Create the Expess listener handler (route) to get films from the MongoDB that meet the criteria (i.e., parameter=value).
//Params: the request (req) and response (res) objects
async function responderSearchFilms(req,res){
    // DEBUG: Managing filters in the query attribute of the request (req) object. We use "query" when we have pairs key=value parameters separated by "&" and "?" for the first pair.
    //console.log(req.query)

    // 4a.1. Connect with database and fetch the films, which first genre (in the array of genre attribute) matches with the parameter that is passed in the "query" attribute
    // find method is used to get all the elements that match with the filter in the query attribute.
    // "query" is an attribute of the request, "req" object. 
    // "g" is an attribute of the query, and represent the name of the key in the pairs (key,value) that is passed in the front-end's query.  
    let films = []

    console.log(req.query)
    if(req.query.t){
       films = await Film.find({"title": { $regex: req.query.t, $options: "i" } })
    } else if(req.query.g){
       films = await Film.find({"genre": { $regex: req.query.g, $options: "i" }})
    } else if (req.query.a){
       films = await Film.find({"actors":{ $regex: req.query.a, $options: "i" }})
    } else if (req.query.y){
       films = await Film.find({"year": Number(req.query.y)})
    } else if (req.query.d){
       films = await Film.find({"director":{ $regex: req.query.d, $options: "i" }})
    } else if (req.query.r){
       films = await Film.find({"rated":{ $regex: req.query.r, $options: "i" }})
    }

    // 4a.2. The object res get the filterd films, in json format
    res.json(films)
}
app.get("/films", responderSearchFilms)

//4i. Define PATCH user REST API - Create the Expess listener handler (route) to PATCH the favourite genres of a user to the MongoDB    
async function modifyUser(req,res) {
    /*
    const updatedUser: User = {
        _id:'68408ff70fa7ba7414dcb363',
        name: req.body.name,
        lastname: req.body.lastname,
        email: req.body.email,
        favGenres: req.body.favGenres,
    }
    await updatedUser.save()  

    // fin actualizar usuario
    res.json({
        msg: "modified OK",
    })
        */
}
app.patch("/updateUser/:id", modifyUser)

//5. Open the expess listener in port 5000
app.listen(5000)
