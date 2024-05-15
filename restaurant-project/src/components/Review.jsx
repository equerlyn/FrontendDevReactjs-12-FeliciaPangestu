import React, { useState } from "react";
import IconStar from "../assets/star.svg";

const Review = ({ image, name, rating, text}) => {
  const value = rating
  const max = 5;
  const percentage = Math.round((value / max) * 100);

  return (
    <section className="review">
      <div className="img-container">
        <img src={image} alt={name} className="person-img" />
      </div>
      <h4 className="author">{name}</h4>
      <div className="vote">
        <div className="rating">
          {
            Array.from(Array(max).keys()).map((_, i) => (
              <img key={i} src={IconStar} alt="star"/>
            ))
          }
          <div className="overlay" style={{ width: `${100 - percentage}%` }}/>
        </div>
        <p className="rating-review">({rating})</p>
      </div>
      <p className="info">{text}</p>
    </section>
  )
}

export default Review