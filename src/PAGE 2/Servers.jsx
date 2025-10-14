import React, { useRef, useState } from 'react';
import { PlayIcon, ServerIcon } from '@heroicons/react/24/outline';

const ServersSection = ({ servers, selectedServer, setSelectedServer, featuredMovie }) => {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlayClick = () => {
    if (videoRef.current) {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  return (
    <div>
      {/* Servers Section */}
      <div className="mb-4">
        <div className="flex flex-wrap justify-center gap-2">
          {servers.map((server, index) => (
            <button
              key={server.id}
              onClick={() => {
                setSelectedServer(index);
                setIsPlaying(false);
              }}
              disabled={server.status === 'offline'}
              className={`px-8 py-2 text-xl mx-10 rounded-md border transition-all duration-300 ${
                selectedServer === index
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
      <div className="bg-black rounded-xl overflow-hidden border border-red-600/30 relative">
        <div className="aspect-video relative">
          {servers[selectedServer]?.status === 'online' && servers[selectedServer]?.url ? (
            <>
              {/* Video */}
              <video
                ref={videoRef}
                key={selectedServer}
                className="w-full h-full object-cover"
                src={servers[selectedServer].url}
                controls
                preload="metadata"
                poster={featuredMovie?.poster}
                onPause={() => setIsPlaying(false)}
                onPlay={() => setIsPlaying(true)}
              />

              {/* Center Play Button (only shown when not playing) */}
              {!isPlaying && (
                <button
                  onClick={handlePlayClick}
                  className="absolute inset-0 flex items-center justify-center bg-black/40 hover:bg-black/50 transition"
                >
                  <PlayIcon className="w-20 h-20 text-white drop-shadow-[0_0_10px_#ff0000]" />
                </button>
              )}
            </>
          ) : servers[selectedServer]?.status === 'online' ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <PlayIcon className="w-16 h-16 text-red-600 mb-4" />
              <p className="text-lg text-white mb-2">Now Playing: {featuredMovie.title}</p>
              <p className="text-gray-400">
                Server: {servers[selectedServer]?.name} - {servers[selectedServer]?.quality}
              </p>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <ServerIcon className="w-16 h-16 text-gray-500 mb-4" />
              <p className="text-lg text-gray-400">Server Offline</p>
              <p className="text-sm text-gray-500">Please select another server</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ServersSection;
