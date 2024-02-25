/* const request = require("supertest");
const app = require("../index");
require("dotenv").config()
const mongoose = require("mongoose")

beforeAll(async () => {
    try {
        await mongoose.connect(`your_connection_string_here`, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        if (process.env.NODE_ENV !== 'test') {
            console.log("Connection to database established successfully");
        }
    } catch (error) {
        console.error("Failed to connect to database:", error);
    }
});


describe("Test the root path", () => {
    test("It should respond to the GET method", async () => {
        await request(app)
            .get("/")
            .expect(200);
    });
});

afterAll(async () => {
    await mongoose.disconnect();

});
 */