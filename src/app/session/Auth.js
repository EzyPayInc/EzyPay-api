/**
 * Created by gustavoquesada on 10/24/16.
 */
var passport = require('passport');
var BasicStrategy = require('passport-http').BasicStrategy;
var BearerStrategy = require('passport-http-bearer').Strategy;
import { UserData } from '../data/UserData';
import { ClientData } from '../data/ClientData';
import { TokenData } from '../data/TokenData';
import { User } from '../model/User';
import { Token } from '../model/Token';

passport.use(new BasicStrategy(
    function(email, password, callback) {
        var userData = new UserData();
        userData.getUserByEmail(email, function (err, result) {
            if (err) { return callback(err); }

            // No user found with that email
            if (result.length <= 0) { return callback(null, false); }

            var user = User.initWithObject(result[0]);
            // Make sure the password is correct
            user.verifyPassword(password, function(err, isMatch) {
                if (err) { return callback(err); }

                // Password did not match
                if (!isMatch) { return callback(null, false); }

                // Success
                return callback(null, user);
            });
        });
    }
));

passport.use('client-basic', new BasicStrategy(
    function(username, password, callback) {
        var clientData = new ClientData();
        clientData.getClient(username, function (err, result) {
            if (err) { return callback(err); }
            // No client found with that id or bad password
            if (result.length <= 0 || result[0].secret !== password) { return callback(null, false); }
            // Success
            return callback(null, result[0]);
        });
    }
));

passport.use(new BearerStrategy(
    function(accessToken, callback) {
        var tokenData = new TokenData();
        tokenData.findTokenByValue(accessToken, function (err, result) {
            if (err) { return callback(err); }

            // No token found
            if (resul.length <= 0) { return callback(null, false); }

            var token = new Token(result[0].idUser, result[0].idClient, result[0].value);
            var userData = new UserData();

            userData.getUserByID(token.userId, function (err, result) {
                if (err) { return callback(err); }

                // No user found
                if (result.length <= 0) { return callback(null, false); }

                var user = User.initWithObject(result[0]);
                // Simple example with no scope
                callback(null, user, { scope: '*' });
            });
        });
    }
));

exports.isAuthenticated = passport.authenticate(['basic', 'bearer'], { session : false });
exports.isClientAuthenticated = passport.authenticate('client-basic', { session : false });
exports.isBearerAuthenticated = passport.authenticate('bearer', { session: false });