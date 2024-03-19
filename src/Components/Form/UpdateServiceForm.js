import { CalendarIcon } from '@heroicons/react/20/solid'
import React from 'react'
import DatePicker from 'react-datepicker'
import SmallSpinner from '../Spinner/SmallSpinner';

const UpdateServiceForm = ({
    handleSubmit,
    handleImageUpload,
    arrivalDate,
    setArrivalDate,
    departureDate,
    setDepartureDate,
    homeData,
    setHomeData,
    isLoading,
    previewImg,
    uploadButtonText }) => {
    return (
        <div className='flex justify-center mt-6'>
            <div className='w-full max-w-md p-8 space-y-3 text-gray-800 rounded-xl bg-gray-50'>
                <form onSubmit={handleSubmit} className='space-y-6 ng-untouched ng-pristine ng-valid'>
                    <div className='space-y-1 text-sm'>
                        <label htmlFor='location' className='block text-gray-600'>
                            Location
                        </label>
                        <input
                            value={homeData?.location}
                            onChange={e => setHomeData({ ...homeData, location: e.target.value })}
                            className='w-full px-4 py-3 text-gray-800 border border-green-300 focus:outline-green-500 rounded-md bg-green-50'
                            name='location'
                            id='location'
                            type='text'
                            placeholder='Location'
                            required
                        />
                    </div>
                    <div className='space-y-1 text-sm'>
                        <label htmlFor='title' className='block text-gray-600'>
                            Title
                        </label>
                        <input
                            value={homeData?.title}
                            onChange={e => setHomeData({ ...homeData, title: e.target.value })}
                            className='w-full px-4 py-3 text-gray-800 border border-green-300 focus:outline-green-500 rounded-md bg-green-50'
                            name='title'
                            id='title'
                            type='text'
                            placeholder='Title'
                            required
                        />
                    </div>

                    <div className='flex justify-between '>
                        <div className='shadow-md rounded-md my-2 p-3 flex justify-between items-center'>
                            <div>
                                <p className='block text-sm text-gray-500'>From</p>
                                <DatePicker selected={arrivalDate} onChange={date => setArrivalDate(date)} className='w-2/3' />
                            </div>

                            <CalendarIcon className='h5 w-5' />
                        </div>
                        <div className='shadow-md rounded-md my-2 p-3 flex justify-between items-center'>
                            <div>
                                <p className='block text-sm text-gray-500'>To</p>
                                <DatePicker selected={departureDate} onChange={date => setDepartureDate(date)} className='w-2/3' />
                            </div>

                            <CalendarIcon className='h5 w-5' />
                        </div>
                    </div>

                    <div className='flex justify-between gap-2'>
                        <div className='space-y-1 text-sm'>
                            <label htmlFor='price' className='block text-gray-600'>
                                Price
                            </label>
                            <input
                                value={homeData?.price}
                                onChange={e => setHomeData({ ...homeData, price: e.target.value })}
                                className='w-full px-4 py-3 text-gray-800 border border-green-300 focus:outline-green-500 rounded-md bg-green-50'
                                name='price'
                                id='price'
                                type='number'
                                placeholder='Price'
                                required
                            />
                        </div>

                        <div className='space-y-1 text-sm'>
                            <label htmlFor='guest' className='block text-gray-600'>
                                Total guest
                            </label>
                            <input
                                value={homeData?.total_guest}
                                onChange={e => setHomeData({ ...homeData, total_guest: e.target.value })}
                                className='w-full px-4 py-3 text-gray-800 border border-green-300 focus:outline-green-500 rounded-md bg-green-50'
                                name='total_guest'
                                id='guest'
                                type='number'
                                placeholder='Total guest'
                                required
                            />
                        </div>
                    </div>

                    <div className='flex justify-between gap-2'>
                        <div className='space-y-1 text-sm'>
                            <label htmlFor='bedrooms' className='block text-gray-600'>
                                Bedrooms
                            </label>
                            <input
                                value={homeData?.bedrooms}
                                onChange={e => setHomeData({ ...homeData, bedrooms: e.target.value })}
                                className='w-full px-4 py-3 text-gray-800 border border-green-300 focus:outline-green-500 rounded-md bg-green-50'
                                name='bedrooms'
                                id='bedrooms'
                                type='number'
                                placeholder='Bedrooms'
                                required
                            />
                        </div>

                        <div className='space-y-1 text-sm'>
                            <label htmlFor='bathrooms' className='block text-gray-600'>
                                Bathrooms
                            </label>
                            <input
                                value={homeData?.bathrooms}
                                onChange={e => setHomeData({ ...homeData, bathrooms: e.target.value })}
                                className='w-full px-4 py-3 text-gray-800 border border-green-300 focus:outline-green-500 rounded-md bg-green-50'
                                name='bathrooms'
                                id='bathrooms'
                                type='number'
                                placeholder='Bathrooms'
                                required
                            />
                        </div>
                    </div>

                    <div className='flex space-x-4 items-center'>
                        <label
                            htmlFor='image'
                            className='p-3 text-center rounded-md cursor-pointer text-gray-500 font-bold border  border-green-600 hover:bg-gradient-to-r hover:from-blue-500 hover:to-green-400 hover:border-white hover:text-white'
                        >
                            {uploadButtonText}
                            <input
                                onChange={e => handleImageUpload(e.target.files[0])}
                                type='file'
                                name='image'
                                id='image'
                                accept='image/*'
                                hidden
                            />
                        </label>
                        {previewImg && <img src={previewImg} alt='preview' className='w-16 h-16' ></img>}
                    </div>

                    <div className='space-y-1 text-sm'>
                        <label htmlFor='description' className='block text-gray-600'>
                            Description
                        </label>

                        <textarea
                            value={homeData?.description}
                            onChange={event =>
                                setHomeData({ ...homeData, description: event.target.value })
                            }
                            id='description'
                            className='block rounded-md focus:green-300 w-full h-20 px-4 py-3 text-gray-800 bg-green-50 border border-green-300 focus:outline-green-500 '
                            name='description'
                        ></textarea>
                    </div>

                    <button
                        type='submit'
                        className='block w-full p-3 text-center font-medium tracking-wide text-white transition duration-200 rounded shadow-md bg-gradient-to-r from-emerald-500 to-lime-500 hover:bg-gray-200 hover:text-gray-700 focus:shadow-outline focus:outline-none'
                    >
                        {isLoading ? <SmallSpinner /> : 'Update'}

                    </button>
                </form>
            </div>
        </div>
    );
};

export default UpdateServiceForm;