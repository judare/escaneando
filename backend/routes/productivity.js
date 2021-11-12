import Controller from '../controllers/productivity';
import Validator from '../validators/productivity';

const Route = function(app, db, services) {
  const router = app.Router();
  // Including Controller
  const controller = Controller(app, db, services);
  // Including Auth Validator
  const validate = Validator(app, db);

  router.post('/get', validate.productivity, controller.productivity);

  return router;
};

export default Route;
