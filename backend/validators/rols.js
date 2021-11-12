// import { check } from 'express-validator/check';
// import validOrAbort from '../middleware/validate';
// import checkAuthMiddleWare from '../middleware/check-auth';
import canMiddleWare from '../middleware/can';
import RolFindMiddleWare from '../middleware/rol-find';
import checkUserMiddleWare from '../middleware/user-find';

export default function(app, db) {
  // const checkAuth = checkAuthMiddleWare(app, db);
  const can = canMiddleWare(app, db);
  const rolFind = RolFindMiddleWare(app, db);
  const checkUser = checkUserMiddleWare(app, db);

  return {

    list: [
      can("rols.list"),
    ],

    privileges: [
      can("rols.list"),
    ],

    create: [
      can("rols.create"),
    ],

    update: [
      can("rols.update"),
      rolFind
    ],

    userUpdate: [
      can("rols.userUpdate"),
      rolFind,
      checkUser
    ]
  };
}
