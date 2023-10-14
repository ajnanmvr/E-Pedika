import React from "react";
import Slider from "./Slider";
import SmallList from "./SmallList";
import ShopByCategory from "./ShopByCategory";


function Home({fullData}) {
  return (
    <div className="min-h-screen">
      <Slider />
      <ShopByCategory/>
      <SmallList heading={"Latest Products"} sortOption={"newest"} fullData={fullData} />
      <SmallList heading={"Lowest in Price"} sortOption={"price-asc"} fullData={fullData} />
    </div>
  );
}

export default Home;
