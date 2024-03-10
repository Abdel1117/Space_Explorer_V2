require("dotenv").config();
const allowedOrigins = [
    process.env.FRONT_ORIGIN,
  
];

module.exports = allowedOrigins;