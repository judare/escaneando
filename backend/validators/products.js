import {check} from 'express-validator/check';
import validOrAbort from '../middleware/validate';
import checkAuthMiddleware from '../middleware/check-auth';
import findProductMiddleware from '../middleware/find-product';
import findCommerceMiddleware from '../middleware/find-commerce';
import findCategoryMiddleware from '../middleware/find-category';

export default function(app, db) {
  // const checkAuth = checkAuthMiddleWare(app, db);
  const checkAuth = checkAuthMiddleware(app, db);
  const productFind = findProductMiddleware(app, db);
  const commerceFind = findCommerceMiddleware(app, db);
  const categoryFind = findCategoryMiddleware(app, db);

  return {

    list: [
      checkAuth,
    ],

    create: [
      // check('data.description')
      //   .isLength({ min: 3, max: 1000 })
      //   .withMessage('validators.description.invalid'),

      check('data.name')
        .isLength({ min: 3, max: 255 })
        .withMessage('validators.description.invalid'),
      
      check('data.price')
        .isLength({ min: 1, max: 15 })
        .withMessage('validators.price.invalid'),

      check('data.categoryId')
        .isLength({ min: 1, max: 15 })
        .withMessage('validators.price.invalid'),
  
      validOrAbort,
      checkAuth,
      commerceFind,
      categoryFind
    ],

    update: [
      // check('data.description')
      //   .isLength({ min: 3, max: 1000 })
      //   .withMessage('validators.description.invalid'),

      check('data.name')
        .isLength({ min: 3, max: 255 })
        .withMessage('validators.description.invalid'),
      
      check('data.price')
        .isLength({ min: 1, max: 15 })
        .withMessage('validators.price.invalid'),

      check('data.categoryId')
        .isLength({ min: 1, max: 15 })
        .withMessage('validators.price.invalid'),
  
      validOrAbort,
      checkAuth,
      productFind,
      categoryFind
    ],

    delete: [
      checkAuth,
      productFind
    ],

    createCategory: [
      check('data.name')
        .isLength({ min: 1, max: 255 })
        .withMessage('validators.name.invalid'),
  
      validOrAbort,
      checkAuth,
      commerceFind
    ],

    deleteCategory: [
      checkAuth,
      categoryFind
    ],
  };
}
