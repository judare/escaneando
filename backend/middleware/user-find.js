import response from "../helpers/response.js";

export default function(app, db) {
  const {
    User
  } = db;

  return async function(req, res, next) {
    try {
      let queryBuilder = {
        where: {
          companyId: req.user.companyId,
          id: req.body.data.userId
        }
      };
      let user = await User.findOne(queryBuilder);
      if (!user) {
        return response(res, req)( null, { status: 404, code: "users.notFound" } );
      }

      req.userCompany = user;
      // Invoke next middleware
      next();
    } catch (err) {
      return response(res, req)( null, { err, status: 500, code: "server.error" } );
    }
  };
}
