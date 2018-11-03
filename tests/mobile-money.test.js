const {
    MobileMoney,
    Config,
    getErrorMessageFromResponseCode
} = require("..");

const priv = {
    clientId: "XXXXXXXXX",
    clientSecret: "XXXXXXXXXXXXXXXX",
    merchantAccountNumber: "HMXXXXXXXXX"
};

const config = new Config({
    clientId: priv.clientId,
    clientSecret: priv.clientSecret,
    merchantAccountNumber: priv.merchantAccountNumber
});

const mobileMoney = new MobileMoney(config);

mobileMoney
    .receive({
        CustomerName: "Mary Doe",
        CustomerMsisdn: "05XXXXXXXX",
        CustomerEmail: "user@example.com",
        Channel: "mtn-gh",
        Amount: 7.55,
        PrimaryCallbackUrl: "https://example.com/payment_callback",
        Description: "A bowl of gari",
        ClientReference: "UniqueXXXXX21XX"
    })
    .then(responseJSON => {
        console.log(responseJSON);
        console.log(
            "Response message: ",
            getErrorMessageFromResponseCode(responseJSON.ResponseCode)
        );
    })
    .catch(err => console.log(err));

console.log("Code 0000 message:", getErrorMessageFromResponseCode("0000"));

mobileMoney
    .send({
        RecipientName: "Adongo Samuel",
        RecipientMsisdn: "23327XXXXXXX",
        CustomerEmail: "user@example.com",
        Channel: "tigo-gh",
        Amount: 60.05,
        PrimaryCallbackUrl: "https://example.com/payment_callback",
        SecondaryCallbackUrl: "",
        Description: "Monthly rent payment",
        ClientReference: "UniqueXXXXX21XX"
    })
    .then(responseJSON => console.log(responseJSON))
    .catch(err => console.log(err));

// Cool guys use fat arrows, async and await from ES6 ;)
const payUsualBills = async ClientReference => {
    const paymentData = {
        RecipientName: "Tax tax tax!!",
        RecipientMsisdn: "23327XXXXXXX",
        CustomerEmail: "user@example.com",
        Channel: "tigo-gh",
        Amount: 100000.01,
        PrimaryCallbackUrl: "https://example.com/payment_callback",
        SecondaryCallbackUrl: "",
        Description: "Monthly tax payment"
    };

    return await mobileMoney.send(Object.assign(paymentData, ClientReference)); // object destructuring in future
};

// may thow, wrap in try catch block to handle errors
console.log(payUsualBills("UniqueXXXXX21XX"));
