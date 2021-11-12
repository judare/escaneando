import { msToTime } from "../helpers/helpers";
import moment from "moment";

export default function(app, db) {

  const {
    Device,
    DeviceLog,
    DeviceLogStatus,
    DeviceActivity,
    Activity,
    User
  } = db;

  return {
    process() {
      let queryBuilder = {};
      let devices = await Device.findAll(queryBuilder);
      let alerts = [];

      for (let deviceIndex in devices) {
        let device = devices[deviceIndex];
        let alertCount = 0;
        let DAYS_NO_USE = 3; // TODO
        let DAYS_NO_BACKUPS = 3; // TODO


        // check inactivity
        if (moment(device.lastActivity).diff(moment(), "days" > DAYS_NO_USE)) {
          alerts.push({
            deviceLogStatusId: DeviceLogStatus.ALERT_PENDING,
            deviceId: device.id,
            action: "no_activity",
            description: `El dispositivo lleva ${DAYS_NO_USE} sin actividad`,
          });
          alertCount++;
        }

        // check no backups
        if (moment(device.lasBackup).diff(moment(), "days" > DAYS_NO_BACKUPS)) {
          alerts.push({
            deviceLogStatusId: DeviceLogStatus.ALERT_PENDING,
            deviceId: device.id,
            action: "no_backups",
            description: `El dispositivo lleva ${DAYS_NO_BACKUPS} sin backups`,
          });
          alertCount++;
        }

        if (alertCount > 0) {
          await device.increment("alerts", { by: alertCount })
        }
      }

      if (alerts.length > 0) {
        await DeviceLog.bulkCreate(alerts);
      }
    },

    productivity() {
      let queryBuilder = {
        include: [{
          model: Activity,
          required: true
        },
        {
          model: Device,
          include: [{
            model: User,
            required: true
          }],
          required: true
        }],
        where: {
          date: moment().subtract(1, "days").format("YYYY-MM-DD 00:00"),
          time: { [db.Sequelize.Op.gt]: 120 },
        },
        order: [ ["time", "DESC"] ],
        limit: 20
      }
  
      let data = await DeviceActivity.findAll(queryBuilder);
      let TrackingData = {};
  
      for (let i = 0; i < data.length; i++) {
        const activity = data[i];
  
        if (!TrackingData[activity.Device.userId])  TrackingData[activity.Device.userId] = {
          fullName: activity.Device.User.name,
          email: activity.Device.User.email,
          Tracking: [],
          Sum: 0
        };
  
        TrackingData[activity.Device.userId].Sum += activity.time * 1000;
        TrackingData[activity.Device.userId].Tracking.push({
          name: activity.Activity.name,
          time: activity.time * 1000
        });
      }
  
      for (let t in TrackingData) {
        let Tracking = TrackingData[t];
        Tracking.Tracking = Tracking.Tracking.map(t => ({...t, percent: Math.floor((t.time/Tracking.Sum)*100), time: msToTime(t.time) }));
  
        await services.Mail.sendMail({
          from: "noresponder@bybinary.co",
          fromName: "ByBinary",
          to: Tracking.email,
          subject: "ByBinary - Tu productividad de ayer"
        }, {
          nameView: "user-productivity",
          context: {
            fullName: Tracking.fullName,
            Tracking: Tracking.Tracking.slice(0, 10),
            Sum: msToTime(Tracking.Sum)
          },
          attachments: []
        });
      }
    }
  };
}
