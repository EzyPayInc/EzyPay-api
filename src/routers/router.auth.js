var express = require("express");
var oauth2 = require("../base/oauth2.service");
var router = express.Router();

router.post("/token", oauth2.TokenEndpoint);

module.exports = router;