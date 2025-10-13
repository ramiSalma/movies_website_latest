import React, { useRef, useState, useEffect } from "react";
import {
  ArrowLongRightIcon,
  PlayCircleIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  StarIcon,
} from "@heroicons/react/24/outline";
import { StarIcon as StarSolidIcon } from "@heroicons/react/24/solid";
import moviesData from "../../api/movies";
import { Link } from "react-router-dom";
import ShinyText from "../../SHINY-TEXT/ShinyText";

const TrendingMovies = ({ title, trendKey }) => {
  const trending = moviesData.filter((movie) => movie[trendKey] === true);
  const scrollRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [hoveredMovie, setHoveredMovie] = useState(null);

  const fontStyle = {
    fontFamily: "'Playfair Display', serif",
    fontOpticalSizing: "auto",
    fontStyle: "normal",
  };

  const scroll = (dir) => {
    if (!scrollRef.current) return;
    const cardWidth = 200; // Reduced from 280 to 200
    const scrollAmount = cardWidth * 3; // Scroll 3 cards at a time
    
    scrollRef.current.scrollBy({
      left: dir === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });

    // Update scroll state after animation
    setTimeout(checkScrollState, 300);
  };

  const checkScrollState = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1);
    }
  };

  useEffect(() => {
    checkScrollState();
  }, [trending]);

  return (
  <div className="w-full min-h-[32rem] text-left flex gap-16 px-16 py-12 bg-black rounded-2xl shadow-xl">
      {/* Title + Info Section */}
  <div className="flex w-1/4 xl:w-1/5 flex-col justify-between pt-8 pb-12 pl-12">
        <div>
          <h2
            style={fontStyle}
            className="text-4xl font-bold text-red-600 mb-4 relative inline-block"
          >
            {title}
          </h2>
        </div>

        {/* Navigation Instructions */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2 text-gray-300 text-lg font-medium">
            <ShinyText
              text="EXPLORE TRENDING"
              disabled={false}
              speed={3}
              className='custom-class'
            />
            <ArrowLongRightIcon className="h-6 w-6 text-red-600 hover:scale-110 transition-all duration-300 hover:text-red-500" />
          </div>
        </div>
      </div>

      {/* Enhanced Carousel Section */}
  <div className="relative w-3/4 xl:w-4/5 group">
        
        {/* Navigation Buttons */}
        <button
          onClick={() => scroll("left")}
          disabled={!canScrollLeft}
          className={`absolute left-4 top-1/2 -translate-y-1/2 z-30 p-4 rounded-full backdrop-blur-md transition-all duration-500 ease-in-out shadow-2xl ${
            canScrollLeft 
              ? 'bg-black/80 hover:bg-red-600/90 hover:scale-125 text-white hover:shadow-red-500/50' 
              : 'bg-gray-400/20 text-gray-400 cursor-not-allowed scale-90'
          } opacity-0 group-hover:opacity-100 translate-x-0 group-hover:translate-x-2`}
          aria-label="Previous movies"
        >
          <ChevronLeftIcon className="h-5 w-5 transition-all duration-300" />
        </button>

        <button
          onClick={() => scroll("right")}
          disabled={!canScrollRight}
          className={`absolute right-4 top-1/2 -translate-y-1/2 z-30 p-4 rounded-full backdrop-blur-md transition-all duration-500 ease-in-out shadow-2xl ${
            canScrollRight 
              ? 'bg-black/80 hover:bg-red-600/90 hover:scale-125 text-white hover:shadow-red-500/50' 
              : 'bg-gray-400/20 text-gray-400 cursor-not-allowed scale-90'
          } opacity-0 group-hover:opacity-100 translate-x-0 group-hover:-translate-x-2`}
          aria-label="Next movies"
        >
          <ChevronRightIcon className="h-5 w-5 transition-all duration-300" />
        </button>

        {/* Enhanced Gradient Overlays */}
        <div className="absolute left-0 top-0 w-20 h-full bg-gradient-to-r from-black via-black/80 to-transparent z-20 pointer-events-none opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
        <div className="absolute right-0 top-0 w-20 h-full bg-gradient-to-l from-black via-black/80 to-transparent z-20 pointer-events-none opacity-0 group-hover:opacity-100 transition-all duration-500"></div>

        {/* Enhanced Carousel */}
        <div
          ref={scrollRef}
          onScroll={checkScrollState}
          className="flex flex-nowrap gap-8 overflow-x-auto scrollbar-hide pt-8 pb-8 px-12 scroll-smooth"
          style={{
            scrollBehavior: 'smooth',
            scrollbarWidth: 'none',
            msOverflowStyle: 'none'
          }}
        >
          {trending.map((movie, index) => (
            <Link
              key={movie._id}
              to={`/page2/${movie._id}`}
              className="relative flex-shrink-0 w-64 xl:w-80 h-96 xl:h-[28rem] bg-black/90 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl hover:shadow-red-500/25 transform hover:scale-105 hover:-translate-y-2 transition-all duration-500 ease-out cursor-pointer group/card block"
              onMouseEnter={() => setHoveredMovie(movie._id)}
              onMouseLeave={() => setHoveredMovie(null)}
            >
              {/* Movie Image */}
              <img
                src={movie.bgImg}
                alt={movie.title}
                className="w-full h-full object-cover transition-all duration-700 ease-out group-hover/card:scale-110 group-hover/card:brightness-110"
                loading="lazy"
              />

              {/* Enhanced Trending Number - Bottom Left with Webkit Stroke */}
              {movie.trend === true && (
                <div className="absolute bottom-0 left-0 z-10">
                  <span 
                    className="text-white text-6xl xl:text-7xl font-black leading-none select-none"
                    style={{
                      WebkitTextStroke: '2px #dc2626',
                      WebkitTextFillColor: 'transparent',
                      textShadow: '0 0 20px rgba(220, 38, 38, 0.5)',
                      fontFamily: 'Arial Black, sans-serif'
                    }}
                  >
                    {index + 1}
                  </span>
                </div>
              )}

              {/* Enhanced Overlay with Movie Info */}
              <div className={`absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent transition-all duration-500 ease-in-out ${
                hoveredMovie === movie._id ? 'opacity-100' : 'opacity-0'
              }`}>
                
                {/* Movie Details */}
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-4 group-hover/card:translate-y-0 transition-transform duration-500 ease-out">
                  
                  {/* Movie Title */}
                  <h3 className="text-lg xl:text-2xl font-bold mb-2 line-clamp-2">
                    {movie.title}
                  </h3>
                  
                  {/* Movie Year */}
                  <p className="text-base xl:text-lg text-gray-300 mb-2">
                    {movie.year}
                  </p>
                  
                  {movie.category && (
                    <div className="flex flex-wrap gap-2 mb-2">
                      {movie.category.slice(0, 2).map((g, i) => (
                        <span key={i} className="px-3 py-2 bg-red-600/80 text-base xl:text-lg rounded-full">
                          {g}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Enhanced Play Button */}
                <div className="absolute inset-0 flex items-center justify-center group/play">
                  <div className="relative">
                    <div className="absolute inset-0 bg-red-500/20 rounded-full animate-ping"></div>
                    <PlayCircleIcon className="relative w-16 h-16 xl:w-20 xl:h-20 text-white hover:text-red-400 transition-all duration-300 transform group-hover/play:scale-110" />
                  </div>
                </div>
              </div>

              {/* Subtle Border Glow */}
              <div className={`absolute inset-0 rounded-2xl border-2 transition-all duration-500 ${
                hoveredMovie === movie._id ? 'border-red-500/60' : 'border-transparent'
              }`}></div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TrendingMovies;