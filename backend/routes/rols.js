import Controller from '../controllers/rols';
import Validator from '../validators/rols';

const Route = function(app, db, services) {
  const router = app.Router();
  // Including Controller
  const controller = Controller(app, db, services);
  // Including Auth Validator
  const validate = Validator(app, db);

  router.post('/list', validate.list, controller.list);

  router.post('/privileges', validate.privileges, controller.privileges);

  router.post('/update', validate.update, controller.update);

  router.post('/create', validate.create, controller.create);

  router.post('/user-update', validate.userUpdate, controller.userUpdate);

  

  return router;
};

export default Route;
