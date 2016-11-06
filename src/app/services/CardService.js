/**
 * Created by gustavoquesada on 11/6/16.
 */
import { CardData } from "../data/CardData"
export class CardService {

    constructor(){
    }

    createCard(req, res){
        var cardData = new CardData();
        cardData.createCard(req.body, function (err, result) {
            if (!err) {
                var response = {"data": result};
                res.status(200).json(response);
            } else {
                var response = {"error": err.message};
                res.status(500).json(response);
            }
        });
    }
}