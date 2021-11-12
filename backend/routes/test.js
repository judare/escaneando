import EmailTemplates from 'swig-email-templates';
import { msToTime } from "../helpers/helpers";
import moment from "moment";

const Route = function(app, db, services) {
  const router = app.Router();
  const {
    Device,
    DeviceLog,
    DeviceLogStatus,
    DeviceActivity,
    Activity,
    User
  } = db;

  router.get('/x', async (req, res) => {

    
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
        date: moment().subtract(0, "days").format("YYYY-MM-DD 00:00"),
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

      
       const templates = new EmailTemplates({
        swig: {
          cache: false
        }
      });

      const templateDir = __dirname + `/../ws/templates`;
      templates.render(`${templateDir}/user-productivity.html`, {
        fullName: Tracking.fullName,
        Tracking: Tracking.Tracking.slice(0, 10),
        Sum: msToTime(Tracking.Sum)
      }, (err, html, text) => {
        res.send(html)
      });

    }
  



     

  })


  return router;
};

export default Route;
