/**
 * Created by gustavoquesada on 10/25/16.
 */
export class Code {

    constructor(idUser, idClient, value, redirectUri) {
        this.idUser = idUser;
        this.idClient = idClient;
        this.value = value;
        this.redirectUri = redirectUri;
    }
}