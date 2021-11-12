import response from "../helpers/response.js";
import { getReadableFileSizeString } from "../helpers/helpers";
import moment from "moment";

export default function(app, db) {
  const {
    Device,
    DeviceLog,
    User,
    DeviceMonitor
  } = db;

  const Controller = {
    list: async function( req, res, next ) {
      try {
        let { filters } = req.body.data;

        let queryBuilder = {
          include: [{
            model: User,
            required: false
          }],
          where: {
            companyId: req.user.companyId
          },
          order: [ ["lastActivity", "DESC"] ]
        };

        if (filters.search) {
          queryBuilder.where.name = { [db.Sequelize.Op.like]: `%${filters.search}%` }
        }

        let list = await Device.findAll(queryBuilder);

        list = list.map(device => ({
          User: device.User ? {
            id: device.User.id,
            name: device.User.name,
            image: device.User.image
          } : null,
          id: device.id,
          active: device.isActive(),
          alerts: device.alerts,
          image: device.image,
          name: device.name,
          battery: device.battery,
          description: device.description,
          backupSize: getReadableFileSizeString(device.backupSize)
        }))

        return response(res, req, next)({ Devices: list });
      } catch( err ) {
        return response(res, req, next)( null, { err, status: 400, code: "server.error" } );
      }
    },

    get: async function( req, res, next ) {
      try {
        let { device } = req;

        let space = device.disks.reduce((ac, disk) => ac + disk.size, 0);
        let deviceData = {
          id: device.id,
          name: device.name,
          description: device.description,
          image: device.image,
          lastActivity: device.lastActivity ? moment(device.lastActivity).format("DD/MM/YY HH:mm:ss"): req.translate("device.nouse"),
          lastBackUp: device.lastBackUp ? moment(device.lastBackUp).format("DD/MM/YY HH:mm:ss") : req.translate("backup.nouse"),
          memory: getReadableFileSizeString(device.memory),
          space: getReadableFileSizeString(space),
          backupSize: getReadableFileSizeString(device.backupSize),
          os: device.os,
          cores: device.cores,
          latitude: device.latitude,
          longitude: device.longitude,
          processor: device.processor,
          active: device.isActive(),
          disks: device.disks.map(disk => ({
            name: disk.name,
            size: getReadableFileSizeString(disk.size),
          })),
          Parameters: await device.parameters()
        };

        return response(res, req, next)({ Device: deviceData });
      } catch( err ) {
        return response(res, req, next)( null, { err, status: 400, code: "server.error" } );
      }
    },

    update: async function( req, res, next ) {
      try {
        let { device, body: { data: { Device: { Parameters } } } } = req;

        await device.update({
          extra: { Parameters }
        })
        
        return response(res, req, next)(null);
      } catch( err ) {
        return response(res, req, next)( null, { err, status: 400, code: "server.error" } );
      }
    },


    createPrepare: async function( req, res, next ) {
      try {
        let { user } = req;

        let company = await user.getCompany();

        let parameters = await company.parameters();
        
        return response(res, req, next)({ Parameters: parameters });
      } catch( err ) {
        return response(res, req, next)( null, { err, status: 400, code: "server.error" } );
      }
    },

    create: async function( req, res, next ) {
      try {
        let { user } = req;
        let { name, description, Parameters } = req.body.data;

        let device = await Device.create({
          hash: "",
          companyId: req.user.companyId,
          userId: null,
          name,
          description,
          extra: { Parameters }
        });

        await device.log("auto_log", user, `El equipo ha sido creado`);

        return response(res, req, next)(null);
      } catch( err ) {
        return response(res, req, next)( null, { err, status: 400, code: "server.error" } );
      }
    },

    history: async function( req, res, next ) {
      try {
        let queryBuilder = {
          include: [{
            model: User,
            required: true
          }],
          where: {
            deviceId: req.body.data.deviceId
          },
          order: [ ["id", "DESC"] ]
        };
        let list = await DeviceLog.findAll(queryBuilder);

        list = list.map(log => ({
          "id": log.id,
          "description": log.description,
          "createdAt": moment(log.createdAt).format("DD/MM/YY"),
          "User": log.User ? {
            "id": log.User.id,
            "name": log.User.name,
            "image": log.User.image
          } : null
        }))

        return response(res, req, next)({ History: list });
      } catch( err ) {
        return response(res, req, next)( null, { err, status: 400, code: "server.error" } );
      }
    },

    historyAdd: async function( req, res, next ) {
      try {
        let { device, user, body: { data: { description, reminderAt } } } = req;

        await device.log("manual_log", user, description, reminderAt);

        return response(res, req, next)(null);
      } catch( err ) {
        return response(res, req, next)( null, { err, status: 400, code: "server.error" } );
      }
    },

    associate: async function( req, res, next ) {
      try {
        let { device, userCompany, user } = req;

        let desc = `El equipo ha sido asignado a [${userCompany.id}] ${userCompany.name}`;
        await device.log("auto_log", user, desc);

        await device.update({
          userId: userCompany.id
        });

        return response(res, req, next)(null);
      } catch( err ) {
        return response(res, req, next)( null, { err, status: 400, code: "server.error" } );
      }
    },

    disassociate: async function( req, res, next ) {
      try {
        let { device, userCompany, user } = req;

        let desc = `El equipo ha sido removido de [${userCompany.id}] ${userCompany.name}`;
        await device.log("auto_log", user, desc);

        await device.update({
          userId: null
        });

        return response(res, req, next)(null);
      } catch( err ) {
        return response(res, req, next)( null, { err, status: 400, code: "server.error" } );
      }
    },


    delete: async function( req, res, next ) {
      try {
        let { device, user } = req;

        await device.log("auto_log", user, "Equipo eliminado");

        await device.destroy();

        return response(res, req, next)(null);
      } catch( err ) {
        return response(res, req, next)( null, { err, status: 400, code: "server.error" } );
      }
    },


    monitor: async function( req, res, next ) {
      try {
        let { device, body } = req;
        let {  dateStart, dateEnd, values  } = body.data;

        let queryBuilder = {
          where: {
            deviceId: device.id
          },
          order: [ ["id", "asc"] ],
          limit: 1000
        }

        if (dateStart || dateEnd) {
          let and = [];
          if (dateStart) {
            and.push({ createdAt: {[ db.Op.gt ]: dateStart} });
          }
          if (dateEnd) {
            and.push({ createdAt: {[ db.Op.lte ]: dateEnd} });
          }
          queryBuilder.where[db.Op.and] = and;
        } else {
          queryBuilder.where.createdAt =  {[ db.Op.gt ]: moment().format("YYYY-MM-DD 00:00") };
        }
        let monitor = await DeviceMonitor.findAll(queryBuilder);

        let data = Object.assign({}, ...Array.from(values, i => ({[i]: []}) ));
        
        monitor.map(value => values.map(key => data[key].push({
          value: value[key],
          createdAt: value.createdAt
        })))

        return response(res, req, next)(data);
      } catch( err ) {
        return response(res, req, next)( null, { err, status: 400, code: "server.error" } );
      }
    },
    
  }

  return Controller;
};
