/**
 * Created by gustavoquesada on 10/18/16.
 */
var router = require("express");

import { SessionService } from "../services/SessionService";
export const SESSION_ROUTER = router();
var service = new SessionService();

SESSION_ROUTER.post("/login", service.loginUser);
SESSION_ROUTER.get("/logout", service.logout);