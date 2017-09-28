// Imported modules
const express = require('express');
const config = require('./config');
const path = require('path');
const router = require('./routes');
const bodyParser = require('body-parser');


// Create the application object
const app = express();

// path to static files
const publicPath = path.resolve(__dirname, './public');
app.use(express.static(publicPath));

app.use('/api', router);

app.use(bodyParser.json());



// Start the server
app.listen(config.port, function() {
  console.log(`${config.appName} is listening on port ${config.port}`);
});