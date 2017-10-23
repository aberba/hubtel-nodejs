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
}

util.base64Encode = (text) => {
	return new Buffer(text).toString('base64');
}

// phoneNumber.length prevents JS regex delay attacks
util.isValidPhoneNumber = (phoneNumber) => {
	return (phoneNumber.length == 10) &&
	(phoneNumber.match(/\d/g) || []).length == 10;
}

module.exports = util;
