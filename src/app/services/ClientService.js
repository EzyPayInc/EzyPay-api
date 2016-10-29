/**
 * Created by gustavoquesada on 10/25/16.
 */
import { ClientData } from '../data/ClientData';

export class ClientService {

    insertClient(req, res) {
        var clientData = new ClientData();
        clientData.insertClient(req.body, function (err, result) {
           if (!err) {
               var response = {"data": result};
               res.status(200).json(response);
           } else {
               var response = {"error": err.message};
               res.status(500).json(response);
           }
        });
    }

    getClients(req, res) {
        var clientData = new ClientData();
        clientData.getClients(function (err, result) {
            if(!err) {
                res.status(200).json(result);
            } else {
                var response = {"error": err.message};
                res.status(500).json(response);
            }
        })
    }
}