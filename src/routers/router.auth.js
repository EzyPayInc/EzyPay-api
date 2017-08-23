var router = require("express").Router();
var policies = require("../policies");
var oauth2 = require("../base/oauth2.service");

router.post("/token", oauth2.TokenEndpoint);
router.post("/credential", policies.ClientAuth, (req, res) => {
    oauth2.Oauth2Service.verifyCredential(req.user, req.body, (error, result) => {
        if (error) {
            res.status(500).json({ message: error.message });
        } else {
            res.json(result);
        }
    });
});

module.exports = router;