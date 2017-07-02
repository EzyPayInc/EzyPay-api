"use strict";
const BaseService = require("../../base/base.service");
const config = require("../../config");
var qString = require('querystring');
class GreenPayService extends BaseService.Service {
    login() {
		var options = {
            hostname: config.greenPayConfig.hostname,
            port: config.greenPayConfig.port,
            path: config.greenPayConfig.paths.login,
            method: config.httpMethods.POST,
            headers: {
				"Content-Type": "application/json",
            }
        };
        var body = qString.stringify(config.login);
        return new Promise((resolve, reject) => {
            var httpService = new HttpService(options);
			httpService.postRequest(body).then(
				(response)=> {
                    var greenPayData = {
                        accessToken = response.access_token,
                        refreshToken = response.refresh_token,
                        expiresIn = response.expires_in,
                        createAt = new Date()
                    };
                    this.saveGreenPayToken(greenPayData).then(
                        (token) => resolve(token.access_token),
                        (error) => reject(error)
                    );
				},
				(error)=> reject(error)
			);
		});
    }

    saveGreenPayToken(data) {
        return this.Models.GreenPay.create(data);
    }

    getGreenPayConfig() {
        return this.Models.GreenPay.findById(1);
    }

    getToken() {
        return new Promise((resolve, reject) => {
            this.getGreenPayConfig().then(
                (greenpay) =>{
                    if(greenpay != null) {
                        resolve(greenpay.accessToken);
                    } else {
                        this.login().then(
                            (token) => resolve(token),
                            (error) => reject(error)
                        );
                    }
                },
                (error) => reject(error)
            )
        });
    }

    createCustomer(user) {
        customer = {
            company: 12,
            customerProfile: 1,
            customerType: 1,
            email: user.email,
            identification: null,
            identificationType: 1,
            lastName: user.lastName,
            name: user.name,
            phoneNumber: user.phoneNumber,
            pin: "1"
        };
		var options = {
            hostname: config.greenPayConfig.hostname,
            port: config.greenPayConfig.port,
            path: config.greenPayConfig.paths.customers,
            method: config.httpMethods.POST,
            headers: {
				"Content-Type": "application/json",
            }
        };
        return new Promise((resolve, reject)=> {
            this.getToken().then(
                (token) => {
                    options.headers.Authorization = "Bearer " + token;
                    var httpService = new HttpService(options);
                    httpService.postRequest(qString.stringify(customer)).then(
                        (response) => resolve(response.id),
                        (error) => reject(error)
                    );
                },
                (error) => reject(error)
            )
        });
    }
}

module.exports = GreenPayService;