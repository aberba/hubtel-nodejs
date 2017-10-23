# Hubtel API

# Hubtel Mobile Payment
This is an unofficial [Hubtel API](https://hubtel.com) for Node.js.

# Installation
Using Node.js v8.X or lastest, you install using:

```sh
npm install hubtel-mx
```

# API configuration

The `MobileMoneyConfig` class is used for API configuration. Substitute information provided below with your own account information. Check the [Hubtel Merhcant API Documentation](https://developers.hubtel.com/documentations/merchant-account-api) for more infomation.

> From a security standpoint, it much safer to store your merhcant account API keys and other confidential information in environment variables instead of hard-coding them in your source code.

```js
const { MobileMoney, MobileMoneyConfig } = require("hubtel-mx");

const priv = {
    clientId: "HMXXXXXXXXX",
    clientSecret: "XXXXXXXXXXXXXXXX",
    merchantAccountNumber: "XXXXXXXXXX"
};

const config = new MobileMoneyConfig({
    clientId: priv.clientId,
    clientSecret: priv.clientSecret,
    merchantAccountNumber: priv.accountNumber
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
```

# Todo
* Create schema for send and receive payment data
* Improve code test coverage
    - contract for `send()` and `receive()`
    - API call response
    - `MobileMoneyConfig()`
* Improve API documentation
