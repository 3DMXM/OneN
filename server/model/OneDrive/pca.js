const msal = require('@azure/msal-node');
const {token}  = require("../config");

const axios = require("axios");

const config = {
    auth: {
        clientId: token.clientId,
        authority: token.authority,
        clientSecret: token.clientSecret
    },
    system: {
        loggerOptions: {
            loggerCallback(loglevel, message, containsPii) {
                console.log(message);
            },
            piiLoggingEnabled: false,
            logLevel: msal.LogLevel.Error,
        }
    }
};
// 创建 msal 应用程序对象
const pca = new msal.ConfidentialClientApplication(config);
// const pca = new msal.PublicClientApplication(config);

module.exports = pca;