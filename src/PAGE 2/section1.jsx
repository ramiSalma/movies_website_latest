import React, { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import MoviesContent from '../PAGE 1/section1/MoviesContent';
import moviesData from '../api/movies';
import ServersSection from './Servers'
import RelatedMoviesSection from './RelatedMoviesSection'
const Section1 = () => {
  const { id } = useParams();
  const featuredMovie = moviesData.find(movie => movie._id === parseInt(id));
  const [selectedServer, setSelectedServer] = useState(0);

  // Mock server data - replace with your actual server endpoints
  const servers = [
    { id: 1, name: "Server 1", url: "https://example.com/server1", quality: "HD", status: "online" },
    { id: 2, name: "Server 2", url: "https://example.com/server2", quality: "4K", status: "online" },
    { id: 3, name: "Server 3", url: "https://example.com/server3", quality: "HD", status: "offline" },
    { id: 4, name: "Server 4", url: "https://example.com/server4", quality: "FHD", status: "online" }
  ];

  // Get related movies from the same categories
  const getRelatedMovies = () => {
    if (!featuredMovie || !featuredMovie.category) return [];

    // Normalize featured movie categories to lowercase strings
    const movieCategories = Array.isArray(featuredMovie.category)
      ? featuredMovie.category.map(cat => typeof cat === 'string' ? cat.toLowerCase() : String(cat).toLowerCase())
      : [typeof featuredMovie.category === 'string' ? featuredMovie.category.toLowerCase() : String(featuredMovie.category).toLowerCase()];

    return moviesData
      .filter(movie => {
        if (movie._id === featuredMovie._id || !movie.category) return false;

        // Normalize current movie categories
        const currentMovieCategories = Array.isArray(movie.category)
          ? movie.category.map(cat => typeof cat === 'string' ? cat.toLowerCase() : String(cat).toLowerCase())
          : [typeof movie.category === 'string' ? movie.category.toLowerCase() : String(movie.category).toLowerCase()];

        // Check if any categories match
        return currentMovieCategories.some(cat =>
          movieCategories.includes(cat)
        );
      })
      .slice(0, 8); // Limit to 8 related movies
  };

  const relatedMovies = getRelatedMovies();

  if (!featuredMovie) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white text-xl">Movie not found</div>
      </div>
    );
  }

  return (
    <div className="bg-black text-white min-h-screen">
      {/* Hero Section */}
      <div className="relative w-full h-screen overflow-hidden">
        {/* Background Image - Centered and Cover */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url(${featuredMovie.reviewImg})`,
          }}
        ></div>

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/60"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 to-red-600/25"></div>

        {/* Content Container */}
        <div className="relative h-full flex items-center">
          <div className="container mx-auto px-4">
            <div className="flex items-center gap-8 lg:gap-12">

              {/* Left Side - Movie Info */}
              <div className="flex-1 text-white z-10">
                <MoviesContent featuredMovie={featuredMovie} />
              </div>

              {/* Right Side - Movie Poster (moved inside hero section) */}
              <div className="hidden lg:block flex-shrink-0 z-10">
                <div className="flex items-start gap-6">
                  <img
                    src={featuredMovie.bgImg}
                    alt={featuredMovie.title}
                    className="w-80 h-auto rounded-2xl shadow-2xl border-4 border-red-600/30 transition-all duration-500 hover:border-red-600 hover:shadow-red-600/20"
                  />

                  {/* Movie Info Card */}
                  <div className="bg-black/70 backdrop-blur-sm rounded-xl p-6 border border-red-600/20 max-w-xs">
                    <h3 className="text-white font-bold text-lg mb-4 line-clamp-2">
                      {featuredMovie.title}
                    </h3>
                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Year:</span>
                        <span className="text-white">{featuredMovie.year}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Duration:</span>
                        <span className="text-white">{featuredMovie.length}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Genre:</span>
                        <span className="text-red-600 font-medium">
                          {Array.isArray(featuredMovie.category)
                            ? featuredMovie.category.slice(0, 2).join(", ")
                            : featuredMovie.category}
                        </span>
                      </div>
                      {featuredMovie.rating && (
                        <div className="flex justify-between">
                          <span className="text-gray-400">Rating:</span>
                          <span className="text-yellow-500 font-medium">
                            ⭐ {featuredMovie.rating}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>



      {/* Video Player Section */}
      <div className="container mx-auto px-4 py-8">
        <div className="bg-black rounded-2xl p-6 mb-8">

          <ServersSection servers={servers} featuredMovie={featuredMovie} selectedServer={selectedServer} setSelectedServer={setSelectedServer} />

        </div>

        <RelatedMoviesSection relatedMovies={relatedMovies} featuredMovie={featuredMovie} />
      </div>
    </div>
  )
}

export default Section1