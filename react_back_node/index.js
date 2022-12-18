const express = require('express');
const http = require('http');
const mongoose = require('mongoose');
const cors = require('cors');
const userRoutes = require("./Router/inscriptionRoute");

mongoose.connect("mongodb+srv://abdel1117:Fermetageule14@mern.m90bhsv.mongodb.net/test")
.then(()=> {console.log("Connexion à la base de donnée réussi")})
.catch(err => console.log(err))

const app = express();
app.use(cors)
app.use('/inscription',userRoutes)

app.set("port", process.env.PORT || 4000);




