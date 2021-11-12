import bcrypt from "bcrypt";

export default function(app, db) {
  const {
    CompanyParameter
  } = db;

  return async function(req, res, next) {
    try {
      let { device, body } = req;
     
      let queryBuilder = {
        where: {
          name: "AGENT_PASSWORD",
          companyId: device.companyId
        }
      };

      let parameter = await CompanyParameter.findOne(queryBuilder);
      if (!parameter) {
        return res.status(401).json({ message: req.translate('agent.password.invalid') });
      }

      let match = await bcrypt.compare(body.data.agentPassword, parameter.value);
      // Invoke next middleware
      if (match) {
        return next();
      }
      return res.status(401).json({ message: req.translate('agent.password.invalid') });
    } catch (error) {
      console.log(error)
      return res.status(500).json({ message: req.translate('server.error') });
    }
  };
}
