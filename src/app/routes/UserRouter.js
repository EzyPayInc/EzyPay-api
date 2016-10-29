var router = require("express");
var authController = require("../session/Auth");

import { UserService } from "../services/UserService";
export const USER_ROUTER = router();
var service = new UserService();

USER_ROUTER.route("/create").post(service.insertUser);
USER_ROUTER.route("/update").put(authController.isAuthenticated, service.updateUser);
