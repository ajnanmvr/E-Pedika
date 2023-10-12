import React, { useEffect, useState } from "react";
import Card from "./Card";
import Axios from "../Axios";

function List() {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    Axios.get("/data")
      .then((response) => {
        setCards(response.data.data);
        console.log(response.data.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

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
