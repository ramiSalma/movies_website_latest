import React, { useRef } from "react";

const MoviesBar = ({ data, category, onMovieClick }) => {
  const scrollRef = useRef(null);

  // Filter movies by category
  const filteredMovies = data.filter(
    (movie) => movie.category?.toLowerCase() === category.toLowerCase()
  );

  // Scroll handler
  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = 300;
      if (direction === "left") {
        scrollRef.current.scrollBy({ left: -scrollAmount, behavior: "smooth" });
      } else {
        scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
      }
    }
  };

  return (
    <div className="relative my-4">
      {/* Category title */}
      <h2 className="text-white text-xl font-bold mb-2">{category}</h2>

      {/* Left button */}
      <button
        className="absolute left-0 top-1/2 -translate-y-1/2 bg-black/50 text-white px-2 py-1 rounded z-10"
        onClick={() => scroll("left")}
      >
        &lt;
      </button>

      {/* Movie list */}
      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto px-10 py-2 backdrop-blur-sm bg-black/30 rounded-lg scroll-smooth scrollbar-hide"
      >
        {filteredMovies.map((movie) => (
          <div
            key={movie._id}
            className="w-36 flex-shrink-0 cursor-pointer hover:scale-105 transition-transform duration-200"
            onClick={() => onMovieClick(movie)}
          >
            <img
              src={movie.bgImg || "https://via.placeholder.com/150"}
              alt={movie.title}
              className="rounded-lg mb-1"
            />
            <h3 className="text-sm font-semibold text-white text-center">
              {movie.title}
            </h3>
          </div>
        ))}
      </div>

      {/* Right button */}
      <button
        className="absolute right-0 top-1/2 -translate-y-1/2 bg-black/50 text-white px-2 py-1 rounded z-10"
        onClick={() => scroll("right")}
      >
        &gt;
      </button>
    </div>
  );
};

export default MoviesBar;
