import response from "../helpers/response.js";

export default function(app, db) {
  const {
    Train,
    User
  } = db;

  return async function(req, res, next) {
    try {
      let queryBuilder = {
        include: [{
          model: User,
          required: true
        }],
        where: {
          id: req.body.data.trainId,
          companyId: req.user.companyId
        }
      };
      let train = await Train.findOne(queryBuilder);
      if (!train) {
        return response(res, req)( null, { status: 404, code: "train.notFound" } );
      }

      req.train = train;
      // Invoke next middleware
      next();
    } catch (err) {
      return response(res, req)( null, { err, status: 500, code: "server.error" } );
    }
  };
}
