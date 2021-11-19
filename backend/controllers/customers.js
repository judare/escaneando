import moment from "moment";
import response from "../helpers/response.js";

export default function(app, db) {

  const {
    People
  } = db;

  const Controller = {
    list: async function( req, res, next ) {

      let { commerce } = req;

      let queryBuilder = {
        where: {
          commerceId: commerce.id
        }
      }
      let people = await People.findAll(queryBuilder);
      let list = people.map(p => ({
        id: p.id,
        cellphone: p.cellphone,
        createdAt: moment(p.createdAt).format("DD/MM/YY"),
      }));

      return response(res, req, next)({ People: list });
    }

  }

  return Controller;
};
