import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { 
  ArrowLeftIcon, 
  PlayCircleIcon, 
  StarIcon, 
  CalendarIcon,
  ClockIcon,
  TagIcon 
} from "@heroicons/react/24/outline";
import { StarIcon as StarSolidIcon } from "@heroicons/react/24/solid";
import moviesData from "../api/movies";

const CollectionPage = () => {
  const { collectionId } = useParams();
  const navigate = useNavigate();
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [collectionTitle, setCollectionTitle] = useState("");
  const [sortBy, setSortBy] = useState("year");
  const [filterGenre, setFilterGenre] = useState("all");

  // Define collections based on movie properties
  const collections = {
    "trending": {
      title: "Trending Movies",
      filter: (movie) => movie.trend === true,
      description: "The hottest movies everyone's talking about"
    },
    "top-rated": {
      title: "Top Rated Movies", 
      filter: (movie) => movie.rating >= 8.0,
      description: "Highest rated movies by critics and audiences"
    },
    "action": {
      title: "Action Collection",
      filter: (movie) => movie.category?.some(cat => cat.toLowerCase().includes('action')),
      description: "High-octane action and adventure movies"
    },
    "drama": {
      title: "Drama Collection",
      filter: (movie) => movie.category?.some(cat => cat.toLowerCase().includes('drama')),
      description: "Compelling dramas that move the soul"
    },
    "comedy": {
      title: "Comedy Collection",
      filter: (movie) => movie.category?.some(cat => cat.toLowerCase().includes('comedy')),
      description: "Laugh-out-loud comedies for every mood"
    },
    "horror": {
      title: "Horror Collection",
      filter: (movie) => movie.category?.some(cat => cat.toLowerCase().includes('horror')),
      description: "Spine-chilling horror movies"
    },
    "recent": {
      title: "Recent Releases",
      filter: (movie) => movie.year >= 2020,
      description: "Latest movies from recent years"
    }
  };

  useEffect(() => {
    const collection = collections[collectionId] || collections["trending"];
    const movies = moviesData.filter(collection.filter);
    
    setCollectionTitle(collection.title);
    setFilteredMovies(movies);
  }, [collectionId]);

  const handleSort = (movies) => {
    const sorted = [...movies].sort((a, b) => {
      switch (sortBy) {
        case "year":
          return b.year - a.year;
        case "rating":
          return (b.rating || 0) - (a.rating || 0);
        case "title":
          return a.title.localeCompare(b.title);
        default:
          return 0;
      }
    });
    return sorted;
  };

  const handleGenreFilter = (movies) => {
    if (filterGenre === "all") return movies;
    return movies.filter(movie => 
      movie.category?.some(cat => cat.toLowerCase().includes(filterGenre.toLowerCase()))
    );
  };

  const processedMovies = handleSort(handleGenreFilter(filteredMovies));
  
  // Get unique genres from filtered movies
  const availableGenres = [...new Set(
    filteredMovies.flatMap(movie => movie.category || [])
  )].sort();

  const fontStyle = {
    fontFamily: "'Playfair Display', serif",
    fontOpticalSizing: "auto",
    fontStyle: "normal",
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header Section */}
      <div className="relative bg-gradient-to-b from-gray-900 to-black py-16 px-8">
        <div className="container mx-auto max-w-7xl">
          {/* Back Button */}
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-gray-300 hover:text-red-600 transition-colors duration-300 mb-8 group"
          >
            <ArrowLeftIcon className="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-300" />
            Back to Home
          </button>

          {/* Collection Title & Stats */}
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div>
              <h1 
                style={fontStyle}
                className="text-6xl md:text-8xl font-bold text-red-600 mb-4 relative"
              >
                {collectionTitle}
                <span className="absolute -bottom-2 left-0 w-full h-1 bg-red-600 rounded"></span>
              </h1>
              <p className="text-xl text-gray-300 max-w-2xl">
                {collections[collectionId]?.description || "Discover amazing movies in this collection"}
              </p>
            </div>
            
            <div className="flex flex-col items-end gap-2">
              <div className="text-4xl font-bold text-red-600">
                {processedMovies.length}
              </div>
              <div className="text-gray-400 text-sm">
                Movies Available
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Filters & Sorting */}
      <div className="container mx-auto max-w-7xl px-8 py-8">
        <div className="flex flex-col md:flex-row gap-4 md:items-center md:justify-between mb-8 bg-gray-900/30 rounded-2xl p-6">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Sort Options */}
            <div className="flex items-center gap-3">
              <label className="text-gray-300 font-medium">Sort by:</label>
              <select 
                value={sortBy} 
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-black border border-red-600/50 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-600"
              >
                <option value="year">Release Year</option>
                <option value="rating">Rating</option>
                <option value="title">Title A-Z</option>
              </select>
            </div>

            {/* Genre Filter */}
            <div className="flex items-center gap-3">
              <label className="text-gray-300 font-medium">Genre:</label>
              <select 
                value={filterGenre} 
                onChange={(e) => setFilterGenre(e.target.value)}
                className="bg-black border border-red-600/50 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-600"
              >
                <option value="all">All Genres</option>
                {availableGenres.map(genre => (
                  <option key={genre} value={genre}>{genre}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="text-gray-400 text-sm">
            Showing {processedMovies.length} of {filteredMovies.length} movies
          </div>
        </div>

        {/* Movies Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
          {processedMovies.map((movie) => (
            <Link
              key={movie._id}
              to={`/page2/${movie._id}`}
              className="group relative bg-gray-900/50 rounded-xl overflow-hidden hover:scale-105 hover:shadow-2xl hover:shadow-red-600/30 transition-all duration-500 cursor-pointer"
            >
              {/* Movie Poster */}
              <div className="aspect-[2/3] overflow-hidden">
                <img
                  src={movie.bgImg}
                  alt={movie.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  loading="lazy"
                />
                
                {/* Play Overlay */}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <PlayCircleIcon className="w-16 h-16 text-white group-hover:text-red-600 transition-colors duration-300" />
                </div>
              </div>

              {/* Movie Info */}
              <div className="p-4">
                <h3 className="font-bold text-white group-hover:text-red-600 transition-colors duration-300 line-clamp-2 mb-2">
                  {movie.title}
                </h3>
                
                <div className="flex items-center gap-2 text-sm text-gray-400 mb-2">
                  <CalendarIcon className="w-4 h-4" />
                  <span>{movie.year}</span>
                  {movie.length && (
                    <>
                      <ClockIcon className="w-4 h-4 ml-2" />
                      <span>{movie.length}</span>
                    </>
                  )}
                </div>

                {movie.rating && (
                  <div className="flex items-center gap-1 mb-2">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <StarSolidIcon
                          key={i}
                          className={`w-3 h-3 ${
                            i < Math.floor(movie.rating) ? 'text-yellow-400' : 'text-gray-600'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-xs text-gray-400 ml-1">{movie.rating}</span>
                  </div>
                )}

                {movie.category && (
                  <div className="flex flex-wrap gap-1">
                    {movie.category.slice(0, 2).map((genre, i) => (
                      <span 
                        key={i} 
                        className="px-2 py-0.5 bg-red-600/20 border border-red-600/50 text-red-600 text-xs rounded-full"
                      >
                        {genre}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Hover Border */}
              <div className="absolute inset-0 rounded-xl border-2 border-transparent group-hover:border-red-600/50 transition-all duration-300 pointer-events-none"></div>
            </Link>
          ))}
        </div>

        {/* Empty State */}
        {processedMovies.length === 0 && (
          <div className="text-center py-16">
            <TagIcon className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-gray-400 mb-2">No movies found</h3>
            <p className="text-gray-500">Try adjusting your filters to see more results</p>
            <button
              onClick={() => {
                setSortBy("year");
                setFilterGenre("all");
              }}
              className="mt-4 bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg transition-colors duration-300"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CollectionPage;