export default function(app, db) {
  const {
    Device
  } = db;

  return async function(req, res, next) {
    try {
      let hash = req.headers.authorization.split(' ')[1];
     
      let queryBuilder = {
        where: {
          hash
        }
      };

      let device = await Device.findOne(queryBuilder);
      if (!device) {
        return res.status(404).json({ message: req.translate('device.notFound') });
      }

      req.device = device;
      // Invoke next middleware
      next();
    } catch (error) {
      console.log(error)
      return res.status(500).json({ message: req.translate('server.error') });
    }
  };
}
