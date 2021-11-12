import {check} from 'express-validator/check';
import validOrAbort from '../middleware/validate';
import checkAuthMiddleWare from '../middleware/check-auth';

export default function(app, db) {
  const checkAuth = checkAuthMiddleWare(app, db);

  return {
    list: [
      checkAuth
    ]
  };
}

