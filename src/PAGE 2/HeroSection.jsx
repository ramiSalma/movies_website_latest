import React from 'react'

const HeroSection = ({ featuredMovie }) => {
    return (
        <div>
            <div className="relative w-full h-screen overflow-hidden">
                {/* Background Image with Parallax Effect */}
                <div
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-110 transition-transform duration-1000"
                    style={{
                        backgroundImage: `url(${featuredMovie.reviewImg})`,
                    }}
                ></div>

                {/* Enhanced Gradient Overlays */}
                <div className="absolute inset-0 bg-gradient-to-b from-black  to-black/50"></div>

                {/* Content Container */}
                <div className="relative h-full flex items-center mt-10">
                    <div className="container mx-auto px-6 lg:px-12">
                        <div className="grid lg:grid-cols-5 gap-8 lg:gap-12 items-center">

                            {/* Left Side - Main Movie Info */}
                            <div className="lg:col-span-3 text-white z-10 ">
                                {/* Genres */}
                                <div className="flex flex-wrap gap-3">
                                    {featuredMovie.category.map((genre, index) => (
                                        <span
                                            key={index}
                                            className="bg-red-600/20 border border-red-600/40 text-red-300 px-4 py-2 rounded-full text-sm font-medium hover:bg-red-600/30 transition-colors duration-300"
                                        >
                                            {genre}
                                        </span>
                                    ))}
                                </div>
                                {/* Title Logo (if available) */}
                                {featuredMovie.titleImg && (
                                    <div className="mb-6">
                                        <img
                                            src={featuredMovie.titleImg}
                                            alt={featuredMovie.title}
                                            className="h-60  max-w-md object-contain"
                                        />
                                    </div>
                                )}

                                {/* Movie Meta Information */}
                                <div className="flex flex-wrap items-center gap-4 text-sm lg:text-base mb-5">
                                    <span className=" font-bold shadow-lg">
                                        {featuredMovie.year}
                                    </span>
                                    |
                                    <span className="text-gray-300 flex items-center gap-2  backdrop-blur-sm">
                                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.414-1.414L11 9.586V6z" clipRule="evenodd" />
                                        </svg>
                                        {featuredMovie.length}
                                    </span>
                                    |
                                    <span className=" font-semibold">
                                        {featuredMovie.ageLimit}
                                    </span>
                                </div>
                                {/* Rating with Red Star */}

                                <div className="flex items-center my-4">
                                    {[...Array(5)].map((_, i) => {
                                        const starRating = (featuredMovie.rating / 10) * 5;
                                        const isFilled = i < Math.floor(starRating);

                                        return (
                                            <svg
                                                key={i}
                                                className={`w-6 h-6 ${isFilled ? 'text-red-600' : 'text-gray-600'}`}
                                                fill="currentColor"
                                                viewBox="0 0 20 20"
                                            >
                                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                            </svg>
                                        );
                                    })} <p className='mx-3 text-xl'>{featuredMovie.rating}/10</p>
                                </div>

                                {/* Release Date */}
                                <div className="text-gray-400 text-sm flex items-center gap-2">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                    Released: {new Date(featuredMovie.date).toLocaleDateString('en-US', {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric'
                                    })}
                                </div>

                                {/* Action Buttons */}
                                <div className="flex flex-wrap gap-4 pt-6">
                                    <div className="flex gap-2">
                                        <button className="bg-red-600 px-4 py-2 rounded text-sm hover:bg-red-700 transition">
                                            + MY LIST
                                        </button>
                                        <button className="border border-red-600 px-4 py-2 rounded text-sm hover:bg-red-700 transition">
                                            WATCH NOW
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Right Side - Movie Poster and Details */}
                            <div className="hidden lg:block lg:col-span-2 z-10">
                                <div className="flex gap-6 items-start">
                                    {/* Movie Poster */}
                                    <div className="relative group flex-shrink-0">
                                        <div className="relative">
                                            <img
                                                src={featuredMovie.bgImg}
                                                alt={featuredMovie.title}
                                                className="w-72 h-auto rounded-2xl shadow-2xl border-2 border-white/10 transition-all duration-500 group-hover:scale-105 group-hover:border-red-600/50"
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
                                    </div>

                                    {/* Movie Details Card */}
                                    <div className="flex-1 space-y-6 mt-15 backdrop-blur-sm ">
                                        
                                        {/* Additional Info */}
                                        <div className="">
                                            <h4 className="text-white font-bold text-lg mb-3">Details</h4>
                                            <div className="space-y-2 text-sm">
                                                <div className="flex justify-between">
                                                    <span className="text-gray-400">Type:</span>
                                                    <span className="text-white font-medium">{featuredMovie.type}</span>
                                                </div>
                                                {featuredMovie.episodes && (
                                                    <div className="flex justify-between">
                                                        <span className="text-gray-400">Episodes:</span>
                                                        <span className="text-white font-medium">{featuredMovie.episodes}</span>
                                                    </div>
                                                )}
                                                <div className="flex justify-between">
                                                    <span className="text-gray-400">Genres:</span>
                                                    <span className="text-red-400 font-medium text-right">
                                                        {Array.isArray(featuredMovie.category)
                                                            ? featuredMovie.category.join(", ")
                                                            : featuredMovie.category}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Description */}
                                        <div className="  ">
                                            <h4 className="text-white font-bold text-lg mb-3">Synopsis</h4>
                                            <p className="text-gray-300 leading-relaxed text-sm">
                                                {featuredMovie.description}
                                            </p>
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
        </div>
    )
}

export default HeroSection