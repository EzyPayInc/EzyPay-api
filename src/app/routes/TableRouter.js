/**
 * Created by gustavoquesada on 10/23/16.
 */
var router = require("express");

import { TableService } from "../services/TableService";
export const TABLE_ROUTER = router();
var service = new TableService();

TABLE_ROUTER.post("/", service.createTable);
TABLE_ROUTER.put("/", service.updateTable);
TABLE_ROUTER.get("/:id", service.getTableById);
TABLE_ROUTER.get("/restaurant/:id", service.getTableByRestaurant);