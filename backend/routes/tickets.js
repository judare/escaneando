import Controller from '../controllers/tickets';
import Validator from '../validators/tickets';

const Route = function(app, db, services) {
  const router = app.Router();
  // Including Controller
  const controller = Controller(app, db, services);
  // Including Auth Validator
  const validate = Validator(app, db);

  router.post('/list', validate.list, controller.list);

  router.post('/create', validate.create, controller.create);

  router.post('/get', validate.get, controller.get);

  router.post('/close', validate.close, controller.close);

  return router;
};

export default Route;
