const MoviesContent = ({featuredMovie}) => {
    
  return (
    <div>
      <div className="relative text-left z-10 flex flex-col md:flex-row items-center md:items-start gap-6 px-4 md:px-16 py-25">
        <img
          src={featuredMovie.bgImg || "https://via.placeholder.com/300x450"}
          alt={featuredMovie.title}
          className="w-64 md:w-64 rounded-lg shadow-lg"
        />
        <div className="max-w-lg">
          <p className="text-xs mb-1">{featuredMovie.year}</p>
          <h1 className="text-3xl md:text-5xl font-bold mb-2">{featuredMovie.title}</h1>
          <div className="flex gap-1 text-xs mb-2">
            {featuredMovie.category.map((cat, i) => (
              <span key={i}> . {cat}</span>
            ))}
          </div>
          <p className="text-sm mb-4">{featuredMovie.description}</p>
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
    </div>
  )
}

export default MoviesContent
