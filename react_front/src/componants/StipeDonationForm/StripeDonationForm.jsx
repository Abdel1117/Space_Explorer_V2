
import React, { useState, useEffect } from 'react'
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useForm } from 'react-hook-form';
import Toast_invalide from '../Toast_invalide/Toast_invalide';
import Toast_valide from "../Toast_valide/Toast_valide"
import { useNavigate } from 'react-router-dom';
export const StripeDonationForm = ({ amount, user }) => {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [form, setForm] = useState({})
    const [successMessage, setSuccessMessage] = useState("")
    const [errorMessage, setErrorMessage] = useState("")
    const apiUrl = import.meta.env.VITE_API_URL
    /* Handling Form here */
    const { register, handleSubmit, formState: { errors }, watch } = useForm();
    const navigate = useNavigate()
    const cardHolderName = watch("cardholderName");
    const cardHolderEmail = watch("cardHolderEmail ");

    /* End of handling Form */
    const stripe = useStripe();
    const elements = useElements();

    /**
     * Function to handle Paiement with Stripe
     * @author Abderahmane Adjali
     * @date 2024-02-23
     * @returns {Void}
     */
    const onSubmit = async (event) => {
        try {
            event.preventDefault();
            setIsLoading(true);
            if (!stripe || !elements) {
                setErrorMessage("Le système de paiement n'est pas disponible.");
            }
            const cardElement = elements.getElement(CardElement);
            const billingDetails = {
                billing_details: {
                    address: {
                        country: 'FR',
                    },
                    name: cardHolderName,
                    email: cardHolderEmail,
                },
            };
            const { error, paymentMethod } = await stripe.createPaymentMethod({
                type: 'card',
                card: cardElement,
                ...billingDetails,
            });

            if (error) {
                setErrorMessage(error.message);
            }
            const paymentData = {
                paymentMethodId: paymentMethod.id,
                amount: amount,
            };
            const response = await fetch(`${apiUrl}/paiment/paiementLoad`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(paymentData),
            });
            const data = await response.json();

            if (!response.ok) {
                const errorData = await response.json();
                setErrorMessage("Erreur lors de la communication avec le serveur.");
            } else {
                try {
                    const paymentIntentId = data.paymentIntentId
                    const confirmationResponse = await fetch(`${apiUrl}/paiment/paiementConfirm`, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({
                            paymentIntendId: paymentIntentId,
                            paymentMethodId: paymentData.paymentMethodId

                        })
                    })
                    const confirmData = await confirmationResponse.json();

                    if (!confirmationResponse.ok) {
                        setErrorMessage("Erreur lors de la confirmation du paiement")
                    }
                    else {
                        setSuccessMessage("Paiement confirmé, merci de soutenir Space Explorer")
                        console.log('Paiement confirmé:', confirmData);
                    }
                } catch (error) {
                    console.error('Erreur lors de la confirmation du paiement:', error);
                    setErrorMessage("Erreur lors de la confirmation du paiement")
                }
            }

        } catch (error) {
            console.error('Erreur:', error);
            Toast_invalide(`Une erreur lors du paiement est survenu: ${error.message}`);
        } finally {
            setIsLoading(false);
        }
    };


    return (


        <form onSubmit={(e) => { handleSubmit(onSubmit(e)) }}>
            {
                successMessage &&
                <Toast_valide
                    message={successMessage}
                    options={true}
                    doYesAction={() => { navigate("/") }}
                    doNoAction={() => { navigate(`/profil/${user.userId}`) }}
                    choice1='Accueil'
                    choice2='Profil'
                />
            }
            {
                errorMessage &&
                <Toast_invalide message={errorMessage} />
            }
            <div className="max-w-sm mx-auto mt-20 bg-white rounded-md shadow-md overflow-hidden">
                <div className="px-6 py-4 bg-gray-900 text-white">
                    <h1 className="text-lg font-bold">Carte de crédit</h1>
                </div>
                <div className="px-6 py-4">
                    <div className="mb-4">

                        <CardElement />
                    </div>
                    {/* Full Name Input */}
                    <div className="mb-4">
                        <label className="block text-gray-700 font-bold mb-2" htmlFor="cardHolderName">
                            Nom du titulaire de la carte
                        </label>
                        <input
                            onChange={(e) => { handleChange(e) }}
                            id="cardHolderName"
                            name='cardHolderName'
                            className="appearance-none border border-gray-400 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            {...register("cardHolderName", { required: true })}
                            placeholder="Full Name" />
                        {errors.cardHolderName && <p className="text-red-500">Le nom du donateur est requis.</p>}
                    </div>
                    {/*End of Full Name Input */}

                    {/* Email Input */}
                    <div className="mb-4">
                        <label className="block text-gray-700 font-bold mb-2" htmlFor="cardHolderEmail">
                            Email
                        </label>
                        <input
                            onChange={(e) => { handleChange(e) }}
                            id='cardHolderEmail'
                            name='cardHolderEmail'
                            className="appearance-none border border-gray-400 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            {...register("cardholderEmail", { required: true })}
                            placeholder="Email" />
                        {errors.cardholderName && <p className="text-red-500">L'Email est requis.</p>}
                    </div>

                    {/* End of Email Input */}
                    <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full">
                        {isLoading ? "Traitement en cours" : "Payer"}
                    </button>
                </div>
            </div>

            {error && <div className="text-red-500">{error}</div>}
        </form>

    );
}

export default StripeDonationForm;