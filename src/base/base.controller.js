"use strict";
module.exports = {
    handleService: function (res, service) {
        service.then((result) => {
            this.okResult(res, result);
        }, (error) => {
            this.handleError(res, error);
        });
    },
    okResult: function (res, result) {
        res.json(result);
    },
    handleError: function (res, error) {
        res.status(500).json({ message: error.message });
    },
    handleFileService: function (res, service) {
        service.then((result) => {
            this.okFileResult(res, result);
        }, (error) => {
            this.handleError(res, error);
        });
    },
    okFileResult: function (res, result) {
        res.writeHead(200,{'Content-type':'image/jpg'});
        res.end(result);
    },
};
//# sourceMappingURL=base.controller.js.map