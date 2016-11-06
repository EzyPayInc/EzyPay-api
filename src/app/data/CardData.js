/**
 * Created by gustavoquesada on 11/5/16.
 */
import { ConnectionHandler } from './ConnectionHandler';

export class CardData {
    constructor() {
        this.connectionHandler = new ConnectionHandler();
    }

    createCard(card, callback) {
        var query = "INSERT INTO tb_card SET ?";
        this.connectionHandler.query(query, card, callback);
    }
}