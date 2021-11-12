import response from "../helpers/response.js";

export default function(app, db) {
  const {
    Rol
  } = db;

  return async function(req, res, next) {
    try {
      let queryBuilder = {
        where: {
          id: req.body.data.rolId,
          companyId: req.user.companyId
        }
      };
      let rol = await Rol.findOne(queryBuilder);
      if (!rol) {
        return response(res, req)( null, { status: 404, code: "rol.notFound" } );
      }

      req.rol = rol;
      // Invoke next middleware
      next();
    } catch (err) {
      return response(res, req)( null, { err, status: 500, code: "server.error" } );
    }
  };
}
