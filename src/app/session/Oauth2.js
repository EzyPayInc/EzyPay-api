/**
 * Created by gustavoquesada on 10/25/16.
 */
var oauth2orize = require('oauth2orize');
import { UserData } from "../data/UserData";
import { ClientData } from "../data/ClientData";
import { Client } from "../model/Client";
import { Code } from "../model/Code";
import { Token } from "../model/Token";
import { TokenData } from  "../data/TokenData";


/*
 var oauth2orize = require('oauth2orize')
 var User = require('../models/user');
 var Client = require('../models/client');
 var Token = require('../models/token');
 var Code = require('../models/code');
* */

var server = oauth2orize.createServer();

// Register serialialization function
server.serializeClient(function(client, callback) {
    return callback(null, client.idClient);
});

// Register deserialization function
server.deserializeClient(function(id, callback) {
    var clientData = new ClientData();
    clientData.getClient(id, function (err, result) {
        if (err) { return callback(err); }
        if (!result.length <= 0) { return callback({"message":"User does not exit"});}
        var client = new Client(result[0].idClient, result[0].name, result[0].secret);
        return callback(null, client);
    });
});

// Register authorization code grant type
server.grant(oauth2orize.grant.code(function(client, redirectUri, user, ares, callback) {
    // Create a new authorization code
    var code = new Code(user.idUser, client.idClient, uid(16), redirectUri);
    var codeData = new CodeData();

    // Save the auth code and check for errors
    codeData.insertCode(code, function(err) {
        if (err) { return callback(err); }

        callback(null, code.value);
    });
}));

// Exchange authorization codes for access tokens
server.exchange(oauth2orize.exchange.code(function(client, code, redirectUri, callback) {
    var codeData = new CodeData();
    codeData.findByValue(code, function (err, result) {
        if (err) { return callback(err); }
        if (result.length <= 0) { return callback(null, false); }
        if (client.idClient.toString() !== result[0].idClient) { return callback(null, false); }
        if (redirectUri !== result[0].redirectUri) { return callback(null, false); }

        // Delete auth code now that it has been used
        codeData.deleteCode(result[0].idCode, function (err) {
            if(err) { return callback(err); }

            // Create a new access token
            var token = new Token(result[0].idUser, result[0].idClient, uid(256));
            var tokenData = new TokenData();

            // Save the access token and check for errors
            tokenData.insertToken(token, function (err) {
                if (err) { return callback(err); }

                callback(null, token);
            });
        });
    });
}));

// User authorization endpoint
exports.authorization = [
    server.authorization(function(clientId, redirectUri, callback) {
        var clientData = new ClientData();

        clientData.getClient(clientId, function (err, result) {
            if (err) { return callback(err); }

            var client = new Client(result[0].idClient, result[0].name, result[0].secret);
            return callback(null, client, redirectUri);
        });
    }),
    function(req, res){
        console.log(req);
        res.json({ transactionID: req.oauth2.transactionID, user: req.user, client: req.oauth2.client });
        //res.render('dialog', { transactionID: req.oauth2.transactionID, user: req.user, client: req.oauth2.client });
    }
]

// User decision endpoint
exports.decision = [
    server.decision()
]

// Application client token exchange endpoint
exports.token = [
    server.token(),
    server.errorHandler()
]


function uid (len) {
    var buf = []
        , chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
        , charlen = chars.length;

    for (var i = 0; i < len; ++i) {
        buf.push(chars[getRandomInt(0, charlen - 1)]);
    }

    return buf.join('');
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
