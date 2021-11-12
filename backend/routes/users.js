import Controller from '../controllers/users';
import Validator from '../validators/users';

const Route = function(app, db, services) {
  const router = app.Router();
  // Including Controller
  const controller = Controller(app, db, services);
  // Including Auth Validator
  const validate = Validator(app, db);

  router.post('/list', validate.list, controller.list);

  router.post('/get', validate.get, controller.get);

  router.post('/delete', validate.delete, controller.delete);

  router.post('/invite', validate.invite, controller.invite);

  return router;
};

export default Route;
