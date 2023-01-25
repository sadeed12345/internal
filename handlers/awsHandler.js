const S3 = require("aws-sdk/clients/s3");
const SES = require("aws-sdk/clients/ses");
const DynamoDB = require("aws-sdk/clients/dynamodb");
// const dynamoDB = new AWS.DynamoDB.DocumentClient()
// const ApiGatewayManagementApi = require("aws-sdk/clients/apigatewaymanagementapi");

const customConfigurations = require("../config/customConfigurations");

const awsConfig = {
  accessKeyId: customConfigurations.awsAccessKeyId,
  secretAccessKey: customConfigurations.awsAccessKey,
  region: customConfigurations.region,
};

const sesClient = new SES(awsConfig);
const s3Client = new S3(awsConfig);
const dynamoDbClient = new DynamoDB({ ...awsConfig, apiVersion: "2022-08-16" });
// const apiEndpoint = customConfigurations.computerVisionApiEndpoint;
// const apiGatewayClient = new ApiGatewayManagementApi({
//   ...awsConfig,
//   apiVersion: "2018-11-29",
//   endpoint: apiEndpoint,
// });

module.exports = {
  sesClient,
  s3Client,
  dynamoDbClient,
//   apiGatewayClient,
};
