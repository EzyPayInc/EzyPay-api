/**
 * Created by gustavoquesada on 10/25/16.
 */
import { ConnectionHandler } from './ConnectionHandler';
import { Code } from '../model/Code';
export class CodeData {

    constructor() {
        this.connectionHandler = new ConnectionHandler();
    }

    insertCode(object, callback) {
        var code = new Code(object.idUser, object.idClient, object.value, object.redirectUri);
        var query = "INSERT INTO tb_code SET ?";
        this.connectionHandler.query(query, code, callback);
    }

    findByValue(value, callback) {
        var query = "SELECT * FROM tb_client WHERE value = ?";
        this.connectionHandler.query(query, [value], callback);
    }

    deleteCode(idCode, callback) {
        var query = "DELETE FROM tb_code WHERE idCode = ?";
        this.connectionHandler.query(query, [idCode], callback);
    }
}