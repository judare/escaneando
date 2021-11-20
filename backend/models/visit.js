import moment from "moment";

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

	const Visit = sequelize.define('Visit', {
		id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    token: { type: DataTypes.STRING, allowNull: true },
    commerceId: { type: DataTypes.INTEGER, allowNull: true },
    businessId: { type: DataTypes.INTEGER, allowNull: true },
    time: { type: DataTypes.TIME, allowNull: true },
    date: { type: DataTypes.DATE, allowNull: true },
    scans: { type: DataTypes.INTEGER, allowNull: true },
    personId: { type: DataTypes.INTEGER, allowNull: true },
    ipAddress: {
      type: DataTypes.INTEGER,
      allowNull: true,
      get () {
        return inet_ntoa(this.getDataValue('ipAddress'));
      },
      set (valueToBeSet) {
        this.setDataValue('ipAddress', inet_aton(valueToBeSet))
      }
    }
  }, 
  {
    paranoid: true,
    tableName: 'visits',
  });

  Visit.associate = function(models) {
    models.Visit.belongsTo(models.Commerce);
    models.Visit.belongsTo(models.People);
  };

  Visit.generateToken = async function() {
    return Date.now();
  }

  Visit.visit = async function(people, commerce) {
    let queryBuilder = {
      where: {
        commerceId: commerce.id,
        personId: people.id,
        date: moment().format("YYYY-MM-DD 00:00"),
      }
    }
    let visit = await Visit.findOne(queryBuilder);
    if (visit) {
      await visit.increment("scans", { by: 1 })
    } else {
      visit = await Visit.create({
        commerceId: commerce.id,
        businessId: commerce.businessId,
        personId: people.id,
        date: moment().format("YYYY-MM-DD 00:00"),
        scans: 1,
        token: await Visit.generateToken()
      });
    }

    return visit;
  }
  
  return Visit;
};