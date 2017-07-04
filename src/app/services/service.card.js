"use strict";
const BaseService = require("../../base/base.service");
const GreenPayService = require("./service.greenpay");
class CardService extends BaseService.Service {

	create(data) {
		//noinspection JSUnresolvedFunction,JSUnresolvedVariable
		var greenPayService = new GreenPayService(this.req, this.res);
		return new Promise((resolve, reject)=> {
			greenPayService.createCard(data).then(
				(card) => {
					data.cardNumber = card.cardNumber;
					data.serverId =  card.id;
					data.token  = card.token;
					this.Models.Card.create(data).then(
						(result) => resolve(result),
						(error) => reject(error)
					)
				},
				(error) => reject(error)
			)
		});
	}

	updateById(id, data) {
		var greenPayService = new GreenPayService(this.req, this.res);
		return new Promise((resolve, reject)=> {
			greenPayService.updateCard(data).then(
				(response) => {
					this.Models.Card.update(data, {where: {"cardId": id}}).then(
						(result) => resolve(result),
						(error) => reject(error)
					)
				},
				(error) => reject(error)
			)
		});
	}

	getAll(criteria) {
		//noinspection JSUnresolvedFunction,JSUnresolvedVariable
		criteria = {"userId": this.user.id};
		return this.Models.Card.findAll({where: criteria});
	}

	getById(id) {
		//noinspection JSUnresolvedFunction,JSUnresolvedVariable
		return this.Models.Card.findById(id);
	}

	destroy(serverId, customerId) {
        //noinspection JSUnresolvedFunction,JSUnresolvedVariable
		var greenPayService = new GreenPayService(this.req, this.res);
		return new Promise((resolve, reject)=> {
			greenPayService.deleteCard(customerId, serverId).then(
				(response)=> {
					this.Models.Card.destroy({where: {"serverId": serverId}}).then(
						(result) => resolve(result),
						(error) => reject(error)
					)
				},
				(error) => reject(error)
			)
		});
        
    }
}
module.exports = CardService;