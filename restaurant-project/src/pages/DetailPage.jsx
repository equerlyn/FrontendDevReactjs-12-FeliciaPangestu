import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getRestaurantDetail } from '../utils/network-data';
import IconStar from '../assets/star.svg';
import Review from '../components/Review';
// import Peta from '../components/Peta';

const DetailPage = () => {
  const { id } = useParams();
  const [restaurant, setRestaurant] = useState(null);
  const [reviews, setReviews] = useState([]); 

  useEffect(() => {
    const fetchData = async () => {
      const response = await getRestaurantDetail(id);
      const data = response.data;
      setRestaurant(data);
      setReviews(data.reviews);
    };

    fetchData();
  }, [id]);

  if (!restaurant) {
    return <div className='loading'>Loading...</div>;
  }

  return (
    <section className="page-details">
      <div className="content-details">
        <div className="details-header">
          <h2>{restaurant.name} </h2> 
          <span className='dash'>&mdash;</span>
          <img src={IconStar} alt="rating" className='star'/>
          <h2>{restaurant.rating}</h2>
        </div>
        <div className="details-map">
          {/* <Peta/> */}
        </div>
        <div className="details-section">
          {
            reviews.map((review, index) => (
              <Review
                key={index}
                name={review.author_name}
                rating={review.rating}
                image={review.profile_photo_url}
                text={review.text}
              />
            ))
          }
        </div>
      </div>
    </section>
  );
};

export default DetailPage;
