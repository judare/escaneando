import Controller from '../controllers/learning';
import Validator from '../validators/learning';

const Route = function(app, db, services) {
  const router = app.Router();
  // Including Controller
  const controller = Controller(app, db, services);
  // Including Auth Validator
  const validate = Validator(app, db);

  router.post('/list', validate.list, controller.list);

  router.post('/get', validate.get, controller.get)
  ;
  router.post('/getResource', validate.getResource, controller.getResource);

  router.post('/create', validate.create, controller.create);

  router.post('/createResource', validate.createResource, controller.createResource);

  router.post('/stats', validate.stats, controller.stats);

  
  return router;
};

export default Route;
