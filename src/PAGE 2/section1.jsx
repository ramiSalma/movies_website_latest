import React, { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import MoviesContent from '../PAGE 1/section1/MoviesContent';
import moviesData from '../api/movies';
import { PlayIcon, ServerIcon, FilmIcon } from '@heroicons/react/24/outline';

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
        <div className="absolute  inset-0 bg-gradient-to-b from-black/80 to-red-600/25"></div>


        {/* Content Container */}
        <div className="relative h-full flex items-center">
          <div className="container mx-auto px-4">
            <div className="flex items-center gap-8 lg:gap-12">

              {/* Left Side - Movie Info */}
              <div className="flex-1 text-white z-10">
                <MoviesContent featuredMovie={featuredMovie} />
              </div>


            </div>

          </div>
        </div>
      </div>

      {/* Right Side - Movie Poster */}
      <div className="flex px-20 py-20 ">
        <div className="flex">
          <img
            src={featuredMovie.bgImg}
            alt={featuredMovie.title}
            className="w-80 h-auto rounded-2xl shadow-2xl border-4 border-red-600/30 transition-all duration-500 group-hover:border-red-600 group-hover:shadow-red-600/20"
          />
          {/* Movie Info Card */}
          <div className="  backdrop-blur-sm rounded-xl p-10 ">
            <h3 className="text-white font-bold text-lg mb-2 line-clamp-2">
              {featuredMovie.title}
            </h3>
            <div className="space-y-2 text-sm">
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
      {/* Video Player Section */}
      <div className="container mx-auto px-4 py-8">
        <div className="bg-black rounded-2xl p-6 mb-8">


          {/* Servers Section - Above Video */}
          <div className="mb-4">


            <div className="flex flex-wrap justify-center gap-2">
              {servers.map((server, index) => (
                <button
                  key={server.id}
                  onClick={() => setSelectedServer(index)}
                  disabled={server.status === 'offline'}
                  className={`px-8 py-2 text-xl mx-10 rounded-md border transition-all duration-300 ${selectedServer === index
                      ? 'bg-red-600 border-red-600 text-white'
                      : server.status === 'online'
                        ? 'bg-black border-red-600/50 text-gray-300 hover:bg-red-600/20 hover:border-red-600'
                        : 'bg-black border-gray-600 text-gray-500 cursor-not-allowed'
                    }`}
                >
                  <div className="flex items-center gap-1">
                    <span>{server.name}</span>

                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Video Player */}
          <div className="bg-black rounded-xl overflow-hidden border border-red-600/30">
            <div className="aspect-video bg-black flex items-center justify-center ">
              {servers[selectedServer]?.status === 'online' ? (
                <div className="text-center">
                  <PlayIcon className="w-16 h-16 text-red-600 mx-auto mb-4" />
                  <p className="text-lg text-white mb-2">
                    Now Playing: {featuredMovie.title}
                  </p>
                  <p className="text-gray-400">
                    Server: {servers[selectedServer]?.name} - {servers[selectedServer]?.quality}
                  </p>
                  {/* Replace this div with your actual video player component */}
                  <div className="mt-4 p-4 bg-red-600/10 rounded-lg">
                    <p className="text-sm text-gray-300">
                      Video player would be embedded here
                    </p>
                  </div>
                </div>
              ) : (
                <div className="text-center">
                  <ServerIcon className="w-16 h-16 text-gray-500 mx-auto mb-4" />
                  <p className="text-lg text-gray-400">Server Offline</p>
                  <p className="text-sm text-gray-500">Please select another server</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Related Movies Section */}
        {relatedMovies.length > 0 && (
          <div className="bg-black rounded-2xl p-6 ">
            <div className="flex items-center gap-3 mb-6">
              <FilmIcon className="w-6 h-6 text-red-600" />
              <h2 className="text-2xl font-bold text-white">
                More {Array.isArray(featuredMovie.category)
                  ? featuredMovie.category[0]
                  : featuredMovie.category} Movies
              </h2>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4">
              {relatedMovies.map((movie) => (
                <Link
                  key={movie._id}
                  to={`/page2/${movie._id}`}
                  className="group relative bg-black/80 rounded-xl overflow-hidden transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-red-600/30 border border-red-600/30 hover:border-red-600"
                >
                  {/* Movie Poster */}
                  <div className="relative aspect-[2/3] overflow-hidden">
                    <img
                      src={movie.bgImg}
                      alt={movie.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    {/* Play Button Overlay */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 bg-black/20">
                      <div className="bg-red-600 rounded-full p-2 shadow-lg transform scale-75 group-hover:scale-100 transition-transform duration-300">
                        <PlayIcon className="w-6 h-6 text-white" />
                      </div>
                    </div>
                  </div>

                  {/* Movie Info */}
                  <div className="p-3">
                    <h3 className="text-white font-semibold text-sm line-clamp-2 mb-1 group-hover:text-red-600 transition-colors duration-300">
                      {movie.title}
                    </h3>
                    <p className="text-gray-400 text-xs mb-1">{movie.length}</p>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-gray-500">{movie.year}</span>
                      <span className="text-red-600 font-medium">
                        {Array.isArray(movie.category) ? movie.category[0] : movie.category}
                      </span>
                    </div>
                  </div>

                  {/* Hover Effect Border */}
                  <div className="absolute inset-0 rounded-xl border-2 border-transparent group-hover:border-red-600 transition-all duration-300 pointer-events-none" />
                </Link>
              ))}
            </div>

            {/* View More Button */}
            <div className="text-center mt-6">
              <Link
                to="/movies" // Replace with your movies page route
                className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg transition-colors duration-300"
              >
                <FilmIcon className="w-5 h-5" />
                View All Movies
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Section1