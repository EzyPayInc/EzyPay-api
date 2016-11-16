"use strict";
const ListItem_1 = require("../framework/ListItem");
const Operation_1 = require("./Operation");
const SQLParameter_1 = require("./SQLParameter");
let DOMParser = require('xmldom').DOMParser;
class DalReader {
    constructor() {
    }
    readOperation(fileName, entityId, operationId) {
        let Promise = require("bluebird");
        let readFile = Promise.promisify(require('fs').readFile);
        return new Promise((resolve, reject) => {
            readFile(fileName, "").then(function (data) {
                let text = data.toString();
                let oParser = new DOMParser();
                let oDOM = oParser.parseFromString(text, 'text/xml');
                let entitiesList = oDOM.getElementsByTagName(DalReader.DAL)[0]
                    .getElementsByTagName(DalReader.ENTITIES)[0]
                    .getElementsByTagName(DalReader.ENTITY);
                for (let i = 0; i < entitiesList.length; i++) {
                    let entity = entitiesList[i];
                    if (entity.getAttribute(DalReader.ID).toString() == entityId) {
                        let operationsList = entitiesList[i].getElementsByTagName(DalReader.OPERATION);
                        for (let j = 0; j < operationsList.length; j++) {
                            let operation = operationsList[j];
                            if (operation.getAttribute(DalReader.ID) == operationId) {
                                let sqlNode = operation.getElementsByTagName(DalReader.SQL)[0];
                                let sql = sqlNode.childNodes.toString();
                                let columnsNode = operation.getElementsByTagName(DalReader.COLUMNS);
                                let columnNode = columnsNode[0].getElementsByTagName(DalReader.COLUMN);
                                let sqlParameters = new ListItem_1.List();
                                for (let columns = 0; columns < columnNode.length; columns++) {
                                    let eColumn = columnNode[columns];
                                    let currentParameter = new SQLParameter_1.SQLParameter();
                                    currentParameter.setId(eColumn.getAttribute(DalReader.ID));
                                    currentParameter.setType(eColumn.getAttribute(DalReader.TYPE));
                                    sqlParameters.add(currentParameter);
                                }
                                resolve(new Operation_1.Operation(sql, sqlParameters));
                                break;
                            }
                        }
                    }
                }
                resolve(null);
            }).catch((error) => {
                console.error("outer", error.message);
                reject(error);
            });
        });
    }
}
DalReader.ID = "id";
DalReader.SQL = "sql";
DalReader.DAL = "dal";
DalReader.TYPE = "type";
DalReader.ENTITY = "entity";
DalReader.ENTITIES = "entities";
DalReader.OPERATION = "operation";
DalReader.OPERATIONS = "operations";
DalReader.COLUMN = "column";
DalReader.COLUMNS = "columns";
exports.DalReader = DalReader;
//# sourceMappingURL=DalReader.js.map