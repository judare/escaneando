import {check} from 'express-validator/check';
import validOrAbort from '../middleware/validate';
import checkAuthMiddleWare from '../middleware/check-auth';
import response from "../helpers/response.js";

export default function(app, db) {
  const checkAuth = checkAuthMiddleWare(app, db);

  const {
    User,
  } = db;

  return {

    login: [
      check('data.cellphone')
        .isLength({min: 10, max: 10})
        .withMessage('validators.cellphone.invalid'),

      check('data.password')
        .isLength({min: 3})
        .withMessage('validators.password.minLength'),

      validOrAbort,
      async (req, res, next) => {
        const { body } = req;
				const { cellphone, password } = body.data;
				
        let user = await User.findByCellphone(cellphone);
        if ( !user ) return response(res)( null, { status: 500, code: "auth.user.notFound" } );
        if (user.blocked)  return response(res)( null, { status: 500, code: "auth.user.blocked" } );

        let bool = await user.matchPassword(password);
        if (!bool)  return response(res)( null, { status: 500, code: "auth.incorrectPassword" } );

        req.user = user;	
				next();
			}
    ],

    validateAccount: [
      check('data.code')
        .isLength({min: 6, max: 6})
        .withMessage('validators.code.minLength'),
      validOrAbort,
    ],

    register: [
      check('data.name')
        .isLength({min: 2})
        .withMessage('validators.name.minLength'),

      check('data.cellphone')
        .isLength({min: 10, max: 10})
        .withMessage('validators.cellphone.invalid'),

      check('data.password')
        .isLength({min: 6, max: 191})
        .withMessage('validators.password.minLength'),
        // .custom((value) => value.match(/^(?=.*?[0-9])(?=.*?[A-Z]).{6,}$/))
        // .withMessage('validators.password.special'),

      check('data.email')
        .isEmail()
        .withMessage('validators.email.invalidEmail'),
      
      check('data.Business.name')
        .isLength({min: 3, max: 191})
        .withMessage('validators.business.name'),
      
      validOrAbort,

      async (req, res, next) => {
        const { body } = req;
        const { email, cellphone } = body.data;

        let userExists = await User.exists(email, cellphone);
        if ( userExists ) return response(res)( null, { status: 500, code: "auth.user.exists" } );
        
				next();
			}
    ],


    logout: [
      checkAuth,
    ],
    
    pin: [
      checkAuth,
    ],

    resendPin: [
      checkAuth,
      check('cellphone')
      .isLength({min: 10, max: 10})
      .withMessage('validators.cellphone.invalid'),
      validOrAbort,
    ],

    changePassword: [
      checkAuth,
      check('password')
        .isLength({min: 6, max: 191})
        .withMessage('validators.password.minLength')
        .custom((value) => value.match(/^(?=.*?[0-9])(?=.*?[A-Z]).{6,}$/))
        .withMessage('validators.password.special'),
      validOrAbort,
    ],

    restorePassword: [

      check('data.password')
        .isLength({min: 3, max: 191})
        .withMessage('validators.password.minLength')
        .custom((value) => value.match(/^(?=.*?[0-9])(?=.*?[A-Z]).{6,}$/))
        .withMessage('validators.password.special'),

      check('data.restoreToken')
        .isLength({min: 3, max: 191})
        .withMessage('validators.password.minLength'),

      check('data.userId')
        .isLength({min: 1, max: 191})
        .withMessage('validators.userId.required'),

      validOrAbort,

      async (req, res, next) => {
        const { body: { data: { restoreToken, userId } } } = req;

        let user = await User.findById(userId);

        if ( !user ) return response(res, req)( null, { status: 404, code: "auth.user.notExists" } );

        if (user.restoreToken != restoreToken) return response(res)( null, { status: 500, code: "auth.user.invalidRestoreToken" } );

        req.user = user;
        next();
      }

      
    ],


    generate2fa: [
      checkAuth,
    ],


    verify2fa: [
      checkAuth,
    ],

    forgotPassword: [
      check('data.email')
        .isEmail()
        .withMessage('validators.email.minLength'),
        validOrAbort,
      async (req, res, next) => {
        const { email } = req.body.data;

        let user = await User.findByEmail(email);
        if ( !user ) return response(res, req)( null);

				req.user = user;
				next();
      }
    ],

    sessions: [
      checkAuth,
    ],

    closeSession: [
      checkAuth,
    ],

    privileges: [
      checkAuth,
    ],

  };
}

