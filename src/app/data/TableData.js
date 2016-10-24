/**
 * Created by gustavoquesada on 10/23/16.
 */
import { ConnectionHandler } from "./ConnectionHandler";
import { Table } from "../model/Table";

export class TableData {

    constructor() {
        this.connectionHandler = new ConnectionHandler();
    }

    createTable(req, callback) {
        var table = new Table(0, req.body.idRestaurant, req.body.tableNumber, true);
        var query = "INSERT INTO tb_table SET ?";
        this.connectionHandler.query(query, table, callback);
    }

    getTableById(idTable, callback) {
        var query = "SELECT * FROM tb_table WHERE idTable = ?";
        this.connectionHandler.query(query, [idTable], callback);
    }

    getTablesByRestaurant(idRestaurant, callback) {
        var query = "SELECT * FROM tb_table WHERE idRestaurant = ?";
        this.connectionHandler.query(query, [idRestaurant], callback);
    }

    updateTable(req, callback) {
        var table = new Table(req.body.idTable, req.body.idRestaurant, req.body.tableNumber, true);
        var query = "UPDATE tb_table SET ? WHERE idTable = ?";
        this.connectionHandler.query(query, [table, req.body.idTable], callback);
    }
}