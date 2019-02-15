const express = require('express')
const apiRoutes = require("./api-routes")
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// Initialize the app
const app = express();

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
    next();
});
  
app.use(bodyParser.json());

// Configure bodyparser to handle post requests
app.use(bodyParser.urlencoded({
    extended: true
}));

// Use Api routes in the App
app.use('/api', apiRoutes)

// Connect to Mongoose and set connection variable
mongoose.connect('mongodb://localhost/resthub');

const db = mongoose.connection;

// Setup server port
const port = process.env.PORT || 8080;

// Send message for default URL
app.get('/', (req, res) => res.send('BNG Test with Express'));

// Use Api routes in the App
app.use('/api', apiRoutes)

// Launch app to listen to specified port
app.listen(port, function () {
    console.log("Running RestHub on port " + port);
});