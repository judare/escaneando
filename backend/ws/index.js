import config from '../config/config.js';

import Sms from "./sms.js";
import Mail from "./mail.js";


function Services() {
  this.connections = [
   Sms,
   Mail
  ];

  this.connect = function(db) {
    for (var i = 0; i < this.connections.length; i++) {
      var tmpFile = this.connections[i];

      if (tmpFile.autoload) {
        var c = new tmpFile.class(config.modeWs, db, this);
        var testing = config.testProvider && !tmpFile.vpn && !tmpFile.validationIp;

        if (config.proxy && tmpFile.testProxy)  testing = true;
        if(config.ENV == "production" || testing) {
          if (c.connect)  c.connect();
        }
        
        this[ tmpFile.className ] = c; 
      }
    }
  }
}

var services = new Services();
export default services;