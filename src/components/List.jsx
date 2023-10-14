import React, { useEffect, useState } from "react";
import Card from "./Card";

function List({ fullData, category }) {
  const [cards, setCards] = useState([]);
  const [sortedCards, setSortedCards] = useState([]);
  const [sortOption, setSortOption] = useState("a-z");

  useEffect(() => {
    if (category === "All") {
      setCards(fullData);
    } else {
      const filteredData = fullData.filter(
        (card) => card.category.name === category
      );
      setCards(filteredData);
    }
  }, [category]);

  useEffect(() => {
    sortCards();
  }, [sortOption, cards]);

  const sortCards = () => {
    const sortedCardsCopy = [...cards];

    if (sortOption === "a-z") {
      sortedCardsCopy.sort((a, b) =>
        (a.name || "").localeCompare(b.name || "")
      );
    } else if (sortOption === "z-a") {
      sortedCardsCopy.sort((a, b) =>
        (b.name || "").localeCompare(a.name || "")
      );
    } else if (sortOption === "newest") {
      sortedCardsCopy.sort(
        (a, b) => (new Date(b.createdAt) || 0) - (new Date(a.createdAt) || 0)
      );
    } else if (sortOption === "oldest") {
      sortedCardsCopy.sort(
        (a, b) => (new Date(a.createdAt) || 0) - (new Date(b.createdAt) || 0)
      );
    } else if (sortOption === "price-asc") {
      sortedCardsCopy.sort(
        (a, b) => (a.discountPrice || 0) - (b.discountPrice || 0)
      );
    } else if (sortOption === "price-desc") {
      sortedCardsCopy.sort(
        (a, b) => (b.discountPrice || 0) - (a.discountPrice || 0)
      );
    }

    setSortedCards(sortedCardsCopy);
  };

  return (
    <div className="p-16 min-h-[84vh]">
      <div className="flex justify-between items-center mb-4">
        <select
          onChange={(e) => setSortOption(e.target.value)}
          value={sortOption}
        >
          <option value="a-z">A-Z</option>
          <option value="z-a">Z-A</option>
          <option value="newest">Newest</option>
          <option value="oldest">Oldest</option>
          <option value="price-asc">Lowest Price</option>
          <option value="price-desc">Highest Price</option>
        </select>
      </div>
      <div className="flex justify-center gap-5 flex-wrap">
        {sortedCards.length > 0 ? (
          sortedCards.map((card) => <Card key={card._id} card={card} />)
        ) : (
          <p>Loading data..</p>
        )}
      </div>
    </div>
  );
}

export default List;
