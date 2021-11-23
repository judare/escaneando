import { check } from 'express-validator/check';
import validOrAbort from '../middleware/validate';
import checkAuthMiddleWare from '../middleware/check-auth';
// import checkUserMiddleWare from '../middleware/user-find';
// import canMiddleWare from '../middleware/can';
// import response from "../helpers/response.js";

export default function(app, db) {
  const checkAuth = checkAuthMiddleWare(app, db);
  // const checkUser = checkUserMiddleWare(app, db);
  // const can = canMiddleWare(app, db);

  return {
    tasks: [
      // can("users.list")
      checkAuth
    ],

  };
}
