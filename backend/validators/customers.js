
import checkAuthMiddleware from '../middleware/check-auth';

export default function(app, db) {
  // const checkAuth = checkAuthMiddleWare(app, db);
  const checkAuth = checkAuthMiddleware(app, db);

  return {

    list: [
      checkAuth,
    ],

    // create: [
    //   can("rols.create"),
    // ],

    // update: [
    //   can("rols.update"),
    //   rolFind
    // ]
  };
}
