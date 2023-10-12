import React, { useState } from "react";

const Card = ({ card }) => {
  const [showFullDescription, setShowFullDescription] = useState(false);

  const toggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };
  const getFavicon = () => {
    if (card.image) {
      return card.image;
    } else {
      return `https://www.google.com/s2/favicons?domain=${card.url}`;
    }
  };

  return (
    <article className="card  bg-white shadow-md rounded-md transition">
      {card.thumbnail && (
        <img
          src={card.thumbnail}
          alt="Thumbnail"
          className="w-full h-40 rounded-t-md object-cover"
        />
      )}
      <div className="card-header flex items-center justify-between p-4">
        <div className="flex items-center">
          <span
            className="weblogo rounded-lg bg-contain bg-center"
            style={{
              backgroundImage: `url('${getFavicon()}')`,
              backgroundSize: "25px",
              backgroundRepeat: "no-repeat",
            }}
          ></span>
          <h3 className="ml-4 font-medium">{card.name}</h3>
        </div>
      </div>
      <div className="card-body p-4">
        <p>
          {showFullDescription
            ? card.description
            : card.description.substring(0, 100)}
          {card.description.length > 100 && (
            <span
              className="ml-2 text-blue-950 cursor-pointer"
              onClick={toggleDescription}
            >
              {showFullDescription ? "Read Less" : "Read More"}
            </span>
          )}
        </p>
      </div>
      <div className="card-footer p-4 border-t border-gray-200">
        <a
          href={card.url}
          className="text-blue-600 font-medium hover:text-blue-800"
        >
          Visit Website
        </a>
      </div>
    </article>
  );
};

export default Card;
