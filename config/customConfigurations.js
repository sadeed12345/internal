const customConfigurations = {
  emailRegex: "^\\w+([\\.-]?\\w+)*@\\w+([\\.-]?\\w+)*(\\.\\w{2,3})+$",
  contactNumberRegexp: "^[0-9]+$",
  passwordCheck:
    "^(?=.*?[A-Z])(?=.*?[a-z])[a-zA-Z]|(?=.*?[.#?!@$%^&*-]){6,}(?=.*?[0-9])|(?=.*?[.#?!@$%^&*-])$",
  awsAccessKeyId: process.env.awsAccessKeyId,
  awsAccessKey: process.env.awsAccessKey,
  region: process.env.region,
  bucket: process.env.jsonFilesBucket,
  forcePlateBucket: process.env.forcePlateFilesBucket,
  computerVisionResults: process.env.computerVisionResults,
  fileDataTable: process.env.fileDataTable,
  offsetForTurns: process.env.offsetForTurns,
  expressSessionSecret: process.env.sessionSecret || "254ABHbV2STbngTgzaT4", //'some-very-long-secret'
  aesSecretKey: process.env.aesKey, //'some-very-long-secret'
  backendBaseUrl: process.env.backendBaseUrl,
};

module.exports = customConfigurations;
