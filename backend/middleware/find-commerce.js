import response from "../helpers/response.js";

export default function(app, db) {
  const {
    Commerce
  } = db;

  return async function(req, res, next) {
    try {
      let queryBuilder = {
        where: {
          id: req.body.data.commerceId,
        }
      };
      let commerce = await Commerce.findOne(queryBuilder);
      if (!commerce) {
        return response(res, req)( null, { status: 404, code: "commerce.notFound" } );
      } 


      if (!commerce.hasPermissions(req.user)) {
        return response(res, req)( null, { status: 401, code: "product.noPermissions" } );;
      }
      req.commerce = commerce;
      // Invoke next middleware
      next();
    } catch (err) {
      return response(res, req)( null, { err, status: 500, code: "server.error" } );
    }
  };
}
