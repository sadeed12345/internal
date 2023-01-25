const express = require("express");
const serverless = require("serverless-http");
const expressSession = require("express-session");
const DynamoDBStore = require("connect-dynamodb")(expressSession);
// var fileUpload = require("express-fileupload");
require("dotenv").config(); // for accessing variables from .env file from anywhere in the project
const cors = require("cors");
const bodyParser = require("body-parser");
const customConfigurations = require("./config/customConfigurations");

const isDevelopment = process.env.NODE_ENV === "dev";
const port = process.env.PORT || 6093;

const Logger = require("./handlers/logger");
const morganMiddleware = require("./handlers/morganMiddleware");
const authenticationHandler = require("./handlers/authenticationHandler");
//const baseRoutes = require("./routes/base.routes");
const loginRoutes = require("./routes/login.routes");
const userRoutes = require("./routes/user.routes");
// const fileRoutes = require("./routes/file.routes");
const app = express();
// app.use(fileUpload());
var AWS = require("aws-sdk");
app.use(bodyParser.json({ limit: "50mb" }));
app.use(
  bodyParser.urlencoded({
    limit: "50mb",
    extended: true,
    parameterLimit: 50000,
  })
);

app.use(morganMiddleware); // for logging all API requests
app.set("trust proxy", 1);

app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "localhost:3000",
      "127.0.0.1:3000",
      "http://127.0.0.1:3000",

      "https://dev.dmkeqmvpf0dsa.amplifyapp.com",
      "https://motion2coach.com",
      "https://www.motion2coach.com",
    ],
    methods: ["POST", "PUT", "GET", "OPTIONS", "HEAD"],
    credentials: true,
  })
);

AWS.config.update({
  accessKeyId: customConfigurations.awsAccessKeyId,
  secretAccessKey: customConfigurations.awsAccessKey,
  region: customConfigurations.region,
});
const dynamodb = new AWS.DynamoDB();

//const oneDay = 1000 * 60 * 60 * 24;
const sevenDays = 1000 * 60 * 60 * 24 * 7;

// app.use(
//   expressSession({
//     name: `m2cddbnhm`,
//     secret: customConfigurations.expressSessionSecret,
//     saveUninitialized: false,
//     resave: true, // true > refreshes session timeout on subsequent API calls.
//     cookie: {
//       httpOnly: true, // blocks javascript interaction with cookie.
//       secure: !isDevelopment, // When true, session will only work with HTTPS.
//       maxAge: sevenDays,
//       sameSite: isDevelopment ? "lax" : "none", // When none, secure option must be true.
//     },
//     store: new DynamoDBStore({
//       client: dynamodb,
//       table: "m2c-biomechanics-sessions",
//     }),
//   })
// );

// Attach cache control headers for cookies to all http requests
app.all("*", (req, res, next) => {
  console.log("req.url", req.url);
  res.set("Cache-Control", "no-cache='Set-Cookie, Set-Cookie2'");
  //req.db = db; // DB connection around the app
  next();
});

// ** AUTHENTICATION NOT Required ** //
app.use("/user", loginRoutes);

// ** AUTHENTICATION Required for below Routes ** //
// app.use(authenticationHandler.validateSession);
// app.use(authenticationHandler.validateSession_v2);
app.use("/user", userRoutes);
// app.use("/files", fileRoutes);

// If No route matches then handle invalid requests here
app.all("*", (req, res) => {
  res.status(404).send({
    message: "The resource you are looking for does not exist.",
    url: req.url,
  });
});

app.listen(port, "0.0.0.0");
// app.listen(port);

if (isDevelopment) {
  Logger.info("N running at http://localhost:" + port);
  // console.log("N running at http://localhost:" + port);
} else {
  // console.log("server started on port :" + port);
  Logger.info("server started on port :" + port);
}

// module.exports = app;

const handler = serverless(app, {
  binary: ["application/pdf", "application/octet-stream"],
});

module.exports.handler = async (event, context, callback) => {
  try {
    context.callbackWaitsForEmptyEventLoop = false;
    const result = await handler(event, context);
    callback(null, result);
  } catch (err) {
    // try/catch is not required, uncaught exceptions invoke `callback(err)` implicitly
    callback(err); // Lambda fails with `err`
  }
  // finally {
  //   // close any opened connections during the invocation
  //   // this will wait for any in-progress queries to finish before closing the connections
  //   await db.sequelize.connectionManager.close(); // this throws error. ConnectionManager.getConnection was called after the connection manager was closed!
  // }
};
