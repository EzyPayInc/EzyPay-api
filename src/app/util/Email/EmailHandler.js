/**
 * Created by gustavoquesada on 11/1/16.
 */
var nodemailer = require('nodemailer');
export class EmailHandler {

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

    sendEmail(email, callback){
        var mailOptions = {
            from: '"Gustavo Quesada" <quesada.tavo@gmail.com>',
            to: email.email,
            subject: email.subject,
            html: email.body
        };

        this.transporter.sendMail(mailOptions, function(error, info){
            if(error){
                return console.log(error);
            }
            console.log('Message sent: ' + info.response);
            callback();
        });
    }

}