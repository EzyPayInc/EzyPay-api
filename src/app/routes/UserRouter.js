var router = require("express");

import { UserService } from "../services/UserService";
export const USER_ROUTER = router();
var service = new UserService();

USER_ROUTER.post("/create", service.insertUser);
USER_ROUTER.put("/update", service.updateUser);
