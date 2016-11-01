/**
 * Created by gustavoquesada on 10/18/16.
 */
import { UserData } from "../data/UserData";
import { User } from  "../model/User";

export class SessionService {

    constructor(){

    }

    loginUser(req, res) {
        let userData = new UserData();
        userData.getUserByEmail(req.body.email, function (err, result) {
            if(!err) {
                if(result.length > 0){
                    var user = User.initWithObject(result[0]);
                    user.verifyPassword(req.body.password, function (err, isMatch) {
                        if(err) {
                            var response = {"message": err.message};
                            res.status(200).json(response);
                        } else {
                            if(isMatch) {
                                res.status(200).json(user);
                            } else {
                                var response = {"message": "Password does not match with email"};
                                res.status(200).json(response);
                            }
                        }
                    });
                } else {
                    var response = {"message": "User has not been registered in EzyPay"};
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