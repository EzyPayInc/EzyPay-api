const BaseService = require("../../base/base.service");
class TableService extends BaseService.Service {

	create(data) {
		//noinspection JSUnresolvedFunction,JSUnresolvedVariable
		console.log(data);
		return this.Models.Table.create(data);
	}

	getAll(criteria) {
		//noinspection JSUnresolvedFunction,JSUnresolvedVariable
		return this.Models.Table.findAll({where: criteria});
	}

	getById(id) {
		//noinspection JSUnresolvedFunction,JSUnresolvedVariable
		return this.Models.Table.findById(id);
	}

	updateById(id, data) {
		//noinspection JSUnresolvedFunction,JSUnresolvedVariable
		return this.Models.Table.update(data, {where: {"id": id}});
	}
}
module.exports = TableService;