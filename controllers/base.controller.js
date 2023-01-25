// const customConfigurations = require("../config/customConfigurations");
// const {
//   handleErrorResponse,
//   ErrorHandler,
// } = require("../handlers/errorHandler");
// var AWS = require("aws-sdk");

// AWS.config.update({
//   accessKeyId: customConfigurations.awsAccessKeyId,
//   secretAccessKey: customConfigurations.awsAccessKey,
//   region: customConfigurations.region,
// });
// var dynamo = new AWS.DynamoDB({ apiVersion: "2012-08-10" });

// // Retrieve User from session
// exports.getUserFromSession = (req, res) => {
//   try {
//     const _userId = req.session.userInfo.userId;
//     var params = {
//       TableName: "m2c-biomechanics-users",
//       Key: {
//         emailId: { S: _userId },
//       },
//       ProjectionExpression: "emailId",
//     };

//     const command = new BatchExecuteStatementCommand(params);
//     dynamo.send(command).then(
//       (data) => {
//         return res.send(data);
//       },
//       (err) => {
//         return handleErrorResponse(err, res, "getUserFromSession");
//       }
//     );
//   } catch (err) {
//     return handleErrorResponse(err, res, "getUserFromSession");
//   }
// };
