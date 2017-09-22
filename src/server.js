// Imported modules
const express = require('express');
const config = require('./config');
const path = require('path');

// Create the application object
const app = express();

// Start the server
app.listen(config.port, function() {
    console.log(`${config.appName} is listening on port ${config.port}`);
  });

const publicPath = path.resolve(__dirname, './public');
app.use(express.static(publicPath));
