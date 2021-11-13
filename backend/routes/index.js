// import Areas from './areas.js';
// import Auth from './auth.js';
// import Bills from './bills';
// import Devices from './devices';
// import Tickets from './tickets';
// import Users from './users';
// import DeviceOs from './device-os';
import Visitant from './visitant';
// import Learning from './learning';
// import Backup from './backup';
// import Productivity from './productivity';
// import Rols from './rols';

function Routes(app, db, services) {
  this.routes = {
    Visitant
  };

  this.associate = function() {
    const names = Object.keys(this.routes);
    for (let i = 0; i < names.length; i++) {
      console.log(names[i]);
      this[names[i]] = this.routes[names[i]](app, db, services);
    }
  };


  this.associate();
}

export default Routes;
