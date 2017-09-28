// Imported modules
const express = require('express');
const config = require('./config');
const path = require('path');
const router = require('./routes');



// Create the application object
const app = express();

// path to static files
const publicPath = path.resolve(__dirname, './public');
app.use(express.static(publicPath));

app.use('/api', router);

// catch 404 and forward to error handler

// app.use(function(req, res, next) {
//   var err = new Error('Not Found');
//   err.status = 404;
//   next(err);
// });
// // error handlers
// // development error handler
// // will print stacktrace
// if (app.get('env') === 'development') {
//   app.use(function(err, req, res, next) {
//   res.status(err.status || 500);
//   res.render('error', {
//     message: err.message,
//     error: err
//     });
//   });
// }
// // production error handler
// // no stacktraces leaked to user
// app.use(function(err, req, res, next) {
//   res.status(err.status || 500);
//   res.render('error', {
//         message: err.message,
//           error: {}
//         });
// });

// Start the server
app.listen(config.port, function() {
  console.log(`${config.appName} is listening on port ${config.port}`);
});