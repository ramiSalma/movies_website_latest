import React, { useState, useEffect } from "react";
import { MagnifyingGlassIcon, Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { Link, Outlet, useLocation } from "react-router-dom";
import Footer from "../footer/Footer";
import logo from "../images/logo.png";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Movies", path: "/movies" },
    { name: "TV Shows", path: "/tvshows" },
    { name: "About", path: "/about" },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-700 ease-out ${
          scrolled
            ? "bg-black/95 backdrop-blur-lg border-b border-red-500/30 shadow-[0_0_30px_rgba(220,38,38,0.3)]"
            : "bg-gradient-to-b from-black/80 to-transparent backdrop-blur-sm"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 py-3">
          <div className="flex items-center justify-between">
            {/* Logo Section */}
            <div className="flex items-center group">
              <Link to="/home" className="flex items-center">
                <img 
                  src={logo} 
                  alt="Logo" 
                  className="h-16 transition-all duration-300 group-hover:scale-110 drop-shadow-lg" 
                />
                
              </Link>
            </div>

            {/* Desktop Navigation Links */}
            <div className="hidden lg:flex items-center space-x-1">
              {navItems.map((item, index) => (
                <Link
                  key={index}
                  to={item.path}
                  className={`relative px-4 py-2 rounded-lg font-medium transition-all duration-300 group ${
                    isActive(item.path)
                      ? "text-red-400 bg-red-500/10"
                      : "text-white hover:text-red-400 hover:bg-white/5"
                  }`}
                >
                  <span className="relative z-10">{item.name}</span>
                  
                  
                  
                  {/* Hover effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-red-500/0 via-red-500/10 to-red-500/0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </Link>
              ))}
            </div>

            {/* Right Section - Search & Auth */}
            <div className="flex items-center gap-3">
              
              {/* Search Section */}
              <div className="relative">
                <button
                  onClick={() => setSearchOpen(!searchOpen)}
                  className={`p-3 rounded-full transition-all duration-300 ${
                    searchOpen 
                      ? "bg-red-500/20 text-red-400 scale-110" 
                      : "bg-white/10 text-white hover:bg-red-500/20 hover:text-red-400 hover:scale-110"
                  }`}
                >
                  <MagnifyingGlassIcon className="h-5 w-5" />
                </button>

                {/* Search Input */}
                {searchOpen && (
                  <div className="absolute right-0 top-full mt-2 w-80 bg-black/95 backdrop-blur-lg rounded-2xl border border-red-500/30 shadow-[0_0_30px_rgba(220,38,38,0.2)] overflow-hidden">
                    <div className="p-4">
                      <input
                        type="text"
                        placeholder="Search movies, TV shows..."
                        className="w-full bg-white/10 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300"
                        autoFocus
                      />
                      <div className="mt-3 text-xs text-gray-400">
                        Press Enter to search or Esc to close
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Auth Buttons - Desktop */}
              <div className="hidden md:flex items-center gap-3">
                <button className="px-5 py-2.5 border-2 border-white/30 rounded-full text-white font-medium hover:border-red-500 hover:text-red-400 hover:bg-red-500/10 transition-all duration-300 hover:scale-105 hover:shadow-lg">
                  Sign In
                </button>
                <button className="px-5 py-2.5 bg-gradient-to-r from-red-600 to-red-700 text-white font-medium rounded-full hover:from-red-700 hover:to-red-800 hover:scale-105 hover:shadow-[0_0_20px_rgba(220,38,38,0.4)] transition-all duration-300">
                  Sign Up
                </button>
              </div>

              {/* Mobile Menu Toggle */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 rounded-lg text-white hover:bg-white/10 transition-colors duration-300"
              >
                {mobileMenuOpen ? (
                  <XMarkIcon className="h-6 w-6" />
                ) : (
                  <Bars3Icon className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="lg:hidden mt-4 pb-4 border-t border-white/10">
              <div className="space-y-2 mt-4">
                {navItems.map((item, index) => (
                  <Link
                    key={index}
                    to={item.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`block px-4 py-3 rounded-lg font-medium transition-all duration-300 ${
                      isActive(item.path)
                        ? "text-red-400 bg-red-500/10"
                        : "text-white hover:text-red-400 hover:bg-white/5"
                    }`}
                  >
                    {item.name}
                  </Link>
                ))}
                
                {/* Mobile Auth Buttons */}
                <div className="pt-4 space-y-3 border-t border-white/10 mt-4">
                  <button className="w-full px-4 py-3 border border-white/30 rounded-lg text-white font-medium hover:border-red-500 hover:text-red-400 transition-all duration-300">
                    Sign In
                  </button>
                  <button className="w-full px-4 py-3 bg-gradient-to-r from-red-600 to-red-700 text-white font-medium rounded-lg hover:from-red-700 hover:to-red-800 transition-all duration-300">
                    Sign Up
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Decorative Elements */}
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-red-500/50 to-transparent"></div>
      </nav>

      <Outlet />
      <Footer />
    </>
  );
};

export default Navbar;