import Controller from '../controllers/alerts';
import Validator from '../validators/alerts';

const Route = function(app, db, services) {
  const router = app.Router();
  // Including Controller
  const controller = Controller(app, db, services);
  // Including Auth Validator
  const validate = Validator(app, db);

  router.post('/list', validate.list, controller.list);

  router.post('/update', validate.update, controller.update);

  return router;
};

export default Route;
