import React from "react";
import { Link } from "react-router-dom";

const Card = ({ card }) => {
  return (
    <Link to={`/list/${card.slug}`}>
      <div className="h-80 w-56 rounded-lg border overflow-hidden flex flex-col justify-between">
        <img
          src={card.thumbnail}
          alt="Thumbnail"
          className="w-full h-40 object-cover rounded-t-md"
        />

        <div className="p-3 ">
          <h2 className="font-bold text-xl">{card.name}</h2>
          <p className="text-slate-600 text-sm leading-4 mt-1">
            {card.description}
          </p>
          <p className=" mt-2 flex items-center gap-2">
            <span className="text-primary  text-sm bg-white border-2 font-bold rounded-lg border-dotted py-2 px-3 border-primary">
              Rs. {card.discountPrice}
            </span>
            <span className="text-sm line-through text-slate-600">Rs.{card.price}</span>
          </p>
        </div>
      </div>
    </Link>
  );
};

export default Card;
