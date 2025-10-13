import React from 'react'


const MovieContent = ({ slide }) => {
  // Responsive logic
  const [isMobile, setIsMobile] = React.useState(false);
  React.useEffect(() => {
    const checkScreenSize = () => setIsMobile(window.innerWidth <= 690);
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  // Dynamic classes for responsiveness
  const contentClass =
    `content absolute text-left text-white hidden ` +
    (isMobile
      ? 'top-[30%] left-[20px] max-w-[calc(100%-40px)] pr-[20px]'
      : 'top-1/2 left-24 transform -translate-y-1/2 w-[600px] lg:w-[800px]');

  const titleClass =
    isMobile
      ? 'text-2xl font-black text-white leading-tight mb-2'
      : 'text-5xl lg:text-7xl font-black text-white leading-tight mb-6';

  const descriptionClass =
    isMobile
      ? 'text-gray-300 text-sm leading-relaxed max-w-xs mb-2 des'
      : 'text-gray-300 text-xl leading-relaxed max-w-2xl mb-4 des';

  const buttonClass =
    isMobile
      ? 'px-4 py-2 text-xs max-w-[150px]'
      : 'px-8 py-4 text-lg max-w-[220px]';

  // Hide some info on mobile
  const showMeta = !isMobile;
  const showRating = !isMobile;
  const showRelease = !isMobile;

  return (
    <div>
      <div className={contentClass}>
        <div className="lg:col-span-3 text-white z-10 space-y-4">
          {/* Genres (show only on desktop) */}
          {/* {!isMobile && (
            <div className="flex flex-wrap gap-3 animate-slide-in-1 opacity-0">
              {slide.category && slide.category.map((genre, index) => (
                <span
                  key={index}
                  className="bg-red-600/20 border border-red-600/40 text-red-300 px-4 py-2 rounded-full text-sm font-medium hover:bg-red-600/30 transition-colors duration-300"
                >
                  {genre}
                </span>
              ))}
            </div>
          )} */}

          {/* Title Logo (if available) */}
          {slide.titleImg && (
            <div className="mb-4 animate-slide-in-2 opacity-0">
              <img
                src={slide.titleImg}
                alt={slide.title}
                className={isMobile ? 'h-24 max-w-xs object-contain' : 'h-60 max-w-md object-contain'}
              />
            </div>
          )}

          {/* Fallback title if no titleImg */}
          {!slide.titleImg && (
            <div className="animate-slide-in-2 opacity-0">
              <h1 className={titleClass}>
                {slide.title}
              </h1>
            </div>
          )}

          {/* Movie Meta Information (hide on mobile) */}
          {showMeta && (
            <div className="flex flex-wrap items-center gap-4 text-base lg:text-xl mb-5 animate-slide-in-3 opacity-0">
              <span className="font-bold shadow-lg">
                {slide.year}
              </span>
              <span className="text-gray-400">|</span>
              <span className="text-gray-300 flex items-center gap-2 backdrop-blur-sm">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.414-1.414L11 9.586V6z" clipRule="evenodd" />
                </svg>
                {slide.length}
              </span>
              <span className="text-gray-400">|</span>
              <span className="font-semibold">
                {slide.ageLimit}
              </span>
            </div>
          )}

          {/* Rating with Red Stars (hide on mobile) */}
          {showRating && slide.rating && (
            <div className="flex items-center my-4 animate-slide-in-3 opacity-0">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => {
                  const rating = typeof slide.rating === 'object' ? parseFloat(slide.rating.$numberDecimal) : slide.rating;
                  const starRating = (rating / 10) * 5;
                  const isFilled = i < Math.floor(starRating);
                  return (
                    <svg
                      key={i}
                      className={`w-7 h-7 transition-all duration-300 hover:scale-110 ${
                        isFilled ? 'text-red-600' : 'text-gray-600'
                      }`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  );
                })}
              </div>
              <p className="mx-3 text-2xl font-bold hover:text-red-400">
                {typeof slide.rating === 'object' ? slide.rating.$numberDecimal : slide.rating}/10
              </p>
            </div>
          )}

          {/* Description (shorter on mobile) */}
          {slide.description && (
            <div className="animate-slide-in-4 opacity-0">
              <p className={descriptionClass}>
                {isMobile
                  ? `${slide.description.substring(0, 80)}${slide.description.length > 80 ? '...' : ''}`
                  : slide.description}
              </p>
            </div>
          )}

          {/* Release Date (hide on mobile) */}
          {showRelease && (
            <div className="text-gray-400 text-base flex items-center gap-2 animate-slide-in-4 opacity-0">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              Released: {new Date(slide.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </div>
          )}

          {/* Action Buttons */}
          <div className={`flex flex-wrap gap-4 pt-6 animate-slide-in-4 opacity-0 ${isMobile ? 'btn flex-col gap-2' : 'btn flex-row gap-4'}`}>
            <div className="flex gap-2">
              <button className={`bg-red-600 rounded-lg font-bold hover:bg-red-700 transition-all duration-300 transform hover:scale-105 ${buttonClass}`}>
                + MY LIST
              </button>
              <button className={`border-2 border-red-600 rounded-lg font-bold hover:bg-red-600 hover:text-white transition-all duration-300 transform hover:scale-105 ${buttonClass}`}>
                WATCH NOW
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MovieContent

