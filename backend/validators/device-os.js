// import {check} from 'express-validator/check';
// import validOrAbort from '../middleware/validate';
import checkDeviceOsMiddleWare from '../middleware/check-device-os';
import checkAgentPasswordMiddleware from '../middleware/check-agent-password';

import response from "../helpers/response.js";
import multer from 'multer';


const storage = multer.memoryStorage({
  destination(req, file, callback) {
    callback(null, '');
  },
});
// const compression = require('compression');
const upload = multer({
  storage,
  limits:{
    fileSize: 1 * 1024 * 1024 * 1024 // 1gb
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype == "application/zip") {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error('Only .zip format allowed!'));
    }
  }
});

export default function(app, db) {
  const {
    Company
  } = db;
  const checkDeviceOs = checkDeviceOsMiddleWare(app, db);
  const checkAgentPassword = checkAgentPasswordMiddleware(app, db);
  
  return {
    registerDevice: [
      async (req, res, next) => {
        let { data } = req.body;
        let queryBuilder = {
          where: {
            code: data.code
          }
        }
        let company = await Company.findOne(queryBuilder);
        if (!company) {
          return response(res, req)( null, { status: 400, code: "company.notFound" } );
        }
        req.company = company;
        next();
      }
    ],

    updateDeviceStatus: [
      checkDeviceOs
    ],


    updateDeviceActivity: [
      checkDeviceOs
    ],

    updateLocation: [
      checkDeviceOs
    ],

    getBackupStatus: [
      checkDeviceOs
    ],

    processBackup: [
      checkDeviceOs,
      upload.single('backup')
    ],

    closeSession: [
      checkDeviceOs,
      checkAgentPassword
    ]
    
  };
}

