import React, { useRef } from "react";
import Slider, { Settings } from "react-slick";
import { useRestaurant } from "@/hooks/useRestaurant";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

const BannerFold = () => {
  const { restaurant } = useRestaurant();
  const bannerImages = restaurant?.banner_images;
  const sliderRef = useRef<Slider>(null);

  const settings: Settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    pauseOnHover: true,
    arrows: false,
  };

  const handlePrev = () => {
    sliderRef.current?.slickPrev();
    sliderRef.current?.slickPause();
  };

  const handleNext = () => {
    sliderRef.current?.slickNext();
    sliderRef.current?.slickPause();
  };

  return (
    <div className="relative w-full h-[130px] overflow-hidden">
      <Slider ref={sliderRef} {...settings}>
        {bannerImages?.map((image) => (
          <div key={image.id}>
            <img
              src={image.image}
              alt={`Banner ${image.id}`}
              className="w-full h-[130px] object-cover rounded-lg"
            />
          </div>
        ))}
      </Slider>
      <button
        className="absolute top-1/2 left-4 transform -translate-y-1/2 text-white bg-gray-800 bg-opacity-10 p-2 rounded-full"
        onClick={handlePrev}
      >
        <FaArrowLeft size={24} />
      </button>
      <button
        className="absolute top-1/2 right-4 transform -translate-y-1/2 text-white bg-gray-800 bg-opacity-10 p-2 rounded-full"
        onClick={handleNext}
      >
        <FaArrowRight size={24} />
      </button>
    </div>
  );
};

export default BannerFold;
