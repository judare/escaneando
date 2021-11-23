import Visitant from './visitant';
import Customers from './customers';
import Products from './products';
import Transactions from './transactions';
import Auth from './auth';
import Commerces from './commerces';
import Test from './test';
import Users from './users';

function Routes(app, db, services) {
  this.routes = {
    Auth,
    Customers,
    Visitant,
    Products,
    Transactions,
    Commerces,
    Test,
    Users
  };

  this.associate = function() {
    const names = Object.keys(this.routes);
    for (let i = 0; i < names.length; i++) {
      console.log(names[i]);
      this[names[i]] = this.routes[names[i]](app, db, services);
    }
  };


  this.associate();
}

export default Routes;
