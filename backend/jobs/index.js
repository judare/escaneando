import cronsBills from './bill';
import cronsDevices from './devices';
import cronsAlerts from './alerts';

function Crons(app, db, services) {
  this.crons = {
    cronsBills,
    cronsDevices,
    cronsAlerts
  };


  this.associate = function() {
    const names = Object.keys(this.crons);
    for (let i = 0; i < names.length; i++) {
      console.log(names[i]);
      this[names[i]] = this.crons[names[i]](app, db, services);
    }
  };


  this.associate();
}

export default Crons;
