import React, { useEffect, useState } from 'react'
import Spinner from '../Components/Spinner/Spinner'
import SearchForm from '../Components/Form/SearchForm';
import ExpCard from '../Components/Card/ExpCard';
import { Link } from 'react-router-dom';
import HomeCard from '../Components/Card/HomeCard';
const Home = () => {
  const [loading, setLoading] = useState(false);
  const [allExps, setAllExps] = useState([]);

  useEffect(() => {
    fetch('expdata.json')
      .then(res => res.json())
      .then(data => {
        setAllExps(data)
      })

  }, []);
  return (
    <div className='md:flex justify-center gap-10 px-6 md:px-10 lg:px-20'>
      <div><SearchForm></SearchForm></div>
      <div className='flex-1'>
        <div >
          <div className='flex justify-between px-4'>
            <p className='font-bold text-xl'>Homes</p>
            <Link to='/coming-soon'> <p>See All</p> </Link>
          </div>
          <div className='container pb-8 pt-2 mx-auto'>
            <div className='flex flex-wrap'>
              {
                [...Array(20)].map((exp, i) => <HomeCard key={i} exp={exp} ></HomeCard>)
              }
            </div>
          </div>



        </div>
        <div >
          <div className='flex justify-between px-4'>
            <p className='font-bold text-xl'>Experiences</p>
            <Link to='/coming-soon'> <p>See All</p> </Link>
          </div>
          <div className='container pb-8 pt-2 mx-auto'>
            <div className='flex flex-wrap'>
              {
                allExps?.map((exp, i) => <ExpCard key={i} exp={exp} ></ExpCard>)
              }
            </div>
          </div>



        </div>
      </div>
    </div>
  )
}

export default Home
