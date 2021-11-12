import response from "../helpers/response.js";

export default function(app, db) {
  const {
    Device
  } = db;

  return async function(req, res, next) {
    try {
      let queryBuilder = {
        where: {
          companyId: req.user.companyId,
          id: req.body.data.deviceId
        }
      };
      let device = await Device.findOne(queryBuilder);
      if (!device) {
        return response(res, req)( null, { status: 404, code: "devices.notFound" } );
      }

      req.device = device;
      // Invoke next middleware
      next();
    } catch (err) {
      return response(res, req)( null, { err, status: 404, code: "server.error" } );
    }
  };
}
