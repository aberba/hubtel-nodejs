const util = require("./util");

class SMSMessage {
    constructor(config) {
        this.config = config;
    }

    async sendOne(messageInfomation) {
        return await this.sendRequest("POST", messageInfomation);
    }

    async schedule(messageInfomation) {
        return await this.sendOne(messageInfomation);
    }

    async reschedule(messageInfomation) {
        return await this.sendRequest("PUT", messageInfomation);
    }

    async cancelSchedule(messageInfomation) {
        return await this.sendRequest("DELETE", messageInfomation);
    }

    async get() {
        return await this.sendRequest("GET", {});
    }

    async query() {
        return await this.get();
    }

    async sendRequest(requestType, messageInfomation) {
        if (!this.config) throw new Error("No configuration received");

        const { apiBaseURL, clientId, clientSecret } = this.config;

        //validate config
        if (!apiBaseURL) throw new Error("No API base URL is set");

        if (!clientId) throw new Error("No client Id is set");

        if (!clientSecret) throw new Error("No client secret is set");

        let url = apiBaseURL;

        const token = util.base64Encode(clientId + ":" + clientSecret);

        let headers = {
            Authorization: `Basic ${token}`,
            Accept: "application/json"
        };

        switch (requestType) {
            case "GET":
                console.log("headers", headers);
                console.log(`GET query url`, url);

                url += "?" + util.objectToQueryString(messageInfomation);
                return await util.fetchJSON(url, {
                    method: "GET",
                    headers
                });
                break;

            case "POST":
            case "PUT":
            case "DELETE":
                const method = requestType; // can be POST or PUT

                headers = Object.assign(
                    { "Content-Type": "application/json" },
                    headers
                );
                console.log("headers", headers);
                console.log(`${requestType} query url`, url);

                return await util.fetchJSON(url, {
                    method,
                    headers,
                    body: JSON.stringify(messageInfomation)
                });

                break;
            default:
                throw new Error("Unknown request type -> SMS.sendRequest().");
                break;
        }
    }
}

module.exports = SMSMessage;
