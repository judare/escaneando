import response from "../helpers/response.js";
import moment from "moment";

export default function(app, db, services) {
  const {
    User,
    DeviceActivity,
    Activity,
  } = db;

  const Controller = {

    productivity: async function( req, res, next ) {
      try {
        let { data: { userId, deviceId, areaId, dateStart, dateEnd } } = req.body;
        let devicesIds = [deviceId];
        let queryBuilder = {};

        if (userId) {
          queryBuilder = {
            where: {
              companyId: req.user.companyId,
              id: userId
            }
          };
          let user = await User.findOne(queryBuilder);
          if (!user) {
            return response(res, req, next)( null, { status: 404, code: "users.notFound" } );
          }
          devicesIds = (await user.getDevices()).map(d => d.id);
        }

        if (areaId) {
          queryBuilder = {
            where: {
              companyId: req.user.companyId,
              areaId
            }
          };
          let users = await User.findAll(queryBuilder);

          devicesIds = [];
          for (let i = 0; i < users.length; i++) {
            let u = users[i];
            let devices = await u.getDevices();
            devicesIds = [...devicesIds, ...devices.map(d => d.id)];
          }
        }

        queryBuilder = {
          include: [{
            model: Activity,
            required: true
          }],
          where: {
            deviceId: { [db.Sequelize.Op.in]: devicesIds },
            time: { [db.Sequelize.Op.gt]: 120 },
          },
          order: [ ["time", "DESC"] ],
          limit: 20
        }

        if (dateStart || dateEnd) {
          let and = [];
          if (dateStart) {
            and.push({ date: {[ db.Op.gt ]: dateStart} });
          }
          if (dateEnd) {
            and.push({ date: {[ db.Op.lte ]: dateEnd} });
          }
          queryBuilder.where[db.Op.and] = and;
        } else {
          queryBuilder.where.date = moment().format("YYYY-MM-DD 00:00");
        }

        let Tracking = await DeviceActivity.findAll(queryBuilder);

        Tracking = Tracking.map(activity => ({
          id: activity.id,
          name: activity.Activity.name,
          time: activity.time
        }));

        return response(res, req, next)({ Tracking });
      } catch( err ) {
        return response(res, req, next)( null, { err, status: 500, code: "server.error" } );
      }
    }
  }

  return Controller;
}