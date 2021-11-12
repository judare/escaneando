import Conn from "../conn";

function Infobip() {
  this._conn = new Conn("https://Recargate.pro.api.infobip.com", {
    auth: {
      username: "Recargate.pro",
      password: "Juandavid!23"
    },
    json: true
  })
}

Infobip.prototype.sendSms = async function(cellphone, text) {
  let body = {
    // from: "890415",
    to: cellphone,
    text
  };

  let {result} =  await this._conn.request("/sms/1/text/single", "POST", { body });
  return result;
}


export default {
  className: "Sms",
  class: Infobip,
  autoload: true
}