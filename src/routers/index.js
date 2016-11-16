/**
 * Created by dfonseca on 15/11/16.
 */
module.exports.use = (router)=> {
	router.use("/auth", require('./router.auth'));
	router.use("/card", require('./router.card'));
	router.use("/client", require('./router.client'));
	router.use("/restaurant", require('./router.restaurant'));
	router.use("/table", require('./router.table'));
	router.use("/user", require('./router.user'));
};