import { ConnectionHandler } from "./ConnectionHandler";
import { User } from "../model/User";
var bcrypt = require("bcrypt-nodejs");


export class UserData {

    constructor() {
        this.connectionHandler = new ConnectionHandler();
    }

    getUserByID(idUser, callback) {
        let query = "SELECT * FROM tb_user WHERE idUser= "+ idUser + ";";
        this.connectionHandler.query(query, callback);
    }

    getUserByEmail(email, callback) {
        console.log(email);
        let query = "SELECT * FROM tb_user WHERE email = ?";
        this.connectionHandler.query(query,[email], callback);
    }

    insertUser(req, callback) {
        let user = new User(0, req.body.name, req.body.lastname, req.body.phoneNumber, req.body.email, req.body.password,
            req.body.cardNumber, req.body.cvv, req.body.expirationDate, req.body.uuid, "", true);
        let query = "INSERT INTO tb_user SET ?";
        let connectionHandler = this.connectionHandler;

        //encrypt password
        bcrypt.genSalt(5, function (err, salt) {
           if(err) return callback(err);

           bcrypt.hash(user.password, salt,null, function (err, hash) {
               if (err) return callback(err);

               user.password = hash;
               connectionHandler.query(query, user, callback);
           });
        });
    }

    updateUser(req, callback) {
        console.log("llega aca");
        let user = new User(req.body.idUser, req.body.name, req.body.lastname, req.body.phoneNumber, req.body.email, req.body.password,
            req.body.cardNumber, req.body.cvv, req.body.expirationDate, req.body.uuid, "", true);
        let query = "UPDATE tb_user set ? WHERE idUser = ? ";
        let connectionHandler = this.connectionHandler;

        this.getUserByID(req.body.idUser, function (err, result) {
            if(err) return callback(err);

            err = {'message': 'User does not exit'};
            if(result.length <= 0) return callback(err);

            user.avatar = result[0].avatar;
            if(result[0].password === user.password) {
                connectionHandler.query(query, [user, req.body.idUser], callback);
            } else  {
                //encrypt password
                bcrypt.genSalt(5, function (err, salt) {
                    if(err) return callback(err);
                    bcrypt.hash(user.password, salt,null, function (err, hash) {
                        if (err) return callback(err);

                        user.password = hash;
                        connectionHandler.query(query, [user, req.body.idUser], callback);

                    });
                });
            }
        });

    }

}