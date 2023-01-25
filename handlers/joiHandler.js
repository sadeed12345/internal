const { ErrorHandler } = require("./errorHandler");
exports.validate = (body, schemas) => {
  const { error } = schemas.validate(body, {
    abortEarly: false, // include all errors
    allowUnknown: true, // ignore unknown props
    // stripUnknown: true, // remove unknown props
  });
  if (error) {
    const isDevelopment = process.env.NODE_ENV.includes("dev") ? true : false;
    throw new ErrorHandler(
      400,
      error.details.map((x) => x.message).join(", "),
      isDevelopment
    );
  }
};