import Controller from '../controllers/users';
import Validator from '../validators/users';
import isect from '../helpers/intersect-controller';

const Route = function(app, db, services) {
  const router = app.Router();
  // Including Controller
  const controller = Controller(app, db, services);
  // Including Auth Validator
  const validate = Validator(app, db);

  router.post('/tasks', validate.tasks, isect(controller.tasks));

  return router;
};

export default Route;
