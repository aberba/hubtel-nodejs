# Hubtel API

# Hubtel Mobile Payment
This is an unofficial [Hubtel API](https://hubtel.com) for Node.js.

# Installation
Using Dub, you may add `hubtel` as dependency in your `dub.json` file and the package will be downloaded automatically during project build if it's not downloaded already.

```sh
npm install hubtel
```

# API configuration

The `Config` class is used for API configuration. Substitute information provided below with your own account information. Check the [Hubtel Merhcant API Documentation](https://developers.hubtel.com/documentations/merchant-account-api) for more infomation.

> From a security standpoint, it much safer to store your merhcant account API keys and other confidential information in environment variables instead of hard-coding them in your source code.

```d
const {Config, MobileMoney} = require("hubtel");

const userSendData = 
    {
        "RecipientName": "John Doe",
        "RecipientMsisdn": "233264545335",
        "CustomerEmail": "johndoe@gmail.com",
        "Channel": "airtel-gh",
        "Amount": 4.00,
        "PrimaryCallbackUrl": "https://payment.johndoe.com/payment-send-callback" ,
        "SecondaryCallbackUrl": "",
        "Description": "Ordered 2 packages of waakye",
        "ClientReference": "10652132"
    };

const userReceiveData =
    {
        "CustomerName": "Mary Doe",
        "CustomerMsisdn": "233264545335",
        "CustomerEmail": "marydoe@gmail.com",
        "Channel": "airtel-gh",
        "Amount": 7.50,
        "PrimaryCallbackUrl": "https://payment.marydoe.com/payment-receive-callback",
        "Description": "One bowl of Gari"
    };

    const config = new Config({
            clientId;
            clientSecret;
            merchantAccountNumber;
            apiBaseURL: "" // Optinal, will use https://api.hubtel.com/v1/ by default
            merchantaccount";
        })

        "YOUR_CLIENT_ID", "YOUR_CLIENT_SECRET", "YOUR_MERHCHANT_ACCOUNT_NUMBER");
    MobileMoney pay = MobileMoney(config);

    // Sending payment
    auto sendResult = pay.send(userSendData);
    if (sendResult.error)
    {
        //Take appropriate action here
        string errorMessage = sendResult.response;
    }

    //Connection went through. Use response to determine what happended
    writeln(sendResult.response);


    // Recieving payment
    auto receiveResult = pay.receive(userReceiveData);
     if (receiveResult.error)
    {
        //Take appropriate action here
        string errorMessage = receiveResult.response;
    }

    //Connection went through. Use response to determine what happended
    writeln(receiveResult.response);
}
```

# Todo
* Create schema for send and receive payment data
* Improve code test coverage
    - contract for `send()` and `receive()`
    - API call response
    - `Config()`
* Improve API documentation
