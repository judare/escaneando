import {check} from 'express-validator/check';
import validOrAbort from '../middleware/validate';
// import checkAuthMiddleWare from '../middleware/check-auth';
import canMiddleWare from '../middleware/can';
import checkDeviceMiddleWare from '../middleware/device-find';
import checkUserMiddleWare from '../middleware/user-find';
import response from "../helpers/response";

export default function(app, db) {
  // const checkAuth = checkAuthMiddleWare(app, db);
  const checkDevice = checkDeviceMiddleWare(app, db);
  const checkUser = checkUserMiddleWare(app, db);
  const can = canMiddleWare(app, db);

  return {
    list: [
      can("devices.list"),
    ],

    update: [
      can("devices.update"),
      checkDevice
    ],

    createPrepare: [
      can("devices.create")
    ],

    create: [
      can("devices.create"),
      check('data.description')
        .isLength({min: 3})
        .withMessage('validators.description.minLength'),
      
      check('data.name')
        .isLength({min: 3})
        .withMessage('validators.name.minLength'),

      validOrAbort,
    ],

    get: [
      can("devices.list"),
      checkDevice
    ],

    history: [
      can("devices.history"),
    ],

    historyAdd: [
      can("devices.historyAdd"),
      checkDevice,

      check('data.description')
        .isLength({min: 3})
        .withMessage('validators.description.minLength'),

      validOrAbort,
    ],


    associate: [
      can("devices.associate"),
      checkDevice,
      checkUser,
      (req, res, next) => {
        if (req.device.userId) {
          return response(res)( null, { status: 404, code: "device.userId.empty" } );
        }
        next();
      }
    ],

    disassociate: [
      can("devices.disassociate"),
      checkDevice,
      checkUser,
      (req, res, next) => {
        if (!req.device.userId) {
          return response(res)( null, { status: 404, code: "device.userId.required" } );
        }
        next();
      }
    ],

    delete: [
      can("devices.update"),
      checkDevice
    ],

    monitor: [
      can("devices.list"),
      checkDevice
    ],
  };
}

