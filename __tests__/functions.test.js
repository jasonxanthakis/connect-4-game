const each = require('jest-each').default;
const { outputSum } = require("../app.js");

describe(outputSum, () => {
    it("Works", () => {
        expect(outputSum).toBeDefined();
    });
});