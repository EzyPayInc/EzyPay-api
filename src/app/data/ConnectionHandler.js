import {PoolConnection} from  "./PoolConnection";

export class ConnectionHandler {

    constructor() {
        this.poolConnection = new PoolConnection();
    }

    queryGetData(query, callback){
        this.poolConnection.pool.getConnection(function (err, connection) {
            connection.query(query, callback);
            connection.release();
        });
    }

    queryInsertData(query, entity, callback){
        this.poolConnection.pool.getConnection(function (err, connection) {
           connection.query(query,entity, callback);
            connection.release();
        });
    }

}