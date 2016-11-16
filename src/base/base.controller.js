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
    }
};
//# sourceMappingURL=base.controller.js.map