import checkAuthMiddleware from './check-auth';

export default function (app, db) {
  // Import Auth Middleware also
  const checkAuth = checkAuthMiddleware(app, db);
  // also, need parameter of privilege name
  return privilege => (req, res, next) => (
  // before, check auth
     checkAuth(req, res, async () => {
      try {
        let can = await req.user.can(privilege);
        if (!can) {
          return res.status(401).json({ message: req.translate('auth.permissions') });
        }
        // Invoke Next Middleware or controller
        next();
      } catch(err) {
        console.log(err);
        return res.status(401).json({ message: req.translate('auth.permissions') });
      }
    })
  );
}