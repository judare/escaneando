import Controller from '../controllers/customers';
import Validator from '../validators/customers';
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
