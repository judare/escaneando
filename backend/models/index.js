import config from '../config/config.js';
import Sequelize from 'sequelize';
// Models
import _QueryExecution from './_query-execution';
import Session from './session';
import User from './user.js';
import Commerce from './commerce';
import People from './people';
import Visit from './visit';
import Review from './review';
import ProductCategory from './product-category';
import Product from './products';
import Country from './Country';

function Models() {

  this.models = {
    _QueryExecution,
    Commerce,
    Country,
    User,
    Session,
    People,
    Visit,
    Review,
    ProductCategory,
    Product
  };

  this.sequelize = null;
  this.Sequelize = Sequelize;
  this.Op = Sequelize.Op;

  this.associate = function() {
    var names = Object.keys(this.models);
    for (var i = 0; i < names.length; i++) {
      var modelData = this.models[names[i]];

      var model = modelData(this.sequelize, this.Sequelize.DataTypes);
      // var model = this.sequelize.import(names[i], modelData);
      this[model.name] = model;
    }

    for (var i = 0; i < names.length; i++) {
      var modelName = names[i];
      if (this[modelName].associate) {
        this[modelName].associate(this);
      }
    }
  }

  this.connect = function() {
    this.sequelize = new Sequelize(config.database, config.username, config.password, {
      ...config.sequelizeOpts,
      operatorsAliases: this.operatorsAliases,
      benchmark: true,
      logging: (str, time) => {
        if (time > 2000) {
          this.QueryExecution.create({
            sql: str,
            ms: time
          });
        }
      }
    })
  }

  this.connect();
  this.associate();
}

export default Models; 
