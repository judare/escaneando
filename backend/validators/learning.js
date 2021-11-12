import { check } from 'express-validator/check';
import validOrAbort from '../middleware/validate';
import checkAuthMiddleWare from '../middleware/check-auth';
import response from "../helpers/response.js";
import TrainFindMiddleWare from '../middleware/train-find';
import multer from 'multer';

export default function(app, db) {
  const checkAuth = checkAuthMiddleWare(app, db);
  const trainFind = TrainFindMiddleWare(app, db);

  const storage = multer.memoryStorage({
    destination: (req, file, callback) => callback(null, ""),
  });

  const upload = multer({
    storage,
    limits:{
      fileSize: 3 * 1024 * 1024 // 3mb
    }
  });

  const {
    TrainResource,
    User
  } = db;

  return {
    list: [
      checkAuth
    ],

    create: [
      checkAuth,

      check('data.name')
        .isLength({min: 3, max: 255})
        .withMessage('validators.description.minLength'),

      check('data.description')
        .isLength({min: 3})
        .withMessage('validators.description.minLength'),

      validOrAbort,

      // validation Resources
      async (req, res, next) => {
        let resources = req.body.data.TrainResources;
        if (!resources) return next();

        let queryBuilder = {
          where: {
            id: { [db.Op.in]: resources.map(r => r.id) },
            trainId: { [db.Op.is]: null },
            userId: req.user.id
          }
        };
        let resourcesItems = await TrainResource.findAll(queryBuilder);
        if (resources.length != resourcesItems.length) {
          return response(res, req)( null, { status: 400, code: "validators.resources.invalid" } );
        }
        req.resources = resourcesItems;
        next();
      },

      // validation Assigned
      async (req, res, next) => {
        let assigned = req.body.data.Assigned;
        let users = [];
        let queryBuilder = {};

        if (assigned.everybody) {
          queryBuilder = {
            where: {
              companyId: req.user.companyId
            }
          }
          users = await User.findAll(queryBuilder);
        } else if(assigned.areas) {

        } else if (assigned.userIds) {
          queryBuilder = {
            where: {
              id: { [db.Op.in]: assigned.userIds },
              companyId: req.user.companyId
            }
          }
          users = await User.findAll(queryBuilder);
        }

        if (!users.length || users.length <= 0) {
          return response(res, req)( null, { status: 400, code: "validators.users.invalid" } );
        }
        req.users = users;
        next();
      },


    ],

    get: [
      checkAuth,
      trainFind
    ],

    getResource: [
      checkAuth,
      trainFind
    ],

    createResource: [
      checkAuth,
      upload.single('file'),


      check('name')
        .isLength({min: 3, max: 255})
        .withMessage('validators.name.invalid'),

      check('type')
        .custom(value => {
          return (["file", "link", "text"].includes(value));
        })
      .withMessage('validators.trainType.invalid'),
      
      // check('content')
      //   .isLength({min: 3, max: 255})
      //   .withMessage('validators.trainContent.invalid'),
        
      validOrAbort
    ],



    stats: [
      checkAuth,
      trainFind
    ],

  };
}
