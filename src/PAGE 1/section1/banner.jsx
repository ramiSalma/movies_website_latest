import React, { useState, useRef } from "react";
import moviesData from "../../api/movies";
import MoviesContent from "./MoviesContent";
import Carrousel from "./Carrousel";

const Banner = () => {
  const [featuredMovie, setFeaturedMovie] = useState(moviesData[0]);
  const carouselRef = useRef(null);

  // Scroll carousel left or right
  const scrollCarousel = (direction) => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({
        left: direction === "left" ? -200 : 200, // scroll 200px
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="relative w-full h-screen bg-black text-white overflow-hidden">
      {/* Background */}
      <img
        src={featuredMovie.reviewImg}
        alt={featuredMovie.title}
        className="absolute w-full h-full object-cover brightness-50"
      />
      <div className="absolute inset-0 bg-black/30"></div>

      {/* Movie Content */}
      <MoviesContent featuredMovie={featuredMovie} />

      {/* Carousel */}
      <Carrousel scrollCarousel={scrollCarousel} carouselRef={carouselRef} moviesData={moviesData} setFeaturedMovie={setFeaturedMovie} />



    </div>
  );
};

export default Banner;
