import { ConnectionHandler } from "./ConnectionHandler";
import { User } from "../model/User";

export class UserData {

    constructor() {
        this.connectonHandler = new ConnectionHandler();
    }

    getUserByEmailAndPassword(req, callback) {
        let query = "SELECT * FROM tb_user WHERE email= '"+ req.body.email + "' AND password= '"+ req.body.password + "';";
        console.log(query);
        this.connectonHandler.queryGetData(query, callback);
    }

    insertUser(req, callback) {
        let user = new User(0, req.body.name, req.body.lastname, req.body.phoneNumber, req.body.email, req.body.password,
            req.body.cardNumber, req.body.cvv, req.body.expirationDate, req.body.uuid, true);
        let query = "INSERT INTO tb_user SET ?";
        this.connectonHandler.queryInsertData(query, user, callback);
    }

}