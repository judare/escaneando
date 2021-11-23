import bcrypt from "bcrypt";
import moment from "moment";
import { Op } from "sequelize";

export default (sequelize, DataTypes) => {

	const User = sequelize.define('User', {
		id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
		name: { type: DataTypes.STRING, allowNull: false },
		image: { type: DataTypes.STRING, allowNull: false, defaultValue: "default.png"  },
    cellphone: { type: DataTypes.STRING, allowNull: true },
    commerceId: { type: DataTypes.INTEGER, allowNull: true },
    businessId: { type: DataTypes.INTEGER, allowNull: true },
    rolId: { type: DataTypes.INTEGER, allowNull: true },
    owner: { type: DataTypes.TINYINT, allowNull: true },
    email: { type: DataTypes.STRING, allowNull: false },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      set(password) {
        let pass = bcrypt.hashSync(password, 10);
        this.setDataValue('password', pass);
      }
    },
    blocked: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
    restoreToken: { type: DataTypes.STRING, allowNull: true },
    restoreTokenExpiration: { type: DataTypes.STRING, allowNull: true },
  }, 
  {
    paranoid: true,
    tableName: 'users',
  });
  
  User.associate = function(models) {
    models.User.belongsTo(models.Business);
    models.User.belongsTo(models.Commerce);
    models.User.belongsTo(models.Rol);
  };
  /**
  *Check Permission
  *@return new token
  */
  User.prototype.can = async function(permission) {
    let db = sequelize.models;

    let queryBuilder = {
      attributes: ["id"],
      include: [{
        attributes: ["key"],
        model: db.RolPrivilege,
        required: true,
        where: { 
          key: permission 
        }
      }],
      where: {
        rolId: this.rolId
      }
    };
    let count = await db.RolPermission.count(queryBuilder);
    return count > 0; 
  }


   /**
  *Check Permission
  *@return new token
  */
 User.prototype.permissions = async function() {
  let db = sequelize.models;

  let queryBuilder = {
    attributes: ["id"],
    include: [{
      name: "key",
      model: db.RolPrivilege,
      required: true
    }],
    where: {
      rolId: this.rolId
    }
  };
  return (await db.RolPermission.findAll(queryBuilder)).map(permission => permission.RolPrivilege.key);
 }



  /**
  *Find user by her id
  *@return corresponfing user
  */
  User.findById = async function(id) {
    return await User.findByPk(id);
  }
  /**
  *Find user by her username
  *@return corresponfing user
  */
  User.findByEmail = async function(email) {
    let queryBuilder = {
      where: {
        email
      }
    };
    let user = await User.findOne(queryBuilder);
    return user;
  }

  

  User.findByCellphone = async function(cellphone) {
    let queryBuilder = {
      where: {
        cellphone
      }
    };
    let user = await User.findOne(queryBuilder);
    return user;
  }
  /**
  *Compare two passwords
  *@return if they correspond or not
  */
  User.prototype.matchPassword = async function(password) {
    return await bcrypt.compare(password, this.password);
  }
  /**
  *Create and set the two secure factor code and her expiration
  *@return twoFactorCode and twoFactorExpiration
  */
  User.prototype.createTwoFactor = async function() {
    let db = sequelize.models;
    let moreTime = await db.Parameter.findByKey('TWO_FACTOR_ACTIVE');
    let twoFactorCode = Math.floor(100000 + Math.random() * 999999);
    let twoFactorExpiration = moment().add(moreTime, 'minutes').format('YYYY-MM-DD HH:mm:ss');

    await this.update({
      twoFactorCode,
      twoFactorExpiration
    });
    return { twoFactorCode, twoFactorExpiration };
  }
  /**
  *Verify if the codes are the same
  *@return true or false
  */
  User.prototype.checkTwoFactor = async function(code) {
    return this.twoFactorCode == code;
  }
  /**
  *Verify if a expiration code is active or inactive
  *@return true or false
  */
  User.prototype.checkActiveTwoFactor = async function() {
    let db = sequelize.models;
    let moreTime = await db.Parameter.findByKey('TWO_FACTOR_ACTIVE');
    let difference = moment(this.twoFactorExpiration).diff(moment(), 'minutes');
    return difference > moreTime;

  }
  /**
  *Clean the colums twoFactorCode and twoFactorExpiration
  *@return true or false
  */
  User.prototype.cleanTwoFactor = async function() {
    await this.update({
      twoFactorCode: null,
      twoFactorExpiration: null
    });
  }
  /**
  *Create and set the two secure factor code and her expiration
  *@return RestoreToken and RestoreTokenExpiration
  */
  User.prototype.createRestoreToken = async function() {
    // let db = sequelize.models;
    // let moreTime = await db.Parameter.findByKey('RESTORE_TOKEN_ACTIVE');
    let restoreToken = Math.random().toString(36).substring();
    let restoreTokenExpiration = moment().add(10, 'minutes').format('YYYY-MM-DD HH:mm:ss');
    await this.update({
      restoreToken,
      restoreTokenExpiration
    });
    return { restoreToken, restoreTokenExpiration };
  }
  /**
  *Verify if the codes are the same
  *@return true or false
  */
  User.prototype.checkRestoreToken = async function(code) {
    return this.restoreToken == code;
  }
  /**
  *Verify if a expiration code is active or inactive
  *@return true or false
  */
  User.prototype.checkActiveRestoreToken = async function() {
    let db = sequelize.models;
    let moreTime = await db.Parameter.findByKey('RESTORE_TOKEN_ACTIVE');
    let difference = moment(this.restoreTokenExpiration).diff(moment(), 'minutes');
    return difference > moreTime; // La diferencia es mayor a la limite del parametro
  }
  /**
  *Clean the colums RestoreToken and RestoreTokenExpiration
  *@return true or false
  */
  User.prototype.cleanRestoreToken = async function() {
    await this.update({
      restoreToken: null,
      restoreTokenExpiration: null
    });
  }
  /**
  *Clean the colums RestoreToken and RestoreTokenExpiration
  *@return true or false
  */
  User.prototype.closeSessions = async function() {
    let queryBuilder = {
      where: {
        userId: this.id,
        active: 1,
      }
    };
    await Session.update({ 
      active: 0,
      closeMotive: 'user.changePassword'
    }, queryBuilder);
  }

  User.exists = async function(email, cellphone) {
    let queryBuilder = {
      where: {
        [Op.or]: {
          email,
          cellphone
        }
      }
    };
    return await User.findOne(queryBuilder);
  }

  return User;
};