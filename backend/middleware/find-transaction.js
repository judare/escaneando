import response from "../helpers/response.js";

export default function(app, db) {
  const {
    Transaction
  } = db;

  return async function(req, res, next) {
    try {
      let queryBuilder = {
        where: {
          id: req.body.data.transactionId,
        }
      };
      let transaction = await Transaction.findOne(queryBuilder);
      if (!transaction) {
        return response(res, req)( null, { status: 404, code: "transaction.notFound" } );
      }

      req.transaction = transaction;
      // Invoke next middleware
      next();
    } catch (err) {
      return response(res, req)( null, { err, status: 500, code: "server.error" } );
    }
  };
}
