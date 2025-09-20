import React, { useEffect, useState } from "react";
import moviesData from "../../api/movies";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { PlayCircleIcon } from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";

const MoviesGrid = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [search, setSearch] = useState("");
  const [activeSearch, setActiveSearch] = useState(""); // New state for active search term
  const [category, setCategory] = useState("all");
  const [year, setYear] = useState("all");

  // Pagination state
  const [page, setPage] = useState(1);
  const moviesPerPage = 16;

  // Categories with proper capitalization
  const categories = ["Action", "Drama", "Romance", "Comedy", "Horror", "Sci-Fi"];

  const fontStyle = {
    fontFamily: "'Playfair Display', serif",
    fontOpticalSizing: "auto",
    fontStyle: "normal",
  };

  useEffect(() => {
    setData(moviesData);
    setFilteredData(moviesData);
  }, []);

  // Handle search execution
  const handleSearch = () => {
    setActiveSearch(search);
    setSearch(""); // Clear input after search
  };

  // Clear all filters
  const clearAllFilters = () => {
    setSearch("");
    setActiveSearch("");
    setCategory("all");
    setYear("all");
  };

  useEffect(() => {
    let filtered = data;

    // Search filter - now uses activeSearch instead of search
    if (activeSearch) {
      filtered = filtered.filter((m) =>
        m.title.toLowerCase().includes(activeSearch.toLowerCase())
      );
    }

    // Category filter
    if (category !== "all") {
      filtered = filtered.filter(
        (m) =>
          Array.isArray(m.category) &&
          m.category.some((cat) => cat.toLowerCase() === category.toLowerCase())
      );
    }

    // Year filter
    if (year !== "all") {
      filtered = filtered.filter((m) => m.year === parseInt(year));
    }

    setFilteredData(filtered);
    setPage(1);
  }, [activeSearch, category, year, data]); // Changed from 'search' to 'activeSearch'

  // Calculate paginated data
  const startIndex = (page - 1) * moviesPerPage;
  const paginatedData = filteredData.slice(startIndex, startIndex + moviesPerPage);

  return (
    <div className="min-h-screen bg-black mt-20">
      <div className="container mx-auto px-10 py-8 text-left">
        

        {/* Enhanced Filters Section */}
        <div className=" backdrop-blur-sm rounded-2xl p- mb-8 border-b border-red-600/30">
          <div className="flex flex-col lg:flex-row gap-6 items-center">
            
            {/* Category Filter */}
            <div className="w-full lg:w-auto">
              
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={clearAllFilters}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                    category === "all" && year === "all" && !activeSearch
                      ? "bg-red-600 text-white shadow-lg shadow-red-600/25 scale-105"
                      : "bg-black text-gray-300 hover:bg-red-600/20 hover:text-white border border-red-600/50"
                  }`}
                >
                  All Movies
                </button>
                {categories.map((c) => (
                  <button
                    key={c}
                    onClick={() => setCategory(c.toLowerCase())}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                      category === c.toLowerCase()
                        ? "bg-red-600 text-white shadow-lg shadow-red-600/25 scale-105"
                        : "bg-black text-gray-300 hover:bg-red-600/20 hover:text-white border border-red-600/50"
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>

            {/* Year Filter */}
            <div className="w-full lg:w-auto">
              
              <select
                value={year}
                onChange={(e) => setYear(e.target.value)}
                className="bg-black text-white border border-red-600/50 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-red-600 transition-all duration-300"
              >
                <option value="all">All Years</option>
                {Array.from({ length: 36 }, (_, i) => 2025 - i).map((y) => (
                  <option key={y} value={y}>
                    {y}
                  </option>
                ))}
              </select>
            </div>

            {/* Search Input with Search Icon */}
            <div className="w-full lg:flex-1">
              
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search by movie title..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-4 pr-12 py-3 bg-black text-white border border-red-600/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-red-600 transition-all duration-300 placeholder-gray-400"
                />
                <button
                  onClick={handleSearch}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 hover:bg-red-600/20 rounded-lg transition-all duration-300"
                >
                  <MagnifyingGlassIcon className="w-5 h-5 text-red-600 hover:text-red-400" />
                </button>
              </div>
            </div>
          </div>

          {/* Active Search Indicator */}
          {activeSearch && (
            <div className="mt-4 flex items-center gap-2">
              <span className="text-gray-400 text-sm">Searching for:</span>
              <span className="bg-red-600/20 text-red-400 px-3 py-1 rounded-full text-sm border border-red-600/50">
                "{activeSearch}"
              </span>
            </div>
          )}
        </div>

        {/* Movies Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4 md:gap-6 mb-12">
          {paginatedData.map((m) => (
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
          ))}
        </div>

        {/* Enhanced Pagination */}
        {filteredData.length > moviesPerPage && (
          <div className="flex justify-center">
            <div className=" backdrop-blur-sm rounded-2xl p-4 ">
              <Stack spacing={2}>
                <Pagination
                  count={Math.ceil(filteredData.length / moviesPerPage)}
                  page={page}
                  onChange={(e, value) => setPage(value)}
                  variant="outlined"
                  shape="rounded"
                  size="large"
                  sx={{
                    "& .MuiPaginationItem-root": {
                      color: "#DC2626",
                      borderColor: "#DC2626",
                      fontSize: "1rem",
                      fontWeight: "500",
                      "&:hover": {
                        backgroundColor: "rgba(220, 38, 38, 0.1)",
                        borderColor: "#B91C1C",
                        color: "#B91C1C",
                        transform: "translateY(-1px)",
                      },
                      "&.Mui-selected": {
                        backgroundColor: "#DC2626",
                        borderColor: "#DC2626",
                        color: "white",
                        "&:hover": {
                          backgroundColor: "#B91C1C",
                          borderColor: "#B91C1C",
                        },
                      },
                    },
                  }}
                />
              </Stack>
            </div>
          </div>
        )}

        {/* No Results State */}
        {filteredData.length === 0 && (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🎬</div>
            <h3 className="text-2xl font-bold text-white mb-2">No movies found</h3>
            <p className="text-gray-400 mb-6">
              Try adjusting your search criteria or browse all movies
            </p>
            <button
              onClick={clearAllFilters}
              className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg transition-colors duration-300"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MoviesGrid;