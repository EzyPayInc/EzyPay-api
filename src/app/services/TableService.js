/**
 * Created by gustavoquesada on 10/23/16.
 */
import { TableData } from "../data/TableData";

export class TableService {
    constructor() {
    }

    getTableById(req, res) {
        var tableData = new TableData();
        tableData.getTableById(req.params.id, function (err, result) {
            if(!err) {
                res.status(200).json(result);
            } else {
                var response = {"error": err.message};
                res.status(500).json(response);
            }
        });
    }

    getTableByRestaurant(req, res) {
        var tableData = new TableData();
        tableData.getTablesByRestaurant(req.params.id, function (err, result) {
            if(!err) {
                res.status(200).json(result);
            } else {
                var response = {"error": err.message};
                res.status(500).json(response);
            }
        });
    }

    createTable(req, res) {
        var tableData = new TableData();
        tableData.createTable(req, function (err, result) {
            if(!err) {
                var response = {"response": result.insertId};
                res.status(200).json(response);
            } else {
                var response = {"error": err.message};
                res.status(500).json(response);
            }
        });
    }

    updateTable(req, res) {
        var tableData = new TableData();
        tableData.updateTable(req, function (err, result) {
            if(!err) {
                var response = {"response": "Table was updated successfully"};
                res.status(200).json(response);
            } else {
                var response = {"error": err.message};
                res.status(500).json(response);
            }
        });

    }
}