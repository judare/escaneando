import response from "../helpers/response.js";

export default function(app, db) {
  const {
    PaymentMethod
  } = db;

  return async function(req, res, next) {
    try {
      let queryBuilder = {
        where: {
          id: req.body.data.paymentMethodId,
          enabled: 1
        }
      };
      let paymentMethod = await PaymentMethod.findOne(queryBuilder);
      if (!paymentMethod) {
        return response(res, req)( null, { status: 404, code: "paymentMethod.notFound" } );
      }

      req.paymentMethod = paymentMethod;
      // Invoke next middleware
      next();
    } catch (err) {
      return response(res, req)( null, { err, status: 500, code: "server.error" } );
    }
  };
}
