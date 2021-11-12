import Conn from "../conn";
import EmailTemplates from 'swig-email-templates';
import config from '../../config/config';

function Mailgun(mode, db) {
  this._conn = new Conn("https://x.com", {});
  this._db = db;
}

Mailgun.prototype.sendMail = async function({from, fromName, to, subject}, { nameView, context, attachments }) {
  return new Promise((resolve, reject) => {

    const templates = new EmailTemplates();

    let templateDir = __dirname + `/templates`;
    if (config.ENV != "production") {
      templateDir = __dirname + `/../templates`;
    }
    templates.render(`${templateDir}/${nameView}.html`, context, (err, html, text) => {
      if (err)  return reject(err);

      const mailOptions = {
        from: `${fromName} <${from}>`,
        to,
        subject,
        html,
        text,
        attachments,
      };

      this._db.mailTransporter.sendMail(mailOptions);
      resolve();
    });
  });
}


export default {
  className: "Mail",
  class: Mailgun,
  autoload: true
}


