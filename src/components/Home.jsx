import React from "react";
import Slider from "./Slider";
import SmallList from "./SmallList";

function Home() {
  return (
    <div className="min-h-screen">
      <Slider />
      <SmallList heading={"Latest Products"} />
    </div>
  );
}

export default Home;
