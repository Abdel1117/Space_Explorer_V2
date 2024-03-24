// src/components/__tests__/StripeDonationForm.test.js

import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, fireEvent, waitFor } from '@testing-library/react'
import { StripeDonationForm } from '../src/componants/StipeDonationForm/StripeDonationForm'
import { BrowserRouter } from 'react-router-dom'
import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'


vi.mock('@stripe/react-stripe-js', () => ({
    useStripe: vi.fn().mockReturnValue({
        createPaymentMethod: vi.fn().mockResolvedValue({
            paymentMethod: { id: 'test_payment_method_id' },
        }),
    }),
    useElements: vi.fn().mockReturnValue({
        getElement: vi.fn().mockReturnValue({}), // Retourne un objet mocké pour CardElement
    }),
    Elements: vi.fn(({ children }) => <>{children}</>),
    CardElement: () => <div></div>,
}));

vi.mock('react-router-dom', async () => {
    const originalModule = await vi.importActual('react-router-dom');
    return {
        ...originalModule,
        useNavigate: vi.fn(() => vi.fn()),
    };
});

vi.mock('global', () => ({
    ...vi.importActual('global'),
    fetch: vi.fn(() => Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ paymentIntentId: 'pi_123456', success: true }),
    })),
}));
const stripePromise = loadStripe(`${import.meta.env.VITE_STRIPE_PUBLIC_KEY}`);

describe('StripeDonationForm', () => {

    beforeEach(() => {
        global.fetch = vi.fn(() =>
            Promise.resolve({
                ok: true,
                json: () => Promise.resolve({ paymentIntentId: 'pi_123456', success: true }),
            })
        );
        console.log("Fetch mock setup done.");
    });
    beforeEach(() => {
        vi.clearAllMocks();
        global.fetch = vi.fn(() =>
            Promise.resolve({
                ok: true,
                json: () => Promise.resolve({ paymentIntentId: 'pi_123456', success: true }),
            })
        );
    });
    afterEach(() => {
        vi.restoreAllMocks();
    });
    it('renders correctly', () => {
        const { getByText } = render(
            <BrowserRouter>
                <Elements stripe={stripePromise}>
                    <StripeDonationForm amount={1000} user={{ userId: 'user123' }} />
                </Elements>
            </BrowserRouter>
        );
        expect(getByText('Carte de crédit')).toBeInTheDocument();
    });

    it('submits the form successfully', async () => {
        const { getByLabelText, getByText, findByText } = render(
            <BrowserRouter>
                <Elements stripe={stripePromise}>
                    <StripeDonationForm amount={1000} user={{ userId: 'user123' }} />
                </Elements>
            </BrowserRouter>
        );


        fireEvent.change(getByLabelText(/nom du titulaire de la carte/i), { target: { value: 'John Doe' } });
        fireEvent.change(getByLabelText(/Email/i), { target: { value: 'john.doe@example.com' } });
        fireEvent.submit(getByText(/Payer/i));


    });
});
