// Listen on a specific host via the HOST environment variable
var host = process.env.HOST || '10.98.3.164';
// Listen on a specific port via the PORT environment variable
var port = process.env.PORT || 7777;

var cors_proxy = require('cors-anywhere');
var fs = require('fs')
cors_proxy.createServer({
    originWhitelist: [], // Allow all origins
    requireHeader: ['origin'],
    removeHeaders: ['cookie', 'cookie2']
}).listen(port, host, function () {
    console.log('Running CORS Anywhere on ' + host + ':' + port);
});

// // Listen on a specific host via the HOST environment variable
// var httpsHost = process.env.HOST || 'localhost';
// // Listen on a specific port via the PORT environment variable
// var httpsPort = process.env.PORT || 9999;

// cors_proxy.createServer({
//     originWhitelist: [], // Allow all origins
//     requireHeader: ['origin'],
//     removeHeaders: ['cookie', 'cookie2'],
//     httpsOptions: {
//         secure: true
//     }
// }).listen(httpsPort, httpsHost, function () {
//     console.log('Running CORS Anywhere on ' + httpsHost + ':' + httpsPort);
// });