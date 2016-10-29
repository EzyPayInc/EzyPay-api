/**
 * Created by gustavoquesada on 10/25/16.
 */
var router = require("express");
var authController = require("../session/Auth");

import { ClientService } from "../services/ClientService";
export const CLIENT_ROUTER = router();
var service = new ClientService();

CLIENT_ROUTER.route("/")
    .post(authController.isAuthenticated, service.insertClient)
    .get(authController.isAuthenticated, service.getClients);