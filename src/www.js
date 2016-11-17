'use strict';
var debugModule = require("debug");
var http = require("http");
var path = require('path');
global.appRoot = path.resolve(__dirname);
// Startup app server
var config = require("./config");
var server = require("./server");
// Get port from environment and store in Express.
const port = getNormalizedPort(process.env.PORT);
server["default"].set('port', port);
// create server and listen on provided port (on all network interfaces).
const httpServer = http.createServer(server["default"]);
httpServer.listen(port);
//Event listener for HTTP server "listening" event.
httpServer.on('listening', ()=> {
	//noinspection SpellCheckingInspection
	let addr = httpServer.address();
	let bind = typeof addr === 'string'
		? 'pipe ' + addr
		: 'port ' + addr.port;
	debugModule('ezypay-api:server')('Listening on ' + bind);
});
//Event listener for HTTP server "error" event.
httpServer.on('error', (error)=> {
	//noinspection JSUnresolvedVariable
	if (error.syscall !== 'listen') {
		throw error;
	}
	let bind = typeof port === 'string'
		? 'Pipe ' + port
		: 'Port ' + port;
	// handle specific listen errors with friendly messages
	//noinspection SpellCheckingInspection,JSUnresolvedVariable
	switch (error.code) {
		case 'EACCES':
			console.error(bind + ' requires elevated privileges');
			process.exit(1);
			break;
		case 'EADDRINUSE':
			console.error(bind + ' is already in use');
			process.exit(1);
			break;
		default:
			throw error;
	}
});
//Normalize a port into a number, string, or false.
function getNormalizedPort(value) {
	var val = config.parameters.port || value;
	let port = parseInt(val, 10);
	if (isNaN(port)) {
		// named pipe
		return val;
	}
	if (port >= 0) {
		// port number
		return port;
	}
	return false;
}