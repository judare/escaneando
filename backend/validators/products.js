
import checkAuthMiddleware from '../middleware/check-auth';

export default function(app, db) {
  // const checkAuth = checkAuthMiddleWare(app, db);
  const checkAuth = checkAuthMiddleware(app, db);

  return {

    list: [
      checkAuth,
    ],

    create: [
      checkAuth,
    ],

    update: [
      checkAuth,
    ],

    delete: [
      checkAuth,
    ],

    createCategory: [
      checkAuth,
    ],

    deleteCategory: [
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
