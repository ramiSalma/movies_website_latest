import React from 'react'
import logo from "../images/logo.png";

const Footer = () => {
  return (
    <footer className="relative text-white py-8 px-4 md:px-16 mt-12 bg-gradient-to-br from-black via-black-800 to-red-900">
      {/* Subtle overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>

      <div className="relative max-w-6xl mx-auto">
        {/* Main content */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-8">
          {/* Logo / Branding */}
          <div className="flex items-center">
            <img src={logo} className='h-20 drop-shadow-lg' alt="Logo" />
          </div>
          
          {/* Links */}
          <nav className="flex gap-8 text-sm font-medium">
            <a href="#" className="hover:text-red-400 transition-colors duration-300 hover:scale-105 transform">
              Home
            </a>
            <a href="#" className="hover:text-red-400 transition-colors duration-300 hover:scale-105 transform">
              Movies
            </a>
            <a href="#" className="hover:text-red-400 transition-colors duration-300 hover:scale-105 transform">
              About
            </a>
            <a href="#" className="hover:text-red-400 transition-colors duration-300 hover:scale-105 transform">
              Contact
            </a>
          </nav>
          
          {/* Social icons */}
          <div className="flex gap-4">
            <a href="#" className="text-xl hover:text-red-400 transition-all duration-300 hover:scale-110 transform hover:-translate-y-1">
              📘
            </a>
            <a href="#" className="text-xl hover:text-red-400 transition-all duration-300 hover:scale-110 transform hover:-translate-y-1">
              🐦
            </a>
            <a href="#" className="text-xl hover:text-red-400 transition-all duration-300 hover:scale-110 transform hover:-translate-y-1">
              📸
            </a>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-gray-600 to-transparent mb-6"></div>

        {/* Copyright */}
        <div className="text-center">
          <p className="text-sm text-gray-300 mb-2">
            &copy; {new Date().getFullYear()} MovieZone. All rights reserved.
          </p>
          <p className="text-xs text-gray-400">
            Made with ❤️ for movie enthusiasts
          </p>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-0 left-1/4 w-32 h-32 bg-red-500/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-1/4 w-40 h-40 bg-blue-500/5 rounded-full blur-3xl"></div>
    </footer>
  )
}

export default Footer;