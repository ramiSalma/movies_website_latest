import React from 'react'

const Carrousel = ({scrollCarousel , carouselRef , moviesData , setFeaturedMovie }) => {
  return (
   
      <div className="absolute bottom-4 w-full  flex justify-center items-center gap-2">
        {/* Left Button */}
        <button
          onClick={() => scrollCarousel("left")}
          className="bg-black/50 p-1 rounded hover:bg-black/70 transition text-white"
        >
          &#8592;
        </button>

        {/* Movie Thumbnails */}
        <div
          ref={carouselRef}
          className="flex gap-2 overflow-x-auto scrollbar-hide w-7/12 h-30 py-1 px-1"
        >
          {moviesData.map((movie) => (
            <img
              key={movie.id}
              src={movie.bgImg || "https://via.placeholder.com/100x150"}
              alt={movie.title}
              onClick={() => setFeaturedMovie(movie)}
              className="h-full w-auto rounded-lg cursor-pointer transition-transform hover:scale-105"
            />
          ))}
        </div>

        {/* Right Button */}
        <button
          onClick={() => scrollCarousel("right")}
          className="bg-black/50 p-1 rounded hover:bg-black/70 transition text-white"
        >
          &#8594;
        </button>
      </div>
  )
}

export default Carrousel
