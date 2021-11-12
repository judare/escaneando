import { check } from 'express-validator/check';
import validOrAbort from '../middleware/validate';
// import checkAuthMiddleWare from '../middleware/check-auth';
import checkUserMiddleWare from '../middleware/user-find';
import canMiddleWare from '../middleware/can';
import response from "../helpers/response.js";

export default function(app, db) {
  // const checkAuth = checkAuthMiddleWare(app, db);
  const checkUser = checkUserMiddleWare(app, db);
  const can = canMiddleWare(app, db);

  return {
    list: [
      can("users.list")
    ],

    get: [
      can("users.get"),
      checkUser
    ],

    delete: [
      can("users.delete"),
      checkUser,
      (req, res, next) => {
        if (req.userCompany.id == req.user.id) {
          return response(res, req)( null, { status: 404, code: "users.notDelete.sameUser" } );
        }
        next();
      }
    ],

    invite: [
      can("users.invite"),
      check('data.email')
        .isEmail()
        .withMessage('validators.email.minLength'),
      
      check('data.cellphone')
        .isLength({ min: 10, max: 10 })
        .withMessage('validators.cellphone.minLength'),

      validOrAbort,
    ]
  };
}
