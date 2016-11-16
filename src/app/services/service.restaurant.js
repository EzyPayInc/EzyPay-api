const BaseService = require("../../base/base.service");
class RestaurantService extends BaseService.Service {

	create(data) {
		//noinspection JSUnresolvedFunction,JSUnresolvedVariable
		return this.Models.Restaurant.create(data);
	}

	getAll(criteria) {
		//noinspection JSUnresolvedFunction,JSUnresolvedVariable
		return this.Models.Restaurant.findAll({where: criteria});
	}

	getById(id) {
		//noinspection JSUnresolvedFunction,JSUnresolvedVariable
		return this.Models.Restaurant.findById(id);
	}

	updateById(id, data) {
		//noinspection JSUnresolvedFunction,JSUnresolvedVariable
		return this.Models.Restaurant.update(data, {where: {"id": id}});
	}
}
module.exports = RestaurantService;