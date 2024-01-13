require("dotenv").config();
const allowedOrigins = [
    process.env.FRONT_ORIGIN,
    process.env.FRONT_ORIGIN_2,
    process.env.BACK_ORIGIN,
    process.env.REAL_URL,
];

module.exports = allowedOrigins;