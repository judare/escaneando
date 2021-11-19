import Visitant from './visitant';
import Customers from './customers';
import Products from './products';

function Routes(app, db, services) {
  this.routes = {
    Customers,
    Visitant,
    Products
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
