import response from "../helpers/response.js";

export default function(app, db) {
  const {
    DeviceBackup,
    Device
  } = db;

  return async function(req, res, next) {
    try {
      let queryBuilder = {
        include: [{
          model: Device,
          required: true,
          where: {
            companyId: req.user.companyId
          }
        }],
        where: {
          id: req.body.data.deviceBackupId,
        }
      };
      let backup = await DeviceBackup.findOne(queryBuilder);
      if (!backup) {
        return response(res, req)( null, { status: 404, code: "backup.notFound" } );
      }

      req.backup = backup;
      // Invoke next middleware
      next();
    } catch (err) {
      return response(res, req)( null, { err, status: 500, code: "server.error" } );
    }
  };
}
