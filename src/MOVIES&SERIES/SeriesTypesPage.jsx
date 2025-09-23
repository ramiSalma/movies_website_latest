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
const CategoryCarousel = ({ title, series }) => {
  const scrollRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [hoveredSeries, setHoveredSeries] = useState(null);

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
  }, [series]);

  if (series.length === 0) return null;

  return (
    <div className="w-full min-h-96 text-left flex gap-10 px-10 py-8 bg-black rounded-2xl shadow-xl mb-8">
      {/* Title + Info Section */}
      <div className="flex w-1/4 flex-col justify-between  pt-4 pb-10 pl-8">
        <div>
          <h2
            style={fontStyle}
            className="text-4xl font-bold text-red-600 mb-4 relative inline-block"
          >
            {title}
          </h2>
          <p className="text-gray-400 text-sm">
            {series.length} series
          </p>
        </div>

        {/* Navigation Instructions */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2 text-gray-300 text-lg font-medium">
            <ShinyText
              text="EXPLORE SERIES"
              disabled={false}
              speed={3}
              className='custom-class'
            />
            <ArrowLongRightIcon className="h-6 w-6 text-red-600 hover:scale-110 transition-all duration-300 hover:text-blue-500" />
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
              ? 'bg-black/80 hover:bg-red-600/90 hover:scale-125 text-white hover:shadow-blue-500/50' 
              : 'bg-gray-400/20 text-gray-400 cursor-not-allowed scale-90'
          } opacity-0 group-hover:opacity-100 translate-x-0 group-hover:translate-x-2`}
          aria-label="Previous series"
        >
          <ChevronLeftIcon className="h-5 w-5 transition-all duration-300" />
        </button>

        <button
          onClick={() => scroll("right")}
          disabled={!canScrollRight}
          className={`absolute right-4 top-1/2 -translate-y-1/2 z-30 p-4 rounded-full backdrop-blur-md transition-all duration-500 ease-in-out shadow-2xl ${
            canScrollRight 
              ? 'bg-black/80 hover:bg-red-600/90 hover:scale-125 text-white hover:shadow-blue-500/50' 
              : 'bg-gray-400/20 text-gray-400 cursor-not-allowed scale-90'
          } opacity-0 group-hover:opacity-100 translate-x-0 group-hover:-translate-x-2`}
          aria-label="Next series"
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
          {series.map((show, index) => (
            <Link
              key={show._id}
              to={`/page2/${show._id}`}
              className="relative flex-shrink-0 w-44 h-64 bg-black/90 rounded-xl overflow-hidden shadow-xl hover:shadow-2xl hover:shadow-blue-500/25 transform hover:scale-105 hover:-translate-y-2 transition-all duration-500 ease-out cursor-pointer group/card block"
              onMouseEnter={() => setHoveredSeries(show._id)}
              onMouseLeave={() => setHoveredSeries(null)}
            >
              {/* Series Image */}
              <img
                src={show.bgImg}
                alt={show.title}
                className="w-full h-full object-cover transition-all duration-700 ease-out group-hover/card:scale-110 group-hover/card:brightness-110"
                loading="lazy"
              />

              {/* Series Type Badge - Top Right */}
              <div className="absolute top-2 right-2 z-10">
                <span className="px-2 py-1 bg-red-600/90 text-white text-xs font-semibold rounded-full backdrop-blur-sm">
                  TV
                </span>
              </div>

              {/* Overlay with Series Info */}
              <div className={`absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent transition-all duration-500 ease-in-out ${
                hoveredSeries === show._id ? 'opacity-100' : 'opacity-0'
              }`}>
                
                {/* Series Details */}
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-4 group-hover/card:translate-y-0 transition-transform duration-500 ease-out">
                  
                  {/* Series Title */}
                  <h3 className="text-sm font-bold mb-2 line-clamp-2">
                    {show.title}
                  </h3>
                  
                  {/* Series Year & Rating */}
                  <div className="flex justify-between items-center mb-2">
                    <p className="text-xs text-gray-300">
                      {typeof show.year === 'object' && show.year.$numberDecimal ? 
                        parseFloat(show.year.$numberDecimal) : 
                        show.year}
                    </p>
                    {show.rating && (
                      <p className="text-xs text-yellow-400">
                        ⭐ {typeof show.rating === 'object' && show.rating.$numberDecimal ? 
                            parseFloat(show.rating.$numberDecimal) : 
                            show.rating}
                      </p>
                    )}
                  </div>

                  {/* Length/Duration for Series */}
                  {show.length && (
                    <p className="text-xs text-gray-400 mb-2">
                      {show.length}
                    </p>
                  )}
                  
                  {/* Categories */}
                  {show.category && (
                    <div className="flex flex-wrap gap-1 mb-2">
                      {show.category.slice(0, 2).map((g, i) => (
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
                    <div className="absolute inset-0 bg-blue-500/20 rounded-full animate-ping"></div>
                    <PlayCircleIcon className="relative w-12 h-12 text-white hover:text-blue-400 transition-all duration-300 transform group-hover/play:scale-110" />
                  </div>
                </div>
              </div>

              {/* Border Glow */}
              <div className={`absolute inset-0 rounded-xl border-2 transition-all duration-500 ${
                hoveredSeries === show._id ? 'border-blue-500/60' : 'border-transparent'
              }`}></div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

// Main Component
const SeriesTypesPage = () => {
  // Filter series by type (assuming you have 'Series' or 'TV Series' as type)
  const series = moviesData.filter(e => 
    (e.type === 'Series' || e.type === 'TV Series' || e.type === 'TV Show') && 
    e.active === true
  );
  
  // Group series by categories
  const groupSeriesByCategory = () => {
    const categoryGroups = {};
    
    series.forEach(show => {
      if (show.category && Array.isArray(show.category)) {
        show.category.forEach(category => {
          if (!categoryGroups[category]) {
            categoryGroups[category] = [];
          }
          // Avoid duplicates
          if (!categoryGroups[category].find(s => s._id === show._id)) {
            categoryGroups[category].push(show);
          }
        });
      }
    });
    
    return categoryGroups;
  };

  const categorizedSeries = groupSeriesByCategory();

  // Sort categories by number of series (descending)
  const sortedCategories = Object.keys(categorizedSeries).sort(
    (a, b) => categorizedSeries[b].length - categorizedSeries[a].length
  );

  return (
    <div className="min-h-screen mt-15 bg-black p-8">
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
          TV <span className="text-red-600">Series</span>
        </h1>
      </div>

      {/* Category Carousels */}
      {sortedCategories.length > 0 ? (
        <div className="space-y-8">
          {sortedCategories.map(category => (
            <CategoryCarousel
              key={category}
              title={category}
              series={categorizedSeries[category]}
            />
          ))}
        </div>
      ) : (
        <div className="w-full h-96 flex flex-col justify-center items-center">
          <div className="text-center text-gray-400">
            <h2 className="text-2xl font-semibold mb-4">No TV Series Found</h2>
            <p>It looks like there are no TV series in your database yet.</p>
            <p className="text-sm mt-2">
              Make sure your data includes items with type: "Series", "TV Series", or "TV Show"
            </p>
          </div>
        </div>
      )}

    </div>
  );
};

export default SeriesTypesPage;