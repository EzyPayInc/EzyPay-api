const router = require('express').Router();
const config = require("../config");
const util = require('util');
var policies = require("../policies");

module.exports.paths = () => {
    router.use((req, res, next) => {
        if (config.http.logRequest) {
            util.log(util.format("Request to: %s:%s -- Params:%s",
                req.url, req.method, JSON.stringify(req.body)));
        }
        var origin = config.http.allowOrigin || req.header("Origin");
        res.header("Access-Control-Allow-Origin", origin);
        res.header("Access-Control-Allow-Methods", config.http.allowMethods);
        res.header("Access-Control-Allow-Headers", config.http.allowHeaders);
        res.header("Access-Control-Allow-Credentials", config.http.allowCredentials);
        if ('OPTIONS' == req.method) {
            res.sendStatus(200);
        }
        else {
            next();
        }
    });
    router.get("/", (req, res) => {
        res.send(config.http.message);
    });

    router.use("/auth", require('./router.auth'));
    router.use("/user", require('./router.user'));
    router.use("/card", policies.BearerAuth, require('./router.card'));
    router.use("/client", policies.BearerAuth, require('./router.client'));
    router.use("/restaurant", policies.BearerAuth, require('./router.restaurant'));
    router.use("/table", policies.BearerAuth, require('./router.table'));
    router.use("/ticket", policies.BearerAuth, require('./router.ticket'));
    router.use("/payment", policies.BearerAuth, require('./router.payment'));
    router.use("/currency", policies.BearerAuth, require('./router.currency'));
    router.use("/deviceToken", policies.BearerAuth, require('./router.devicetoken'));
    router.use("/notifications", policies.BearerAuth, require('./router.pushnotifications'));
    router.use("/userPayment", policies.BearerAuth, require('./router.userpayment'));
    router.use("/bankAccount", policies.BearerAuth, require('./router.bankaccount'));

    return router;
}