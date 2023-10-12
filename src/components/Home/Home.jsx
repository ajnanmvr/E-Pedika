import React, { useEffect, useState } from "react";
import Card from "../Content/Card";
import Slider from "../Content/Slider";
import Axios from "../../Axios";

function App() {
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
    <div className="">
      <div className="min-h-[400px] bg-blue-900 bg-[url(https://cdn.dribbble.com/users/1770290/screenshots/6142201/bg_73.gif)]  bg-cover w-full pt-8 flex flex-col justify-center gap-5">
        <div className="flex flex-col justify-center gap-3  lg:px-24 px-3">
          <h1 className="text-white font-bold text-7xl">Know Library</h1>
          <p className="text-white">
            Explore an extensive directory of essential websites, catering to
            academics, educators, and tech aficionados alike. <br />
            Unlock boundless knowledge and empower your quest for learning and
            advancement
          </p>
        </div>
        <hr className="lg:mx-24 mx-4 my-2" />
        <Slider />
      </div>

      <div className="lg:px-20 px-3">
        <div className="flex flex-col items-center">
          <h1 className="text-center mt-12 mb-4 text-4xl font-bold">Explore</h1>
          <div className="bg-red-900 h-1 w-24"></div>
        </div>
        <div className="">
          <div class="card-grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
            {cards.length > 0 ? (
              cards.map((card) => <Card key={card._id} card={card} />)
            ) : (
              <p>Loading data..</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
