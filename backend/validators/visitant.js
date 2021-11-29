import {check} from 'express-validator/check';
import validOrAbort from '../middleware/validate';
// import checkAuthMiddleWare from '../middleware/check-auth';
import findCommerceMiddleWare from '../middleware/commerce-find';
import findVisitantMiddleWare from '../middleware/visitant-find';
import findPaymentMethodMiddleware from '../middleware/find-payment-method';
import findTransactionMiddleware from '../middleware/find-transaction';

export default function(app, db) {
  const findCommerce = findCommerceMiddleWare(app, db);
  const findVisitant = findVisitantMiddleWare(app, db);
  const findPaymentMethod = findPaymentMethodMiddleware(app, db);
  const findTransaction = findTransactionMiddleware(app, db);

  return {
    registerVisitant: [
      check('data.cellphone')
        .isLength({ min: 10, max: 10 })
        .withMessage('validators.cellphone.minLength'),

      validOrAbort,
      findCommerce
    ],

    getCommerce: [
      findCommerce
    ],

    listProducts: [
      findCommerce
    ],

    createReview: [
      findCommerce,
      findVisitant,
    ],

    processPay: [
      check('data.amount')
        .isNumeric()
        .isLength({ min: 1, max: 100 })
        .withMessage('validators.amount.invalid'),

      validOrAbort,

      findCommerce,
      findVisitant,
      findPaymentMethod
    ],

    confirmDaviplata: [
      findVisitant,
      findCommerce,
      findTransaction
    ]
  };
}

