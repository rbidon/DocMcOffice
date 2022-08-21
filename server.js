// storage all my middleware and information needed to work properly
const express = require('express');
const app = express();
// Import my schema from the models folder
const Appt = require("./models/appt.js");
// console.log(Appt); Works
// Need to override the methods and use PUT & DELETE
const methodOverride = require("method-override");

// Need to allow a safe HTTP process
const session = require("express-session");
// need to use .env 
require("dotenv").config();
// PORT information will be located in the .env
    // need to grab the information from env
const PORT = process.env.PORT;

const SESSION_SECRET = process.env.SESSION_SECRET;
console.log('Here is the session secret');
console.log(`Session secret saved in .env: ${SESSION_SECRET}`);
// now we can set up our session with our secret
app.use(session({
	secret: SESSION_SECRET,
	resave: false, 
	saveUninitialized: false 
}));
// connect to my MongoDB/ server
const mongoose = require("mongoose");
// grab the monogoURI storage in .env
const mongoURI = process.env.MONGODB_URI 
// connect it to the MONGODB_URI
mongoose.connect(mongoURI);
// test to make sure it is connected properly
mongoose.connection.once('open', () => {
	console.log('Connecting properly to mongo');
});
// MIDDLEWARE NEEDED
app.use(express.static('public'));
app.use(express.json());
// this will parse the data and create the "req.body" object
app.use(express.urlencoded({extended: true}));
// makes it possible to use DELETE and PUT requests in methods
app.use(methodOverride('_method'));

// import the controller that store the CRUD in the controllers 
const patientController = require('./controllers/patientController');
// // goes to router "/patient" as the routes  that are inside the controller directory
app.use('/patient', patientController);

// DEFAULT LOCALHOST:3000/
// app.get("/", (req, res) => {
//     const today = new Date();
//     res.send(`Server is Working properly at ${today}`)
// }) --- Working Properly
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});