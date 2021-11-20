import response from "../helpers/response.js";
import moment from "moment";

export default function(app, db) {

  const {
    Transaction,
    PaymentMethod
  } = db;

  const Controller = {
    list: async function( req, res, next ) {

      let queryBuilder = {
        include: [{
          model: PaymentMethod,
          required: true
        }],
        where: {}
      }
      if (req.user.owner) {
        queryBuilder.where.businessId = req.user.businessId;
      } else {
        queryBuilder.where.commerceId = req.user.commerceId;
      }

      let transactions = await Transaction.findAll(queryBuilder);
      let list = transactions.map(t => ({
        id: t.id,
        amount: t.amount,
        cost: t.cost,
        createdAt: moment(t.createdAt).format("DD/MM/YY HH:mm"),
        PaymentMethod: {
          id: t.PaymentMethod.id,
          name: t.PaymentMethod.name,
          images: t.PaymentMethod.images,
        }
      }));

      return response(res, req, next)({
        Transactions: list
      });
    }


  }

  return Controller;
};
