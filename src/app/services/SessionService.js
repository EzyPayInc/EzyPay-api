/**
 * Created by gustavoquesada on 10/18/16.
 */
import { UserData } from "../data/UserData";

export class SessionService {

    constructor(){

    }

    loginUser(req, res) {
        let userData = new UserData();
        userData.getUserByEmailAndPassword(req, function (err, rows) {
            if(!err) {
                if(rows.length > 0){
                    res.status(200).json(rows);
                } else {
                    var response = {"message": "User has not been registered in EzyPay", "rows": rows};
                    res.status(200).json(response);
                }

            } else {
                var response = {"error": err.message};
                res.status(500).json(response);
            }
        });
    }

    logout(req, res) {
        res.status(200).send("Logout was successful");
    }
}