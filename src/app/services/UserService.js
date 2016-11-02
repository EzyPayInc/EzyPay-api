/**
 * Created by gustavoquesada on 10/16/16.
 */
import { UserData } from "../data/UserData";
var path = require('path');
var formidable = require('formidable');
var fs = require('fs');

export class UserService {

    constructor() {
    }

    insertUser(req, res){
        var userData =  new UserData();
        userData.insertUser(req, function (err, result) {
            if(!err) {
                var response = {"response": result.insertId};
                res.status(200).json(response);
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