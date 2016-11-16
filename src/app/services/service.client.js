const BaseService = require("../../base/base.service");
class ClientService extends BaseService.Service {

	create(data) {
		return this.Models.Client.create(data);
	}

	getAll(criteria) {
		//noinspection JSUnresolvedFunction
		return this.Models.Client.findAll({where: criteria});
	}

	getById(id) {
		//noinspection JSUnresolvedFunction
		return this.Models.Client.findById(id);
	}
}
module.exports = ClientService;