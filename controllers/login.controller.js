const bcrypt = require("bcryptjs");
const { v4: uuidv4 } = require("uuid");
const customConfigurations = require("../config/customConfigurations");
const { dynamoDbClient } = require("../handlers/awsHandler");
const Joi = require("joi");
const joiHandler = require("../handlers/joiHandler");

const {
  handleErrorResponse,
  ErrorHandler,
} = require("../handlers/errorHandler");


// exports.registerProcess = async (req, res) => {
//   try {
//      // Validate request
//      const registerProcessSchema = Joi.object().keys({
//       email: Joi.string().email().required(),
//       password: Joi.string().required(),
//     });
//     joiHandler.validate(req.body, registerProcessSchema);
//     x

//     // const currentEndPoint = req.protocol + "://" + req.headers.host; // this is backends link - not useful
//     //const currentEndPoint = process.env.currentEndPoint;

//     const _email = req.body.email;
//     const _password = req.body.password;

//     var emailRegexp = new RegExp(customConfigurations.emailRegex);
//     //var passwordVerification = new RegExp(customConfigurations.passwordCheck);
//     if (!emailRegexp.test(_email)) {
//       throw new ErrorHandler(400, "Invalid email/password", true);
//     }

//     // if (!passwordVerification.test(_password)) {
//     //   throw new ErrorHandler(400, "Invalid email/password", true);
//     // }

//     var getParams = {
//       TableName: "m2c-biomechanics-users",
//       Key: {
//         emailId: { S: _email },
//       },
//       ProjectionExpression: "emailId",
//     };

//     // Call dynamoDbClientDB to read the item from the table
//     const getResult = await dynamoDbClient.getItem(getParams).promise();

//     if (getResult.Item == null) {
//       const passwordHash = await bcrypt.hash(_password, 10);
//       const verificationToken = Math.floor(10000 + Math.random() * 90000);

//       var params = {
//         TableName: "m2c-biomechanics-users",
//         Item: {
//           emailId: { S: _email.toLowerCase() },
//           password: { S: passwordHash },
//           verificationToken: { N: verificationToken.toString() },
//           //PASSWORD_RESET_TOKEN: { N: null },
//           active: { BOOL: false },
//         },
//       };

//       await dynamoDbClient
//         .putItem(params)
//         .promise()
//         .then((data) => {
//           return res.send({
//             userId: _email,
//             message: "Registered.",
//           });
//         })
//         .catch((err) => {
//           return handleErrorResponse(err, res, "registerProcess user creation");
//         });
//     } else {
//       throw new ErrorHandler(409, "Email already exists", true);
//     }
//   } catch (err) {
//     return handleErrorResponse(err, res, "registerProcess");
//   }
// };

exports.loginProcess = async (req, res) => {
  try {
    // Validate request
    const loginProcessSchema = Joi.object().keys({
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    });
    joiHandler.validate(req.body, loginProcessSchema);

    //const db = req.db;

    const _email = req.body.email;
    const _password = req.body.password;

    var emailRegexp = new RegExp(customConfigurations.emailRegex);
    if (!emailRegexp.test(_email)) {
      throw new ErrorHandler(400, "Invalid email or password", true);
    }

    var getParams = {
      TableName: "m2c-biomechanics-users",
      Key: {
        emailId: { S: _email },
      },
      // ProjectionExpression: "emailId",
    };

    let user;

    await dynamoDbClient
      .getItem(getParams)
      .promise()
      .then((data) => {
        user = data.Item;
      })
      .catch((err) => {
        return handleErrorResponse(err, res, "Login");
      });

    if (!user) {
      throw new ErrorHandler(400, "Invalid Email or Password ", true);
    } else {
      const check = await bcrypt.compare(_password, user.password.S);
      if (check) {
        const sessionToken = uuidv4();
        var params = {
          TableName: "m2c-biomechanics-dev-localstorage",
          Item: {
            id: { S: sessionToken },
            userId: { S: _email },
          },
        };

        dynamoDbClient.putItem(params, function (err, data) {
          if (err) {
            return handleErrorResponse(
              err,
              res,
              "registerProcess user creation"
            );
          }
        });

        // req.session.id = data.Item.emailId.S;

        return res.send({
          userId: user.emailId.S,
          active_status: user.active.BOOL,
          sessionToken: sessionToken,
          // createdDate: data.createdAt,
        });
      } else {
        throw new ErrorHandler(400, "Invalid email or password", true);
      }
    }
  } catch (err) {
    return handleErrorResponse(err, res, "Login");
  }
};
