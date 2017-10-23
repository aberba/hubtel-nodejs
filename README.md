# Hubtel API
This is an unofficial [Hubtel API](https://hubtel.com) for Node.js.

## Installation
Using Node.js v8.X or lastest, you install using:

```sh
npm install hubtel-mx
```

## Mobile Money API
The `MobileMoneyConfig` class is used for API configuration. Substitute information provided below with your own account information. Check the [Hubtel Merhcant API Documentation](https://developers.hubtel.com/documentations/merchant-account-api) for more infomation.

> From a security standpoint, it much safer to store your merhcant account API keys and other confidential information in environment variables instead of hard-coding them in your source code.

```js
const {
    MobileMoney,
    MobileMoneyConfig,
    getErrorMessageFromResponseCode
} = require("hubtel-mx");

const priv = {
    clientId: "XXXXXXXXX",
    clientSecret: "XXXXXXXXXXXXXXXX",
    merchantAccountNumber: "HMXXXXXXXXX"
};

const config = new MobileMoneyConfig({
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

// Getting errors messages
console.log("Code 0000 message:", getErrorMessageFromResponseCode("0000"));

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
```

## Note
The `String getErrorMessageFromResponseCode(String code)` function returns an error message using the API response code passed as an argument. Some of these messages are modified versions of what is available in the documentation... such that it is much clearer (in my judgement) when displayed to a customer than those provided by the API response (`responseJSON.Data.Description`). Use `responseJSON.Data.Description` to be on par with Hubtel.

## Todo
* SMS API
* Create schema for send and receive payment data with in-built validation
* Improve code test coverage
    - `send()` and `receive()`
    - API call responses
* Improve API documentation
