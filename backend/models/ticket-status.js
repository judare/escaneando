export default (sequelize, DataTypes) => {

	const TicketStatus = sequelize.define('TicketStatus', {
		id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: true },
    color: { type: DataTypes.STRING, allowNull: true },
  }, 
  {
    tableName: 'ticket_status',
  });

  TicketStatus.TICKET_CLOSE = 0;
  TicketStatus.TICKET_PENDING = 100;
  
  return TicketStatus;
};