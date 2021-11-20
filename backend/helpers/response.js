
export default function(res, req, next = null) {
  return function(response, error = null) {

    if (error) {
      console.log(error.err);

      if (error.err?.code) {
        return res.status(error.status).json({
          date: Date.now(),
          errorCode: error.err.code,
          message: req.translate(error.err.code),
        });
      }
      res.status(error.status).json({
        date: Date.now(),
        errorCode: error.code,
        message: req && req.translate ? req.translate(error.code) : error.code,
      });
      if (next) next();
      return;
    }

    res.status(200).json({
      "statusCode": 200,
      "message": "Successful",
      "data": response,
      "_channel": "web"
    });
    if (next) next();
    return;
  }
}
