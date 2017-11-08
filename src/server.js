// Imported modules
const path = require('path');
const express = require('express');
const config = require('./config');
const router = require('./routes');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');

mongoose.Promise = global.Promise;


// Create the application object
const app = express();

// use sessions for tracking logins
app.use(session({
  secret: 'thanks for using cartograph',
  resave: true,
  saveUninitialized: false,
  cookie: {
    httpOnly: false,
    secure: false
  }
}));

// make user ID available for all views
app.use(function (req, res, next) {
  res.locals.currentUser = req.session.userId;
  next();
});

// use body parser to parse json info
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// path to static files
const publicPath = path.resolve(__dirname, './public');
app.use(express.static(publicPath));

app.use('/', router);



// connect to the database
mongoose.connect(`mongodb://${config.db.host}/${config.db.dbName}`, {useMongoClient: true});

//require the User model file
require('./models/user.model.js');



// Start the server
app.listen(config.port, function() {
  console.log(`${config.appName} is listening on port ${config.port}`);
});