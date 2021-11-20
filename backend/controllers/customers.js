import moment from "moment";
import response from "../helpers/response.js";

export default function(app, db) {

  const {
    People,
    Visit,
    Commerce
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
    }

  }

  return Controller;
};
