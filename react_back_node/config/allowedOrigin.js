require("dotenv").config();

// FRONT_ORIGIN accepte plusieurs origines séparées par des virgules,
// ex : FRONT_ORIGIN=http://localhost,http://localhost:5173 (nginx + Vite en local)
const allowedOrigins = (process.env.FRONT_ORIGIN || "")
    .split(",")
    .map((origin) => origin.trim())
    .filter(Boolean);

module.exports = allowedOrigins;
