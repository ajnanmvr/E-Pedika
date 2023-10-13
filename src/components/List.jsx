import React, { useEffect, useState } from "react";
import Card from "./Card";
import Axios from "../Axios";

function List({ category }) {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    Axios.get("/data")
      .then((response) => {
        const allCards = response.data.data;

        if (category === "All") {
          // If category is "All," show all data
          setCards(allCards);
        } else {
          // Filter data based on the category
          const filteredCards = allCards.filter((card) => card.category.name === category);
          setCards(filteredCards);
        }

        console.log(cards); // This may not show the updated state immediately
      })
      .catch((error) => {
        console.error(error);
      });
  }, [category]); // Make sure to include category as a dependency

  return (
    <div className="p-16">
      <div className="flex justify-center gap-5 flex-wrap">
        {cards.length > 0 ? (
          cards.map((card) => <Card key={card._id} card={card} />)
        ) : (
          <p>Loading data..</p>
        )}
      </div>
    </div>
  );
}

export default List;
