
import checkAuthMiddleware from '../middleware/check-auth';
import findCommerceMiddleware from '../middleware/find-commerce';
import {check} from 'express-validator/check';
import validOrAbort from '../middleware/validate';

export default function(app, db) {
  // const checkAuth = checkAuthMiddleWare(app, db);
  const checkAuth = checkAuthMiddleware(app, db);
  const commerceFind = findCommerceMiddleware(app, db);

  return {

    list: [
      checkAuth,
    ],

    create: [
      check('data.name')
        .isLength({ min: 3, max: 255 })
        .withMessage('validators.name.invalid'),

      check('data.cellphone')
        .isLength({ min: 3, max: 255 })
        .withMessage('validators.cellphone.invalid'),
  
      validOrAbort,
      checkAuth
    ],

    update: [
      check('data.name')
        .isLength({ min: 3, max: 255 })
        .withMessage('validators.name.invalid'),
      
      check('data.cellphone')
        .isLength({min: 10, max: 10})
        .withMessage('validators.cellphone.invalid'),
  
      validOrAbort,
      checkAuth,
      commerceFind
    ],

    getBusiness: [
      checkAuth,
      async (req, res, next) => {
        let business = await req.user.getBusiness();
        req.business = business;
        next();
      }
    ],

    updateBusiness: [
      check('data.name')
        .isLength({ min: 3, max: 255 })
        .withMessage('validators.name.invalid'),
      validOrAbort,
      
      checkAuth,
      async (req, res, next) => {
        let business = await req.user.getBusiness();
        req.business = business;
        next();
      }
    ],

  };
}
