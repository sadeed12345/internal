const config = {
  user: process.env.sequelizeUSER,
  password: process.env.sequelizePW,
  database: process.env.sequelizeDB,
  server: process.env.sequelizeHOST,
  // settings: {
  //   // ** Any Key:Value added here will automatically be added to sequelize instance ** //
  //   host: process.env.sequelizeHOST, // db server
  //   // host: process.env.rdsDbProxyEndpoint, // rds proxy server
  //   timezone: Intl.DateTimeFormat().resolvedOptions().timeZone, // "Europe/Berlin",
  //   dialect: "mssql",
  //   port: 1433,
  //   logging: process.env.sequelizeLogFlag === "true" ? console.log : false,
    ssl: true,
    options: {
      trustedConnection: true,
      trustServerCertificate: true,
      Encrypt: false,
      IntegratedSecurity: true,
    },
    // dialectOptions: {
    //   options: { requestTimeout: 6000 },
    // },
    pool: {
      max: 2,
      min: 0,
      // acquire: 3000,
      // idle: 1000,
      // evict: 6000, // CURRENT_LAMBDA_FUNCTION_TIMEOUT,
    },
  // },
};

module.exports = config;