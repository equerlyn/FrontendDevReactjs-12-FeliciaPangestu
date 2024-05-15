import { useEffect, useState } from 'react';
import IconStar from '../assets/star.svg';
import RedCircle from '../assets/red_circle.svg';
import GreenCircle from '../assets/green_circle.svg';
import { getRestaurantPhoto } from '../utils/network-data';
import { useNavigate } from 'react-router-dom';

const Card = ({ restaurant }) => {
  const navigate = useNavigate();
  const [image, setImage] = useState('');
  const value = restaurant.rating
  const max = 5;
  const percentage = Math.round((value / max) * 100);

  useEffect(() => {
    if (restaurant && restaurant.photos && restaurant.photos.length > 0) {
      const firstPhoto = restaurant.photos[0];
      if (firstPhoto.photo_reference) {
        getRestaurantPhoto(firstPhoto.photo_reference).then((data) => {
          setImage(data.data);
        }).catch((error) => {
          console.error('Error fetching restaurant photo:', error);
        });
      }
    }
  }, [restaurant]);

  return (
    <section className="card-item">
      <img className="image" src={image} alt={restaurant.name} />
      <div className="card-body">
        <h3 className="restaurant-name">{restaurant.name}</h3>
        <div className="rating">
          {
            Array.from(Array(max).keys()).map((_, i) => (
              <img key={i} src={IconStar} alt="star"/>
            ))
          }
          <div className="overlay" style={{ width: `${100 - percentage}%` }}/>
        </div>
        <div className="tag">
          <div className="country-price">
            <span>{restaurant.types[0].toUpperCase()}</span>
            <span className='bullet'>&#8226;</span>
            {getPriceSymbol(restaurant.price_level)}
          </div>
          <div className="open-close">
            {restaurant.opening_hours.open_now ?
              <img src={GreenCircle} alt="" /> :
              <img src={RedCircle} alt="" />
            }
            <span>{restaurant.opening_hours.open_now ? 'OPEN NOW' : 'CLOSED'}</span>
          </div>
        </div>
        <button onClick={()=>navigate(`/detail/${restaurant.place_id}`)}>LEARN MORE</button>
      </div>
    </section>
  )
}

export default Card

function getPriceSymbol(priceLevel) {
  switch (priceLevel) {
    case 1:
      return '$';
    case 2:
      return '$$';
    case 3:
      return '$$$';
    case 4:
      return '$$$$';
    default:
      return ''; 
  }
}