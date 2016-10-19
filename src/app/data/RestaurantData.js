/**
 * Created by gustavoquesada on 10/18/16.
 */
import {Restaurant} from "../model/Restaurant";
import { ConnectionHandler } from "./ConnectionHandler";

export class RestaurantData {

    constructor() {
        this.connectionHandler = new ConnectionHandler();
    }

    createRestaurant(req, callback) {
        let restaurant = new Restaurant(0, req.body.name, req.body.email, req.body.password, true);
        let query = "INSERT INTO tb_restaurant SET ?";
        this.connectionHandler.queryInsertData(query, restaurant, callback);
    }


}