const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const corsOptions = require('./config/corsOptions')
const { logger } = require('./Functions/logEvent/logEvent')
const errorHandler = require('./Functions/errorHandler/errorHandler');
const credentials = require("./Functions/credentials/credentials");
const cookieParser = require('cookie-parser');
const Route = require('./Router/Routes')
const mongoose = require("mongoose");
const PORT = process.env.PORT || 4000;

mongoose.set('strictQuery', true);
mongoose.connect("mongodb+srv://abdel1117:Fermetageule14@mern.m90bhsv.mongodb.net/test")
  .then(() => { console.log("Connexion à la base de donnée réussi") })
  .catch(err => console.log(err))


app.use(logger);


app.use(credentials);


app.use(cors(corsOptions));

app.use(express.urlencoded({ extended: false }));


app.use(express.json());


app.use(cookieParser());

app.use('/', express.static(path.join(__dirname, '/image/galerie')));
app.use('/', express.static(path.join(__dirname, '/image/image_article')));
app.use('/', express.static(path.join(__dirname, '/image/avatar')));


app.use(bodyParser.json({ limit: "100mb" }));

app.use('/', Route)


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