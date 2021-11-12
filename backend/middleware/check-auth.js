import config from '../config/config.js';

export default function(app, db) {
  const {
    User,
    Session
  } = db;

  return async function(req, res, next) {
    const ipAddress = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    const agent = req.headers['user-agent'];

    try {
      // token to authorize user
      let token;
      if (req.query.token) {
        token = req.query.token;
      } else {
        token = req.headers.authorization;
        if (!token) return res.status(401).json({ message: req.translate('auth.noToken') });
        token = token.split(' ')[1];
      }
      if (!token) return res.status(401).json({ message: req.translate('auth.invalidToken') });

      let session = await Session.findByToken(token);
      if (!session) return res.status(401).json({message: req.translate('auth.failed')});
      if (session.validateIp && session.ip != ipAddress) return res.status(401).json({message: req.translate('auth.invalidIp')});

      const until = Date.now() - (config.minExpiredSession * 60 * 1000);
      if (session.withExpiration && session.lastActivity < until) {
        console.log("EXPIRED");
        await session.update({ active: 0, closeMotive: "user.session.expired" });
        return res.status(401).json({message: req.translate('auth.expired')});
      }

      const user = await User.findById(session.userId);
      if (user.blocked) return res.status(401).json({message: req.translate('user.blocked')});

      // Update Last activy session
      const sessionData = {
        ipAddress,
        lastActivity: Date.now(),
        // version: req.headers["wallet-version"]
      };
      if (agent) {
        sessionData.name = agent;
      }
      session = await session.update(sessionData);
      // Apply auth user to req, to use later
      req.session = session;
      req.user = user;

      //res.header("auth-key", req.user.id + "|" + req.user.guardSimultaneous);

      // Invoke next middleware
      next();
    } catch (error) {
      console.log( "AUTH FAILED", Date.now(), error);
      return res.status(500).json({ message: req.translate('server.error') });
    }
  };
}
