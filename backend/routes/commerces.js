import Controller from '../controllers/commerces';
import Validator from '../validators/commerces';
import isect from '../helpers/intersect-controller';

const Route = function(app, db, services) {
  const router = app.Router();
  // Including Controller
  const controller = Controller(app, db, services);
  // Including Auth Validator
  const validate = Validator(app, db);

  router.post('/list', validate.list, isect(controller.list));

  router.post('/create', validate.create, isect(controller.create));

  router.post('/update', validate.update, isect(controller.update));
  
  router.post('/updateBusiness', validate.updateBusiness, isect(controller.updateBusiness));

  router.post('/getBusiness', validate.getBusiness, isect(controller.getBusiness));

  
  return router;
};

export default Route;
