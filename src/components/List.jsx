import React, { useEffect, useState } from "react";
import Card from "./Card";
import Axios from "../Axios";

function List({ category }) {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    Axios.get("/data")
      .then((response) => {
        const fullData = response.data.data;

        if (category === "All") {
          // If category is "All," show all data
          setCards(fullData);
        } else {
          // Filter data based on the category
          const filteredData = fullData.filter((card) => card.category.name === category);
          setCards(filteredData);
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
