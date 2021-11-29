import Conn from "../conn";

function Apagar() {
  this.token = null;
  this._conn = new Conn("https://sandbox.apagar.co/api/v1")
}

Apagar.prototype.setToken = async function(token) {
  this._conn.setDefaultRequestOpts({
    headers: {
      Authorization: "Bearer " + token
    },
    json: true
  });
}

Apagar.prototype.getBalance = async function(cellphone, text) {
  let body = {
    data: {}
  };

  let { result } =  await this._conn.request("/user/balance", "POST", { body });
  return result;
}

Apagar.prototype.createOrder = async function({People, amount}, paymentMethod) {

  let body = {
    data: {
      "PaymentMethod": {
        "id": paymentMethod.providerArg,
        "features": {
          "People": People
        }
      },
      "Bill": {
          "amount": amount,
          "tax": 0
      },
      "description": "Cobro Geoda - Daviplata"
    }
  };

  let { result } =  await this._conn.request("/payments/resource/generate", "POST", { body });
  return result;
}

Apagar.prototype.confirmDaviplata = async function(otp, reference) {
  let body = {
    data: {
      Resource: {
        reference,
        PaymentMethod: {
          id: 11,
          features: {
            otp
          }
        },
      },
    }
  };
  console.log(body)

  let { result } =  await this._conn.request("/payments/confirm/daviplata/button", "POST", { body });
  return result;
}


export default {
  className: "Apagar",
  class: Apagar,
  autoload: true
}