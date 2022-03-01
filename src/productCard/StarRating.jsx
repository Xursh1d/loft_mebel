import React, { useState } from "react";
import "./Card.css";
import { FaStar } from "react-icons/fa";

export default function StarRating() {
  const [rating, setRating] = useState();
  const [hover, setHover] = useState();
  const array = [1, 2, 3, 4, 5];
  return array.map((num, i) => {
    const ratingvalue = i + 1;
    return (
      <label>
        <input
          type="radio"
          value={ratingvalue}
          onClick={() => setRating(ratingvalue)}
          name="rating"
        />
        <FaStar
          onMouseEnter={() => setHover(ratingvalue)}
          onMouseLeave={() => setHover(null)}
          color={ratingvalue <= (hover || rating) ? "#000000" : "#b4b2b2"}
          className="star"
        />
      </label>
    );
  });
}
