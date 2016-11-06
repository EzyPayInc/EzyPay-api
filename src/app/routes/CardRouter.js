/**
 * Created by gustavoquesada on 11/6/16.
 */
var router = require("express");

import { CardService } from "../services/CardService";
export const CARD_ROUTER = router();
var service = new CardService();

CARD_ROUTER.route("/").post(service.createCard);