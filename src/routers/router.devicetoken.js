var express = require("express");
var DeviceTokenController = require("../app/controllers").DeviceTokenController;

var router = express.Router();
//noinspection JSUnresolvedFunction
router.post("/", DeviceTokenController.create);
//noinspection JSUnresolvedFunction
router.put("/:id", DeviceTokenController.updateById);
//noinspection JSUnresolvedFunction
router.post("/getAll", DeviceTokenController.getAll);
//noinspection JSUnresolvedFunction
router.get("/:id", DeviceTokenController.getById);
//noinspection JSUnresolvedFunction
router.delete("/:id", DeviceTokenController.destroy);
//noinspection JSUnresolvedFunction
router.delete("/", DeviceTokenController.destroyAll);


module.exports = router;
