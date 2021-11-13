import {check} from 'express-validator/check';
import validOrAbort from '../middleware/validate';
// import checkAuthMiddleWare from '../middleware/check-auth';
import findCommerceMiddleWare from '../middleware/commerce-find';

export default function(app, db) {
  const findCommerce = findCommerceMiddleWare(app, db);

  return {
    registerVisitant: [
      check('data.cellphone')
        .isLength({ min: 10, max: 10 })
        .withMessage('validators.cellphone.minLength'),

      validOrAbort,
      findCommerce
    ]
  };
}

