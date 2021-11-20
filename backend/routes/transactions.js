import Controller from '../controllers/transactions';
import Validator from '../validators/transactions';
import isect from '../helpers/intersect-controller';

const Route = function(app, db, services) {
  const router = app.Router();
  // Including Controller
  const controller = Controller(app, db, services);
  // Including Auth Validator
  const validate = Validator(app, db);

  router.post('/list', validate.list, isect(controller.list));

  return router;
};

export default Route;
