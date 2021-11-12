import {check} from 'express-validator/check';
import validOrAbort from '../middleware/validate';
import checkAuthMiddleWare from '../middleware/check-auth';
import TicketFindMiddleWare from '../middleware/ticket-find';

export default function(app, db) {
  const checkAuth = checkAuthMiddleWare(app, db);
  const ticketFind = TicketFindMiddleWare(app, db);

  return {
    list: [
      checkAuth
    ],

    get: [
      checkAuth,
      ticketFind
    ],

    create: [
      checkAuth,
      
      check('data.subject')
        .isLength({min: 3})
        .withMessage('validators.tickets.subject.minLength'),

      // check('data.description')
      //   .isLength({min: 3})
      //   .withMessage('validators.tickets.description.minLength'),

      validOrAbort,
    ],


    close: [
      checkAuth,
      ticketFind
    ]
  };
}
