const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const {json } = require('body-parser');
const bodyParser = require('body-parser');
const http = require('http');
const userRoutes = require("./Router/inscriptionRoute");


mongoose.set('strictQuery', true);
mongoose.connect("mongodb+srv://abdel1117:Fermetageule14@mern.m90bhsv.mongodb.net/test")
.then(()=> {console.log("Connexion à la base de donnée réussi")})
.catch(err => console.log(err))

const app = express();
app.use(bodyParser)
app.get("/" , (req, res, next) => {
    res.send("Hello World");
    next();

})

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });
  
app.use('/inscription',userRoutes)



module.exports = app 