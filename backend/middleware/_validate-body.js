import response from "../helpers/response.js";
export default function (app, db) {

  return async function(req, res, next) {
    try {
      if (req.method != "POST") {
        return next();
      }

      if (req.headers["content-type"].includes( "multipart/form-data" ) ) {
        return next();
      }
      
      if (!req.body) {
        return response(res, req)( null, { status: 400, code: "invalid.body" } );
      }

      if (typeof req.body.data != "object") {
        return response(res, req)( null, { status: 400, code: "invalid.body.data" } );
      }

      if (!req.body._channel) {
        return response(res, req)( null, { status: 400, code: "invalid._channel" } );
      }
      next();
    } catch (error) {
      return response(res, req)( null, { err, status: 500, code: "server.error" } );
    }
  }
}