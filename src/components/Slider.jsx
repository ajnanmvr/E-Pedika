import React from "react";
import Slider from "react-slick";
import { Link } from "react-router-dom";

function Carousel() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000, // Adjust the auto-slide delay as needed (in milliseconds)
  };

  return (
    <section className="flex justify-center">
      <div className="max-w-[85vw] mb-24">
        <Slider {...settings}>
          <div className="rounded-[100px] h-96 border-2 border-white overflow-hidden">
            <div className="bg-primary  text-white flex items-center w-full -mt-24">
              <img
                src="/logos/logo4.png"
                alt="logo"
                className="h-[600px] p-10"
              />
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
                    <button className="font-bold hover:text-xl">Search</button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="rounded-[100px] h-96 border-2 border-primary overflow-hidden">
            <div className=" bg-white text-black flex items-center w-full h-full content-center justify-center">
              <div className="flex justify-center items-center content-center gap-20">
                <div>
                  <svg
                    className="fill-primary h-72"
                    xmlns="http://www.w3.org/2000/svg"
                    height="1em"
                    viewBox="0 0 576 512"
                  >
                    <path d="M249.6 471.5c10.8 3.8 22.4-4.1 22.4-15.5V78.6c0-4.2-1.6-8.4-5-11C247.4 52 202.4 32 144 32C93.5 32 46.3 45.3 18.1 56.1C6.8 60.5 0 71.7 0 83.8V454.1c0 11.9 12.8 20.2 24.1 16.5C55.6 460.1 105.5 448 144 448c33.9 0 79 14 105.6 23.5zm76.8 0C353 462 398.1 448 432 448c38.5 0 88.4 12.1 119.9 22.6c11.3 3.8 24.1-4.6 24.1-16.5V83.8c0-12.1-6.8-23.3-18.1-27.6C529.7 45.3 482.5 32 432 32c-58.4 0-103.4 20-123 35.6c-3.3 2.6-5 6.8-5 11V456c0 11.4 11.7 19.3 22.4 15.5z" />
                  </svg>
                </div>
                <div className="flex flex-col gap-1">
                  <h1 className="font-black text-5xl">E-Pedika</h1>
                  <h1 className="font-regular text-3xl">Book Cell</h1>
                  <div className="flex gap-4 items-center mt-4 text-primary">
                    <Link to={`/book-cell`}>
                      <button className="border-2 font-bold border-primary py-2 px-5 rounded-full hover:bg-primary hover:text-white">
                        Explore
                      </button>
                    </Link>
                    <Link to={`/search`}>
                      <button className="font-bold hover:text-lg">
                        Search
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="rounded-[100px] h-96 border-2 border-primary overflow-hidden">
            <div className=" bg-white text-black flex items-center w-full h-full content-center justify-center">
              <div className="flex justify-center items-center content-center gap-20">
                <div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="fill-primary h-72"
                    height="1em"
                    viewBox="0 0 512 512"
                  >
                    <path d="M469.3 19.3l23.4 23.4c25 25 25 65.5 0 90.5l-56.4 56.4L322.3 75.7l56.4-56.4c25-25 65.5-25 90.5 0zM44.9 353.2L299.7 98.3 413.7 212.3 158.8 467.1c-6.7 6.7-15.1 11.6-24.2 14.2l-104 29.7c-8.4 2.4-17.4 .1-23.6-6.1s-8.5-15.2-6.1-23.6l29.7-104c2.6-9.2 7.5-17.5 14.2-24.2zM249.4 103.4L103.4 249.4 16 161.9c-18.7-18.7-18.7-49.1 0-67.9L94.1 16c18.7-18.7 49.1-18.7 67.9 0l19.8 19.8c-.3 .3-.7 .6-1 .9l-64 64c-6.2 6.2-6.2 16.4 0 22.6s16.4 6.2 22.6 0l64-64c.3-.3 .6-.7 .9-1l45.1 45.1zM408.6 262.6l45.1 45.1c-.3 .3-.7 .6-1 .9l-64 64c-6.2 6.2-6.2 16.4 0 22.6s16.4 6.2 22.6 0l64-64c.3-.3 .6-.7 .9-1L496 350.1c18.7 18.7 18.7 49.1 0 67.9L417.9 496c-18.7 18.7-49.1 18.7-67.9 0l-87.4-87.4L408.6 262.6z" />
                  </svg>
                </div>
                <div className="flex flex-col gap-1">
                  <h1 className="font-black text-5xl">E-Pedika</h1>
                  <h1 className="font-regular text-3xl">Stationary</h1>
                  <div className="flex gap-4 items-center mt-4 text-primary">
                    <Link to={`/stationary`}>
                      <button className="border-2 font-bold border-primary py-2 px-5 rounded-full hover:bg-primary hover:text-white">
                        Explore
                      </button>
                    </Link>
                    <Link to={`/search`}>
                      <button className="font-bold hover:text-lg">
                        Search
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="rounded-[100px] h-96 border-2 border-primary overflow-hidden">
            <div className=" bg-white text-black flex items-center w-full h-full content-center justify-center">
              <div className="flex justify-center items-center content-center gap-20">
                <div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="fill-primary h-72"
                    height="1em"
                    viewBox="0 0 640 512"
                  >
                    <path d="M96 64c0-17.7 14.3-32 32-32H448h64c70.7 0 128 57.3 128 128s-57.3 128-128 128H480c0 53-43 96-96 96H192c-53 0-96-43-96-96V64zM480 224h32c35.3 0 64-28.7 64-64s-28.7-64-64-64H480V224zM32 416H544c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32z" />
                  </svg>
                </div>
                <div className="flex flex-col gap-1">
                  <h1 className="font-black text-5xl">E-Pedika</h1>
                  <h1 className="font-regular text-3xl">Tea Stall</h1>
                  <div className="flex gap-4 items-center mt-4 text-primary">
                    <Link to={`/tea-stall`}>
                      <button className="border-2 font-bold border-primary py-2 px-5 rounded-full hover:bg-primary hover:text-white">
                        Explore
                      </button>
                    </Link>
                    <Link to={`/search`}>
                      <button className="font-bold hover:text-lg">
                        Search
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Slider>
      </div>
    </section>
  );
}

export default Carousel;
