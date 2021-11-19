import moment from "moment";
import response from "../helpers/response.js";

export default function(app, db) {

  const {
    Product
  } = db;

  const Controller = {
    list: async function( req, res, next ) {

      let { commerce } = req;

      let queryBuilder = {
        where: {
          commerceId: commerce.id
        }
      }
      let products = await Product.findAll(queryBuilder);
      let list = products.map(p => ({
        id: p.id,
        name: p.name,
        createdAt: moment(p.createdAt).format("DD/MM/YY"),
      }));

      return response(res, req, next)({ Products: list });
    }
  }

  return Controller;
};
