
import response from "./response.js";

export default (controller) => {

  return async (req, res, next) => {
    try {
      return await controller(req, res, next);
    } catch( err ) {
      console.log("hOLAAA")
      return response(res, req, next)( null, { err, status: 500, code: "server.error" } );
    }
  }
}

