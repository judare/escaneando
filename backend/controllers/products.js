import moment from "moment";
import response from "../helpers/response.js";

export default function(app, db) {

  const {
    Product,
    Business,
    Commerce,
    ProductCategory
  } = db;

  const Controller = {
    list: async function( req, res, next ) {

      let { body: { data: { commerceId } } } = req;
      let list = [];

      let queryBuilder = {
        include: [{
          model: Product
        },
        {
          include: [{
            model: Business,
            required: true,
            where: {
              id: req.user.businessId
            }
          }],
          model: Commerce,
          required: true
        }],
        where: {
          commerceId
        }
      }
      let products = await ProductCategory.findAll(queryBuilder);

      list = products.map((c) => ({
        id: c.id,
        name: c.name,
        Products: c.Products.map(p => ({
          id: p.id,
          name: p.name,
          image: p.image,
          description: p.description,
          price: p.price,
        })),
      }));

      return response(res, req, next)({ Products: list });
    }
  }

  return Controller;
};
