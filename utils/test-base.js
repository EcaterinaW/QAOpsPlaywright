const base = require('@playwright/test');

exports.customtest = base.test.extend(
    {
        testDataForOrder: {
            username: "kirovichkate@gmail.com",
            password: "U$u8An!A3DFRbbi",
            productName: "ZARA COAT 3"
        }
    }
);