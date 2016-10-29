/**
 * Created by gustavoquesada on 10/25/16.
 */
import { ConnectionHandler } from './ConnectionHandler';
import { Client } from '../model/Client';

export class ClientData {

    constructor () {
        this.connectionHandler = new ConnectionHandler();
    }

    insertClient(object, callback) {
        var client = new Client(object.idClient, object.name, object.secret);
        var query = "INSERT INTO tb_client SET ?";
        this.connectionHandler.query(query, client, callback);
    }

    getClients(callback) {
        var query = "SELECT * FROM tb_client";
        this.connectionHandler.query(query, callback);
    }

    getClient(idClient, callback) {
        var query = "SELECT * FROM tb_client WHERE idClient = ?";
        this.connectionHandler.query(query,[idClient], callback);
    }

}