import React, { useEffect, useState } from "react";
import Card from "./Card";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import CardSkeleton from "./CardSkeleton";

function SmallList({ heading, fullData, sortOption }) {
  const [currentSlide, setCurrentSlide] = useState(0);
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

  // Number of slides and delay (in milliseconds) between each slide
  const numSlides = 3;
  const autoSlideDelay = 2500;

  useEffect(() => {
    const interval = setInterval(() => {
      // Increment the currentSlide in a cyclic manner
      setCurrentSlide((prevSlide) => (prevSlide + 1) % numSlides);
    }, autoSlideDelay);

    return () => clearInterval(interval);
  }, []);

  const settings = {
    dots: false,
    infinite: true,
    speed: 350,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true, // Enable auto-slide
    autoplaySpeed: autoSlideDelay, // Set the delay
  };

  return (
    <section className="my-20">
      <h1 className="text-center font-bold text-3xl text-black">{heading}</h1>
      <div className="px-32 py-20">
        {fullData.length !== 0 ? (
          <Slider {...settings}>
            {sortedCards.map((item, key) => (
              <Card key={key} card={item} />
            ))}
          </Slider>
        ) : (
          <div className="flex justify-center gap-5 flex-wrap">
            <CardSkeleton />
            <CardSkeleton />
            <CardSkeleton />
            <CardSkeleton />
            <CardSkeleton />
          </div>
        )}
      </div>
    </section>
  );
}

export default SmallList;
