import React, { useState } from "react";
import { FaStar } from "react-icons/fa";
import "./Rating.scss";

const Rating = ({ initialRating = 0, onRatingChange, size = 24 }) => {
  const [rating, setRating] = useState(initialRating);
  const [hover, setHover] = useState(0);

  const handleClick = (value) => {
    setRating(value);
    onRatingChange(value);
  };

  return (
    <div className="rating-container">
      {[...Array(5)].map((_, index) => {
        const ratingValue = index + 1;
        return (
          <FaStar
            key={index}
            className="star"
            color={ratingValue <= (hover || rating) ? "#ffc107" : "#e4e5e9"}
            size={size}
            onClick={() => handleClick(ratingValue)}
            onMouseEnter={() => setHover(ratingValue)}
            onMouseLeave={() => setHover(0)}
          />
        );
      })}
    </div>
  );
};

export default Rating;
