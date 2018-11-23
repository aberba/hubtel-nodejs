# Hubtel API
This is an unofficial [Hubtel API](https://hubtel.com) for Node.js.

## Installation
Using Node.js v8.X or latest, you install using:

```sh
npm install @aberba/hubtel
```

> WARNING: Hubtel's APIs have some quirks, rules and restrictions you need to be aware of. Before using this package, I recommend you read on their [API reference](https://developers.hubtel.com/v1.0/reference) related to the service you're planning to use. Believe me, you'll use to save yourself days of...whew...hmm...frustration. 

> From a security standpoint, it much safer to store all account API keys and other credentials in environment variables instead of hard-coding them in your source code.


## Mobile Money API
The `Config` class is used for API configuration. Substitute information provided below with your own account information. Check the [Hubtel Merhcant API Documentation](https://developers.hubtel.com/documentations/merchant-account-api) for more information.

```js
const {
    MobileMoney,
    Config,
    getErrorMessageFromResponseCode
} = require("@aberba/hubtel");

// Use your own account credentials
const secret = {
    clientId: "XXXXXXXXX",
    clientSecret: "XXXXXXXXXXXXXXXX",
    merchantAccountNumber: "HMXXXXXXXXX"
};

const config = new Config({
    clientId: secret.clientId,
    clientSecret: secret.clientSecret,
    merchantAccountNumber: secret.merchantAccountNumber
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

// may throw, wrap in try catch block to handle errors
console.log(payUsualBills("UniqueXXXXX21XX"));
```

### Note (Mobile Money API)
The `String getErrorMessageFromResponseCode(String code)` function returns an error message using the API response code passed as an argument. Some of these messages are modified versions of what is available in the documentation... such that it is much clearer (in my judgement) when displayed to a customer than those provided by the API response (`responseJSON.Data.Description`). Use `responseJSON.Data.Description` to be on par with Hubtel.


## SMS Messaging API
The `Config` class is used for API configuration. Substitute information provided below with your own account information. Check the [Hubtel SMS API Documentation](https://developers.hubtel.com/documentations/sendmessage) for more information.

```js
const { SMSMessage, Config } = require("@aberba/hubtel");

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
        // using GET request
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
```

### Note (SMS Messaging API)
Other functions are available for sending SMS messaging. See the SMS messaging documentation for other parameters they accept.  List include:

* `sendOne(messageInfomation) {}`: Sends a single message
* `schedule(messageInfomation) {}`: Schedule message to be sent later at time provided as `Time` argument.

> The URL used in API configuration can be overridden by setting `apiBaseURL` parameter of `Config()` class during instantiation.

> ```js
> const config = new Config({
>       apiBaseURL: "https://api.hubtel.com/v1/messages/{MESSAGE_ID}",
>       clientId: secret.clientId,
>       clientSecret: secret.clientSecret
> });
```

* `reschedule(messageInfomation) {}`: Reschedule messages to be sent later at time provided as `Time` argument. Configuration URL must be in the format `https://api.hubtel.com/v1/messages/{messageId}` .
* `cancelSchedule() {}`: Cancels a scheduled message that has not already been sent using the message ID provided as argument to the configuration  Configuration URL must be in the format `https://api.smsgh.com/v3/messages/{messageId}` .
* `get(messageInfomation) {}`: Send message using GET request. Parameters are transformed to encoded URL query parameters.
* ` query() {}`:  Query messages that have been sent or received on your account.


## Todo
* Create schema for send and receive payment data with in-built validation
* Improve code test coverage
    - `send()` and `receive()`
    - API call responses
* Improve API documentation


## Hacking
You are welcomed to submit pull request on the code and documentation or make suggestions on the APIs.
