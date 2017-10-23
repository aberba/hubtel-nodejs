class MobileMoneyConfig {
    constructor({ clientId, clientSecret, merchantAccountNumber, apiBaseURL }) {
        this.clientId = clientId;
        this.clientSecret = clientSecret;
        this.merchantAccountNumber = merchantAccountNumber;
        this.apiBaseURL =
            apiBaseURL || "https://api.hubtel.com/v1/merchantaccount";
    }
}

module.exports = { MobileMoneyConfig };
