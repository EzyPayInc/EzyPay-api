var nodemailer = require('nodemailer');
const config = require("../config");

class EmailService {

    constructor() {
		this.transporter = nodemailer.createTransport(config.smtpConfig, 'smtps://user%40gmail.com:pass@smtp.gmail.com');
	}

	sendEmail(email, callback) {
        return new Promise((resolve, reject) => {
            var mailOptions = {
                from: '"Ugwo  " <it@ezypayinc.com>',
                to: email.email,
                subject: email.subject,
                html: email.body
            };
            this.transporter.sendMail(mailOptions, function (error, info) {
                if(error) {
                    reject(error);
                } else {
                    resolve(info);
                }
            });
        });
	}
}

module.exports = EmailService;