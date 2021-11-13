import response from "../helpers/response.js";

export default function(app, db) {
  const {
    Visit,
    People
  } = db;

  return async function(req, res, next) {
    try {

      if (!req.body.data.visitantToken) {
        return response(res, req)( null, { status: 404, code: "visitantToken.notFound" } );
      }

      let queryBuilder = {
        where: {
          token: req.body.data.visitantToken
        }
      };
      let visitant = await Visit.findOne(queryBuilder);
      if (!visitant) {
        return response(res, req)( null, { status: 404, code: "visitant.notFound" } );
      }

      req.visitant = visitant;
      // Invoke next middleware
      next();
    } catch (err) {
      return response(res, req)( null, { err, status: 500, code: "server.error" } );
    }
  };
}
