import {PoolConnection} from  "./PoolConnection";

export class ConnectionHandler {

    constructor() {
        this.poolConnection = new PoolConnection();
    }

    query(query, values, callback){
        this.poolConnection.pool.getConnection(function (err, connection) {
           connection.query(query,values, callback);
            connection.release();
        });
    }

}