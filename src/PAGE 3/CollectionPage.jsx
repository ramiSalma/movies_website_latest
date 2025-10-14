import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom';
import { PlayCircleIcon, ClockIcon, CalendarIcon } from '@heroicons/react/24/solid';
import MovieCollections from '../api/MovieCollections';
import moviesData from '../api/movies';

const CollectionPage = () => {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [sameCollection, setSameCollection] = useState([]);
  const [loading, setLoading] = useState(true);
   const fontStyle = {
    fontFamily: "'Playfair Display', serif",
    fontOpticalSizing: "auto",
    fontStyle: "normal",
  };
  useEffect(() => {
    try {
      const foundCollection = MovieCollections.find(collection => collection.id === parseInt(id));
      setItem(foundCollection);
      
      if (foundCollection && foundCollection.name) {
        const filteredMovies = moviesData.filter((movie) => movie.collection === foundCollection.name);
        setSameCollection(filteredMovies);
      }
    } catch (error) {
      console.error('Error loading collection:', error);
    } finally {
      setLoading(false);
    }
  }, [id])

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-red-600 mx-auto mb-4"></div>
          <h2 className="text-xl font-semibold text-white">Loading collection...</h2>
        </div>
      </div>
    );
  }

  // Error state - Collection not found
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
    <div className="min-h-screen w-screen ">
      {/* Hero Section with Background Image */}
      <div className="relative h-[28rem] md:h-[36rem] lg:h-[44rem] xl:h-[56rem] w-full overflow-hidden">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat transform scale-105"
          style={{
            backgroundImage: `url(${item.image})`,
            
          }}
        />
        
        {/* Gradient Overlay */}
        {/* <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" /> */}
        
      
      </div>

      {/* Movies Grid Section */}
      <div className="max-w-screen p-5 mx-auto px-8 pt-20">
        {/* Section Header */}
        <div className="mb-12">
          <h2 className="text-4xl md:text-5xl xl:text-6xl font-bold text-red-600 mb-4" style={fontStyle}>Movies in this Collection</h2>
          <div className="w-20 h-1 bg-red-600 rounded"></div>
        </div>

        {/* Movies Grid */}
        {sameCollection.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
            {sameCollection.map((movie) => (
              <div
                key={movie._id}
                className="group relative bg-gray-900/50 rounded-xl overflow-hidden transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-red-600/25 border border-gray-800 hover:border-red-600"
              >
                {/* Movie Poster */}
                <div className="relative overflow-hidden h-64 md:h-80 lg:h-96 xl:h-[36rem]">
                  <img
                    src={movie.bgImg}
                    alt={movie.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  {/* Play Button Overlay */}
                  <Link
                    to={`/page2/${movie._id}`}
                    className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 bg-black/20"
                  >
                    <div className="bg-red-600 rounded-full p-4 md:p-5 xl:p-6 shadow-lg transform scale-75 group-hover:scale-100 transition-transform duration-300">
                      <PlayCircleIcon className="w-8 md:w-10 xl:w-12 h-8 md:h-10 xl:h-12 text-white" />
                    </div>
                  </Link>

                  {/* Movie Rating Badge */}
                  {movie.rating && (
                    <div className="absolute top-3 right-3 bg-black/80 backdrop-blur-sm px-2 py-1 rounded-lg">
                      <span className="text-yellow-400 text-sm font-semibold">★ {movie.rating}</span>
                    </div>
                  )}
                </div>

                {/* Movie Info */}
                <div className="p-6 md:p-8">
                  <h3 className="text-white font-semibold text-base md:text-lg line-clamp-2 mb-3 md:mb-4 group-hover:text-red-600 transition-colors duration-300">
                    {movie.title}
                  </h3>
                  
                  <div className="space-y-2 text-sm md:text-base">
                    {movie.length && (
                      <p className="text-gray-400 flex items-center gap-2">
                        <ClockIcon className="w-4 h-4" />
                        {movie.length}
                      </p>
                    )}
                    
                    <div className="flex items-center justify-between text-sm md:text-base">
                      <span className="text-gray-500">{movie.year}</span>
                      <span className="text-red-600 font-medium">
                        {Array.isArray(movie.category) ? movie.category[0] : movie.category}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Hover Effect Border */}
                <div className="absolute inset-0 rounded-xl border-2 border-transparent group-hover:border-red-600/50 transition-all duration-300 pointer-events-none" />
              </div>
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
      <div className="container mx-auto px-6 py-16">
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