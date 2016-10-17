/**
 * Created by gustavoquesada on 10/16/16.
 */
import { UserData } from "../data/UserData";

export class UserService {

    constructor() {
    }

    insertUser(req, res){
        var userData =  new UserData();
        userData.insertUser(req, function (err, rows) {
            if(!err) {
                var response = {"response": rows.insertId};
                res.status(200).json(response);
            } else {
                var response = {"error": err.message};
                res.status(500).json(response);
            }
        });
    }
}