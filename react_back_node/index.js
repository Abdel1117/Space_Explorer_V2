const express = require('express');
const app = express();
require("dotenv").config()
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const { logger } = require('./Functions/logEvent/logEvent')
const corsOption = require("./config/corsOptions")
const errorHandler = require('./Functions/errorHandler/errorHandler');
const credentials = require("./Functions/credentials/credentials");
const cookieParser = require('cookie-parser');
const mongoose = require("mongoose");
const userRoute = require("./Router/UserRoute")
const forumRoute = require("./Router/ForumRoute")
const imageRoute = require("./Router/ImageRoute")
const articleRoute = require("./Router/ArticleRoute")
const identifiationRoute = require("./Router/IdentificationRoute")
const paiementRoute = require("./Router/PaiementRoute")
const PORT = process.env.PORT || 4000;
const FRONT_URL = process.env.FRONT_ORIGIN
const BDD_USER = process.env.DATABASE_USERNAME
const BDD_PASS = process.env.DATA_BASE_PASS
const BDD_NAME = process.env.BDD_NAME

mongoose.set('strictQuery', true);
mongoose.connect(`mongodb+srv://${BDD_USER}:${BDD_PASS}@mern.m90bhsv.mongodb.net/${BDD_NAME}`)
  .then(() => { console.log("Connexion à la base de donnée réussi") })
  .catch(err => console.log(err))

app.use(logger);

app.use(credentials);

app.use(cors(corsOption));
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', FRONT_URL);
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.use(express.urlencoded({ extended: false }));

app.use(express.json());

app.use(cookieParser());

app.use('/', express.static(path.join(__dirname, '/image/galerie')));
app.use('/', express.static(path.join(__dirname, '/image/image_article')));
app.use('/', express.static(path.join(__dirname, '/image/avatar')));

app.use(bodyParser.json({ limit: "100mb" }));

app.use("/user", userRoute)
app.use("/forum", forumRoute)
app.use("/image", imageRoute)
app.use("/article", articleRoute)
app.use("/tokken", identifiationRoute)
app.use("/paiment", paiementRoute)

app.all('*', (req, res) => {
  res.status(404);
  if (req.accepts('html')) {
    res.sendFile(path.join(__dirname, 'views', '404.html'));
  } else if (req.accepts('json')) {
    res.json({ "error": "404 Not Found" });
  } else {
    res.type('txt').send("404 Not Found");
  }
});

app.use(errorHandler);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));