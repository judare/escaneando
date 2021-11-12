import config from '../config/config.js';

function inet_ntoa(num){
  var nbuffer = new ArrayBuffer(4);
  var ndv = new DataView(nbuffer);
  ndv.setUint32(0, num);

  var a = new Array();
  for(var i = 0; i < 4; i++){
      a[i] = ndv.getUint8(i);
  }
  return a.join('.');
}

function inet_aton(ip){
  // split into octets
  var a = ip.split('.');
  var buffer = new ArrayBuffer(4);
  var dv = new DataView(buffer);
  for(var i = 0; i < 4; i++){
      dv.setUint8(i, a[i]);
  }
  return(dv.getUint32(0));
}

export default (sequelize, DataTypes) => {

	const Session = sequelize.define('Session', {
		id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
		userId: { type: DataTypes.INTEGER, allowNull: false },
		token: { type: DataTypes.STRING, allowNull: false },
		active: { type: DataTypes.TINYINT, allowNull: false },
    ipAddress: {
      type: DataTypes.INTEGER,
      allowNull: true,
      get () {
        return inet_ntoa(this.getDataValue('ipAddress'));
      },
      set (valueToBeSet) {
        this.setDataValue('ipAddress', inet_aton(valueToBeSet))
      }},
		name: { type: DataTypes.STRING, allowNull: true },
		lastActivity: { type: DataTypes.DATE, allowNull: true },
  }, 
  {
    paranoid: true,
    tableName: 'sessions',
  });

  Session.associate = function(models) {
    models.Session.belongsTo(models.User);
  }


  Session.findByToken = async function(token) {
    let queryBuilder = {
      where: {
        token: token
      }
    };
    let session = await sequelize.models.Session.findOne(queryBuilder);
    let until = Date.now() - (config.minExpiredSession * 60 * 1000);
    if (session && session.withExpiration && session.lastActivity < until) {
      await session.update({ active: 0 });
      session = null;
    }
    return session;
  }

  /**
    *Create new session in db
    *@return new session
    */
  Session.createSession = async function(user, ip, agent = "") {
    let data = {
      name: agent,
      ip: ip,
      userId: user.id,
      lastActivity: Date.now(),
      token: "" + Date.now(),
      active: 1,
    };

    let session = await Session.create(data);
    return session;
  }
  /**
  *Clean the colums RestoreToken and RestoreTokenExpiration
  *@return true or false
  */

  return Session;
};