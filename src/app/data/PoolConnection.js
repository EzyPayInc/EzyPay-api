var mysql = require("mysql");

export class PoolConnection{

    constructor() {
        if(!PoolConnection.instance) {
            console.log("crea la instancia");
            this.createPoolConnection();
            PoolConnection.instance = this;
        }

        return PoolConnection.instance;
    }

    createPoolConnection() {
        this.pool  = mysql.createPool({
            host     : 'localhost',
            user     : 'root',
            password : 'admin',
            database : 'db_ezypay'
        });
    }
}