"use strict";
const BaseService = require("../../base/base.service");
class CountryService extends BaseService.Service {


	getAll(criteria) {
		//noinspection JSUnresolvedFunction
		return this.Models.Country.findAll({where: criteria});
	}
}
module.exports = CountryService;