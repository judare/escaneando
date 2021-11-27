import Controller from '../controllers/products';
import Validator from '../validators/products';
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

  router.post('/delete', validate.delete, isect(controller.delete));

  router.post('/createCategory', validate.createCategory, isect(controller.createCategory));

  router.post('/deleteCategory', validate.deleteCategory, isect(controller.deleteCategory));

  router.post('/updateCategory', validate.updateCategory, isect(controller.updateCategory));

  router.post('/uploadImage', validate.uploadImage, isect(controller.uploadImage));
  
  return router;
};

export default Route;
