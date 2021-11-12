import Controller from '../controllers/devices';
import Validator from '../validators/devices';

const Route = function(app, db, services) {
  const router = app.Router();
  // Including Controller
  const controller = Controller(app, db, services);
  // Including Auth Validator
  const validate = Validator(app, db);

  router.post('/list', validate.list, controller.list);

  router.post('/get', validate.get, controller.get);

  router.post('/create/prepare', validate.createPrepare, controller.createPrepare);

  router.post('/create', validate.create, controller.create);

  router.post('/update', validate.update, controller.update);

  router.post('/history', validate.history, controller.history);

  router.post('/history/add', validate.historyAdd, controller.historyAdd);

  router.post('/associate', validate.associate, controller.associate);

  router.post('/disassociate', validate.disassociate, controller.disassociate);

  router.post('/delete', validate.delete, controller.delete);

  router.post('/monitor', validate.monitor, controller.monitor);

  return router;
};

export default Route;
