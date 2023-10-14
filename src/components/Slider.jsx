import React from 'react'
import { Link } from "react-router-dom";

function Slider() {
  return (
    <section className="bg-primary text-white rounded-[100px] mx-24 flex h-96 items-center mb-24 overflow-hidden">
    <img src="/logos/logo4.png" alt="logo" className="h-[600px] p-10" />
    <div className="flex flex-col gap-1">
      <h1 className="font-black text-5xl">E-Pedika</h1>
      <h1 className="font-regular text-5xl">ASAs Online Store</h1>
      <div className="flex gap-4 items-center mt-4">
        
        <Link to={`/items`}>
          <button className="border-2 font-bold border-white py-2 px-5 rounded-full hover:bg-white hover:text-primary">
            Explore
          </button>
        </Link>
        <Link to={`/search`}>
          <button className="font-bold hover:text-xl">
            Search
          </button>
        </Link>
      </div>
    </div>
  </section>
  )
}

export default Slider