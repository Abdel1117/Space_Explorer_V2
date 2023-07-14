require("dotenv").config();
const allowedOrigins = [
    process.env.REAL_URL,
    process.env.FRONT_ORIGIN,
    process.env.BACK_ORIGIN

];

module.exports = allowedOrigins;