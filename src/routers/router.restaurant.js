var express = require("express");
// var authenticated = require("../config/policies/authenticated");
var RestaurantController = require("../app/controllers").RestaurantController;

var router = express.Router();
//noinspection JSUnresolvedFunction
router.post("/", RestaurantController.create);
//noinspection JSUnresolvedFunction
router.post("/getAll", RestaurantController.getAll);
//noinspection JSUnresolvedFunction
router.get("/:id", RestaurantController.getById);
//noinspection JSUnresolvedFunction
router.put('/:id', RestaurantController.updateById);

module.exports = router;