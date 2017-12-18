const fetch = require("node-fetch");

var util = {};

util.fetchJSON = (hostURL, options) => {
    return fetch(hostURL, options)
        .then(res => {
            console.log(res);
            return res.json();
        })
        .catch(err => {
            throw err;
        });
};

util.base64Encode = text => {
    return new Buffer(text).toString("base64");
};

// phoneNumber.length prevents JS regex delay attacks
util.isValidPhoneNumber = phoneNumber => {
    return (
        phoneNumber.length == 10 &&
        (phoneNumber.match(/\d/g) || []).length == 10
    );
};

util.getErrorMessageFromResponseCode = mobileMoneyErrorCode => {
    const codeWithMessages = [
        {
            code: "0000",
            message: "The transaction has been processed successfully."
        },
        {
            code: "0001",
            message:
                "Request has been accepted. A callback will be sent on final state."
        },
        // merchant errors
        {
            code: "3009",
            message:
                "Merchant account is not available. Check to confirm if your merchant account number is valid"
        },
        {
            code: "4101",
            message:
                "Authorisation for request was denied. Ensure that your're providing the correct Basic Auth key for the Authorization header."
        },
        {
            code: "4105",
            message:
                "Authenticated organisation not owner of specified account number. There's a mismatch of the Merchant Account number and the the Basic Authorisation key."
        },

        // customer erros
        {
            code: "2050",
            message:
                "The MTN Mobile Money wallet has insufficient funds to make this payment."
        },
        {
            code: "2051",
            message:
                "The mobile number provided is not registered on MTN Mobile Money."
        },
        {
            code: "2100",
            message:
                "The request failed as the customer's phone is switched off."
        },
        {
            code: "2101",
            message:
                "The transaction failed as the PIN entered by the Airtel Money customer is invalid."
        },
        {
            code: "2102",
            message:
                "The Airtel Money user has insufficient funds in wallet to make this payment."
        },
        {
            code: "2103",
            message:
                "The mobile number specified is not registered on Airtel Money."
        },
        {
            code: "2152",
            message:
                "The mobile number specified is not registered on Tigo cash."
        },
        {
            code: "2153",
            message:
                "The amount specified is more than the maximum allowed by Tigo Cash."
        },
        {
            code: "2154",
            message:
                "The amount specified is more than the maximum daily limit allowed by Tigo Cash."
        },
        {
            code: "2200",
            message:
                "The recipient specified is not registered on Vodafone Cash."
        },
        {
            code: "2201",
            message:
                " The customer specified is not registered on Vodafone Cash."
        }
    ];

    const foundItem = codeWithMessages.find(
        item => item.code === mobileMoneyErrorCode
    );

    return foundItem ? foundItem.message : null;
};

util.objectToQueryString = obj => {
    return Object.keys(obj)
        .map(k => `${encodeURIComponent(k)}=${encodeURIComponent(obj[k])}`)
        .join("&");
};
module.exports = util;
