const BaseService = require("../../base/base.service");
class CardService extends BaseService.Service {

	create(data) {
		//noinspection JSUnresolvedFunction,JSUnresolvedVariable
		return this.Models.Card.create(data);
	}

	getAll(criteria) {
		//noinspection JSUnresolvedFunction,JSUnresolvedVariable
		return this.Models.Card.findAll({where: criteria});
	}

	getById(id) {
		//noinspection JSUnresolvedFunction,JSUnresolvedVariable
		return this.Models.Card.findById(id);
	}
}
module.exports = CardService;