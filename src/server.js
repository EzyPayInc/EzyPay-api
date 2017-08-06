var bodyParser = require("body-parser");
var session = require('express-session');
var express = require("express");
var config = require("./config");
var routers = require('./routers');
var oauth2Service = require("./base/oauth2.service").Oauth2Service;
var passportService = require("./base/passport.service").PassportService;
/********************************/
var path = require('path');
global.appRoot = path.resolve(__dirname);
/********************************/
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: true
}));
app.use(session(config.session));
passportService.config(app);
oauth2Service.config();

app.use(routers.paths());

app.use((err, req, res, next) => {
	if (res.headersSent) {
		return next(err);
	}
	res.status(404).send({
		error: err.message
	});
});

const server = app.listen(config.http.port, () => {
	const host = server.address().address;
	const port = server.address().port;
	console.log(`listening at http://${host}:${port}`);
});