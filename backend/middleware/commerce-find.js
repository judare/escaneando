import response from "../helpers/response.js";

export default function(app, db) {
  const {
    Commerce
  } = db;

  return async function(req, res, next) {
    try {

      if (!req.body.data.commerce) {
        return response(res, req)( null, { status: 404, code: "commerce.notFound" } );
      }

      let queryBuilder = {
        where: {
          slug: req.body.data.commerce
        }
      };
      let commerce = await Commerce.findOne(queryBuilder);
      if (!commerce) {
        return response(res, req)( null, { status: 404, code: "commerce.notFound" } );
      }

      req.commerce = commerce;
      // Invoke next middleware
      next();
    } catch (err) {
      return response(res, req)( null, { err, status: 500, code: "server.error" } );
    }
  };
}
