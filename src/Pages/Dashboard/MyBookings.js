import React, { useEffect, useState } from 'react'


import useAuth from '../../hooks/useAuth'
import Spinner from '../../Components/Spinner/Spinner';
import { getUserBookings } from '../../api/booking';
import TableRow from '../../Components/TableRow';
import { Link } from 'react-router-dom';
import PrimaryButton from '../../Components/Button/PrimaryButton';



const MyBookings = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true)
  const [bookings, setBookings] = useState([]);

  const fetchBookings = () => {
    getUserBookings(user?.email)
      .then(data => {
        setLoading(false)
        setBookings(data)
      })
  };

  useEffect(() => {
    fetchBookings();

  }, [user?.email]);




  return (
    <>
      {loading ? (
        <Spinner />
      ) :
        bookings.length < 1 ? <>
          <div className='h-screen text-gray-600 gap-5 flex flex-col justify-center items-center pb-16 text-xl lg:text-3xl'>
            You haven't booked any home yet.
            <Link to='/all-homes'>
              <PrimaryButton classes='px-6 py-2 text-medium font-semibold rounded-full'>
                Browse Homes
              </PrimaryButton>
            </Link>
          </div>
        </> :
          (
            <div className='container mx-auto px-4 sm:px-8'>
              <div className='py-8'>
                <div className='-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto'>
                  <div className='inline-block min-w-full shadow rounded-lg overflow-hidden'>
                    <table className='min-w-full leading-normal'>
                      <thead>
                        <tr>
                          <th
                            scope='col'
                            className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                          >
                            Title
                          </th>
                          <th
                            scope='col'
                            className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                          >
                            Location
                          </th>
                          <th
                            scope='col'
                            className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                          >
                            Price
                          </th>
                          <th
                            scope='col'
                            className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                          >
                            From
                          </th>
                          <th
                            scope='col'
                            className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                          >
                            To
                          </th>
                          <th
                            scope='col'
                            className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                          >
                            Action
                          </th>
                        </tr>
                      </thead>
                      <tbody>

                        {
                          bookings.map(booking => <TableRow key={booking._id} booking={booking} fetchBookings={fetchBookings}></TableRow>)
                        }

                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          )}
    </>
  )
}

export default MyBookings
