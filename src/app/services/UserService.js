/**
 * Created by gustavoquesada on 10/16/16.
 */
import { UserData } from "../data/UserData";
var path = require('path');
var formidable = require('formidable');
var fs = require('fs');
import { User } from '../model/User';
import { EmailHandler } from '../util/Email/EmailHandler';

export class UserService {

    constructor() {
    }

    insertUser(req, res){
        var userData =  new UserData();
        var user = User.initWithObject(req.body);
        user.isValidatedAccount = 0;
        userData.insertUser(user, function (err, result) {
            if(!err) {
                var response = {"response": result.insertId};
                user.idUser = result.insertId;
                var emailHandler = new EmailHandler();
                emailHandler.sendUserValidation(user, function (err, info) {
                    res.status(200).json(response);
                });
            } else {
                var response = {"error": err.message};
                console.log(err);
                res.status(500).json(response);
            }
        });
    }

    updateUser(req, res) {
        var userData =  new UserData();
        userData.updateUser(req, function (err, result) {
            if(!err) {
                var response = {"response": "User was updated successfully"};
                res.status(200).json(response);
            } else {
                var response = {"error": err.message};
                res.status(500).json(response);
            }
        });

    }

    validateUserAccount(req, res) {
        var userData = new UserData();
        userData.validateUserAccount(req.params.id, function (err, result) {
            if(!err){
                res.send("<h3>Su cuenta ha sido validada gracias por formar parte de EzyPay</h3>");
            } else{
                res.send("<h3>Lo sentimos ha ocurrido un error en la validacion por favor intentalo nuevamente</h3>");
            }
        });

    }

    uploadProfileImage(req, res) {
        var form = new formidable.IncomingForm();
        form.multiples = true;
        form.uploadDir = path.join(__dirname, '/uploads');

        form.on('file', function(field, file) {
            fs.rename(file.path, path.join(form.uploadDir, file.name));
        });

        form.on('error', function(err) {
            var response = {"error": err.message};
            res.status(500).json(response);
        });

        form.on('end', function() {
            var response = {"response": "success"};
            res.status(200).json(response);
        });

        form.parse(req);
    }
}