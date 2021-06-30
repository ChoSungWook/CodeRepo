const express = require('express');
const bodyParser = require('body-parser');

const path = require('path');

const port = 9085;


const app = express();


// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// parse requests of content-type - application/json
app.use(bodyParser.json());
app.use(bodyParser.text());

app.use(express.static(path.join(__dirname, 'public')));

/*
// Configuring the database ====================
const dbConfig = require('./config/database.config.js');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

// Connecting to the database
mongoose.connect(dbConfig.url)
.then(() => {
    console.log("Successfully connected to the database");
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...');
    process.exit();
});
//================================================
*/


// Require Notes routes
require('./app/routes/routes.js')(app);

// Error Handler for 404 Pages
app.use(function(req, res, next) {
    console.log(req);
    var error404 = new Error('Route Not Found');
    error404.status = 404;
    next(error404);
  });
  
  app.listen(port);
  
console.log('Listening on port ' + port + '...');