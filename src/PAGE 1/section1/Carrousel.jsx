import React, { useState, useEffect, useRef } from "react";
import { ChevronLeftIcon, ChevronRightIcon, PlayIcon, PauseIcon } from "@heroicons/react/24/outline";

const Carousel = ({ scrollCarousel, carouselRef, moviesData, setFeaturedMovie, featuredMovie }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [animationStyle, setAnimationStyle] = useState('carousel3d');
  const intervalRef = useRef(null);
  const containerRef = useRef(null);

  // Auto-advance carousel with dynamic timing
  useEffect(() => {
    if (isAutoPlaying) {
      intervalRef.current = setInterval(() => {
        nextSlide();
      }, 3500);
    } else {
      clearInterval(intervalRef.current);
    }

    return () => clearInterval(intervalRef.current);
  }, [isAutoPlaying, currentIndex]);

  // Update featured movie with smooth transition
  useEffect(() => {
    if (moviesData[currentIndex]) {
      setIsTransitioning(true);
      setTimeout(() => {
        setFeaturedMovie(moviesData[currentIndex]);
        setIsTransitioning(false);
      }, 200);
    }
  }, [currentIndex, moviesData, setFeaturedMovie]);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % moviesData.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + moviesData.length) % moviesData.length);
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  const toggleAutoPlay = () => {
    setIsAutoPlaying(!isAutoPlaying);
  };

  // Calculate item position and style based on animation type
  const getItemStyle = (index) => {
    const total = moviesData.length;
    const offset = (index - currentIndex + total) % total;
    const normalizedOffset = offset > total / 2 ? offset - total : offset;
    
    switch (animationStyle) {
      case 'carousel3d':
        return get3DCarouselStyle(normalizedOffset, total);
      case 'waveEffect':
        return getWaveStyle(normalizedOffset, total);
      case 'spiralEffect':
        return getSpiralStyle(normalizedOffset, total);
      case 'flipEffect':
        return getFlipStyle(normalizedOffset);
      default:
        return get3DCarouselStyle(normalizedOffset, total);
    }
  };

  const get3DCarouselStyle = (offset, total) => {
    const angle = (offset * 360) / Math.min(total, 8);
    const radius = 280;
    const centerX = Math.sin((angle * Math.PI) / 180) * radius;
    const centerZ = Math.cos((angle * Math.PI) / 180) * radius;
    const scale = offset === 0 ? 1.2 : Math.max(0.6, 1 - Math.abs(offset) * 0.15);
    const opacity = offset === 0 ? 1 : Math.max(0.4, 1 - Math.abs(offset) * 0.2);
    const rotateY = -angle;

    return {
      transform: `translateX(${centerX}px) translateZ(${centerZ}px) rotateY(${rotateY}deg) scale(${scale})`,
      opacity,
      zIndex: offset === 0 ? 10 : Math.max(1, 5 - Math.abs(offset)),
      filter: offset === 0 ? 'brightness(1.1) saturate(1.2)' : `brightness(${0.7 + (1 - Math.abs(offset) * 0.1)})`,
    };
  };

  const getWaveStyle = (offset, total) => {
    const waveHeight = Math.sin((offset * Math.PI) / 4) * 60;
    const scale = offset === 0 ? 1.3 : Math.max(0.7, 1 - Math.abs(offset) * 0.1);
    const rotation = offset * 5;
    const translateX = offset * 180;
    
    return {
      transform: `translateX(${translateX}px) translateY(${waveHeight}px) rotate(${rotation}deg) scale(${scale})`,
      opacity: Math.max(0.3, 1 - Math.abs(offset) * 0.15),
      zIndex: offset === 0 ? 10 : Math.max(1, 8 - Math.abs(offset)),
      filter: offset === 0 ? 'brightness(1.2) contrast(1.1)' : 'brightness(0.8)',
    };
  };

  const getSpiralStyle = (offset, total) => {
    const spiralRadius = Math.abs(offset) * 40;
    const spiralAngle = offset * 45;
    const x = Math.cos((spiralAngle * Math.PI) / 180) * spiralRadius;
    const y = Math.sin((spiralAngle * Math.PI) / 180) * spiralRadius;
    const scale = offset === 0 ? 1.4 : Math.max(0.5, 1 - Math.abs(offset) * 0.2);
    
    return {
      transform: `translateX(${offset * 160 + x}px) translateY(${y}px) rotate(${spiralAngle}deg) scale(${scale})`,
      opacity: Math.max(0.2, 1 - Math.abs(offset) * 0.2),
      zIndex: offset === 0 ? 10 : Math.max(1, 7 - Math.abs(offset)),
      filter: offset === 0 ? 'brightness(1.3) hue-rotate(10deg)' : `brightness(${0.6 + (1 - Math.abs(offset) * 0.1)})`,
    };
  };

  const getFlipStyle = (offset) => {
    const rotateY = offset * 30;
    const scale = offset === 0 ? 1.2 : Math.max(0.8, 1 - Math.abs(offset) * 0.1);
    const translateX = offset * 200;
    
    return {
      transform: `translateX(${translateX}px) rotateY(${rotateY}deg) scale(${scale})`,
      opacity: Math.max(0.4, 1 - Math.abs(offset) * 0.15),
      zIndex: offset === 0 ? 10 : Math.max(1, 6 - Math.abs(offset)),
      transformOrigin: 'center center',
      filter: offset === 0 ? 'brightness(1.2) saturate(1.3)' : 'brightness(0.7)',
    };
  };

  return (
    <div className="absolute w-full left-1/2 transform -translate-x-1/2 bottom-10 h-96 flex flex-col justify-center items-center gap-6">
      
      {/* Animation Style Selector */}
      <div className="flex gap-2 mb-4">
        {[
          { key: 'carousel3d', label: '3D Carousel' },
          { key: 'waveEffect', label: 'Wave' },
          { key: 'spiralEffect', label: 'Spiral' },
          { key: 'flipEffect', label: 'Flip' }
        ].map(({ key, label }) => (
          <button
            key={key}
            onClick={() => setAnimationStyle(key)}
            className={`px-3 py-1 text-xs rounded-full transition-all duration-300 ${
              animationStyle === key
                ? 'bg-red-600 text-white'
                : 'bg-black/50 text-gray-300 hover:bg-red-600/30'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Movie Carousel Container */}
      <div className="relative w-full max-w-7xl h-80">
        
        {/* Navigation Buttons */}
        <button
          onClick={() => {
            prevSlide();
            setIsAutoPlaying(false);
          }}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 z-30 bg-black/80 backdrop-blur-sm p-4 rounded-full hover:bg-red-600/80 transition-all duration-300 hover:scale-125 group shadow-2xl border border-red-600/50"
        >
          <ChevronLeftIcon className="w-6 h-6 text-white group-hover:text-white transition-colors" />
        </button>

        <button
          onClick={() => {
            nextSlide();
            setIsAutoPlaying(false);
          }}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 z-30 bg-black/80 backdrop-blur-sm p-4 rounded-full hover:bg-red-600/80 transition-all duration-300 hover:scale-125 group shadow-2xl border border-red-600/50"
        >
          <ChevronRightIcon className="w-6 h-6 text-white group-hover:text-white transition-colors" />
        </button>

        {/* Auto-play Controls */}
        <div className="absolute top-4 right-4 z-30 flex gap-2">
          <button
            onClick={toggleAutoPlay}
            className="bg-black/80 backdrop-blur-sm p-3 rounded-full hover:bg-red-600/80 transition-all duration-300 group shadow-lg border border-red-600/30"
          >
            {isAutoPlaying ? (
              <PauseIcon className="w-5 h-5 text-white group-hover:text-white transition-colors" />
            ) : (
              <PlayIcon className="w-5 h-5 text-white group-hover:text-white transition-colors" />
            )}
          </button>
        </div>

        {/* 3D Carousel Container */}
        <div 
          ref={containerRef}
          className="relative w-full h-full flex items-center justify-center"
          style={{ 
            perspective: '1200px',
            perspectiveOrigin: 'center center'
          }}
        >
          <div className="relative w-full h-full flex items-center justify-center transform-gpu">
            {moviesData.map((movie, index) => {
              const itemStyle = getItemStyle(index);
              const isActive = index === currentIndex;
              
              return (
                <div
                  key={movie._id}
                  className={`absolute cursor-pointer transition-all duration-700 ease-out transform-gpu ${
                    isActive ? 'z-20' : ''
                  }`}
                  style={itemStyle}
                  onClick={() => {
                    goToSlide(index);
                    setIsAutoPlaying(false);
                  }}
                >
                  {/* Movie Card */}
                  <div className={`relative group transition-all duration-500 ${
                    isActive ? 'animate-pulse' : ''
                  }`}>
                    {/* Movie Image */}
                    <img
                      src={movie.bgImg || "https://via.placeholder.com/200x300/1a1a1a/666?text=No+Image"}
                      alt={movie.title}
                      className={`w-44 h-64 object-cover rounded-xl shadow-2xl transition-all duration-500 ${
                        isActive 
                          ? 'shadow-red-600/50 ring-4 ring-red-600/30' 
                          : 'shadow-black/50'
                      }`}
                      loading="lazy"
                    />
                    
                    {/* Active Movie Effects */}
                    {isActive && (
                      <>
                        <div className="absolute inset-0 bg-gradient-to-t from-red-600/30 via-transparent to-transparent rounded-xl animate-pulse"></div>
                        <div className="absolute -inset-2 bg-gradient-to-r from-red-600/20 via-red-600/10 to-red-600/20 rounded-xl blur-lg"></div>
                      </>
                    )}
                    
                    {/* Movie Info Overlay */}
                    <div className={`absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent rounded-xl transition-opacity duration-300 ${
                      isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                    }`}>
                      <div className="absolute bottom-0 left-0 right-0 p-4">
                        <h3 className={`text-white font-bold mb-1 transition-all duration-300 ${
                          isActive ? 'text-lg text-red-100' : 'text-sm'
                        }`}>
                          {movie.title}
                        </h3>
                        {movie.year && (
                          <p className="text-gray-300 text-xs mb-1">
                            {movie.year}
                          </p>
                        )}
                        {movie.category && isActive && (
                          <div className="flex gap-1 text-xs">
                            {movie.category.slice(0, 2).map((cat, i) => (
                              <span key={i} className="bg-red-600/30 text-red-200 px-2 py-1 rounded">
                                {cat}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Floating Particles Effect for Active Movie */}
                    {isActive && (
                      <div className="absolute inset-0 pointer-events-none">
                        {[...Array(6)].map((_, i) => (
                          <div
                            key={i}
                            className="absolute w-1 h-1 bg-red-400 rounded-full animate-ping"
                            style={{
                              top: `${Math.random() * 100}%`,
                              left: `${Math.random() * 100}%`,
                              animationDelay: `${i * 0.2}s`,
                              animationDuration: '2s'
                            }}
                          />
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Status and Controls */}
      <div className="flex items-center gap-6 text-white/70 text-sm">
        <span className="font-medium">
          {currentIndex + 1} / {moviesData.length}
        </span>
        <div className="w-1 h-1 bg-white/30 rounded-full"></div>
        <span className={`transition-colors duration-300 ${
          isAutoPlaying ? 'text-red-400' : 'text-white/40'
        }`}>
          {isAutoPlaying ? 'Auto-playing' : 'Paused'}
        </span>
        <div className="w-1 h-1 bg-white/30 rounded-full"></div>
        <span className="text-red-400 font-medium">{animationStyle}</span>
      </div>

      {/* Quick Navigation Dots */}
      <div className="flex gap-3 mt-2">
        {moviesData.slice(0, Math.min(8, moviesData.length)).map((_, index) => (
          <button
            key={index}
            onClick={() => {
              goToSlide(index);
              setIsAutoPlaying(false);
            }}
            className={`transition-all duration-300 ${
              index === currentIndex 
                ? 'w-4 h-4 bg-red-600 rounded-full shadow-lg shadow-red-600/50 animate-pulse' 
                : 'w-2 h-2 bg-white/30 rounded-full hover:bg-white/50 hover:scale-125'
            }`}
          />
        ))}
      </div>

      {/* Instructions */}
      <p className="text-white/50 text-xs text-center mt-2 max-w-md">
        Switch between animation styles above • Click movies to select • Auto-advances every 3.5 seconds
      </p>
    </div>
  );
};

export default Carousel;