const express = require('express');
const router = express.Router();
const paiementStripeController = require("../Controller/PaiementController")

router.post("/paiementLoad", paiementStripeController.handlePaiement)




module.exports = router