import {check} from 'express-validator/check';
import validOrAbort from '../middleware/validate';
// import checkAuthMiddleWare from '../middleware/check-auth';
import findCommerceMiddleWare from '../middleware/commerce-find';
import findVisitantMiddleWare from '../middleware/visitant-find';

export default function(app, db) {
  const findCommerce = findCommerceMiddleWare(app, db);
  const findVisitant = findVisitantMiddleWare(app, db);
  
  return {
    registerVisitant: [
      check('data.cellphone')
        .isLength({ min: 10, max: 10 })
        .withMessage('validators.cellphone.minLength'),

      validOrAbort,
      findCommerce
    ],

    listProducts: [
      findCommerce
    ],

    createReview: [
      check('data.review')
        .isLength({ min: 3 })
        .withMessage('validators.review.minLength'),

      validOrAbort,
      findCommerce,
      findVisitant,
    ],
  };
}

