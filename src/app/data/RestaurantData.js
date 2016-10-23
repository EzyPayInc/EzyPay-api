/**
 * Created by gustavoquesada on 10/18/16.
 */
var bcrypt = require("bcrypt-nodejs");
import { Restaurant } from "../model/Restaurant";
import { ConnectionHandler } from "./ConnectionHandler";

export class RestaurantData {

    constructor() {
        this.connectionHandler = new ConnectionHandler();
    }

    getRestaurantByID(idRestaurant, callback) {
        let query = "SELECT * FROM tb_restaurant WHERE idRestaurant= "+ idRestaurant + ";";
        this.connectionHandler.query(query, callback);
    }

    createRestaurant(req, callback) {
        let restaurant = new Restaurant(0, req.body.name, req.body.email, req.body.password, true);
        let query = "INSERT INTO tb_restaurant SET ?";
        let connectionHandler = this.connectionHandler;

        bcrypt.genSalt(5, function (err, salt) {
            if(err) return callback(err);

            bcrypt.hash(restaurant.password, salt,null, function (err, hash) {
                if (err) return callback(err);

                restaurant.password = hash;
                connectionHandler.query(query, restaurant, callback);
            });
        });

    }

    updateRestaurant(req, callback) {
        let restaurant = new Restaurant(req.body.idRestaurant, req.body.name, req.body.email, req.body.password, true);
        let query = "UPDATE tb_restaurant set ? WHERE idRestaurant = ? ";
        let connectionHandler = this.connectionHandler;

        this.getRestaurantByID(req.body.idRestaurant, function (err, result) {
            if(err) return callback(err);

            if(result[0].password === restaurant.password) {
                connectionHandler.query(query, [restaurant, req.body.idRestaurant], callback);
            } else  {
                //encrypt password
                bcrypt.genSalt(5, function (err, salt) {
                    if(err) return callback(err);
                    bcrypt.hash(restaurant.password, salt,null, function (err, hash) {
                        if (err) return callback(err);

                        restaurant.password = hash;
                        connectionHandler.query(query, [restaurant, req.body.idRestaurant], callback);
                    });
                });
            }
        });

    }



}