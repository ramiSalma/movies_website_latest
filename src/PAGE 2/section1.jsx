import React, { useState } from 'react'
import { useParams, Link } from 'react-router-dom'

import moviesData from '../api/movies';
import ServersSection from './Servers'
import RelatedMoviesSection from './RelatedMoviesSection'
import HeroSection from './HeroSection';

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
     <HeroSection featuredMovie={featuredMovie} />



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