var nodemailer = require('nodemailer');
// var Email = require("./Email").Email;
class EmailHandler {

	constructor() {
		var smtpConfig = {
			host: 'smtp.gmail.com',
			port: 465,
			secure: true, // use SSL
			auth: {
				user: 'quesada.tavo@gmail.com',
				pass: 'xxx'
			}
		};
		this.transporter = nodemailer.createTransport(smtpConfig, 'smtps://user%40gmail.com:pass@smtp.gmail.com');
	}

	sendEmail(email, callback) {
		var mailOptions = {
			from: '"Gustavo Quesada" <quesada.tavo@gmail.com>',
			to: email.email,
			subject: email.subject,
			html: email.body
		};
		this.transporter.sendMail(mailOptions, function (error, info) {
			callback(error, info);
		});
	}

	sendUserValidation(user, callback) {
		var userFullname = user.name + " " + user.lastname;
		var emailBody = "<p>Señor(a):" + userFullname + "<br/>" +
			"Le agradecemos el registro a Ezypay y le pedimos que valide su cuenta " +
			"<a href='http://localhost:3000/user/validate/" + user.idUser + "'>aquí</a>";
		var subject = "Ezypay validación de cuenta";
		var email = new Email(userFullname, user.email, subject, emailBody);
		this.sendEmail(email, callback);
	}
}
exports.EmailHandler = EmailHandler;