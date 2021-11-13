import Controller from '../controllers/visitant';
import Validator from '../validators/visitant';
import isect from '../helpers/intersect-controller';

const Route = function(app, db, services) {
  const router = app.Router();
  // Including Controller
  const controller = Controller(app, db, services);
  // Including Auth Validator
  const validate = Validator(app, db);

  router.post('/registerVisitant', validate.registerVisitant, isect(controller.registerVisitant));

  return router;
};

export default Route;
