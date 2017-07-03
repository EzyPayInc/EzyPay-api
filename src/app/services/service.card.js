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
		return this.Models.Card.update(data, {where: {"cardId": id}});
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
}
module.exports = CardService;