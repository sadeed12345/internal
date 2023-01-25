const Logger = require("./logger");
const { dynamoDbClient } = require("../handlers/awsHandler");

// exports.validateSession = async (req, res, next) => {
//   try {
//     const env = process.env.NODE_ENV;
//     const isDevelopment = env === "dev";
//     let routePrefix = "/" + env;

//     // No route prefix in dev environments
//     if (routePrefix.includes("dev")) {
//       routePrefix = "";
//     }

//     const allowSpecialEndpoints = req.url === routePrefix + "/discover";

//     const handleAuthenticationFailed = function () {
//       Logger.error(
//         "validateSession: Authentication Failed. loggedUserId: " +
//           req.body.loggedUserId
//       );
//       return res.status(401).json("Authentication Failed");
//     };

//     const handleAuthenticationSuccess = function () {
//       return next();
//     };

//     if (allowSpecialEndpoints || isDevelopment) {
//       // in dev environment OR when [endPoint] is /discover then check only presence of session.userInfo.userId
//       req.session.userInfo.userId
//         ? handleAuthenticationSuccess()
//         : handleAuthenticationFailed();
//     } else {
//       // in sandbox/prod environments, body.loggedUserId must be equal to session.userInfo.userId
//       req.session.userInfo.userId == req.body.loggedUserId
//         ? handleAuthenticationSuccess()
//         : handleAuthenticationFailed();
//     }
//   } catch (err) {
//     Logger.error("validateSession: " + err.message);
//     return res.status(401).json("Authentication Error");
//   }
// };

exports.validateSession_v2 = async (req, res, next) => {
  try {
    const _userId = req.body.loggedUserId;
    const _sessionToken = req.body.sessionToken;

    var getParams = {
      TableName: "m2c-biomechanics-dev-localstorage",
      Key: {
        id: { S: _sessionToken },
        userId: { S: _userId },
      },
    };

    await dynamoDbClient.getItem(getParams, function (err, data) {
      if (data.Item == null) {
        Logger.error("verifyUser: Authentication Error");
        return res.status(401).json("Authentication Error V2");
      } else {
        return next();
      }
    });
  } catch (error) {
    Logger.error("verifyUser: " + error.message);
    res.status(401).json("Authentication Error V2");
  }
};
