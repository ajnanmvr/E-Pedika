import Axios from "../../Axios";
import { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";

const AutoCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [data, setData] = useState([]);
  const getData = async () => {
    try {
      const res = await Axios.get(`/data`);
      setData(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getData();
  }, []);

  // Number of slides and delay (in milliseconds) between each slide
  const numSlides = 3;
  const autoSlideDelay = 3000;

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
    speed: 100,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true, // We handle the auto-slide manually
    initialSlide: currentSlide, // Start with the currentSlide state
  };

  return (
    <section className="px-16 ">
      <Slider {...settings} className="flex ffff">
        {data.map((item, key) => (
          <a href={item.url} target="_blank">
            <div className="bg-white rounded-xl flex items-center content-center bg-opacity-10 mx-4 ">
              <a href={item.url} key={key}>
                <div className="flex justify-left content-center items-center max-w-1/2 gap-3 p-6">
                  <img
                    className="w-6 h-6 rounded-lg"
                    src={`https://www.google.com/s2/favicons?domain=${item.url}`}
                    alt={item.name}
                  />
                  <h1
                    className="text-white opacity-90 overflow-hidden whitespace-nowrap mb-0"
                    style={{
                      fontWeight: "bold",
                      fontSize: 20,
                      marginBottom: 3,
                    }}
                  >
                    {item.name}
                  </h1>
                </div>
                {/* <p className="text-sm 2xl:text-base text-center text-gray-300">
                  {item.description.substring(0, 30)}
                </p> */}
              </a>
            </div>
          </a>
        ))}
      </Slider>
    </section>
  );
};

export default AutoCarousel;
