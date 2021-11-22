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
        logo: c.logo,
        slug: c.slug,
        cellphone: c.cellphone,
        email: c.email,
        facebook: c.facebook,
        instagram: c.instagram,
      }));

      return response(res, req, next)({
        Commerces: list
      });
    },


    create: async function( req, res, next ) {
      let { body: { data } } = req;

      await Commerce.create({
        logo: data.logo || "/icons/backoffice/commerce-default.png",
        name: data.name,
        slug: Date.now() + encodeURIComponent(data.name),
        enabled: 1,
        instagram: data.instagram,
        facebook: data.facebook,
        userId: req.user.id,
        cellphone: req.user.cellphone,
        email: req.user.email,
        businessId: req.user.businessId
      });
      // TODO INSERT IMAGES
      return response(res, req, next)(null);
    },

    update: async function( req, res, next ) {
      let { commerce, body: { data } } = req;

      await commerce.update({
        name: data.name,
        logo: data.logo || "/icons/backoffice/commerce-default.png",
        instagram: data.instagram,
        facebook: data.facebook,
        cellphone: data.cellphone,
        email: data.email,
      });
      return response(res, req, next)(null);
    },

  }

  return Controller;
};
