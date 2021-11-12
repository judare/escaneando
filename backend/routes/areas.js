import Controller from '../controllers/areas';
import Validator from '../validators/areas';

const Route = function(app, db, services) {
  const router = app.Router();
  // Including Controller
  const controller = Controller(app, db, services);
  // Including Auth Validator
  const validate = Validator(app, db);

  router.post('/list', validate.list, controller.list);

  router.post('/get', validate.get, controller.get);

  router.post('/update', validate.update, controller.update);

  router.post('/delete', validate.delete, controller.delete);

  router.post('/create', validate.create, controller.create);

  router.post('/associateUser', validate.associateUser, controller.associateUser);

  router.post('/removeUser', validate.removeUser, controller.removeUser);

  return router;
};

export default Route;
