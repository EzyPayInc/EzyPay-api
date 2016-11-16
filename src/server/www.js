'use strict';
var debugModule = require("debug");
var http = require("http");
var server = require("./server1");
// Get port from environment and store in Express.
const port = normalizePort(process.env.PORT || '3000');
server["default"].set('port', port);
// create server and listen on provided port (on all network interfaces).
const httpServer = http.createServer(server["default"]);
httpServer.listen(port);
//Event listener for HTTP server "listening" event.
httpServer.on('listening', ()=> {
	let addr = httpServer.address();
	let bind = typeof addr === 'string'
		? 'pipe ' + addr
		: 'port ' + addr.port;
	debugModule('ezypay-api:server')('Listening on ' + bind);
});
//Event listener for HTTP server "error" event.
httpServer.on('error', (error)=> {
	if (error.syscall !== 'listen') {
		throw error;
	}
	let bind = typeof port === 'string'
		? 'Pipe ' + port
		: 'Port ' + port;
	// handle specific listen errors with friendly messages
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
function normalizePort(val) {
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