const { MobileMoney, MobileMoneyConfig } = require(".");

const config = new MobileMoneyConfig({
    clientId: "HMXXXXXXXXX",
    clientSecret: "XXXXXXXXXXXXXXXX",
    merchantAccountNumber: "XXXXXXXXXXXXXXXX",
});

const mobileMoney = new MobileMoney(config);

mobileMoney
    .receive({
        CustomerName: "Mary Doe",
        CustomerMsisdn: "0542348455",
        CustomerEmail: "karabutaworld@gmail.com",
        Channel: "mtn-gh",
        Amount: 0.05,
        PrimaryCallbackUrl: "https://example.com/payment_callback",
        Description: "Bowl of Gari",
        ClientReference: "UniqueXXXXX21XX"
    })
    .then(resJSON => console.log(resJSON))
    .catch(err => console.log(err));
