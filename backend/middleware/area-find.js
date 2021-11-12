import response from "../helpers/response.js";

export default function(app, db) {
  const {
    Area
  } = db;

  return async function(req, res, next) {
    try {
      let queryBuilder = {
        where: {
          id: req.body.data.areaId,
          companyId: req.user.companyId
        }
      };
      let area = await Area.findOne(queryBuilder);
      if (!area) {
        return response(res, req)( null, { status: 404, code: "area.notFound" } );
      }

      req.area = area;
      // Invoke next middleware
      next();
    } catch (err) {
      return response(res, req)( null, { err, status: 500, code: "server.error" } );
    }
  };
}
