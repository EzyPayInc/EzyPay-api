/**
 * Created by gustavoquesada on 4/7/17.
 */
const BaseService = require("../../base/base.service");
class CurrencyService extends BaseService.Service {

    create(data) {
        return this.Models.Currency.create(data);
    }

    getAll(criteria) {
        //noinspection JSUnresolvedFunction,JSUnresolvedVariable
        return this.Models.Currency.findAll({where: criteria});
    }

    getById(id) {
        //noinspection JSUnresolvedFunction,JSUnresolvedVariable
        return this.Models.Currency.findById(id);
    }

    updateById(id, data) {
        //noinspection JSUnresolvedFunction,JSUnresolvedVariable
        return this.Models.Currency.update(data, {where: {"id": id}});
    }
}
module.exports = CurrencyService;