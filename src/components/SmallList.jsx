import React, { useEffect, useState } from "react";
import Card from "./Card";

function SmallList({ heading, fullData, sortOption }) {
  const [sortedCards, setSortedCards] = useState([]);

  useEffect(() => {
    sortCards();
  }, [sortOption, fullData]);

  const sortCards = () => {
    const sortedCardsCopy = [...fullData];

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
    <section className="flex justify-center items-center content-center flex-col my-10">
      <h1 className="text-center font-bold text-3xl text-black">{heading}</h1>
        <div className="flex justify-center gap-5 flex-wrap p-16">
          {sortedCards.length > 0 ? (
            sortedCards.map((card) => <Card key={card._id} card={card} />)
          ) : (
            <p>Loading data..</p>
          )}
        </div>
    </section>
  );
}

export default SmallList;
