import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const Card = ({ card }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.95 }}
      transition={{ duration: 0.2 }}
    >
      <Link to={`/item/${card.slug}`}>
        <div className="h-80 w-56 rounded-lg border overflow-hidden flex flex-col justify-between">
          <img
            src={card.thumbnail}
            alt="Thumbnail"
            className="w-full h-40 object-cover rounded-t-md"
          />

          <div className="p-3">
            <h2 className="font-bold text-xl">{card.name}</h2>
            <p className="text-slate-600 text-sm leading-4 mt-1">
              {card.description}
            </p>

            <p className="mt-2 flex items-center gap-2">
              {card.discountPrice < card.price ? (
                <>
                  <span className="text-primary text-sm bg-white border-2 font-bold rounded-lg border-dotted py-2 px-3 border-primary">
                    ₹{card.discountPrice}.00
                  </span>
                  <span className="text-sm line-through text-slate-600">
                    ₹{card.price}.00
                  </span>
                </>
              ) : (
                <span className="text-primary text-sm bg-white border-2 font-bold rounded-lg border-dotted py-2 px-3 border-primary">
                  ₹{card.price}.00
                </span>
              )}
            </p>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default Card;
