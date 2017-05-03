"use strict";
const BaseService = require("../../base/base.service");
class DeviceTokenService extends BaseService.Service {

    create(data) {
        //noinspection JSUnresolvedFunction,JSUnresolvedVariable
        return this.Models.DeviceToken.create(data);
    }

    updateById(id, data) {
        return this.Models.DeviceToken.update(data, {where: {"deviceTokenId": id}});
    }

    getAll(criteria) {
        //noinspection JSUnresolvedFunction,JSUnresolvedVariable
        return this.Models.DeviceToken.findAll({where: criteria});
    }

    getById(id) {
        //noinspection JSUnresolvedFunction,JSUnresolvedVariable
        return this.Models.DeviceToken.findById(id);
    }

    destroy(id) {
        //noinspection JSUnresolvedFunction,JSUnresolvedVariable
        return this.Models.DeviceToken.destroy({where: {"deviceTokenId": id}});
    }

    destroyAll(criteria) {
        //noinspection JSUnresolvedFunction,JSUnresolvedVariable
        return this.Models.DeviceToken.destroy({where: criteria});
    }

    insert(data) {
        let criteria = { deviceId : data.deviceId };
        return new Promise((resolve, reject) => {
            this.getAll(criteria).then(
                (result)=> {
                    if(result.length > 0) {
                        var deviceToken = result[0];
                        data.id = deviceToken.id;
                        this.updateById(data.id, data).then(
                            (res)=> {
                                resolve(res);
                            },
                            (err)=> {
                                reject(err);
                            }
                        );

                    } else {
                        this.create(data).then(
                            (res) => {
                                resolve(res);
                            },
                            (err)=> {
                                reject(err);
                            }
                        );
                    }
                },
                (error)=> {
                    reject(error);
                }
            );
        });
    }
}
module.exports = DeviceTokenService;
