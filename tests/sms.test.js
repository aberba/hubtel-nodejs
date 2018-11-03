const { SMSMessage, Config } = require("..");

const secret = {
    clientId: "XXXXXXXXX",
    clientSecret: "XXXXXXXXXXXXXXXX",
    merchantAccountNumber: "HMXXXXXXXXX"
};

const config = new Config({
    clientId: secret.clientId,
    clientSecret: secret.clientSecret
});

const message = new SMSMessage(config);

message
    .sendOne({
        From: "smsgh",
        To: "+233248183797",
        Content: "hello, world!",
        RegisteredDelivery: "true",
        Time: "2014-01-01 10:00:00"
    })
    .then(responseJSON => {
        console.log(responseJSON);
    })
    .catch(err => console.log(err));

// Using ES6 async and await
(async () => {
    try {
        // using get request

        const response = await message.get({
            From: "smsgh",
            To: "+233248183797",
            Content: "hello, world!",
            RegisteredDelivery: "true",
            Time: "2014-01-01 10:00:00"
        });

        console.log(response);
    } catch (error) {
        console.error(error);
    }
})();
