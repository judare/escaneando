import moment from "moment";
import response from "../helpers/response.js";

export default function(app, db) {

  const {
    People,
    Visit,
    Commerce,
    Review,
    Business
  } = db;

  const Controller = {
    list: async function( req, res, next ) {

      let queryBuilder = {
        attributes: [
          '*',
          [db.sequelize.fn('COUNT', 1), 'totalVisits'],
          [db.sequelize.fn('MAX', db.sequelize.col("Visit.createdAt")), 'lastVisit'],
          [db.sequelize.fn('MIN',  db.sequelize.col("Visit.createdAt")), 'firstVisit'],
        ],
        include: [{
          model: People,
          required: true
        },
        {
          model: Commerce,
          required: true
        }],
        where: {},
        group: [ "personId" ]
      }
      if (req.user.owner) {
        queryBuilder.where.businessId = req.user.businessId;
      } else {
        queryBuilder.where.commerceId = req.user.commerceId;
      }

      let visits = await Visit.findAll(queryBuilder);
      let list = visits.map(v => ({
        id: v.Person.id,
        cellphone: v.Person.cellphone,
        totalVisits: v.dataValues.totalVisits,
        lastVisit: moment(v.dataValues.lastVisit).format("DD/MM/YY"),
        firstVisit: moment(v.dataValues.firstVisit).format("DD/MM/YY"),
        createdAt: moment(v.createdAt).format("DD/MM/YY"),
      }));

      return response(res, req, next)({ People: list });
    },




    reviews: async function( req, res, next ) {

      let queryBuilder = {
        include: [
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
        where: {},
        order: [["id", "DESC"]],
        limit: 100
      }

      if (!req.user.owner) {
        queryBuilder.where.commerceId = req.user.commerceId;
      }

      let reviews = await Review.findAll(queryBuilder);
      let list = reviews.map(v => ({
        id: v.id,
        review: v.review,
        product: v.product,
        prices: v.prices,
        attention: v.attention,
        createdAt: moment(v.createdAt).format("DD/MM/YY HH:mm"),
      }));

      let attention = list.filter(i => i.attention > 0);
      let prices = list.filter(i => i.prices > 0);
      let product = list.filter(i => i.product > 0);

      return response(res, req, next)({
        Reviews: list,
        ReviewPrices: prices.reduce((ac, item) => ac += item.prices, 0) / prices.length,
        ReviewAttention: attention.reduce((ac, item) => ac += item.attention, 0) / attention.length,
        ReviewProduct: product.reduce((ac, item) => ac += item.product, 0) / product.length,
      });
    }

  }

  return Controller;
};
