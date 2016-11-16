"use strict";
class Operation {
    constructor(sql, sqlParameters) {
        this.sql = sql;
        this.sqlParameters = sqlParameters;
    }
    getSqlParameters() {
        return this.sqlParameters;
    }
    setSqlParameters(sqlParameters) {
        this.sqlParameters = sqlParameters;
    }
    getSql() {
        return this.sql;
    }
    setSql(sql) {
        this.sql = sql;
    }
    getColumn(columnName) {
        var i = 0;
        var find = false;
        var resultParameter = null;
        while (i < this.sqlParameters.size() && !find) {
            var column = this.sqlParameters.get(i).value;
            if (column.getId() == columnName) {
                find = true;
                resultParameter = column;
            }
        }
        return resultParameter;
    }
}
exports.Operation = Operation;
//# sourceMappingURL=Operation.js.map