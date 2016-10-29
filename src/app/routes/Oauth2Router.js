/**
 * Created by gustavoquesada on 10/25/16.
 */
var router = require("express");
var oauth2Controller = require("../session/Oauth2");
var authController = require("../session/Auth");

export const OAUTH2_ROUTER = router();


// Create endpoint handlers for oauth2 authorize
OAUTH2_ROUTER.route('/authorize')
    .get(authController.isAuthenticated, oauth2Controller.authorization)
    .post(authController.isAuthenticated, oauth2Controller.decision);

// Create endpoint handlers for oauth2 token
OAUTH2_ROUTER.route('/token')
    .post(authController.isClientAuthenticated, oauth2Controller.token);