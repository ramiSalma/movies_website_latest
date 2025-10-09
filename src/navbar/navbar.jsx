import React, { useState, useEffect } from "react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { Link, Outlet, useLocation } from "react-router-dom";
import Footer from "../footer/Footer";
import logo2 from "../images/logo2.png";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
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
    { name: "series", path: "/series" },
    { name: "About", path: "linkedin.com/in/salma-rami-55a11a349" },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <>
    <h1 className="text-8xl text-blue-500"> hello this is a test</h1>
      <nav
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-700 ease-out ${scrolled
            ? "bg-gradient-to-b from-black/80 to-transparent backdrop-blur-sm border-b border-red-500/30 shadow-[0_0_30px_rgba(220,38,38,0.3)]"
            : "border border-transparent"
          }`}
      >
        <div className="max-w-7xl mx-auto px-6 py-3">
          <div className="flex items-center justify-between">
            {/* Logo Section */}
            <div className="flex items-center group h-16">
              <Link to="/home" className="flex items-center">
                <img
                  src={logo2}
                  alt="Logo"
                  className="h-20 transition-all duration-300 group-hover:scale-110 drop-shadow-lg"
                />
              </Link>
            </div>

            {/* Desktop Navigation Links */}
            <div className="hidden lg:flex items-center space-x-1">
              {navItems.map((item, index) => (
                <Link
                  key={index}
                  to={item.path}
                  className={`relative px-4 py-2 rounded-lg font-medium transition-all duration-300 group ${isActive(item.path)
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

            {/* Right Section - Auth & Mobile Menu */}
            <div className="flex items-center gap-3">
              {/* Auth Buttons - Desktop */}
              <div className="hidden md:flex items-center gap-3">
                <Link to='/signin' className="px-5 py-2.5 border-2 border-white/30 text-white font-medium hover:border-red-500 hover:text-red-400 hover:bg-red-500/10 transition-all duration-300 hover:scale-105 hover:shadow-lg">
                  Sign In
                </Link>
                <Link to='/signup' className="px-5 py-2.5 bg-gradient-to-r from-red-600 to-red-700 text-white font-medium hover:from-red-700 hover:to-red-800 hover:scale-105 hover:shadow-[0_0_20px_rgba(220,38,38,0.4)] transition-all duration-300">
                  Sign Up
                </Link>
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
                    className={`block px-4 py-3 rounded-lg font-medium transition-all duration-300 ${isActive(item.path)
                        ? "text-red-400 bg-red-500/10"
                        : "text-white hover:text-red-400 hover:bg-white/5"
                      }`}
                  >
                    {item.name}
                  </Link>
                ))}
                {/* Mobile Auth Buttons */}
                <div className="pt-4 space-y-3 border-t border-white/10 mt-4">
                  <Link to="/signin" className="block w-full px-4 py-3 border border-white/30 rounded-lg text-white font-medium hover:border-red-500 hover:text-red-400 transition-all duration-300 text-center">
                    Sign In
                  </Link>
                  <Link to="/signup" className="block w-full px-4 py-3 bg-gradient-to-r from-red-600 to-red-700 text-white font-medium rounded-lg hover:from-red-700 hover:to-red-800 transition-all duration-300 text-center">
                    Sign Up
                  </Link>
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