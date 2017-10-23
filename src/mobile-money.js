const util = require("./util");

class MobileMoney {
    constructor(config) {
        this.config = config;
    }

    async send(paymentInfomation) {
        return await this.makeTransaction("send", paymentInfomation);
    }

    async receive(paymentInfomation) {
        return await this.makeTransaction("receive", paymentInfomation);
    }

    makeTransaction(type, paymentInfomation) {
        let transactionType;

        switch (type) {
            case "send":
                transactionType = "send";
                break;
            case "receive":
                transactionType = "receive";
                break;
            default:
                throw new Error("Unknown operation received.");
                break;
        }

        const url = `${this.config.apiBaseURL}/merchants/${this.config
            .merchantAccountNumber}/${transactionType}/mobilemoney`;

        const token = util.base64Encode(
            this.config.clientId + ":" + this.config.clientSecret
        );

        let requestHeader = {
            Authorization: `Basic ${token}`,
            "Content-Type": "application/json",
            Accept: "application/json"
        };

        return util.fetchJSON(url, {
            method: "POST",
            headers: requestHeader,
            body: JSON.stringify(paymentInfomation)
        });
    }
}

module.exports = MobileMoney;
