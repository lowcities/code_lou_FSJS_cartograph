// Imported modules
const express = require('express');
const config = require('./config');
const path = require('path');
const router = require('./routes');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');



// Create the application object
const app = express();

// path to static files
const publicPath = path.resolve(__dirname, './public');
app.use(express.static(publicPath));
app.use(bodyParser.json());

app.use('/api', router);



// connect to the database
mongoose.connect(`mongodb://${config.db.host}/${config.db.dbName}`, {useMongoClient: true});

//require the List model file
require('./models/list.model.js');



// Start the server
app.listen(config.port, function() {
  console.log(`${config.appName} is listening on port ${config.port}`);
});