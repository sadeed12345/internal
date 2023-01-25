const Logger = require("../handlers/logger");
const { dynamoDbClient } = require("../handlers/awsHandler");
const config = require("../config/db.config.js");
const sql = require("mssql");
const {
  handleErrorResponse,
  ErrorHandler,
} = require("../handlers/errorHandler");
const { custom } = require("joi");


exports.logoutProcess = (req, res) => {
  // // Destroy Express Session and return response in callback
  Logger.info("logout: Success");
  return res.send({
    message: "Success",
  });
};

exports.registeredUsers = async (req, res) => {
  try{
    var getParams = {
      TableName: "m2c-biomechanics-users",
    };
 
    await dynamoDbClient
      .scan(getParams)
      .promise()
      .then((data) => {
        return res.send(data);
      })
      .catch((err) => {
        return handleErrorResponse(err, res, "registeredUsers");
      });

    } catch (err) {
      return handleErrorResponse(err, res, "registeredUsers");
    };
};

exports.activeUsers = async (req, res) => {
  try {
    // make sure that any items are correctly URL encoded in the connection string
    await sql.connect(config)
    const result = await sql.query`SELECT * FROM [m2c-db-dev].dbo.users WHERE email = 'raja.faizan@fenrispakistan.com'`
    console.dir(result)
   } catch (err) {
      console.log(err);
      return handleErrorResponse(err, res, "activeUsers");
  };
};
