/**
 * Created by dfonseca on 15/11/16.
 */
var policies = require("../policies");
module.exports.use = (router)=> {
	router.use("/auth", require('./router.auth'));
	router.use("/card", policies.BearerAuth, require('./router.card'));
	router.use("/client", policies.BearerAuth, require('./router.client'));
	router.use("/restaurant", policies.BearerAuth, require('./router.restaurant'));
	router.use("/table", policies.BearerAuth, require('./router.table'));
    router.use("/user", require('./router.user'));
    //router.use("/user", policies.BearerAuth, require('./router.user'));
	router.use("/ticket", policies.BearerAuth, require('./router.ticket'));
    router.use("/payment", policies.BearerAuth, require('./router.payment'));
    router.use("/currency", policies.BearerAuth, require('./router.currency'));
    router.use("/deviceToken", policies.BearerAuth, require('./router.devicetoken'));
    router.use("/notifications", policies.BearerAuth, require('./router.pushnotifications'));
};