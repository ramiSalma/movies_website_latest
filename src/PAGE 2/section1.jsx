import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import moviesData from '../api/movies';
import ServersSection from './Servers';
import RelatedMoviesSection from './RelatedMoviesSection';
import HeroSection from './HeroSection';

const Section1 = () => {
  const { id } = useParams();
  const featuredMovie = moviesData.find(movie => movie._id === parseInt(id));
  const [selectedServer, setSelectedServer] = useState(0);

  // Configure servers with actual video URLs
  const servers = [
    { 
      id: 1, 
      name: "Server 1", 
      url: featuredMovie?.video, // Use the video from the movie data
      quality: "HD", 
      status: featuredMovie?.video ? "online" : "offline" 
    },
    { 
      id: 2, 
      name: "Server 2", 
      url: featuredMovie?.video, // You can add alternative video sources
      quality: "4K", 
      status: featuredMovie?.video ? "online" : "offline" 
    },
    { 
      id: 3, 
      name: "Server 3", 
      url: null, 
      quality: "HD", 
      status: "offline" 
    },
    { 
      id: 4, 
      name: "Server 4", 
      url: featuredMovie?.video, 
      quality: "FHD", 
      status: featuredMovie?.video ? "online" : "offline" 
    }
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
      .slice(0, 15); // Limit to 8 related movies
  };

  const relatedMovies = getRelatedMovies();

  if (!featuredMovie) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-600 text-6xl mb-4">404</div>
          <div className="text-white text-xl mb-4">Movie not found</div>
          <a 
            href="/" 
            className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition inline-block"
          >
            Go Back Home
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-black text-white min-h-screen">
      {/* Hero Section */}
      <HeroSection featuredMovie={featuredMovie} />

      {/* Video Player Section */}
      <div className="container mx-auto px-4 py-8 lg:px-12">
        <div className=" p-4 lg:p-8 mb-8 ">
          <ServersSection 
            servers={servers} 
            featuredMovie={featuredMovie} 
            selectedServer={selectedServer} 
            setSelectedServer={setSelectedServer} 
          />
        </div>

        {/* Related Movies */}
        {relatedMovies.length > 0 && (
          <RelatedMoviesSection relatedMovies={relatedMovies} featuredMovie={featuredMovie} />
        )}
      </div>
    </div>
  );
};

export default Section1;