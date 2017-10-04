// Imported modules
const path = require('path');
const express = require('express');
const config = require('./config');
const router = require('./routes');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const handlebars = require('express-handlebars');
const session = require('express-session');



// Create the application object
const app = express();

// use sessions for tracking logins
app.use(session({
  secret: 'thanks for using cartograph',
  resave: true,
  saveUninitialized: false
}));

// path to static files
const publicPath = path.resolve(__dirname, './public');
app.use(express.static(publicPath));
app.use(bodyParser.json());

app.set('views', path.join( __dirname + '/views')); 
app.engine('handlebars', handlebars({extname:'handlebars', defaultLayout:'main.handlebars', layoutsDir: __dirname + '/views/layouts'}));
  

app.set('view engine', 'handlebars');



app.use('/', router);



// connect to the database
mongoose.connect(`mongodb://${config.db.host}/${config.db.dbName}`, {useMongoClient: true});

//require the List model file
require('./models/user.model.js');



// Start the server
app.listen(config.port, function() {
  console.log(`${config.appName} is listening on port ${config.port}`);
});