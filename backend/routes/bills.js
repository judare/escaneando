import BillController from '../controllers/bills';
import Validator from '../validators/bills';

const Route = function(app, db, services) {
  const router = app.Router();
  // Including Controller
  const controller = BillController(app, db, services);
  // Including Auth Validator
  const validate = Validator(app, db);

  router.post('/list', validate.list, controller.list);

  return router;
};

export default Route;
