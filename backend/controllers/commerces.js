import response from "../helpers/response.js";

export default function(app, db) {

  const {
    Commerce
  } = db;

  const Controller = {
    list: async function( req, res, next ) {

      let queryBuilder = {
        where: {}
      }
      if (req.user.owner) {
        queryBuilder.where.businessId = req.user.businessId;
      } else {
        queryBuilder.where.id = req.user.commerceId;
      }

      let commerces = await Commerce.findAll(queryBuilder);
      let list = commerces.map(c => ({
        id: c.id,
        name: c.name,
        image: c.image,
        slug: c.slug,
      }));

      return response(res, req, next)({
        Commerces: list
      });
    }

  }

  return Controller;
};
