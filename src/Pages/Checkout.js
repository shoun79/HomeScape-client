import React, { Fragment, useState } from 'react'
import { Tab } from '@headlessui/react'
import ReviewHouse from '../Components/ReviewHouse'
import CheckoutCart from '../Components/CheckoutCart'
import WhosComing from '../Components/WhosComing'
import { Elements } from "@stripe/react-stripe-js";
import useAuth from '../hooks/useAuth'
import { useLocation } from 'react-router-dom'
import CheckoutForm from '../Components/Form/CheckoutForm'
import { loadStripe } from "@stripe/stripe-js";

const Checkout = () => {
    const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PK);

    const { user } = useAuth();
    const { state: checkoutData } = useLocation();
    const { homeData, totalNights, totalPrice } = checkoutData;

    const [bookingData, setBookingData] = useState({
        home: {
            homeId: homeData?._id,
            image: homeData?.image,
            title: homeData?.title,
            location: homeData?.location,
            from: homeData?.from,
            to: homeData?.to,

        },
        hostEmail: homeData?.host?.email,
        message: '',
        totalPrice: parseFloat(totalPrice),
        guestEmail: user?.email,
        guestName: user?.displayName,


    });

    const [selectedIndex, setSelectedIndex] = useState(0)



    return (
        <div className='md:flex gap-5 items-start justify-between sm:mx-10 md:mx-20 px-4 lg:mx-40 py-4'>
            {/* Details */}
            <div className='flex-1'>
                <Tab.Group
                    selectedIndex={selectedIndex}
                    onChange={setSelectedIndex}
                    defaultIndex={1}
                >
                    <Tab.List>
                        <div className='container flex flex-wrap items-center py-4 mx-auto overflow-y-auto whitespace-nowrap'>
                            <Tab as={Fragment}>
                                {({ selected }) => (
                                    <button
                                        className={selected ? 'text-blue-600' : 'text-gray-600'}
                                    >
                                        1. Reviews house rules
                                    </button>
                                )}
                            </Tab>

                            <span className='mx-5 text-gray-500 dark:text-gray-300 rtl:-scale-x-100'>
                                <svg
                                    xmlns='http://www.w3.org/2000/svg'
                                    className='w-5 h-5'
                                    viewBox='0 0 20 20'
                                    fill='currentColor'
                                >
                                    <path
                                        fillRule='evenodd'
                                        d='M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z'
                                        clipRule='evenodd'
                                    />
                                </svg>
                            </span>
                            <Tab as={Fragment}>
                                {({ selected }) => (
                                    <button
                                        className={selected ? 'text-blue-600' : 'text-gray-600'}
                                    >
                                        2. Who's coming?
                                    </button>
                                )}
                            </Tab>

                            <span className='mx-5 text-gray-500 dark:text-gray-300 rtl:-scale-x-100'>
                                <svg
                                    xmlns='http://www.w3.org/2000/svg'
                                    className='w-5 h-5'
                                    viewBox='0 0 20 20'
                                    fill='currentColor'
                                >
                                    <path
                                        fillRule='evenodd'
                                        d='M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z'
                                        clipRule='evenodd'
                                    />
                                </svg>
                            </span>
                            <Tab as={Fragment}>
                                {({ selected }) => (
                                    <button
                                        className={selected ? 'text-blue-600' : 'text-gray-600'}
                                    >
                                        3. Confirm and pay
                                    </button>
                                )}
                            </Tab>

                        </div>
                    </Tab.List>
                    <Tab.Panels>
                        <Tab.Panel>
                            <ReviewHouse
                                setSelectedIndex={setSelectedIndex}
                                homeData={homeData}
                                totalNights={totalNights}
                            />
                        </Tab.Panel>
                        <Tab.Panel>
                            {/* WhosComing Comp */}
                            <WhosComing
                                setSelectedIndex={setSelectedIndex}
                                host={homeData?.host}
                                bookingData={bookingData}
                                setBookingData={setBookingData}
                            />
                        </Tab.Panel>
                        <Tab.Panel>
                            {/* Payment Comp */}
                            <Elements stripe={stripePromise} >
                                <CheckoutForm bookingData={bookingData} />
                            </Elements>


                        </Tab.Panel>
                    </Tab.Panels>
                </Tab.Group>
            </div>

            {/* Cart */}
            <CheckoutCart homeData={homeData} totalNights={totalNights} />
        </div>
    )
}

export default Checkout