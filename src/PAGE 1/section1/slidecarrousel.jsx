import React, { useEffect, useRef, useState } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import './SlideCarrousel.css';
import MovieContent from "./MovieContent";

const ModernSlideCarousel = ({ slides }) => {
  const listRef = useRef(null);
  const carouselRef = useRef(null);
  const runningTimeRef = useRef(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [screenSize, setScreenSize] = useState('desktop');

  const timeRunning = 3000;
  const timeAutoNext = 7000;
  let runNextAuto = useRef(null);

  // Check screen size
  useEffect(() => {
    const checkScreenSize = () => {
      if (window.innerWidth <= 690) {
        setScreenSize('mobile');
      } else if (window.innerWidth <= 1024) {
        setScreenSize('tablet');
      } else {
        setScreenSize('desktop');
      }
    };
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  const resetTimeAnimation = () => {
    const runningTimeEl = runningTimeRef.current;
    if (runningTimeEl) {
      runningTimeEl.style.animation = "none";
      runningTimeEl.offsetHeight; // trigger reflow
      runningTimeEl.style.animation = "runningTime 7s linear 1 forwards";
    }
  };

  const showSlider = (type) => {
    if (isTransitioning) return;

    setIsTransitioning(true);
    const listEl = listRef.current;
    const carouselEl = carouselRef.current;
    const items = listEl.querySelectorAll(".carousel-item");

    if (type === "next") {
      listEl.appendChild(items[0]);
      carouselEl.classList.add("carousel-next");
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    } else {
      listEl.prepend(items[items.length - 1]);
      carouselEl.classList.add("carousel-prev");
      setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    }

    setTimeout(() => {
      carouselEl.classList.remove("carousel-next", "carousel-prev");
      setIsTransitioning(false);
    }, timeRunning);

    clearTimeout(runNextAuto.current);
    runNextAuto.current = setTimeout(() => showSlider("next"), timeAutoNext);

    resetTimeAnimation();
  };

  useEffect(() => {
    resetTimeAnimation();
    runNextAuto.current = setTimeout(() => showSlider("next"), timeAutoNext);

    return () => clearTimeout(runNextAuto.current);
  }, []);

  return (
    <div className="relative w-full h-screen overflow-hidden bg-black" style={{ zIndex: 1 }}>
      {/* Main Carousel Container */}
      <div className="carousel-container relative w-full h-full" ref={carouselRef}>
        <div className="carousel-list relative w-full h-full" ref={listRef}>
          {slides.map((slide, index) => {
            let cardWidth, cardHeight, cardTop, cardLeft, cardTransform, cardMargin;
            if (screenSize === 'mobile') {
              cardWidth = '120px';
              cardHeight = '160px';
              cardTop = '75%';
              cardLeft = '60%';
              cardTransform = 'translateY(-75%)';
              cardMargin = '10px';
            } else if (screenSize === 'tablet') {
              cardWidth = '200px';
              cardHeight = '280px';
              cardTop = '78%';
              cardLeft = '65%';
              cardTransform = 'translateY(-78%)';
              cardMargin = '20px';
            } else {
              cardWidth = '350px';
              cardHeight = '480px';
              cardTop = '80%';
              cardLeft = '70%';
              cardTransform = 'translateY(-90%) translateX(-0%)';
              cardMargin = '40px';
            }
            // Add margin between cards
            // let cardMargin;
            // if (screenSize === 'mobile') {
            //   cardMargin = '12px';
            // } else if (screenSize === 'tablet') {
            //   cardMargin = '20px';
            // } else {
            //   cardMargin = '32px';
            // }
            return (
              <div
                key={index}
                className="carousel-item absolute bg-cover bg-center bg-no-repeat transition-all duration-1000 ease-in-out"
                style={{
                  backgroundImage: `url(${slide.bgImg})`,
                  '--bg-image': `url(${slide.reviewImg || slide.bgImg})`,
                  width: cardWidth,
                  height: cardHeight,
                  top: cardTop,
                  left: cardLeft,
                  transform: cardTransform,
                  borderRadius: '20px',
                  boxShadow: '0 25px 50px rgba(0, 0, 0, 0.3)',
                  zIndex: 10,
                  marginRight: cardMargin,
                }}
              >
                {/* Content - Only visible on second item */}
                <MovieContent slide={slide} />
              </div>
            );
          })}
        </div>

        {/* Navigation Arrows - Responsive */}
        <div className={`arrows absolute flex justify-between items-center px-4 sm:px-8 ${
          screenSize === 'mobile' ? 'bottom-4 left-0 right-0' : 'top-80 bottom-0 left-180 right-0'
        }`} style={{ zIndex: 40 }}>
          <button
            onClick={() => showSlider("prev")}
            disabled={isTransitioning}
            className={`${
              screenSize === 'mobile' ? 'w-12 h-12' : screenSize === 'tablet' ? 'w-14 h-14' : 'w-16 h-16'
            } rounded-full text-white border-2 border-white/30 hover:border-red-600 text-xl font-bold transition-all duration-500 hover:bg-red-600 hover:text-white hover:scale-110 disabled:opacity-50 flex items-center justify-center shadow-lg backdrop-blur-sm bg-black/30`}
          >
            <ChevronLeftIcon className={`${screenSize === 'mobile' ? 'w-7 h-7' : screenSize === 'tablet' ? 'w-8 h-8' : 'w-10 h-10'}`} />
          </button>
          <button
            onClick={() => showSlider("next")}
            disabled={isTransitioning}
            className={`${
              screenSize === 'mobile' ? 'w-12 h-12' : screenSize === 'tablet' ? 'w-14 h-14' : 'w-16 h-16'
            } rounded-full text-white border-2 border-white/30 hover:border-red-600 text-xl font-bold transition-all duration-500 hover:bg-red-600 hover:text-white hover:scale-110 disabled:opacity-50 flex items-center justify-center shadow-lg backdrop-blur-sm bg-black/30`}
          >
            <ChevronRightIcon className={`${screenSize === 'mobile' ? 'w-7 h-7' : screenSize === 'tablet' ? 'w-8 h-8' : 'w-10 h-10'}`} />
          </button>
        </div>

        {/* Progress Bar */}
        <div className="absolute top-0 left-0 w-full h-1 bg-black/30" style={{ zIndex: 30 }}>
          <div
            ref={runningTimeRef}
            className="h-full bg-red-600 w-0 transition-all duration-300"
            style={{
              animation: "runningTime 7s linear 1 forwards"
            }}
          />
        </div>

        {/* Mobile Slide Indicator */}
        {screenSize === 'mobile' && (
          <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2 flex gap-2" style={{ zIndex: 40 }}>
            {slides.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentSlide ? 'bg-red-600 scale-125' : 'bg-white/30'
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ModernSlideCarousel;