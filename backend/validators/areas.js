import {check} from 'express-validator/check';
import validOrAbort from '../middleware/validate';
import checkAuthMiddleWare from '../middleware/check-auth';
import findAreaMiddleWare from '../middleware/area-find';
import findUserMiddleWare from '../middleware/user-find';
import response from "../helpers/response.js";

export default function(app, db) {
  const checkAuth = checkAuthMiddleWare(app, db);
  const findArea = findAreaMiddleWare(app, db);
  const findUser = findUserMiddleWare(app, db);

  return {
    list: [
      checkAuth
    ],

    get: [
      checkAuth,
      findArea
    ],

    create: [
      checkAuth,

      check('data.name')
        .isLength({min: 3})
        .withMessage('validators.areaName.minLength'),
      validOrAbort
    ],

    delete: [
      checkAuth,
      findArea,
      async (req, res, next) => {
        let { area } = req;
        let users = await area.getUsers();
        if (users.length > 0) {
          return response(res, req)( null, { status: 400, code: "validators.areaUsers.invalid" } );
        }
        next();
      }
    ],

    update: [
      checkAuth,
      findArea,
      check('data.name')
        .isLength({min: 3})
        .withMessage('validators.areaName.minLength'),
      validOrAbort
    ],


    associateUser: [
      checkAuth,
      findArea,
      findUser,
    ],

    removeUser: [
      checkAuth,
      findArea,
      findUser,
    ]
  };
}

