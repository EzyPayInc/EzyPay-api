var GCloudStorage = require("../app/services").GCloudStorage;
var UserService = require("../app/services").UserService;
var policies = require("../policies");
var config = require("../config");
var router = require("express").Router();

router.post("/", policies.ClientAuth, (req, res) => {
    let _service = new UserService(req, res);
    _service.handle(_service.create(req.body));
});
router.post("/getAll", policies.BearerAuth, (req, res) => {
    let _service = new UserService(req, res);
    _service.handle(_service.getAll(req.body));
});
router.get("/:id", policies.BearerAuth, (req, res) => {
    let id = parseInt(req.params["id"]);
    let _service = new UserService(req, res);
    _service.handle(_service.getById(id));
});
router.put('/:id', policies.BearerAuth, (req, res) => {
    let id = parseInt(req.params["id"]);
    let _service = new UserService(req, res);
    _service.handle(_service.updateById(id, req.body));
});

router.post("/email/", policies.ClientAuth, (req, res) => {
    let _service = new UserService(req, res);
    _service.handle(_service.validateEmail(req.body));
});

router.get('/validate/:id', policies.BearerAuth, (req, res) => {
    //TODO: se debe enviar un codigo de confirmacion
    let id = parseInt(req.params["id"]);
    let _service = new UserService(req, res);
    _service.handle(_service.validateAccount(id));
});
router.post('/validatePhoneNumbers', policies.BearerAuth, (req, res) => {
    let phoneNumbers = req.body["phoneNumbers"];
    let _service = new UserService(req, res);
    _service.handle(_service.validatePhoneNumbers(phoneNumbers));
});
router.post('/uploadImage/:id', policies.BearerAuth, config.multer.single('image'),
    GCloudStorage.sendUploadToGCS, (req, res) => {
        let _service = new UserService(req, res);
        _service.handle(_service.uploadUserImage());
    });
router.get('/history/:id', policies.BearerAuth, (req, res) => {
    let id = parseInt(req.params["id"]);
    let _service = new UserService(req, res);
    _service.handle(_service.userHistory(id));
});
router.get('/history/dates/:id', policies.BearerAuth, (req, res) => {
    let id = parseInt(req.params["id"]);
    let _service = new UserService(req, res);
    _service.handle(_service.userHistoryDates(id));
});
router.get('/commerce/history/:id', policies.BearerAuth, (req, res) => {
    let id = parseInt(req.params["id"]);
    let _service = new UserService(req, res);
    _service.handle(_service.commerceHistory(id));
});
router.get('/commerce/history/dates/:id', policies.BearerAuth, (req, res) => {
    let id = parseInt(req.params["id"]);
    let _service = new UserService(req, res);
    _service.handle(_service.commerceHistoryDates(id));
});
router.post('/password', policies.BearerAuth, (req, res) => {
    let _service = new UserService(req, res);
    _service.handle(_service.updatePassword(req.body));
});

router.post('/forgotPassword', /*policies.ClientAuth,*/ (req, res) => {
    let _service = new UserService(req, res);
    _service.handle(_service.passwordRecovery(req.body));
});

router.get('/password/:token',(req, res) => {
    let token = req.params["token"];
    let _service = new UserService(req, res);
    _service.displayRecoveryPasswordView(token);
});

router.post('/password/:token',(req, res) => {
    let token = req.params["token"];
    let data = req.body;
    let _service = new UserService(req, res);
    _service.recoveryPassword(token, data);
});

module.exports = router;