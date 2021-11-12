import response from "../helpers/response.js";

export default function(app, db, services) {
  const {
    Rol,
    RolPermission,
    RolPrivilege
  } = db;

  const Controller = {
    list: async function( req, res, next ) {
      try {
        let { filters } = req.body.data;

        let queryBuilder = {
          where: {
            companyId: req.user.companyId
          }
        };

        if (filters && filters.search) {
          queryBuilder.where.name = { [db.Op.like]: `%${filters.search}%` }
        }

        let list = await Rol.findAll(queryBuilder);
        list = list.map(rol => ({
          id: rol.id,
          name: rol.name
        }))

        return response(res, req, next)({ Rols: list });
      } catch( err ) {
        return response(res, req, next)( null, { err, status: 500, code: "server.error" } );
      }
    },

    privileges: async function( req, res, next ) {
      try {
        let rolPermissions = []
        let queryBuilder = {
          where: {
            id: req.user.rolId,
            companyId: req.user.companyId
          }
        };
        let rol = await Rol.findOne(queryBuilder);
        queryBuilder = {
          include: [{
            model: RolPrivilege,
            required: true
          }]
        }
        let permissions = await rol.getRolPermissions(queryBuilder);

        if (req.body.data.rolId) {
          queryBuilder = {
            where: {
              id: req.body.data.rolId,
              companyId: req.user.companyId
            }
          };
          rol = await Rol.findOne(queryBuilder);
          queryBuilder = {
            include: [{
              model: RolPrivilege,
              required: true
            }]
          }
          rolPermissions = await rol.getRolPermissions(queryBuilder);
        }

        let list = permissions.map(p => ({
          id: p.rolPrivilegeId,
          description: p.RolPrivilege.description,
          checked: !!rolPermissions.find(i => p.rolPrivilegeId == i.rolPrivilegeId)
        }));

        return response(res, req, next)({
          Privileges: list
        });
      } catch( err ) {
        return response(res, req, next)( null, { err, status: 500, code: "server.error" } );
      }
    },

    update: async function( req, res, next ) {
      try {

        // TODO
        
        return response(res, req, next)(null);
      } catch( err ) {
        return response(res, req, next)( null, { err, status: 500, code: "server.error" } );
      }
    },

    create: async function( req, res, next ) {
      try {

        let { user } = req;
        let { name, Privileges } = req.body.data;

        let rol = await Rol.create({
          companyId: user.companyId,
          name
        });

        let toCreate = Privileges.map(p => ({
          rolPrivilegeId: p.id,
          rolId: rol.id,
        }))

        await RolPermission.bulkCreate(toCreate);

        return response(res, req, next)( null );
      } catch( err ) {
        return response(res, req, next)( null, { err, status: 500, code: "server.error" } );
      }
    },

    userUpdate: async function( req, res, next ) {
      try {
        let { rol, userCompany } = req;

        await userCompany.update({ rolId: rol.id });
        
        return response(res, req, next)(null);
      } catch( err ) {
        return response(res, req, next)( null, { err, status: 500, code: "server.error" } );
      }
    },
    
  }

  return Controller;
}