const helloWorld = require("../Functions/authChecker/refreshToken")

describe('Test', () => {
    test("return Hello World", () => {
        expect(helloWorld()).toBe("Hello World")
    })
})