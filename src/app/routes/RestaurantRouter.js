/**
 * Created by gustavoquesada on 10/18/16.
 */
var router = require("express");

import { RestaurantService } from "../services/RestaurantService";
export const RESTAURANT_ROUTER = router();
var service = new RestaurantService();

RESTAURANT_ROUTER.post("/create", service.createRestaurant);