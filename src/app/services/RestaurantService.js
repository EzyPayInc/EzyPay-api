/**
 * Created by gustavoquesada on 10/18/16.
 */

import { RestaurantData } from "../data/RestaurantData";

export class RestaurantService {

    constructor(){}

    createRestaurant(req, res) {
        let restaurantData = new RestaurantData();
        restaurantData.createRestaurant(req, function (err, result) {
            if(!err) {
                var response = {"response": result.insertId};
                res.status(200).json(response);
            } else {
                var response = {"error": err.message};
                res.status(500).json(response);
            }
        });
    }

    updateRestaurant(req, res) {
        let restaurantData = new RestaurantData();
        restaurantData.updateRestaurant(req, function (err, result) {
            if(!err) {
                var response = {"response": "User was updated successfully"};
                res.status(200).json(response);
            } else {
                var response = {"error": err.message};
                res.status(500).json(response);
            }
        });
    }
}