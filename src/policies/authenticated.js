"use strict";
var passport = require('passport');
//noinspection JSUnresolvedFunction
module.exports.BasicAuth = passport.authenticate(['basic'], {session: false});
//noinspection JSUnresolvedFunction
module.exports.ClientAuth = passport.authenticate(['client-basic'], {session: false});
//noinspection JSUnresolvedFunction
module.exports.BearerAuth = passport.authenticate(['bearer'], {session: false});