import React, { useRef, useState, useEffect } from "react";
import { ArrowLongRightIcon, ChevronLeftIcon, ChevronRightIcon, StarIcon, EyeIcon } from "@heroicons/react/24/outline";
import { StarIcon as StarSolidIcon } from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";
import ShinyText from "../SHINY-TEXT/ShinyText";

const Collection = ({ title, items = [], collectionId }) => {
  const carouselRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [hoveredItem, setHoveredItem] = useState(null);

  const fontStyle = {
    fontFamily: "'Playfair Display', serif",
    fontOpticalSizing: "auto",
    fontStyle: "normal",
  };

  const scrollCarousel = (direction) => {
    if (carouselRef.current) {
      const scrollAmount = 680; // Width of 4 cards plus gaps (160px * 4 + 16px * 3)
      const currentScroll = carouselRef.current.scrollLeft;
      const newScroll = direction === 'left' 
        ? currentScroll - scrollAmount 
        : currentScroll + scrollAmount;

      carouselRef.current.scrollTo({
        left: newScroll,
        behavior: 'smooth'
      });

      // Update scroll state after animation
      setTimeout(checkScrollState, 300);
    }
  };

  const checkScrollState = () => {
    if (carouselRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1);
    }
  };

  useEffect(() => {
    checkScrollState();
  }, [items]);

  // Early return if no items
  if (!items || items.length === 0) {
    return (
      <div className="w-full min-h-80 text-left flex gap-10 px-10 py-8 bg-black rounded-2xl shadow-xl">
        <div className="flex w-1/4 flex-col justify-between pb-4">
          <div>
            <h2
              style={fontStyle}
              className="text-5xl font-bold text-red-600 mb-4 relative inline-block"
            >
              {title || "Collection"}
              <span className="absolute -bottom-1 left-0 w-full h-[3px] bg-gradient-to-r from-red-700 via-red-500 to-red-700 blur-sm"></span>
              <span className="absolute -bottom-1 left-0 w-full h-[1px] bg-red-600"></span>
            </h2>
            
            <div className="text-gray-400 text-sm mb-6">
              <p className="flex items-center gap-2">
                <span className="w-2 h-2 bg-gray-500 rounded-full"></span>
                No items available
              </p>
            </div>
          </div>
        </div>
        
        <div className="w-3/4 flex items-center justify-center">
          <div className="text-center text-gray-500">
            <div className="text-6xl mb-4">📽️</div>
            <p className="text-lg">No items to display</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-80 text-left flex gap-10 px-10 py-8 bg-black rounded-2xl shadow-xl">
      {/* Title + Info */}
      <div className="flex w-1/4 flex-col justify-between pb-4">
        <div>
          <h2
            style={fontStyle}
            className="text-5xl font-bold text-red-600 mb-4 relative inline-block"
          >
            {title}
            <span className="absolute -bottom-1 left-0 w-full h-[3px] bg-gradient-to-r from-red-700 via-red-500 to-red-700 blur-sm"></span>
            <span className="absolute -bottom-1 left-0 w-full h-[1px] bg-red-600"></span>
          </h2>
          
          {/* Collection Stats */}
          <div className="text-gray-400 text-sm mb-6">
            <p className="flex items-center gap-2">
              <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
              {items.length} Collection items
            </p>
          </div>
        </div>

        {/* Navigation Instructions */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2 text-gray-300 text-lg font-medium">
            <ShinyText
              text="DRAG TO BROWSE"
              disabled={false}
              speed={3}
              className='custom-class'
            />
            <ArrowLongRightIcon className="h-6 w-6 text-red-600 hover:scale-110 transition-all duration-300 hover:text-red-500" />
          </div>
          
          {/* View All Link */}
          <Link 
            to={`/collections/${collectionId || title.toLowerCase().replace(/\s+/g, '-')}`}
            className="flex items-center gap-2 text-red-600 text-sm font-semibold hover:text-red-400 transition-colors duration-300 group"
          >
            <EyeIcon className="h-4 w-4 group-hover:scale-110 transition-transform duration-300" />
            View All {title}
          </Link>
        </div>
      </div>

      {/* Enhanced Carousel */}
      <div className="relative w-3/4 group">
        
        {/* Navigation Buttons */}
        <button
          onClick={() => scrollCarousel('left')}
          disabled={!canScrollLeft}
          className={`absolute left-4 top-1/2 transform -translate-y-1/2 z-30 p-4 rounded-full backdrop-blur-md transition-all duration-500 ease-in-out shadow-2xl ${
            canScrollLeft 
              ? 'bg-black/80 hover:bg-red-600/90 hover:scale-125 text-white hover:shadow-red-500/50' 
              : 'bg-gray-400/20 text-gray-400 cursor-not-allowed scale-90'
          } opacity-0 group-hover:opacity-100 translate-x-0 group-hover:translate-x-2`}
          aria-label="Previous items"
        >
          <ChevronLeftIcon className="h-5 w-5 transition-all duration-300" />
        </button>

        <button
          onClick={() => scrollCarousel('right')}
          disabled={!canScrollRight}
          className={`absolute right-4 top-1/2 transform -translate-y-1/2 z-30 p-4 rounded-full backdrop-blur-md transition-all duration-500 ease-in-out shadow-2xl ${
            canScrollRight 
              ? 'bg-black/80 hover:bg-red-600/90 hover:scale-125 text-white hover:shadow-red-500/50' 
              : 'bg-gray-400/20 text-gray-400 cursor-not-allowed scale-90'
          } opacity-0 group-hover:opacity-100 translate-x-0 group-hover:-translate-x-2`}
          aria-label="Next items"
        >
          <ChevronRightIcon className="h-5 w-5 transition-all duration-300" />
        </button>

        {/* Enhanced Gradient Overlays */}
        <div className="absolute left-0 top-0 w-20 h-full bg-gradient-to-r from-black via-black/80 to-transparent z-20 pointer-events-none opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
        <div className="absolute right-0 top-0 w-20 h-full bg-gradient-to-l from-black via-black/80 to-transparent z-20 pointer-events-none opacity-0 group-hover:opacity-100 transition-all duration-500"></div>

        {/* Carousel Container */}
        <div
          ref={carouselRef}
          onScroll={checkScrollState}
          className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide scroll-smooth px-8"
          style={{
            scrollBehavior: 'smooth',
            scrollbarWidth: 'none',
            msOverflowStyle: 'none'
          }}
        >
          {items.map((item, index) => (
            <Link
              key={index}
              to={`/page2/${item._id}`}
              className="relative min-w-[160px] h-48 bg-black/90 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl hover:shadow-red-500/25 transition-all duration-500 ease-out cursor-pointer group/item flex-shrink-0 transform hover:scale-105 hover:-translate-y-3 block"
              onMouseEnter={() => setHoveredItem(index)}
              onMouseLeave={() => setHoveredItem(null)}
            >
              {/* Image */}
              <img
                src={item.bgImg || item.image}
                alt={item.title || item.name}
                className="h-full w-full object-cover transition-all duration-700 ease-out group-hover/item:scale-110 group-hover/item:brightness-110"
                loading="lazy"
              />
              
              {/* Enhanced Overlay with Smooth Animation */}
              <div className={`absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent transition-all duration-500 ease-in-out ${
                hoveredItem === index ? 'opacity-100' : 'opacity-0'
              }`}>
                
                {/* Content with Staggered Animation */}
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-4 group-hover/item:translate-y-0 transition-transform duration-500 ease-out">
                  <h3 className="text-lg font-bold mb-2 line-clamp-2 text-white group-hover/item:text-red-400 transition-colors duration-300">
                    {item.title || item.name}
                  </h3>
                  
                  {item.year && (
                    <p className="text-gray-300 text-sm mb-2">
                      {item.year}
                    </p>
                  )}
                  
                  {item.description && (
                    <p className={`text-gray-300 text-xs transition-all duration-500 ease-in-out line-clamp-3 ${
                      hoveredItem === index ? 'opacity-100 max-h-20 translate-y-0' : 'opacity-0 max-h-0 translate-y-2'
                    }`}>
                      {item.description}
                    </p>
                  )}
                  
                  {item.rating && (
                    <div className={`flex items-center mt-2 transition-all duration-600 ease-in-out ${
                      hoveredItem === index ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                    }`}>
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <StarSolidIcon
                            key={i}
                            className={`w-3 h-3 ${
                              i < Math.floor(item.rating) ? 'text-yellow-400' : 'text-gray-600'
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-gray-300 text-xs ml-1">
                        {item.rating}
                      </span>
                    </div>
                  )}
                  
                  {(item.genre || item.category) && (
                    <div className="flex flex-wrap gap-1 mt-2">
                      {(item.category || item.genre)?.slice(0, 2).map((g, i) => (
                        <span key={i} className="px-2 py-0.5 bg-red-600/80 text-xs rounded-full">
                          {g}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Collection;