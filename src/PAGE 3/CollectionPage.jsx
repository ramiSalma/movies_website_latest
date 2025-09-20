import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom';
import { PlayCircleIcon, ClockIcon, CalendarIcon } from '@heroicons/react/24/solid';
import MovieCollections from '../api/MovieCollections';
import moviesData from '../api/movies';
import MovieCard from '../MOVIES_CARD/MovieCard';

const CollectionPage = () => {
  const { id } = useParams();
  const item = MovieCollections.find(collection => collection.id === parseInt(id));
  const [sameCollection, setSameCollection] = useState([]);

  useEffect(() => {
    setSameCollection(moviesData.filter((movie) => movie.collection === item.name));
  }, [item.name])

  const fontStyle = {
    fontFamily: "'Playfair Display', serif",
    fontOpticalSizing: "auto",
    fontStyle: "normal",
  };

  if (!item) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-white mb-4">Collection Not Found</h1>
          <Link to="/" className="text-red-600 hover:text-red-400 transition-colors">
            Go Back Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black">
      {/* Hero Section with Background Image */}
      {/* Modern Hero Section */}
      <div className="relative w-full h-screen overflow-hidden">
        {/* Background Image with Parallax Effect */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat transform scale-110 transition-transform duration-1000"
          style={{
            backgroundImage: `url(${featuredMovie.reviewImg})`,
          }}
        ></div>

        {/* Dynamic Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-black/50"></div>

        {/* Animated Particles/Dots */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-red-600 rounded-full animate-pulse"></div>
          <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-red-400 rounded-full animate-ping delay-1000"></div>
          <div className="absolute bottom-1/4 left-1/3 w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse delay-500"></div>
        </div>

        {/* Main Content */}
        <div className="relative h-full flex items-center">
          <div className="container mx-auto px-6 lg:px-12">
            <div className="grid lg:grid-cols-2 gap-12 items-center">

              {/* Left Side - Movie Information */}
              <div className="space-y-8 z-10">
                {/* Movie Title with Logo */}
                <div className="space-y-4">
                  {featuredMovie.titleImg && (
                    <div className="mb-6">
                      <img
                        src={featuredMovie.titleImg}
                        alt={featuredMovie.title}
                        className="h-16 lg:h-20 w-auto object-contain"
                      />
                    </div>
                  )}
                  <h1 className="text-4xl lg:text-6xl xl:text-7xl font-black text-white leading-tight">
                    {featuredMovie.title}
                  </h1>
                </div>

                {/* Movie Meta Information */}
                <div className="flex flex-wrap items-center gap-4 text-sm lg:text-base">
                  <span className="bg-red-600 text-white px-3 py-1 rounded-full font-semibold">
                    {featuredMovie.year}
                  </span>
                  <span className="text-gray-300 flex items-center gap-2">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.414-1.414L11 9.586V6z" clipRule="evenodd" />
                    </svg>
                    {featuredMovie.length}
                  </span>
                  <span className="bg-gray-800/80 text-white px-3 py-1 rounded-full">
                    {featuredMovie.ageLimit}
                  </span>
                  {featuredMovie.rating && (
                    <span className="text-yellow-400 flex items-center gap-1 font-semibold">
                      <svg className="w-5 h-5 fill-current" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      {featuredMovie.rating}/10
                    </span>
                  )}
                </div>

                {/* Genres */}
                <div className="flex flex-wrap gap-2">
                  {featuredMovie.category.map((genre, index) => (
                    <span
                      key={index}
                      className="bg-red-600/20 text-red-400 border border-red-600/30 px-4 py-2 rounded-full text-sm font-medium"
                    >
                      {genre}
                    </span>
                  ))}
                </div>

                {/* Description */}
                <p className="text-gray-300 text-lg lg:text-xl leading-relaxed max-w-2xl">
                  {featuredMovie.description}
                </p>

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-4 pt-4">
                  <button className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-red-600/25 flex items-center gap-3">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                    </svg>
                    Watch Now
                  </button>
                  <button className="bg-white/10 backdrop-blur-sm border border-white/20 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 hover:bg-white/20 flex items-center gap-3">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                    My List
                  </button>
                  <button className="bg-white/10 backdrop-blur-sm border border-white/20 text-white px-6 py-4 rounded-xl font-bold transition-all duration-300 hover:bg-white/20">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Right Side - Movie Poster with Effects */}
              <div className="hidden lg:block relative">
                <div className="relative group">
                  {/* Glowing Background Effect */}
                  <div className="absolute -inset-4 bg-gradient-to-r from-red-600 to-purple-600 rounded-3xl blur-2xl opacity-30 group-hover:opacity-50 transition-opacity duration-500"></div>

                  {/* Main Poster */}
                  <div className="relative">
                    <img
                      src={featuredMovie.bgImg}
                      alt={featuredMovie.title}
                      className="w-full max-w-md h-auto rounded-2xl shadow-2xl border-2 border-white/10 transition-all duration-500 group-hover:scale-105 group-hover:border-red-600/50"
                    />

                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>

                    {/* Play Button Overlay */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                      <div className="bg-red-600 rounded-full p-4 shadow-lg transform scale-75 group-hover:scale-100 transition-transform duration-300">
                        <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  {/* Floating Info Cards */}
                  <div className="absolute -bottom-6 -right-6 bg-black/80 backdrop-blur-sm rounded-xl p-4 border border-red-600/30 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-white">{featuredMovie.rating}</div>
                      <div className="text-sm text-gray-400">IMDb Rating</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/60 rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </div>

      {/* Movies Grid Section */}
      <div className="container mx-auto px-6 pb-16">
        {/* Section Header */}
        <div className="mb-12">
          <h2 className=" text-4xl font-bold text-red-600 mb-4" style={fontStyle}>Movies in this Collection</h2>
          <div className="w-20 h-1 bg-red-600 rounded"></div>
        </div>

        {/* Movies Grid */}
        {sameCollection.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-8 gap-4">
            {sameCollection.map((movie) => (
              <MovieCard key={movie._id} m={movie} />
            ))}
          </div>
        ) : (
          /* No Movies State */
          <div className="text-center py-20">
            <div className="text-6xl mb-6">🎬</div>
            <h3 className="text-2xl font-bold text-white mb-4">No Movies Found</h3>
            <p className="text-gray-400 mb-8">
              This collection doesn't have any movies yet.
            </p>
            <Link
              to="/"
              className="inline-flex items-center px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors duration-300"
            >
              Browse All Movies
            </Link>
          </div>
        )}
      </div>

      {/* Back to Collections */}
      <div className="container mx-auto px-6 pb-16">
        <div className="text-center">
          <Link
            to="/"
            className="inline-flex items-center px-8 py-4 bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition-all duration-300 border border-gray-700 hover:border-gray-600"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Collections
          </Link>
        </div>
      </div>
    </div>
  )
}

export default CollectionPage