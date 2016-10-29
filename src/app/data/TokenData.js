/**
 * Created by gustavoquesada on 10/25/16.
 */
import { ConnectionHandler } from "./ConnectionHandler";
import { Token } from "../model/Token";
export class TokenData {

    constructor() {
        this.connectionHandler = new ConnectionHandler();
    }

    findTokenByValue(value, callback) {
        var query = "SELECT * FROM tb_token WHERE value = ?";
        this.connectionHandler.query(query, [value], callback);
    }

    insertToken(object, callback) {
        var token = new Token(object.idUser, object.idClient, object.value);
        var query = "INSERT INTO tb_token SET ?";
        this.connectionHandler(query, token, callback);
    }
}