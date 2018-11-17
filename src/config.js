class MobileMoneyConfig {
    constructor({ clientId, clientSecret, merchantAccountNumber, apiBaseURL }) {
        this.clientId = clientId;
        this.clientSecret = clientSecret;
        this.merchantAccountNumber = merchantAccountNumber;
        this.apiBaseURL =
            apiBaseURL || "https://api.hubtel.com/v1/merchantaccount";
    }
}

class Config {
    constructor({ clientId, clientSecret, merchantAccountNumber, apiBaseURL }) {
        this.clientId = clientId;
        this.clientSecret = clientSecret;
        this.merchantAccountNumber = merchantAccountNumber;
    }
}

class SMSMessageConfig {
    constructor({ clientId, clientSecret, apiBaseURL }) {
        this.clientId = clientId;
        this.clientSecret = clientSecret;
        this.apiBaseURL = apiBaseURL || "https://api.hubtel.com/v1/messages";
    }
}

module.exports = { MobileMoneyConfig, SMSMessageConfig, Config };
