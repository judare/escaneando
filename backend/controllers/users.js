import response from "../helpers/response.js";
import moment from "moment";

export default function(app, db, services) {
  const {
    User,
    UserInvite,
    Rol
  } = db;

  const Controller = {
    list: async function( req, res, next ) {
      try {
        let { filters } = req.body.data;

        let queryBuilder = {
          include: [{
            model: Rol,
            required: true
          }],
          where: {
            companyId: req.user.companyId
          }
        };

        if (filters && filters.search) {
          queryBuilder.where.name = { [db.Op.like]: `%${filters.search}%` }
        }

        let list = await User.findAll(queryBuilder);
        list = list.map(user => ({
          id: user.id,
          name: user.name,
          image: user.image,
          position: user.position,
          Rol: {
            id: user.Rol.id,
            name: user.Rol.name
          },
        }))

        return response(res, req, next)({ Users: list });
      } catch( err ) {
        return response(res, req, next)( null, { err, status: 500, code: "server.error" } );
      }
    },

    get: async function( req, res, next ) {
      try {
        let { userCompany } = req;
        let devices = await userCompany.getDevices();
        devices = devices.map(device => ({
          id: device.id,
          name: device.name
        }));

        let userData = {
          "id": userCompany.id,
          "name": userCompany.name,
          "position": userCompany.position,
          "image": userCompany.name,
          "cellphone": userCompany.cellphone,
          "email": userCompany.email,
          "lastActivity": userCompany.lastActivity
        };

        return response(res, req, next)({
          User: userData,
          Devices: devices
        });
      } catch( err ) {
        return response(res, req, next)( null, { err, status: 500, code: "server.error" } );
      }
    },

    delete: async function( req, res, next ) {
      try {
        let { userCompany } = req;

        await userCompany.destroy();

        return response(res, req, next)(null);
      } catch( err ) {
        return response(res, req, next)( null, { err, status: 500, code: "server.error" } );
      }
    },

    invite: async function( req, res, next ) {
      try {
        let { cellphone, email } = req.body.data;

        let invite = await UserInvite.create({
          userId: req.user.id,
          companyId: req.user.companyId,
          email,
          expiresAt: moment().add(15, "days"),
        });

        await services.Mail.sendMail({
          from: "noresponder@bybinary.co",
          fromName: "ByBinary",
          to: email,
          subject: "Invitación a ByBinary"
        }, {
          nameView: "invite-user",
          context: {
            fullName: req.user.name,
            inviteCode: invite.code,
            inviteId: invite.id
          },
          attachments: []
        });

        let text = `${req.user.name} te acaba de enviar una invitacion a ByBinary ittool.bybinary.co/register/${invite.id}/${invite.code}`;
        await services.Sms.sendSms("57" + cellphone, text);
        
        return response(res, req, next)( null );
      } catch( err ) {
        return response(res, req, next)( null, { err, status: 500, code: "server.error" } );
      }
    },
  }

  return Controller;
}