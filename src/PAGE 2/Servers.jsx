import React from 'react'
import { PlayIcon, ServerIcon } from '@heroicons/react/24/outline';
const ServersSection = ({servers , selectedServer , setSelectedServer , featuredMovie}) => {
    return (
        <div>
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
    )
}

export default ServersSection
