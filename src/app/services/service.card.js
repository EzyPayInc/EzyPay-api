"use strict";
const BaseService = require("../../base/base.service");
class CardService extends BaseService.Service {

	create(data) {
		//noinspection JSUnresolvedFunction,JSUnresolvedVariable
		return this.Models.Card.create(data);
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