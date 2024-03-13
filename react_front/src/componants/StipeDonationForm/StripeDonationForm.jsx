
import React, { useState, useEffect } from 'react'
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
export const StripeDonationForm = () => {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const stripe = useStripe();
    const elements = useElements();

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsLoading(true);

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card: elements.getElement(CardElement),
        });

        setIsLoading(false);

        if (error) {
            setError(error.message);
        } else {
            // Ici, vous pouvez envoyer le token de paiement au serveur
            console.log('Token de paiement:', paymentMethod);
            // Ou effectuer toute autre action nécessaire, comme afficher un message de réussite
        }
    };
    return (
        <form onSubmit={handleSubmit}>
            <label>
                Carte de crédit
                <CardElement />
            </label>
            {error && <div className="text-red-500">{error}</div>}
            <button type="submit" disabled={!stripe} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" style={{ marginTop: '1rem' }}>
                {isLoading ? 'Traitement...' : 'Payer'}
            </button>
        </form>
    );
}

export default StripeDonationForm;