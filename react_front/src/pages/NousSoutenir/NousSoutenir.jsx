import React, { useState, useContext, useEffect } from 'react'
import { Helmet } from 'react-helmet'
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import userContext from '../../Context/userContext.jsx';
import DonationAstro from "../../assets/images/GiveAway-removebg.png"
import { Locked } from "../../componants/Locked/Locked.jsx"
import StripeDonationForm from '../../componants/StipeDonationForm/StripeDonationForm';


export const NousSoutenir = () => {
    const [selectedAmount, setSelectedAmount] = useState(null);
    const publicApiKey = import.meta.env.VITE_STRIPE_PUBLIC_KEY;
    const stripePromise = loadStripe(publicApiKey);

    const { userAuth } = useContext(userContext);


    return (
        <section className="min-h-screen">
            <Helmet>
                <meta charSet="utf-8" />
                <title>Space Explorer | Don</title>
                <meta name="description" content="Space Explorer est un site sans publicité, ainsi des dons afin d'améliorer le service seraient appréciés." />
            </Helmet>
            <h1 className='mx-auto  py-4 md:pt-8 text-lg md:text-xl xl:text-2xl dark:text-white text-center first-letter:uppercase'>Soutenir Space Explorer</h1>

            {userAuth === undefined ?

                <Locked /> :

                <div className='rounded-lg  mx-auto w-9/12 md:w-[800px] min-h-[400px] bg-light-blue dark:bg-dark-blue relative'>
                    <img className='max-w-[300px] md:max-w-[400px] h-auto mx-auto' src={DonationAstro} alt="Image astronaute tenant un sac remplie d'argent" />

                    <div className='grid grid-cols-3 gap-4'>
                        <div className='h-[200px] w-auto rounded-md shadow-xl bg-light-violet dark:bg-dark-violet'>
                            <h2 className="text-black dark:text-white text-xl md:text-3xl text-center mt-10 font-bold">5€</h2>
                            <div className='text-center'>
                                <button onClick={() => setSelectedAmount(5)} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mt-4 mx-auto cursor"
                                    disabled={selectedAmount != null ? true : false}
                                >
                                    Offrir
                                </button>
                            </div>
                        </div>
                        <div className='h-4200px w-auto rounded-md shadow-xl bg-light-violet dark:bg-dark-violet'>
                            <h2 className="text-black dark:text-white text-xl md:text-3xl text-center mt-10 font-bold">10€</h2>
                            <div className='text-center'>
                                <button onClick={() => setSelectedAmount(10)} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mt-4 mx-auto cursor"
                                    disabled={selectedAmount != null ? true : false}
                                >
                                    Offrir
                                </button>
                            </div>
                        </div>
                        <div className='h-4200px w-auto rounded-md shadow-xl bg-light-violet dark:bg-dark-violet'>
                            <h2 className="text-black dark:text-white text-xl md:text-3xl className='mx-auto' text-center mt-10 font-bold">15€</h2>
                            <div className='text-center'>
                                <button onClick={() => setSelectedAmount(15)} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mt-4 mx-auto cursor"
                                    disabled={selectedAmount != null ? true : false}
                                >
                                    Offrir
                                </button>
                            </div>
                        </div>
                    </div>
                    {selectedAmount && (
                        <div className='absolute bottom-[45%] right-[50%] translate-x-[50%]  w-full'>

                            <Elements stripe={stripePromise}>
                                <StripeDonationForm amount={selectedAmount} user={userAuth} />
                            </Elements>
                        </div>
                    )}

                </div>
            }
        </section>
    );
};