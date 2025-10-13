import React, { useEffect, useState } from "react";
import moviesData from "../../api/movies";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { PlayCircleIcon } from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";
import MovieCard from "../../MOVIES_CARD/MovieCard";

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
    <div className="min-h-screen p-10 bg-black mt-20 w-full">
      <div className="w-full max-w-none px-4 py-8 text-left">
        

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
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-8 gap-6 mb-12 w-full">
          {paginatedData.map((m) => (
            <MovieCard key={m._id} m={m} large={true} />
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