import response from "../helpers/response.js";

export default function(app, db) {
  const {
    Area
  } = db;

  const Controller = {
    list: async function( req, res, next ) {
      try {
        let queryBuilder = {
          where: {
            companyId: req.user.companyId
          }
        }
        let list = await Area.findAll(queryBuilder);
        list = list.map((area) => ({
          id: area.id,
          name: area.name,
        }));

        return response(res, req, next)({ Areas: list });
      } catch( err ) {
        return response(res, req, next)( null, { err, status: 400, code: "server.error" } );
      }
    },

    get: async function( req, res, next ) {
      try {
        let { area } = req;
        let users = await area.getUsers();

        let data = {
          id: area.id,
          name: area.name,
          Users: users.map(u => ({
            id: u.id,
            name: u.name,
            image: u.image,
          }))
        }
        return response(res, req, next)({ Area: data });
      } catch( err ) {
        return response(res, req, next)( null, { err, status: 400, code: "server.error" } );
      }
    },

    update: async function( req, res, next ) {
      try {
        let { area } = req;

        await area.update({
          name: req.body.data.name
        });

        return response(res, req, next)(null);
      } catch( err ) {
        return response(res, req, next)( null, { err, status: 400, code: "server.error" } );
      }
    },

    create: async function( req, res, next ) {
      try {
      
        let area = await Area.create({
          name: req.body.data.name,          
          companyId: req.user.companyId,          
        });

        return response(res, req, next)({ Area: { id: area.id } });
      } catch( err ) {
        return response(res, req, next)( null, { err, status: 400, code: "server.error" } );
      }
    },

    delete: async function( req, res, next ) {
      try {
        let { area } = req;
        
        await area.destroy();
        return response(res, req, next)(null);
      } catch( err ) {
        return response(res, req)( null, { err, status: 400, code: "server.error" } );
      }
    },

    associateUser: async function( req, res, next ) {
      try {
        let { area, userCompany } = req;

        await userCompany.update({ areaId: area.id });
        

        return response(res, req, next)(null);
      } catch( err ) {
        return response(res, req, next)( null, { err, status: 400, code: "server.error" } );
      }
    },

    removeUser: async function( req, res, next ) {
      try {
        let { area, userCompany } = req;
        
        await userCompany.update({ areaId: null });

        return response(res, req, next)(null);
      } catch( err ) {
        return response(res, req, next)( null, { err, status: 400, code: "server.error" } );
      }
    },


  }

  return Controller;
};
