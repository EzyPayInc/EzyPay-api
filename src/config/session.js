"use strict";
const session = require("express-session");
let db = require("./connections").tpSessions;
let MongoStore = require('connect-mongo')(session);
let mongoose = require('mongoose');
mongoose.connect(db.uri, db.options);
module.exports.session = {
    resave: true,
    name: "connect.tpsid",
    saveUninitialized: true,
    secret: 'f134ec88b47384b00060e72c06cd2012',
    store: new MongoStore({
        mongooseConnection: mongoose.connection
    })
};
//# sourceMappingURL=session.js.map