import response from "../helpers/response.js";

export default function(app, db) {

  const {
    Commerce,
    Insight
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
        address: c.address,
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
        address: data.address,
        slug: Date.now() + encodeURIComponent(data.name),
        enabled: 1,
        instagram: data.instagram,
        facebook: data.facebook,
        userId: req.user.id,
        cellphone: data.cellphone,
        email: data.email,
        businessId: req.user.businessId
      });
      return response(res, req, next)(null);
    },

    update: async function( req, res, next ) {
      let { user, commerce, body: { data } } = req;

      if (data.logo) {
        await Insight.register(user.businessId, "user.activity.commerceLogo");
      }
      await commerce.update({
        name: data.name,
        address: data.address,
        logo: data.logo || "/icons/backoffice/commerce-default.png",
        instagram: data.instagram,
        facebook: data.facebook,
        cellphone: data.cellphone,
        email: data.email,
      });
      return response(res, req, next)(null);
    },

    updateBusiness: async function( req, res, next ) {
      let { user, business, body: { data } } = req;

      let dataUpdate = {
        name: data.name
      }
      
      if (data.fileRut) {
        dataUpdate.fileRut = data.fileRut;
        await Insight.register(user.businessId, "user.vinculation.commerceRut");
      }

      if (data.fileCommerce) {
        dataUpdate.fileCommerce = data.fileCommerce;
        await Insight.register(user.businessId, "user.vinculation.commerceFile");
      }

      await business.update(dataUpdate);
      return response(res, req, next)(null);
    },

    getBusiness: async function( req, res, next ) {
      let { business, body: { data } } = req;

      return response(res, req, next)({
        Business: {
          id: business.id,
          name: business.name,
          nit: business.nit,
          email: business.email,
          fileRut: business.fileRut,
          fileCommerce: business.fileCommerce,
          showPayments: business.showPayments,
        }
      });
    },

  }

  return Controller;
};
