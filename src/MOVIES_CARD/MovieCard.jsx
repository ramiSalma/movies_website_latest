import { PlayCircleIcon } from '@heroicons/react/24/outline'
import React from 'react'
import { Link } from 'react-router-dom'

const MovieCard = ({m}) => {
    return (
        <div>
            <div
                key={m._id}
                className="group relative bg-black/80 rounded-xl overflow-hidden transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-red-600/30 border border-red-600/30 hover:border-red-600"
            >
                {/* Movie Poster */}
                <div className="relative aspect-[2/3] overflow-hidden">
                    <img
                        src={m.bgImg}
                        alt={m.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    {/* Play Button Overlay */}
                    <Link
                        to={`page2/${m._id}`}
                        className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 bg-black/20"
                    >
                        <div className="bg-red-600 rounded-full p-3 shadow-lg transform scale-75 group-hover:scale-100 transition-transform duration-300">
                            <PlayCircleIcon className="w-8 h-8 text-white" />
                        </div>
                    </Link>
                </div>

                {/* Movie Info */}
                <div className="p-3">
                    <h3 className="text-white font-semibold text-sm line-clamp-2 mb-1 group-hover:text-red-600 transition-colors duration-300">
                        {m.title}
                    </h3>
                    <p className="text-gray-400 text-xs mb-1">{m.length}</p>
                    <div className="flex items-center justify-between text-xs">
                        <span className="text-gray-500">{m.year}</span>
                        <span className="text-red-600 font-medium">
                            {Array.isArray(m.category) ? m.category[0] : m.category}
                        </span>
                    </div>
                </div>

                {/* Hover Effect Border */}
                <div className="absolute inset-0 rounded-xl border-2 border-transparent group-hover:border-red-600 transition-all duration-300 pointer-events-none" />
            </div>
        </div>
    )
}

export default MovieCard
