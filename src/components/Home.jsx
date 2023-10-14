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
      <SmallList heading={"Highest in Price"} sortOption={"price-desc"} fullData={fullData} />
      <SmallList heading={"Heritage Products"} sortOption={"oldest"} fullData={fullData} />
    </div>
  );
}

export default Home;
