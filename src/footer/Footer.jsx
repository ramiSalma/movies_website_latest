import React from 'react'
import logo2 from "../images/logo2.png";
import insta from "../images/insta.png"
import fcb from "../images/fcb.png"
import snap from "../images/snap.png"
const Footer = () => {
  return (
    <footer className="relative text-white py-1 px-4 md:px-16 mt-12 bg-gradient-to-br from-black via-black-800 to-red-900">
      {/* Subtle overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>

      <div className="relative max-w-6xl mx-auto">
        {/* Main content */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-8">
          {/* Logo / Branding */}
          <div className="flex items-center h-16">
            <img src={logo2} className='h-20 drop-shadow-lg' alt="Logo" />
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
          
          {/* Social icons */}
          <div className="flex gap-4">
            <a href="#" className="text-xl hover:text-red-400 transition-all duration-300 hover:scale-110 transform hover:-translate-y-1">
              <img src={insta} width={50} alt="" />
            </a>
            <a href="#" className="text-xl hover:text-red-400 transition-all duration-300 hover:scale-110 transform hover:-translate-y-1">
              <img src={fcb} width={50} alt="" />
            </a>
            <a href="#" className="text-xl hover:text-red-400 transition-all duration-300 hover:scale-110 transform hover:-translate-y-1">
              <img src={snap} width={50} alt="" />
            </a>
          </div>
        </div>

        
      </div>

      
    </footer>
  )
}

export default Footer;