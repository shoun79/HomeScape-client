import React, { useEffect, useState } from 'react'
import { getAllBookings } from '../../api/booking';
import Spinner from '../../Components/Spinner/Spinner';
import TableRow from '../../Components/TableRow';

const AllBookings = () => {
  const [bookings, setBookings] = useState(null)
  const [loading, setLoading] = useState(true);

  const fetchBookings = () => {
    getAllBookings()
      .then(data => {
        setLoading(false)
        setBookings(data)
      })
  };

  useEffect(() => {
    fetchBookings();

  }, []);

  // useEffect(() => {
  //   setLoading(true)
  //   getAllBookings().then(data => {

  //     setBookings(data)
  //     setLoading(false)
  //   })
  // }, [user]);
  return (
    <>
      {loading ? (
        <Spinner />
      ) :
        bookings.length < 1 ? <>
          <div className='h-screen text-gray-600 gap-5 flex flex-col justify-center items-center pb-16 text-xl lg:text-3xl'>
            There's no booking data available right now.
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

export default AllBookings
