const { MobileMoneyConfig } = require("./src/config");
const MobileMoney = require("./src/mobile-money");
const util = require("./src/util");

module.exports = {
    MobileMoneyConfig,
    MobileMoney,
    getErrorMessageFromResponseCode: util.getErrorMessageFromResponseCode
};
