import React, { useEffect, useState } from 'react'
import HomeCard from '../Components/Card/HomeCard'
import Spinner from '../Components/Spinner/Spinner'
import { getAllHomes } from '../api/services';

const AllHome = () => {
  const [homes, setHome] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAllHomes()
      .then(data => {
        setHome(data)
        setLoading(false)
      })

  }, []);
  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <section className='text-gray-600 body-font'>
          <div className='container pb-8 pt-2 mx-auto'>
            <div className='flex flex-wrap'>
              {homes.map(home => (
                <HomeCard home={home} key={home._id} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  )
}

export default AllHome
