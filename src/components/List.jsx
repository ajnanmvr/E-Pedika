import React, { useEffect, useState } from "react";
import Card from "./Card";

function List({ fullData, category }) {
  const [cards, setCards] = useState([]);
  const [sortedCards, setSortedCards] = useState([]);
  const [sortOption, setSortOption] = useState("a-z");
  const [filterText, setFilterText] = useState(""); // New state for filter text

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
  };// Filter cards based on user input
  const filteredSortedCards = sortedCards.filter((card) =>
    card.name.toLowerCase().includes(filterText.toLowerCase())
  );

  return (
    <div className="p-16 min-h-[84vh]">
      <div className="flex mb-20 px-16 gap-4 font-semibold">
        <input
          type="text"
          placeholder="Search the item"
          className="rounded-lg border-2 border-gray-900 border-dashed px-3 py-2 w-full"
          value={filterText}
          onChange={(e) => setFilterText(e.target.value)}
        />
        <div className="flex gap-2 justify-between items-center ">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="1em"
            viewBox="0 0 512 512"
          >
            {" "}
            <path d="M3.9 54.9C10.5 40.9 24.5 32 40 32H472c15.5 0 29.5 8.9 36.1 22.9s4.6 30.5-5.2 42.5L320 320.9V448c0 12.1-6.8 23.2-17.7 28.6s-23.8 4.3-33.5-3l-64-48c-8.1-6-12.8-15.5-12.8-25.6V320.9L9 97.3C-.7 85.4-2.8 68.8 3.9 54.9z" />
          </svg>{" "}
          Filter
          <select
            onChange={(e) => setSortOption(e.target.value)}
            value={sortOption}
            className="rounded-lg border-2 border-gray-900 border-dashed px-3 py-2"
          >
            <option value="a-z">A-Z</option>
            <option value="z-a">Z-A</option>
            <option value="newest">Newest</option>
            <option value="oldest">Oldest</option>
            <option value="price-asc">Lowest Price</option>
            <option value="price-desc">Highest Price</option>
          </select>
        </div>
      </div>
      <div className="flex justify-center gap-5 flex-wrap">
        {filteredSortedCards.length > 0 ? (
          filteredSortedCards.map((card) => <Card key={card._id} card={card} />)
        ) : (
          <div className="p-10 h-40 bg-primary w-full text-white fill-white flex justify-center items-center gap-2 font-bold rounded-lg"><svg xmlns="http://www.w3.org/2000/svg" height="1.5em" viewBox="0 0 512 512"><path d="M256 48a208 208 0 1 1 0 416 208 208 0 1 1 0-416zm0 464A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM175 175c-9.4 9.4-9.4 24.6 0 33.9l47 47-47 47c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l47-47 47 47c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-47-47 47-47c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-47 47-47-47c-9.4-9.4-24.6-9.4-33.9 0z"/></svg>No matching items found.</div>
        )}
      </div>
    </div>
  );
}

export default List;
