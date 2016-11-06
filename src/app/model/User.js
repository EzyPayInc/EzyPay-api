var bcrypt = require("bcrypt-nodejs");

/**
 * Created by gustavoquesada on 10/16/16.
 */
export class User {

    constructor(idUser, name, lastname, phoneNumber, email, password, avatar, isActive) {
        this.idUser = idUser;
        this.name = name;
        this.lastname = lastname;
        this.phoneNumber = phoneNumber;
        this.email = email;
        this.password = password;
        this.avatar = avatar;
        this.isActive = isActive;

    }

    static initWithObject(object) {
        var user = new User(object.idUser, object.name, object.lastname, object.phoneNumber, object.email, object.password,
            object.avatar, object.isActive);
        return user;
    }

    verifyPassword (password, cb) {
        bcrypt.compare(password, this.password, function (err, isMatch) {
            if (err) return cb(err);
            cb(null, isMatch);
        });
    }
}