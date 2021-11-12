import response from "../helpers/response.js";
import moment from "moment";

export default function(app, db) {
  const {
    Ticket,
    TicketStatus,
    User
  } = db;

  const Controller = {
    list: async function( req, res, next ) {
      try {
        let { filters } = req.body.data;
        let queryBuilder = {
          include: [
          {
            model: User,
            foreignKey: "userId",
            required: true,
            as: "user"
          },
          {
            model: User,
            as: "assigned"
          },
          {
            model: TicketStatus,
            required: true
          }
          ],
          where: {
            [db.Op.or]: [
              {userId: req.user.id},
              {assignedId: req.user.id},
            ],
            ticketId: { [db.Op.is]: null }
          }
        };
        if (filters.search) {
          queryBuilder.where.subject = { [db.Sequelize.Op.like]: `%${filters.search}%` }
        }

        let list = await Ticket.findAll(queryBuilder);

        list = list.map(ticket => ({
          "id": ticket.id,
          "subject": ticket.subject,
          "description": ticket.description,
          "createdAt": moment(ticket.createdAt).format("DD/MM/YY"),
          "expiresAt": moment(ticket.expiresAt).format("DD/MM/YY"),
          "Status": ticket.TicketStatus ? {
            "id": ticket.TicketStatus.id,
            "color": ticket.TicketStatus.color,
            "name": ticket.TicketStatus.name
          } : null,
          "User": ticket.User ? {
            "id": ticket.User.id,
            "name": ticket.User.name,
            "image": ticket.User.image
          } : null,
          "Assets": [],
          "Assigned": ticket.assigned ? {
            "id": ticket.assigned.id,
            "name": ticket.assigned.name,
            "image": ticket.assigned.image
          } : null
        }))

        return response(res, req, next)({ Tickets: list });
      } catch( err ) {
        return response(res, req, next)( null, { err, status: 400, code: "server.error" } );
      }
    },



    get: async function( req, res, next ) {
      try {
        let { ticket } = req;
 
        let queryBuilder = {
          include: [{
            model: User,
            foreignKey: "userId",
            required: true,
            as: "user"
          }],
          where: {
            ticketId: ticket.id
          }
        };
        let tickets = await Ticket.findAll(queryBuilder);

        let ticketData = {
          "id": ticket.id,
          "subject": ticket.subject,
          "description": ticket.description,
          "createdAt": moment(ticket.createdAt).format("DD/MM/YY"),
          "expiresAt": moment(ticket.expiresAt).format("DD/MM/YY"),
          "Status": ticket.TicketStatus ? {
            "color": ticket.TicketStatus.color,
            "name": ticket.TicketStatus.name
          } : null,
          "User": ticket.user ? {
            "id": ticket.user.id,
            "name": ticket.user.name,
            "image": ticket.user.image
          } : null,
          "Assigned": ticket.Assigned ? {
            "id": ticket.Assigned.id,
            "name": ticket.Assigned.name,
            "image": ticket.Assigned.image
          } : null,
          "Assets": [],
          "Tickets": tickets.map(t => ({
            id: t.id,
            subject: t.subject,
            User: {
              id: t.user.id,
              name: t.user.name,
            }
          }))
        }

        return response(res, req, next)({ Ticket: ticketData });
      } catch( err ) {
        return response(res, req)( null, { err, status: 400, code: "server.error" } );
      }
    },


    create: async function( req, res, next ) {
      try {
        let { data } = req.body;

        await Ticket.create({
          subject: data.subject,
          ticketId: data.ticketId,
          userId: req.user.id,
          ticketStatusId: Ticket.DEFAULT_STATUS,
          description: data.description,
          expiresAt: moment().add(3, "months").format("YYYY-MM-DD HH:mm:ss")
        });

        return response(res, req, next)(null);
      } catch( err ) {
        return response(res, req, next)( null, { err, status: 400, code: "server.error" } );
      }
    },

    close: async function( req, res, next ) {
      try {
        let { ticket } = req;

        await ticket.update({
          ticketStatusId: Ticket.TICKET_CLOSE,
        });

        return response(res, req, next)(null);
      } catch( err ) {
        return response(res, req, next)( null, { err, status: 400, code: "server.error" } );
      }
    },
  }

  return Controller;
};
