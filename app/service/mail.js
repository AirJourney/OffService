'use strict';

const Service = require('egg').Service;
const nodeMailer = require('nodemailer');
const monent = require('moment');
const user_email = 'helpdesk@skywingtrip.com';
const auth_code = 'Jingtian888';

const transporter = nodeMailer.createTransport({
  host: 'smtphk.qiye.aliyun.com',
  port: 465,
  auth: {
    user: user_email, // 账号
    pass: auth_code, // 授权码
  },
});


class MailService extends Service {
  async sendMktBillMail(details, date) {
    const { ctx } = this;
    const mailOptions = {
      from: 'Helpdesk SkyWingTrip<helpdesk@skywingtrip.com>', // sender address mailfrom must be same with the user
      // to: 'jianglei19940909@126.com', // list of receivers
      to: 'feeds@skyscanner.net', // list of receivers
      cc: '', // copy for receivers
      bcc: '', // secret copy for receivers
      subject: `[SkyWingTrip]:${date}`, // Subject line
      text: `
      This email is from the system and is automatically sent. 
      It contains the daily report attachment for T+1. 
      If you have any questions, please contact us.`, // plaintext body
      replyTo: '', // custom reply address
      attachments: [
        { // utf-8 string as an attachment
          filename: `[SkyWingTrip]${date}.csv`,
          content: details,
        },
      ],
    };
    transporter.sendMail(mailOptions, function(error, info) {
      if (error) {
        ctx.logger.error(error);
      }
      ctx.logger.info('Message sent: ' + info.response);
    });
  }
}

module.exports = MailService;
