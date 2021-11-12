export default (sequelize, DataTypes) => {

	const Ticket = sequelize.define('Ticket', {
		id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
		userId: { type: DataTypes.INTEGER, allowNull: false },
		assignedId: { type: DataTypes.INTEGER, allowNull: true },
		ticketId: { type: DataTypes.INTEGER, allowNull: true },
		subject: { type: DataTypes.STRING, allowNull: false },
		description: { type: DataTypes.STRING, allowNull: true },
		satisfy: { type: DataTypes.INTEGER, allowNull: true },
		file: { type: DataTypes.STRING, allowNull: true },
		expiresAt: { type: DataTypes.DATE, allowNull: false },
		ticketStatusId: { type: DataTypes.INTEGER, allowNull: false }
  },
  {
    paranoid: true,
    tableName: 'tickets',
  });

  Ticket.DEFAULT_STATUS = 100;
  Ticket.TICKET_CLOSE = 900;

  Ticket.associate = function(models) {
    models.Ticket.belongsTo(models.User, { foreignKey: "assignedId", as: "assigned" });
    models.Ticket.belongsTo(models.User, { foreignKey: "userId", as: "user" });
    models.Ticket.belongsTo(models.TicketStatus);
  }

  return Ticket;
};