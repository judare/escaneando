export default function(app, db) {

  const {
    Ticket
  } = db;

  return {
    tickets() {
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
          ticketId: { [db.Op.is]: null }
        }
      };
      let tickets = await Ticket.findAll(queryBuilder);
      let alerts = [];


    }
  };
}
