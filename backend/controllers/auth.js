
import response from "../helpers/response.js";
import moment from "moment";

export default function(app, db, services) {
  const {
    User,
    Session,
    Business,
    Commerce
  } = db;

  const Controller = {
    login: async function( req, res, next ) {
      try {
        const { user } = req;
        const ipAddress = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

        let session = await Session.createSession(user, ipAddress, "");

        let userData = {
          id: user.id,
          token: session.token,
          Rol: {
            permissions: await user.permissions()
          }
        }
        return response(res, req, next)({ User: userData });
      } catch( err ) {
        return response(res, req, next)( null, { err, status: 500, code: "server.error" } );
      }
    },

    register: async function( req, res, next ) {
      try {
        let { data } = req.body;
        let { name, cellphone, email, password, username } = data;
        const ipAddress = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

        let business = await Business.create({
          name: data.Business.name,
          cellphone,
          email,
          balance: 0,
        });

        let commerce = await Commerce.create({
          name: "Sede principal",
          cellphone,
          businessId: business.id,
          email,
          slug: Date.now() + encodeURIComponent(data.Business.name),
          logo: "/icons/backoffice/commerce-default.png",
          enabled: 1
        });

        let user = await User.create({
          name,
          cellphone,
          email,
          username,
          password,
          commerceId: commerce.id,
          businessId: business.id,
          owner: 1,
          rolId: 1,
        });

        await business.update({ userId: user.id });
        await commerce.update({ userId: user.id });

        await services.Mail.sendMail({
          from: "hola@geoda.com.co",
          fromName: "Geoda",
          to: user.email,
          subject: `Hola! Bienvenido al crecimiento de tu negocio - Geoda.com.co`
        }, {
          nameView: "user-welcome",
          context: {
            user
          },
          attachments: []
        });

        let session = await Session.createSession(user, ipAddress, "");

        let userData = {
          id: user.id,
          token: session.token,
          Rol: {
            permissions: await user.permissions()
          }
        }

        return response(res, req, next)({ User: userData });
      } catch( err ) {
        return response(res, req, next)( null, { err, status: 500, code: "server.error" } );
      }
    },
    
    validateAccount: async function( req, res, next ) {
      try {
        return response(res, req, next)(null);
      } catch( err ) {
        return response(res, req, next)( null, { err, status: 500, code: "server.error" } );
      }
    },

    logout: async function( req, res, next ) {
      try {
        const { session } = req;
        await session.update({ active: 0 })
        return response(res, req, next)(null);
      } catch( err ) {
        return response(res, req, next)( null, { err, status: 500, code: "server.error" } );
      }
    },

    changePassword: async function ( req, res ) {
      try {
        const { body, user } = req;
        const { password, newPassword, verifyPassword } = body;
        if ( newPassword != verifyPassword ) return res.status(400).json({ message: "Las contraseñas no coinciden", code: 107 });
        let bool = await user.matchPassword(password);
        if ( !bool ) return res.status(400).json({ message: "Contraseña actual incorrecta", code: 108 });

        await user.setPassword(newPassword);

        return response(res, req, next)(null);
      } catch(err) { 
        return response(res, req, next)( null, { err, status: 500, code: "server.error" } );
      }
    },
    
    forgotPassword: async function ( req, res ) {
      try {
        const { user } = req;

        await user.createRestoreToken();


        await services.Mail.sendMail({
          from: "noresponder@geoda.com.co",
          fromName: "noresponder",
          to: user.email,
          subject: `[Geoda] Recuperación de contraseña`
        }, {
          nameView: "forgot-password",
          context: {
            user
          },
          attachments: []
        });


        return response(res, req)(null);
      } catch(err) {
        return response(res, req)( null, { err, status: 500, code: "server.error" } );
      }
    },

    restorePassword: async function ( req, res, next ) {
      try {
        const { body: { data: { password } }, user } = req;

        await user.update({ password })

        await user.cleanRestoreToken();

        return response(res, req, next)(null);
      } catch(err) {
        return response(res, req, next)( null, { err, status: 500, code: "server.error" } );
      }
    },


    /**
     *List active sessions
     *@param {object} req - Request
     *@param {object} res - Response
     *@return {string} response with Model data, including bearer token
     */
    sessions: async function(req, res, next) {
      try {
        let list = [];
        let queryBuilder = {
          where: {
            active: 1,
            userId: req.user.id
          },
          order: [ ["lastActivity", "DESC"] ],
          limit: 20
        }
        let data = await Session.findAll(queryBuilder);
        data.map(item => {
          list.push({
            id: item.id,
            agent: item.name,
            ip: item.ipAddress,
            lastActivity: moment(item.lastActivity).locale("es").fromNow(),
          });
        })
        
        return response(res, req, next)({ Sessions: list });
      } catch(err) /* istanbul ignore next */ {
        return response(res, req, next)( null, { err, status: 500, code: "server.error" } );
      }
    },


       /**
     *Close a session
     *@param {object} req - Request
     *@param {object} res - Response
     *@return {string} response with Model data, including bearer token
     */
    closeSession: async function(req, res, next) {
      try {
        let queryBuilder = {
          where: {
            id: req.body.data.sessionId,
            userId: req.user.id,
            active: 1
          }
        }
        let session = await Session.findOne(queryBuilder);
        if (session) {
          await session.update({ active: 0 });
        }
        return response(res, req, next)(null);
      } catch(err) /* istanbul ignore next */ {
        return response(res, req, next)( null, { err, status: 500, code: "server.error" } );
      }
    },


  };
  return Controller;
}