import React, { useRef, useState, useEffect } from 'react';
import {
  ArrowLongRightIcon,
  PlayCircleIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@heroicons/react/24/outline";
import moviesData from '../api/movies';
import { Link } from "react-router-dom";
import ShinyText from "../SHINY-TEXT/ShinyText";

// Individual Category Carousel Component
const CategoryCarousel = ({ title, movies }) => {
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
    const cardWidth = 200;
    const scrollAmount = cardWidth * 3;
    
    scrollRef.current.scrollBy({
      left: dir === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });

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
  }, [movies]);

  if (movies.length === 0) return null;

  return (
    <div className="w-full min-h-96 text-left flex gap-10 px-10 py-8 bg-black rounded-2xl shadow-xl mb-8">
      {/* Title + Info Section */}
      <div className="flex w-1/4  flex-col justify-between pt-4 pb-10 pl-8">
        <div>
          <h2
            style={fontStyle}
            className="text-4xl font-bold text-red-600 mb-4 relative inline-block"
          >
            {title}
          </h2>
          <p className="text-gray-400 text-sm">
            {movies.length} movie{movies.length !== 1 ? 's' : ''}
          </p>
        </div>

        {/* Navigation Instructions */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2 text-gray-300 text-lg font-medium">
            <ShinyText
              text="EXPLORE CATEGORY"
              disabled={false}
              speed={3}
              className='custom-class'
            />
            <ArrowLongRightIcon className="h-6 w-6 text-red-600 hover:scale-110 transition-all duration-300 hover:text-red-500" />
          </div>
        </div>
      </div>

      {/* Carousel Section */}
      <div className="relative w-3/4 group">
        
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

        {/* Gradient Overlays */}
        <div className="absolute left-0 top-0 w-20 h-full bg-gradient-to-r from-black via-black/80 to-transparent z-20 pointer-events-none opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
        <div className="absolute right-0 top-0 w-20 h-full bg-gradient-to-l from-black via-black/80 to-transparent z-20 pointer-events-none opacity-0 group-hover:opacity-100 transition-all duration-500"></div>

        {/* Carousel */}
        <div
          ref={scrollRef}
          onScroll={checkScrollState}
          className="flex flex-nowrap gap-4 overflow-x-auto scrollbar-hide pt-4 pb-6 px-8 scroll-smooth"
          style={{
            scrollBehavior: 'smooth',
            scrollbarWidth: 'none',
            msOverflowStyle: 'none'
          }}
        >
          {movies.map((movie, index) => (
            <Link
              key={movie._id}
              to={`/page2/${movie._id}`}
              className="relative flex-shrink-0 w-44 h-64 bg-black/90 rounded-xl overflow-hidden shadow-xl hover:shadow-2xl hover:shadow-red-500/25 transform hover:scale-105 hover:-translate-y-2 transition-all duration-500 ease-out cursor-pointer group/card block"
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

              {/* Overlay with Movie Info */}
              <div className={`absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent transition-all duration-500 ease-in-out ${
                hoveredMovie === movie._id ? 'opacity-100' : 'opacity-0'
              }`}>
                
                {/* Movie Details */}
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-4 group-hover/card:translate-y-0 transition-transform duration-500 ease-out">
                  
                  {/* Movie Title */}
                  <h3 className="text-sm font-bold mb-2 line-clamp-2">
                    {movie.title}
                  </h3>
                  
                  {/* Movie Year & Rating */}
                  <div className="flex justify-between items-center mb-2">
                    <p className="text-xs text-gray-300">
                      {movie.year}
                    </p>
                    {movie.rating && (
                      <p className="text-xs text-yellow-400">
                        ⭐ {typeof movie.rating === 'object' && movie.rating.$numberDecimal ? 
                            parseFloat(movie.rating.$numberDecimal) : 
                            movie.rating}
                      </p>
                    )}
                  </div>
                  
                  {/* Categories */}
                  {movie.category && (
                    <div className="flex flex-wrap gap-1 mb-2">
                      {movie.category.slice(0, 2).map((g, i) => (
                        <span key={i} className="px-2 py-1 bg-red-600/80 text-xs rounded-full">
                          {g}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Play Button */}
                <div className="absolute inset-0 flex items-center justify-center group/play">
                  <div className="relative">
                    <div className="absolute inset-0 bg-red-500/20 rounded-full animate-ping"></div>
                    <PlayCircleIcon className="relative w-12 h-12 text-white hover:text-red-400 transition-all duration-300 transform group-hover/play:scale-110" />
                  </div>
                </div>
              </div>

              {/* Border Glow */}
              <div className={`absolute inset-0 rounded-xl border-2 transition-all duration-500 ${
                hoveredMovie === movie._id ? 'border-red-500/60' : 'border-transparent'
              }`}></div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

// Main Component
const MoviesTypesPAge = () => {
  // Filter movies by type
  const movies = [...moviesData]  // copy the array
  .reverse()                    // reverse the copy
  .filter(e => e.type === "Movie" );
  
  // Group movies by categories
  const groupMoviesByCategory = () => {
    const categoryGroups = {};
    
    movies.forEach(movie => {
      if (movie.category && Array.isArray(movie.category)) {
        movie.category.forEach(category => {
          if (!categoryGroups[category]) {
            categoryGroups[category] = [];
          }
          // Avoid duplicates
          if (!categoryGroups[category].find(m => m._id === movie._id)) {
            categoryGroups[category].push(movie);
          }
        });
      }
    });
    
    return categoryGroups;
  };

  const categorizedMovies = groupMoviesByCategory();

  // Sort categories by number of movies (descending)
  const sortedCategories = Object.keys(categorizedMovies).sort(
    (a, b) => categorizedMovies[b].length - categorizedMovies[a].length
  );

  return (
    <div className="min-h-screen bg-black mt-15 p-8">
      {/* Page Header */}
      <div className='w-full h-20 flex justify-center items-center mb-12'>
        <h1 
          className="text-6xl font-bold text-white text-center"
          style={{
            fontFamily: "'Playfair Display', serif",
            fontOpticalSizing: "auto",
            fontStyle: "normal",
          }}
        >
          Movie <span className="text-red-600">Categories</span>
        </h1>
      </div>

      {/* Category Carousels */}
      <div className="space-y-8">
        {sortedCategories.map(category => (
          <CategoryCarousel
            key={category}
            title={category}
            movies={categorizedMovies[category]}
          />
        ))}
      </div>

      
    </div>
  );
};

export default MoviesTypesPAge;