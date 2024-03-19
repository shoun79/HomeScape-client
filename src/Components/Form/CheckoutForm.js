import { useEffect, useState } from "react";
import { getPaymentIntent, saveBooking } from "../../api/booking";
import { useNavigate } from "react-router-dom";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import toast from "react-hot-toast";

const CheckoutForm = ({ bookingData }) => {
    const [clientSecret, setClientSecret] = useState('');
    const [cardError, setCardError] = useState('');
    const [processing, setProcessing] = useState(false);
    const [transactionId, setTransactionId] = useState('');
    const navigate = useNavigate();
    const stripe = useStripe();
    const elements = useElements();
    const { totalPrice, guestEmail, guestName } = bookingData;

    useEffect(() => {
        getPaymentIntent(totalPrice)
            .then(data => {
                console.log(data);
                setClientSecret(data.clientSecret)
            })

    }, [totalPrice]);



    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            return;
        }
        const card = elements.getElement(CardElement);

        if (card == null) {
            return;
        }

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        });


        if (error) {
            setCardError(error?.message || '')
            console.log('[error]', error);

        } else {
            console.log('[PaymentMethod]', paymentMethod);
            setCardError('')
        }
        setProcessing(true);

        const { paymentIntent, error: intentError } = await stripe.confirmCardPayment(
            clientSecret,
            {
                payment_method: {
                    card: card,
                    billing_details: {
                        name: guestName || 'anonymous',
                        email: guestEmail || 'unknown'
                    },
                },
            },
        );

        if (intentError) {
            setCardError(intentError?.message)
            setProcessing(false)
        }
        else {
            setCardError('')
            setTransactionId(paymentIntent.id)

            //store payment on database
            const data = {
                transactionId: paymentIntent.id,
                ...bookingData
            }
            saveBooking(data)
                .then(data => {
                    setProcessing(false)
                    toast.success('Booking Successful')
                    navigate('/dashboard/my-bookings')
                })
                .catch(err => console.log(err))
        }



    };

    return (
        <>
            <form onSubmit={handleSubmit}>
                <CardElement
                    className="border p-4 rounded-md shadow-md"
                    options={{
                        style: {
                            base: {
                                fontSize: '16px',
                                color: '#424770',
                                '::placeholder': {
                                    color: '#aab7c4',
                                },
                            },
                            invalid: {
                                color: '#9e2146',
                            },
                        },
                    }}
                />
                <button className="mt-4 bg-gradient-to-r from-emerald-500 to-lime-500 rounded-md px-4 py-1 text-white hover:text-gray-300" type="submit" disabled={!stripe || !clientSecret || processing}>
                    Pay
                </button>
            </form>
        </>

    );
};

export default CheckoutForm;