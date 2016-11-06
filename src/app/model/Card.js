/**
 * Created by gustavoquesada on 11/5/16.
 */
export class Card {

    constructor(idCard, idUser, cardNumber, cvv, month, year) {
        this.idCard = idCard;
        this.idUser = idUser;
        this.cardNumber = cardNumber;
        this.cvv = cvv;
        this.month = month;
        this.year = year;
    }
}