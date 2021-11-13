import response from "../helpers/response.js";

export default function(app, db) {

  const {
    Visit,
    People
  } = db;

  const Controller = {
    registerVisitant: async function( req, res, next ) {

      let { commerce, body: { data: { cellphone } } } = req;

      let people = await People.findOrCreate(cellphone);

      let visit = await Visit.visit(people, commerce);

      return response(res, req, next)({
        token: visit.token
      });
    }
  }

  return Controller;
};
