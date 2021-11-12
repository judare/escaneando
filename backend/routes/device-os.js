import Controller from '../controllers/device-os';
import Validator from '../validators/device-os';

const Route = function(app, db, services) {
  const router = app.Router();
  // Including Controller
  const controller = Controller(app, db, services);
  // Including Auth Validator
  const validate = Validator(app, db);

  router.post('/updateDeviceStatus', validate.updateDeviceStatus, controller.updateDeviceStatus);

  router.post('/updateDeviceActivity', validate.updateDeviceActivity, controller.updateDeviceActivity);

  router.post('/updateLocation', validate.updateLocation, controller.updateLocation);

  router.post('/registerDevice', validate.registerDevice, controller.registerDevice);

  router.post('/processBackup', validate.processBackup, controller.processBackup);

  router.post('/getBackupStatus', validate.getBackupStatus, controller.getBackupStatus);

  router.post('/closeSession', validate.closeSession, controller.closeSession);
  
  return router;
};

export default Route;
