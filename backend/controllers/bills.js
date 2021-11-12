import response from "../helpers/response.js";
import moment from "moment";

export default function(app, db) {
  const {
    Bill,
  } = db;

  const Controller = {
    list: async function( req, res, next ) {
      try {
        let queryBuilder = {
          where: {
            companyId: req.user.companyId
          }
        }
        let bills = await Bill.findAll(queryBuilder)
        bills = bills.map(b => ({
          id: b.id,
          name: b.code,
          amount: b.amount,
          link: b.link,
          createdAt: moment(b.createdAt).format("DD/MM/YY"),
        }));

        return response(res, req, next)({ Bills: bills });
      } catch( err ) {
        return response(res, req, next)( null, { err, status: 400, code: "server.error" } );
      }
    },
  }

  return Controller;
};
