// import { check } from 'express-validator/check';
// import validOrAbort from '../middleware/validate';
// import checkAuthMiddleWare from '../middleware/check-auth';
import canMiddleWare from '../middleware/can';

export default function(app, db) {
  // const checkAuth = checkAuthMiddleWare(app, db);
  const can = canMiddleWare(app, db);

  return {

    productivity: [
      can("users.productivity"),
    ]
  };
}
