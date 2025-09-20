import React from 'react';
import { FilmIcon, PlayIcon } from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';

const RelatedMoviesSection = ({ relatedMovies, featuredMovie }) => {
  if (!relatedMovies || relatedMovies.length === 0) return null;

  return (
    <div className="w-full bg-black py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <FilmIcon className="w-6 h-6 text-red-600" />
          <h2 className="text-2xl font-bold text-white">
            More {Array.isArray(featuredMovie.category)
              ? featuredMovie.category[0]
              : featuredMovie.category} Movies
          </h2>
        </div>

        {/* Two Rows of Movies */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 max-h-96">
          {relatedMovies.slice(0, 12).map((movie) => (
            <Link
              key={movie._id}
              to={`/page2/${movie._id}`}
              className="group relative bg-black/80 rounded-xl overflow-hidden transition-all duration-500 hover:scale-105 hover:shadow-xl hover:shadow-red-600/30 border border-red-600/20 hover:border-red-600"
            >
              {/* Movie Poster */}
              <div className="relative aspect-[16/9] overflow-hidden">
                <img
                  src={movie.reviewImg}
                  alt={movie.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Play Button Overlay */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <div className="bg-red-600 rounded-full p-3 shadow-lg transform scale-75 group-hover:scale-100 transition-transform duration-300">
                    <PlayIcon className="w-6 h-6 text-white" />
                  </div>
                </div>

                {/* Title Image - Bottom Right */}
                {movie.titleImg && (
                  <div className="absolute bottom-2 right-2 max-w-16 max-h-8">
                    <img
                      src={movie.titleImg}
                      alt={movie.title}
                      className="w-full h-full object-contain drop-shadow-lg opacity-90 group-hover:opacity-100 transition-opacity duration-300"
                    />
                  </div>
                )}
              </div>

              {/* Hover Effect Border */}
              <div className="absolute inset-0 rounded-xl border-2 border-transparent group-hover:border-red-600/50 transition-all duration-300 pointer-events-none" />
            </Link>
          ))}
        </div>

        {/* View More Button */}
        {relatedMovies.length > 12 && (
          <div className="text-center mt-6">
            <Link
              to="/movies"
              className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg transition-colors duration-300"
            >
              <FilmIcon className="w-5 h-5" />
              View All Movies
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default RelatedMoviesSection;