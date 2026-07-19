require("dotenv").config();
const allowedOrigins = [
    process.env.FRONT_ORIGIN,
].filter(Boolean);

module.exports = allowedOrigins;
