const Logger = require("./logger");

class ErrorHandler extends Error {
  constructor(statusCode, message, isCustomError) {
    super();
    this.statusCode = statusCode;
    this.message = message;
    this.isCustomError = isCustomError;
  }
}

const handleErrorResponse = (err, res, errorOrigin) => {
  const {
    statusCode = 500, // default value
    message = "something went wrong", // default value
    isCustomError = false, // default value
  } = err;

  Logger.error(errorOrigin + ": " + err.message);

  return res.status(statusCode).json({
    message: isCustomError ? message : "something went wrong.",
  });
};

module.exports = {
  ErrorHandler,
  handleErrorResponse,
};
