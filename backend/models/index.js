import config from '../config/config.js';
import Sequelize from 'sequelize';
// Models
import _QueryExecution from './_query-execution';
import ActivityCategory from './activity-category';
import Activity from './activity';
import BillDetail from './bill-detail';
import BillPayment from './bill-payment';
import Bill from './bill';
import CompanyParameter from './company-parameter';
import Company from './company';
import DeviceActivity from './device-activity';
import DeviceBackup from './device-backup';
import DeviceLog from './device-log';
import DeviceLogStatus from './device-log-status';
import DeviceMonitor from './device-monitor';
import Device from './device';
import RolPermission from './rol-permission';
import RolPrivilege from './rol-privilege';
import Rol from './rol';
import Session from './session';
import TicketLog from './ticket-log';
import Ticket from './ticket';
import TicketStatus from './ticket-status';
import UserInvite from './user-invite';
import User from './user.js';
import Train from './train';
import TrainResource from './train-resource.js';
import TrainUser from './train-user';
import TrainUserResource from './train-resource-user';
import Area from './area';

function Models() {

  this.models = {
    _QueryExecution,
    ActivityCategory,
    Activity,
    Area,
    BillDetail,
    BillPayment,
    Bill,
    Company,
    CompanyParameter,
    DeviceActivity,
    DeviceBackup,
    DeviceLog,
    DeviceLogStatus,
    DeviceMonitor,
    Device,
    RolPermission,
    RolPrivilege,
    Rol,
    Session,
    TicketLog,
    Ticket,
    TicketStatus,
    UserInvite,
    User,
    Train,
    TrainResource,
    TrainUser,
    TrainUserResource
  };

  this.sequelize = null;
  this.Sequelize = Sequelize;
  this.Op = Sequelize.Op;

  this.associate = function() {
    var names = Object.keys(this.models);
    for (var i = 0; i < names.length; i++) {
      var modelData = this.models[names[i]];

      var model = modelData(this.sequelize, this.Sequelize.DataTypes);
      // var model = this.sequelize.import(names[i], modelData);
      this[model.name] = model;
    }

    for (var i = 0; i < names.length; i++) {
      var modelName = names[i];
      if (this[modelName].associate) {
        this[modelName].associate(this);
      }
    }
  }

  this.connect = function() {
    this.sequelize = new Sequelize(config.database, config.username, config.password, {
      ...config.sequelizeOpts,
      operatorsAliases: this.operatorsAliases,
      benchmark: true,
      logging: (str, time) => {
        if (time > 2000) {
          this.QueryExecution.create({
            sql: str,
            ms: time
          });
        }
      }
    })
  }

  this.connect();
  this.associate();
}

export default Models; 
