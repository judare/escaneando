import response from "../helpers/response.js";

export default function(app, db) {
  const {
    ProductCategory
  } = db;

  return async function(req, res, next) {
    try {
      let queryBuilder = {
        where: {
          id: req.body.data.categoryId,
        }
      };
      let category = await ProductCategory.findOne(queryBuilder);
      if (!category) {
        return response(res, req)( null, { status: 404, code: "category.notFound" } );
      }

      req.category = category;
      // Invoke next middleware
      next();
    } catch (err) {
      return response(res, req)( null, { err, status: 500, code: "server.error" } );
    }
  };
}
