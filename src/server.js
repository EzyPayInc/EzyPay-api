var bodyParser = require("body-parser");
var session = require('express-session');
var express = require("express");
var router = require("./router");
var config = require("./config");
var oauth2Service = require("./base/oauth2.service").Oauth2Service;
var passportService = require("./base/passport.service").PassportService;
/********************************/
var path = require('path');
global.appRoot = path.resolve(__dirname);
/********************************/

const app = express();
// app.set('view engine', 'ejs');
// app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: true
}));
app.use(session(config.session));
passportService.config(app);
oauth2Service.config();

let _router = express.Router();
router.config(_router);
app.use(_router);

app.use((err, req, res, next) => {
	if (res.headersSent) {
		return next(err);
	}
	res.status(404).send({
		error: err.message
	});
});

const server = app.listen(getNormalizedPort(), () => {
	const host = server.address().address;
	const port = server.address().port;
	console.log(`Example app listening at http://${host}:${port}`);
});
//Normalize a port into a number, string, or false.
function getNormalizedPort() {
	var val = process.env.PORT || config.parameters.port;
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