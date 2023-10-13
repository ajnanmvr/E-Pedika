import React, { useEffect, useState } from "react";
import Card from "./Card";
import Axios from "../Axios";

function List() {
  const [cards, setCards] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [data, setData] = useState([]);

  useEffect(() => {
    Axios.get("/data")
      .then((response) => {
        const data = response.data.data;
        setData(data);
        setCards(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const filterCards = (categoryName) => {
    if (categoryName === "all") {
      // Show all cards
      setCards(data);
    } else {
      // Filter cards by category.name
      const filteredCards = data.filter(card => card.category.name === categoryName);
      setCards(filteredCards);
    }
  };

  return (
    <div className="p-16">
      <select
        value={selectedCategory}
        onChange={(e) => {
          setSelectedCategory(e.target.value);
          filterCards(e.target.value);
        }}
      >
        <option value="all">All</option>
        <option value="Essentials">b</option>
        <option value="Tea Stall">a</option>
      </select>

      <div className="flex justify-center gap-5 flex-wrap">
        {cards.length > 0 ? (
          cards.map((card) => <Card key={card._id} card={card} />)
        ) : (
          <p>Loading data...</p>
        )}
      </div>
    </div>
  );
}

export default List;
