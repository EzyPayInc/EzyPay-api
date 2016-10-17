import { ConnectionHandler } from "./ConnectionHandler";
import { User } from "../model/User";

export class UserData {

    constructor() {
        this.connectonHandler = new ConnectionHandler();
    }

    insertUser(req, callback) {
        var user = new User(0, req.body.name, req.body.lastname, req.body.phoneNumber, req.body.email, req.body.password);
        var query = "INSERT INTO tb_user SET ?";
        this.connectonHandler.queryInsertData(query, user, callback);
    }

}