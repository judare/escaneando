import response from "../helpers/response.js";

export default function(app, db) {
  const {
    Product,
    Commerce
  } = db;

  return async function(req, res, next) {
    try {
      let queryBuilder = {
        include: [{
          model: Commerce,
          required: true
        }],
        where: {
          id: req.body.data.productId,
        }
      };
      let product = await Product.findOne(queryBuilder);
      if (!product) {
        return response(res, req)( null, { status: 404, code: "product.notFound" } );
      }

      if (!product.Commerce.hasPermissions(req.user)) {
        return response(res, req)( null, { status: 401, code: "product.noPermissions" } );;
      }

      req.product = product;
      // Invoke next middleware
      next();
    } catch (err) {
      return response(res, req)( null, { err, status: 500, code: "server.error" } );
    }
  };
}
