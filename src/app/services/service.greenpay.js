"use strict";
const BaseService = require("../../base/base.service");
const HttpService = require("../../base/service.http");
const config = require("../../config");
const moment = require("moment");
const util = require('util');
class GreenPayService extends BaseService.Service {
    
    login() {
		var options = {
            url : config.greenPayConfig.hostname + config.greenPayConfig.paths.login,
            method: config.httpMethods.POST,
            json: true, 
            body: config.greenPayConfig.login
        };
        return new Promise((resolve, reject) => {
            var httpService = new HttpService();
			httpService.request(options).then(
				(response)=> {
                    var greenPayData = {
                        id : 1,
                        accessToken : response.access_token,
                        refreshToken : response.refresh_token,
                        expiresIn : response.expires_in,
                        tokenType : response.token_type,
                        createdAt : new Date()
                    };
                    this.saveGreenPayToken(greenPayData).then(
                        (token) => resolve(greenPayData.accessToken),
                        (error) => reject(error)
                    );
				},
				(error)=> reject(error)
			);
		});
    }

    saveGreenPayToken(data) {
        return this.Models.GreenPay.upsert(data);
    }

    getGreenPayConfig() {
        return this.Models.GreenPay.findById(1);
    }

    getToken() {
        return new Promise((resolve, reject) => {
            this.getGreenPayConfig().then(
                (greenpay) =>{
                    if(greenpay != null && !this.isTokenExpired(greenpay.expiresIn, greenpay.createdAt)) {
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
        var customer = {
            company: 12,
            customerProfile: 1,
            customerType: 1,
            email: user.email,
            identification: 304820202,
            identificationType: 1,
            lastName: user.lastName,
            name: user.name,
            phoneNumber: user.phoneNumber,
            pin: "1"
        };
		var options = {
            url: config.greenPayConfig.hostname + config.greenPayConfig.paths.customers,
            method: config.httpMethods.POST,
            json : true,
            body : customer,
            headers : {}
        };
        return this.sendRequest(options);
    }

    createCard(data) {
        var path = util.format(config.greenPayConfig.paths.creditCards, data.customerId);
        var card = {
            cardHolderName: data.cardHolderName,
            cardNumber: data.cardNumber,
            cardVendor: data.cardVendor,
            ccv: data.ccv,
            expirationDate: data.expirationDate,
            favorite: true,
            nickname: "string"
        };
        var options = {
            url: config.greenPayConfig.hostname + path,
            method: config.httpMethods.POST,
            json : true,
            body : card,
            headers : {}
        };
        return this.sendRequest(options);
    }

    updateCard(data) {
        var path = util.format(config.greenPayConfig.paths.creditCards, data.customerId) + data.serverId;
        var card = {
            ccv: data.ccv,
            expirationDate: data.expirationDate,
            favorite: data.isFavorite,
            nickname: "string"
        };
        var options = {
            url: config.greenPayConfig.hostname + path,
            method: config.httpMethods.PUT,
            json : true,
            body : card,
            headers : {}
        };
        return this.sendRequest(options);
    }

    deleteCard(customerId, cardId) {
        var path = util.format(config.greenPayConfig.paths.creditCards, customerId) + cardId;
        var options = {
            url: config.greenPayConfig.hostname + path,
            method: config.httpMethods.DELETE,
            headers : {}
        };
        return this.sendRequest(options);
    }

    transaction(data) {
        var transaction = {
            amount: data.amount,
            authorizationCode: 0,
            channel: 1,
            creditCard: data.token,
            description: "string"
        }
        var options = {
            url: config.greenPayConfig.hostname + config.greenPayConfig.paths.transactions,
            method: config.httpMethods.POST,
            json : true,
            body : transaction,
            headers : {}
        };
        return this.sendRequest(options)
    }

    sendRequest(options) {
        return new Promise((resolve, reject)=> {
            this.getToken().then(
                (token) => {
                    options.headers.Authorization = "Bearer " + token;
                    var httpService = new HttpService();
                    httpService.request(options).then(
                        (response) => resolve(response),
                        (error) => reject(error)
                    );
                },
                (error) => reject(error)
            )
        });
    }

    isTokenExpired(seconds, date) {
        var newDate = moment(date);
        var currentDate = moment();
        var secondsDiff = currentDate.diff(newDate, 'seconds')
        return secondsDiff >= (seconds - 60);
    }
}

module.exports = GreenPayService;