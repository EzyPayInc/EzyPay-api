/**
 * Created by gustavoquesada on 10/16/16.
 */
export class User {

    constructor(idUser, name, lastname, phoneNumber, email, password, cardNumber, cvv, expirationDate, uuid, isActive) {
        this.idUser = idUser;
        this.name = name;
        this.lastname = lastname;
        this.phoneNumber = phoneNumber;
        this.email = email;
        this.password = password;
        this.cardNumber = cardNumber;
        this.cvv = cvv;
        this.expirationDate = expirationDate;
        this.uuid = uuid;
        this.isActive = isActive;

    }

    getIdUser() {
        return this.idUser;
    }

    getName() {
        return this.name;
    }

    getLastname() {
        return this.lastname;
    }

    getPhoneNumber() {
        return this.phoneNumber;
    }

    getEmail() {
        return this.email;
    }

    getPassword() {
        return this.password;
    }

    getCardNumber() {
        return this.cardNumber;
    }

    getCVV() {
        return this.cvv;
    }

    getExpirationDate() {
        return this.expirationDate;
    }

}