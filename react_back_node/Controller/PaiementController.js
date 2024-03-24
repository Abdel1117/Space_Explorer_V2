require("dotenv").config();
const stripe = require('stripe')(`${process.env.STRIPE_API_KEY}`)
const { v4: uuidv4 } = require('uuid');
const User = require('../Model/userShema');



exports.handlePaiement = async (req, res, next) => {

    try {
        /* We get the body value here */
        let {amount, currency = "eur"} = req.body;
        console.log(amount)
        console.log(currency)
        amount = Math.round(amount * 100)

        /* We check if the price is right and above 0  */
        if(!amount || isNaN(amount) || amount <= 0 ){
            return res.status(400).json({message : "Prix invalide"})
        }

        const idempotencyKey  = uuidv4()
        const paymentIntent = await stripe.paymentIntents.create({
            amount,
            currency,
            automatic_payment_methods: { enabled: true, allow_redirects: 'never' },
        } ,{idempotencyKey })
        
        return res.status(200).json({clientSecret : paymentIntent.client_secret , paymentIntentId : paymentIntent.id});
    } catch (error) {
        console.log(error)
        return res.status(500).json({message : "Une erreur lors du paiement est survenu"})
    }
}

exports.confirmPaiement = async (req, res, next) => {
    try {
        const { paymentIntendId, paymentMethodId } = req.body;
        
        console.log(req.body)
        console.log(paymentMethodId)
        console.log(paymentIntendId)
        const paymentIntent = await stripe.paymentIntents.confirm(paymentIntendId, {
            payment_method : paymentMethodId
        });

        if (paymentIntent.status === 'succeeded') {
            res.status(200).json({ message: "Paiement réussi", paymentIntendId });

        } else {
            res.status(400).json({ message: "Une erreur lors du paiement est survenu" });
        }
    } catch (error) {
        console.error( error);
        res.status(500).json({ message: "Une erreur serveur est survenue" });
    }
}