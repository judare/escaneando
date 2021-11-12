export default (sequelize, DataTypes) => {

	const TicketLog = sequelize.define('TicketLog', {
		id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
		userId: { type: DataTypes.INTEGER, allowNull: false },
		ticketId: { type: DataTypes.INTEGER, allowNull: false },
		description: { type: DataTypes.STRING, allowNull: false },
		file: { type: DataTypes.STRING, allowNull: false }
  }, 
  {
    paranoid: true,
    tableName: 'ticket_logs',
  });

  TicketLog.associate = function(models) {
    models.TicketLog.belongsTo(models.Ticket);
    models.TicketLog.belongsTo(models.User);
  }

  return TicketLog;
};