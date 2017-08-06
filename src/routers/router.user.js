var GCloudStorage = require("../app/services").GCloudStorage;
var UserService = require("../app/services").UserService;
let c = require("../base/base.controller");
var policies = require("../policies");
var config = require("../config");
var express = require("express");


var router = express.Router();
router.post("/", policies.ClientAuth, (req, res) => {
    let _service = new UserService(req, res);
    c.handleService(res, _service.create(req.body));
});
router.post("/getAll", policies.BearerAuth, (req, res) => {
    let _service = new UserService(req, res);
    c.handleService(res, _service.getAll(req.body));
});
router.get("/:id", policies.BearerAuth, (req, res) => {
    let id = parseInt(req.params["id"]);
    let _service = new UserService(req, res);
    c.handleService(res, _service.getById(id));
});
router.put('/:id', policies.BearerAuth, (req, res) => {
    let id = parseInt(req.params["id"]);
    let _service = new UserService(req, res);
    c.handleService(res, _service.updateById(id, req.body));
});
router.get('/validate/:id', policies.BearerAuth, (req, res) => {
    //TODO: se debe enviar un codigo de confirmacion
    let id = parseInt(req.params["id"]);
    let _service = new UserService(req, res);
    c.handleService(res, _service.validateAccount(id));
});
router.post('/validatePhoneNumbers', policies.BearerAuth, (req, res) => {
    let phoneNumbers = req.body["phoneNumbers"];
    let _service = new UserService(req, res);
    c.handleService(res, _service.validatePhoneNumbers(phoneNumbers));
});
router.post('/uploadImage/:id', policies.BearerAuth, config.multer.single('image'),
    GCloudStorage.sendUploadToGCS, (req, res) => {
        let _service = new UserService(req, res);
        c.handleService(res, _service.uploadUserImage());
    });
router.get('/history/:id', policies.BearerAuth, (req, res) => {
    let id = parseInt(req.params["id"]);
    let _service = new UserService(req, res);
    c.handleService(res, _service.userHistory(id));
});
router.get('/history/dates/:id', policies.BearerAuth, (req, res) => {
    let id = parseInt(req.params["id"]);
    let _service = new UserService(req, res);
    c.handleService(res, _service.userHistoryDates(id));
});
router.get('/commerce/history/:id', policies.BearerAuth, (req, res) => {
    let id = parseInt(req.params["id"]);
    let _service = new UserService(req, res);
    c.handleService(res, _service.commerceHistory(id));
});
router.get('/commerce/history/dates/:id', policies.BearerAuth, (req, res) => {
    let id = parseInt(req.params["id"]);
    let _service = new UserService(req, res);
    c.handleService(res, _service.commerceHistoryDates(id));
});
router.post('/password', policies.BearerAuth, (req, res) => {
    let _service = new UserService(req, res);
    c.handleService(res, _service.updatePassword(req.body));
});

module.exports = router;