import AuthController from '../controllers/auth';
import Validator from '../validators/auth';

const Route = function(app, db, services) {
  const router = app.Router();
  // Including Controller
  const controller = AuthController(app, db, services);
  // Including Auth Validator
  const validate = Validator(app, db);

  // router.get('/rols', validate.rols, controller.rols);

  // router.post('/check', validate.check, controller.checkByUsername);

  router.post('/login', validate.login, controller.login);
  
  router.post('/register', validate.register, controller.register);

  // router.post('/register', validate.register, controller.register);
  
  // router.post('/pin/resend', validate.resendPin, controller.resendPin);

  // router.post('/pin', validate.pin, controller.pin);

  router.post('/logout', validate.logout, controller.logout);

  router.post('/validate', validate.validateAccount, controller.validateAccount);

  router.post('/sessions', validate.sessions, controller.sessions);
  
  router.post('/closeSession', validate.closeSession, controller.closeSession);

  // router.post('/changePassword', validate.changePassword, controller.changePassword);

  router.post('/forgotPassword', validate.forgotPassword, controller.forgotPassword);

  router.post('/restorePassword', validate.restorePassword, controller.restorePassword);

  // router.get('/2fa/generate', validate.generate2fa, controller.generate2fa);

  // router.post('/2fa/verify', validate.verify2fa, controller.verify2fa);

  // router.get('/sessions', validate.sessions, controller.sessions);

  // router.post('/closeSession', validate.closeSession, controller.closeSession);

  // router.get('/privileges', validate.privileges, controller.privileges);

  // router.post('/documents', validate.documents, controller.documents);

  return router;
};

export default Route;
