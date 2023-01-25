const AWS = require("aws-sdk");
const customConfigurations = require("../config/customConfigurations");
const Logger = require("./logger");
const { handleErrorResponse, ErrorHandler } = require("./errorHandler");
const { sesClient } = require("./awsHandler");

const sendEmailPromise = async (sesParams) => {
  return new Promise(async (resolve, reject) => {
    try {
      sesClient.sendEmail(sesParams, function (err, data) {
        if (err) {
          return reject(err);
        }
        resolve(data);
      });
    } catch (err) {
      return reject(err);
    }
  });
};

exports.sendVerificationEmail = async (
  recipientEmail,
  name,
  token,
  currentEndPoint
) => {
  const params = {
    Source: "mailer@s2c.striker2coach.com",
    Destination: {
      ToAddresses: [recipientEmail],
      CcAddresses: [],
    },
    ReplyToAddresses: [],
    Message: {
      Body: {
        Html: {
          Charset: "UTF-8",
          Data: customConfigurations.getVerificationEMailHtml(
            name,
            token,
            currentEndPoint
          ),
        },
      },
      Subject: {
        Charset: "UTF-8",
        Data: `Striker2Coach - Verify your Account!`,
      },
    },
  };

  await sendEmailPromise(params)
    .then((data) => {
      Logger.info(
        "sendVerificationEmail: Success " + params.Destination.ToAddresses
      );
      return true;
    })
    .catch((err) => {
      throw new ErrorHandler(400, err.message, false);
    });
};

exports.sendNewTokenEMail = async (
  recipientEmail,
  name,
  token,
  currentEndPoint,
  tokenFlag
) => {
  const params = {
    Source: "mailer@s2c.striker2coach.com",
    Destination: {
      ToAddresses: [recipientEmail],
      CcAddresses: [],
    },
    ReplyToAddresses: [],
    Message: {
      Body: {
        Html: {
          Charset: "UTF-8",
          Data: customConfigurations.getSendNewTokenEMailHtml(
            name,
            token,
            currentEndPoint
          ),
        },
      },
      Subject: {
        Charset: "UTF-8",
        Data: `Striker2Coach - Verify your Account!`,
      },
    },
  };

  // const getSignedUrlPromiseFunction = async (SES, sesParams) => {
  //   return new Promise(async (resolve, reject) => {
  //     try {
  //       await SES.sendEmail(sesParams, function (err, data) {
  //         if (err) {
  //           return reject(err);
  //         }
  //         resolve(data);
  //       });
  //     } catch (err) {
  //       return reject(err);
  //     }
  //   });
  // };

  await sendEmailPromise(params)
    .then((data) => {
      Logger.info(
        "sendNewTokenEMail: Success " + params.Destination.ToAddresses
      );
      return true;
    })
    .catch((err) => {
      throw new ErrorHandler(400, err.message, false);
    });
};

exports.sendVerificationSuccessEmail = async (recipientEmail, name) => {
  const params = {
    Source: "mailer@s2c.striker2coach.com",
    Destination: {
      ToAddresses: [recipientEmail],
      CcAddresses: [],
    },
    ReplyToAddresses: [],
    Message: {
      Body: {
        Html: {
          Charset: "UTF-8",
          Data: customConfigurations.getVerificationSuccessEmailHtml(name),
        },
      },
      Subject: {
        Charset: "UTF-8",
        Data: `Striker2Coach - Account Verified!`,
      },
    },
  };

  await sendEmailPromise(params)
    .then((data) => {
      Logger.info(
        "sendNewTokenEMail: Success " + params.Destination.ToAddresses
      );
      return true;
    })
    .catch((err) => {
      throw new ErrorHandler(400, err.message, false);
    });
};

exports.sendResetPasswordEMail = async (
  recipientEmail,
  name,
  token,
  currentEndPoint
) => {
  const params = {
    Source: "mailer@s2c.striker2coach.com",
    Destination: {
      ToAddresses: [recipientEmail],
      CcAddresses: [],
    },
    ReplyToAddresses: [],
    Message: {
      Body: {
        Html: {
          Charset: "UTF-8",
          Data: customConfigurations.getResetPasswordEMailHtml(
            name,
            token,
            currentEndPoint
          ),
        },
      },
      Subject: {
        Charset: "UTF-8",
        Data: `Striker2Coach - Verify your Account!`,
      },
    },
  };

  await sendEmailPromise(params)
    .then((data) => {
      Logger.info(
        "sendResetPasswordEMail: Success " + params.Destination.ToAddresses
      );
      return true;
    })
    .catch((err) => {
      throw new ErrorHandler(400, err.message, false);
    });
};

// exports.sendTemplateEmail = async (recipientEmail) => {
//   const params = {
//     Source: "development@fenris-group.com",
//     Template: "registrationEmail",
//     Destination: {
//       ToAddresses: [recipientEmail],
//     },
//     TemplateData: "{ \"name':'John Doe'}",
//   };
//   return sesClient.sendTemplatedEmail(params).promise();
// };
