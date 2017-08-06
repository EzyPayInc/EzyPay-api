var router = require("express").Router();
var PushNotificationsService = require("../app/services").PushNotificationsService;

router.post('/callWaiter', (req, res) => {
    let _service = new PushNotificationsService(req, res);
    _service.handle(_service.callWaiterNotification(
        req.body.tableNumber,
        req.body.commerceId,
        req.body.paymentId
    ));
});
router.post('/billRequest', (req, res) => {
    let _service = new PushNotificationsService(req, res);
    _service.handle(_service.billRequestNotification(
        req.body.tableNumber,
        req.body.commerceId,
        req.body.paymentId
    ));
});
router.post('/sendBill', (req, res) => {
    let _service = new PushNotificationsService(req, res);
    _service.handle(_service.sendBillNotification(
        req.body.clientId,
        req.body.amount,
        req.body.currencyCode,
        req.body.paymentId
    ));
});
router.post('/splitRequest', (req, res) => {
    let _service = new PushNotificationsService(req, res);
    _service.handle(_service.splitRequestNotification(
        req.body.data.payment,
        req.body.data.friends
    ));
});
router.post('/splitResponse', (req, res) => {
    let _service = new PushNotificationsService(req, res);
    _service.handle(_service.responseSplitRequestNotification(
        req.body.userId,
        req.body.paymentId,
        req.body.response
    ));
});

module.exports = router;