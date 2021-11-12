import response from "../helpers/response.js";

export default function(app, db) {
  const {
    Ticket,
    User,
    TicketStatus
  } = db;

  return async function(req, res, next) {
    try {
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
          // companyId: req.user.companyId,
          id: req.body.data.ticketId
        }
      };
      let ticket = await Ticket.findOne(queryBuilder);
      if (!ticket) {
        return response(res, req)( null, { status: 404, code: "ticket.notFound" } );
      }

      req.ticket = ticket;
      // Invoke next middleware
      next();
    } catch (err) {
      return response(res, req)( null, { err, status: 500, code: "server.error" } );
    }
  };
}
