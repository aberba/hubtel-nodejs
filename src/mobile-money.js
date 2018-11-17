const util = require("./util");

class MobileMoney {
    constructor(config) {
        this.config = config;
    }

    async send(paymentInformation) {
        return await this.makeTransaction("send", paymentInformation);
    }

    async receive(paymentInformation) {
        return await this.makeTransaction("receive", paymentInformation);
    }

    async makeTransaction(type, paymentInformation) {
        let transactionType;

        switch (type) {
            case "send":
                transactionType = "send";
                break;
            case "receive":
                transactionType = "receive";
                break;
            default:
                throw new Error("Unknown operation: makeTransaction().");
                break;
        }

        if (!this.config) throw new Error("No configuration received");

        const {
            merchantAccountNumber,
            clientId,
            clientSecret
        } = this.config;

        //validate config
        if (!apiBaseURL) throw new Error("No API base URL is set");

        if (!merchantAccountNumber)
            throw new Error("No merchant account number is set");

        if (!clientId) throw new Error("No client Id is set");

        if (!clientSecret) throw new Error("No client secret is set");

        const url = `https://api.hubtel.com/v1/merchantaccount/merchants/${merchantAccountNumber}/${transactionType}/mobilemoney`;
        const token = util.base64Encode(clientId + ":" + clientSecret);

        let headers = {
            Authorization: `Basic ${token}`,
            "Content-Type": "application/json",
            Accept: "application/json"
        };

        return await util.fetchJSON(url, {
            method: "POST",
            headers,
            body: JSON.stringify(paymentInformation)
        });
    }
}

module.exports = MobileMoney;
