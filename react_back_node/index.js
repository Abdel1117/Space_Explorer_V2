const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Route = require("./Router/Routes");

mongoose.set('strictQuery', true);
mongoose.connect("mongodb+srv://abdel1117:Fermetageule14@mern.m90bhsv.mongodb.net/test")
    .then(() => { console.log("Connexion à la base de donnée réussi") })
    .catch(err => console.log(err))

const app = express();
app.use(cors())
app.use(cookieParser());
app.use(bodyParser.json({ limit: "100mb" }));

app.use('/', Route)


module.exports = app 