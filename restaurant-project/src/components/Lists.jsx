import { useState } from 'react'
import Card from './Card'

const Lists = ({ restaurants, filterOpen }) => {
  const [visibleRestaurants, setVisibleRestaurants] = useState(8);
  
  const handleLoadMore = () => {
    setVisibleRestaurants(prevVisibleRestaurants => prevVisibleRestaurants + 8);
  };

  const filteredRestaurants = filterOpen 
    ? restaurants.filter(restaurant => restaurant.opening_hours.open_now) 
    : restaurants;

  return (
    <section className='list-restaurants'>
      <h2>All Restaurants</h2>
      <div className="restaurants-list">
        {
          filteredRestaurants.slice(0, visibleRestaurants).map((restaurant) => (
            <Card key={restaurant.place_id} restaurant={restaurant} />
          ))
        }
      </div>
      <div className="load-more-section">
        {
          filteredRestaurants.length > visibleRestaurants && (
            <button onClick={handleLoadMore} className='load-more'>LOAD MORE</button>
          )
        }
      </div>
    </section>
  )
}

export default Lists