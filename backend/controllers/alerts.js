import response from "../helpers/response.js";
import moment from "moment";

export default function(app, db) {
  const {
    Device,
    DeviceLog,
    DeviceLogStatus
  } = db;

  const Controller = {
    list: async function( req, res, next ) {
      try {
        let { data: { filters } } = req.body;

        let queryBuilder = {
          include: [{
            model: Device,
            required: true,
            where: {
              companyId: req.user.companyId
            }
          },
          {
            model: DeviceLogStatus,
            required: true
          }],
          where: {
            deviceLogStatusId: DeviceLogStatus.ALERT_PENDING
          },
          limit: 100,
          order: [ ["id", "DESC"] ]
        };

        if (filters.deviceId) {
          queryBuilder.where.deviceId = filters.deviceId;
        }

        let alerts = await DeviceLog.findAll(queryBuilder);

        let list = alerts.map(alert => ({
          id: alert.id,
          Status: {
            color: alert.DeviceLogStatus.color,
            name: alert.DeviceLogStatus.name,
          },
          Device: {
            id: alert.Device.id,
            name: alert.Device.name,
          },
          Detail: {
            description: alert.description,
            createdAt: moment(alert.createdAt).format("YYYY-MM-DD")
          }
        }));

        return response(res, req, next)({ Alerts: list });
      } catch( err ) {
        return response(res, req, next)( null, { err, status: 400, code: "server.error" } );
      }
    },

    update: async function( req, res, next ) {
      try {

        let { data: { deviceLogId, status } } = req.body;
        let queryBuilder = {
          include: [{
            model: Device,
            required: true,
            where: {
              companyId: req.user.companyId,
            }
          }],
          where: {
            id: deviceLogId
          }
        };
        let deviceLog = await DeviceLog.findOne(queryBuilder);
        if (!deviceLog) {
          return response(res, req, next)( null, { status: 404, code: "devices.notFound" } );
        }

        let device = await deviceLog.getDevice();

        await deviceLog.update({
          deviceLogStatusId: status
        });
        await device.increment("alerts", { by: -1 });

        return response(res, req, next)(null);
      } catch( err ) {
        return response(res, req, next)( null, { err, status: 400, code: "server.error" } );
      }
    }
  }

  return Controller;
};
