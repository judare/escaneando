import Conn from "../conn";

function Apagar() {
  this._conn = new Conn("https://api.apagar.co/api/v1", {
    headers: {
      Authorization: "Bearer "
    },
    json: true
  })
}

Apagar.prototype.getBalance = async function(cellphone, text) {
  let body = {
    data: {}
  };

  let { result } =  await this._conn.request("/user/balance", "POST", { body });
  return result;
}


export default {
  className: "Apagar",
  class: Apagar,
  autoload: true
}