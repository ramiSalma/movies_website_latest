import React, { useState, useRef, useEffect } from "react";
import moviesData from "../../api/movies";
import MoviesContent from "./MoviesContent";
import Carrousel from "./Carrousel";

const Banner = () => {
  const [featuredMovie, setFeaturedMovie] = useState(moviesData[0]);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [nextMovie, setNextMovie] = useState(null);
  const carouselRef = useRef(null);

  // Enhanced movie selection with smooth transition
  const handleMovieSelect = (movie) => {
    if (movie._id === featuredMovie._id || isTransitioning) return;
    
    setIsTransitioning(true);
    setNextMovie(movie);
    
    // Transition timing - longer for smoother effect
    setTimeout(() => {
      setFeaturedMovie(movie);
      setNextMovie(null);
      setIsTransitioning(false);
    }, 1200);
  };

  // Enhanced scroll carousel with smooth movement
  const scrollCarousel = (direction) => {
    if (carouselRef.current) {
      const cardWidth = 176; // w-44 = 176px
      const gap = 16; // gap-4 = 16px
      const scrollAmount = (cardWidth + gap) * 2; // Scroll 2 cards at a time
      
      carouselRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="relative w-full h-screen bg-black text-white overflow-hidden">
      {/* Background Image with Enhanced Transition Animations */}
      <div className="absolute inset-0">
        {/* Current Background with smooth animations */}
        <img
          src={featuredMovie.reviewImg}
          alt={featuredMovie.title}
          className={`absolute w-full h-full object-cover transition-all duration-[1200ms] ease-out ${
            isTransitioning 
              ? 'brightness-20 scale-125 blur-md opacity-60 rotate-1' 
              : 'brightness-50 scale-100 blur-0 opacity-100 rotate-0'
          }`}
        />
        
        {/* Next Background with entrance animation */}
        {nextMovie && (
          <img
            src={nextMovie.reviewImg}
            alt={nextMovie.title}
            className={`absolute w-full h-full object-cover transition-all duration-[1200ms] ease-out ${
              isTransitioning 
                ? 'brightness-50 scale-100 blur-0 opacity-100 rotate-0' 
                : 'brightness-20 scale-110 blur-sm opacity-0 -rotate-1'
            }`}
          />
        )}
        
        {/* Enhanced Dynamic Overlays */}
        <div className={`absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/60 transition-all duration-1000 ${
          isTransitioning ? 'opacity-95' : 'opacity-100'
        }`}></div>
        <div className={`absolute inset-0 bg-gradient-to-r from-black/70 via-transparent to-black/30 transition-all duration-1000 ${
          isTransitioning ? 'opacity-80' : 'opacity-100'
        }`}></div>
      </div>

      {/* Enhanced Animated Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className={`absolute w-1 h-1 bg-red-500/30 rounded-full transition-all duration-1000 ${
              isTransitioning ? 'animate-pulse scale-150' : 'animate-pulse scale-100'
            }`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 4}s`,
              animationDuration: `${2 + Math.random() * 4}s`
            }}
          />
        ))}
      </div>

      {/* Movie Content with Enhanced Text Animations */}
      <div className={`transition-all duration-[1000ms] ease-out ${
        isTransitioning 
          ? 'opacity-0 translate-x-12 scale-95 blur-sm' 
          : 'opacity-100 translate-x-0 scale-100 blur-0'
      }`}>
        <MoviesContent featuredMovie={featuredMovie} isTransitioning={isTransitioning} />
      </div>

      {/* Enhanced Carousel */}
      <Carrousel 
        scrollCarousel={scrollCarousel} 
        carouselRef={carouselRef} 
        moviesData={moviesData} 
        setFeaturedMovie={handleMovieSelect}
        featuredMovie={featuredMovie}
        isTransitioning={isTransitioning}
      />

      {/* Enhanced Loading Indicator */}
      {isTransitioning && (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50">
          <div className="relative">
            <div className="w-20 h-20 border-4 border-red-500/20 border-t-red-500 rounded-full animate-spin"></div>
            <div className="absolute inset-0 w-20 h-20 border-4 border-transparent border-r-red-400 rounded-full animate-spin animate-reverse"></div>
          </div>
          <p className="text-white text-sm mt-4 text-center animate-pulse">Loading...</p>
        </div>
      )}
    </div>
  );
};

export default Banner;