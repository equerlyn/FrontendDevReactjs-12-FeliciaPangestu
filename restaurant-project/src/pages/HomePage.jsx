import React from 'react'
import { getAllRestaurants } from '../utils/network-data'
import Lists from '../components/Lists'
import { useState, useEffect } from 'react'

const HomePage = ({ filterOpen }) => {
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    getAllRestaurants().then(({ data }) => {
      setRestaurants(data);
    });
  }, []);

  if (restaurants.length == 0) {
    return <div className="loading">Loading...</div>;
  }


  return (
    <section className='home-page'>
      <Lists restaurants={restaurants} filterOpen={filterOpen} />
    </section>
  )
}

export default HomePage