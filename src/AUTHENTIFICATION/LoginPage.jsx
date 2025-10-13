import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  EyeIcon, 
  EyeSlashIcon, 
  UserIcon, 
  EnvelopeIcon, 
  LockClosedIcon,
  FilmIcon,
  ArrowRightIcon
} from '@heroicons/react/24/outline';
import img1 from '../images/img1.png'
const AuthPage = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      console.log('Form submitted:', formData);
    }, 2000);
  };

  const fontStyle = {
    fontFamily: "'Playfair Display', serif",
    fontOpticalSizing: "auto",
    fontStyle: "normal",
  };

  return (
    <div className="min-h-screen mt-20 bg-black flex items-center justify-center p-4">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Floating Particles */}
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-red-600/30 rounded-full animate-ping"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      <div className="relative w-full max-w-6xl mx-auto">
        <div className="flex flex-col lg:flex-row bg-black/90 backdrop-blur-sm rounded-3xl overflow-hidden shadow-2xl border border-red-600/20">
          
          {/* Left Side - Branding */}
          <div className="lg:w-1/2 bg-gradient-to-br from-red-600 via-red-900 to-black p-12 flex flex-col justify-center relative overflow-hidden">
           
            
            <div className="relative z-10">
              

              {/* Welcome Text */}
              <div className="mb-12">
                <h2 className="text-5xl font-bold text-white mb-6 leading-tight">
                  {isSignUp ? 'Join Our Movie Universe' : 'Welcome Back to the Show'}
                </h2>
                <p className="text-xl text-white/80 leading-relaxed">
                  {isSignUp 
                    ? 'Create your account and discover thousands of movies, series, and exclusive content tailored just for you.'
                    : 'Sign in to continue your cinematic journey and pick up right where you left off.'
                  }
                </p>
              </div>

              {/* Features */}
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                  <span className="text-white/90">Unlimited streaming access</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                  <span className="text-white/90">Personalized recommendations</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                  <span className="text-white/90">Watch on any device</span>
                </div>
              </div>
            </div>
              <img className='absolute right-0 bottom-0' src={img1} width={300} height={200} alt="" />
          </div>

          {/* Right Side - Form */}
          <div className="lg:w-1/2 p-12 bg-black">
            <div className="max-w-md mx-auto">
              
              {/* Form Header */}
              <div className="text-center mb-8">
                <h3 className="text-3xl font-bold text-white mb-2">
                  {isSignUp ? 'Create Account' : 'Sign In'}
                </h3>
                <p className="text-gray-400">
                  {isSignUp 
                    ? 'Fill in your details to get started' 
                    : 'Enter your credentials to access your account'
                  }
                </p>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-6">
                
                {/* Name Fields - Only for Sign Up */}
                {isSignUp && (
                  <div className="flex gap-4">
                    <div className="flex-1">
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        First Name
                      </label>
                      <div className="relative">
                        <UserIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                          type="text"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleInputChange}
                          className="w-full pl-10 pr-4 py-3 bg-black border border-red-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent transition-all duration-300"
                          placeholder="John"
                          required={isSignUp}
                        />
                      </div>
                    </div>
                    
                    <div className="flex-1">
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Last Name
                      </label>
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-black border border-red-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent transition-all duration-300"
                        placeholder="Doe"
                        required={isSignUp}
                      />
                    </div>
                  </div>
                )}

                {/* Email Field */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <EnvelopeIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-4 py-3 bg-black border border-red-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent transition-all duration-300"
                      placeholder="john.doe@example.com"
                      required
                    />
                  </div>
                </div>

                {/* Password Field */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <LockClosedIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-12 py-3 bg-black border border-red-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent transition-all duration-300"
                      placeholder="Enter your password"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors duration-200"
                    >
                      {showPassword ? (
                        <EyeSlashIcon className="w-5 h-5" />
                      ) : (
                        <EyeIcon className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Confirm Password - Only for Sign Up */}
                {isSignUp && (
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Confirm Password
                    </label>
                    <div className="relative">
                      <LockClosedIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type={showConfirmPassword ? 'text' : 'password'}
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                        className="w-full pl-10 pr-12 py-3 bg-black border border-red-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent transition-all duration-300"
                        placeholder="Confirm your password"
                        required={isSignUp}
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors duration-200"
                      >
                        {showConfirmPassword ? (
                          <EyeSlashIcon className="w-5 h-5" />
                        ) : (
                          <EyeIcon className="w-5 h-5" />
                        )}
                      </button>
                    </div>
                  </div>
                )}

                {/* Remember Me / Forgot Password */}
                {!isSignUp && (
                  <div className="flex items-center justify-between">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        className="rounded border-red-700 bg-black text-red-600 focus:ring-red-600 focus:ring-offset-0"
                      />
                      <span className="ml-2 text-sm text-gray-300">Remember me</span>
                    </label>
                    <Link
                      to="/forgot-password"
                      className="text-sm text-red-600 hover:text-red-400 transition-colors duration-200"
                    >
                      Forgot password?
                    </Link>
                  </div>
                )}

                {/* Terms Agreement - Only for Sign Up */}
                {isSignUp && (
                  <div className="flex items-start gap-3">
                    <input
                      type="checkbox"
                      required
                      className="mt-1 rounded border-red-700 bg-black text-red-600 focus:ring-red-600 focus:ring-offset-0"
                    />
                    <p className="text-sm text-gray-300">
                      I agree to the{' '}
                      <Link to="/terms" className="text-red-600 hover:text-red-400 transition-colors duration-200">
                        Terms of Service
                      </Link>
                      {' '}and{' '}
                      <Link to="/privacy" className="text-red-600 hover:text-red-400 transition-colors duration-200">
                        Privacy Policy
                      </Link>
                    </p>
                  </div>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-red-600 hover:bg-red-700 disabled:bg-red-800 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-[1.02] disabled:scale-100 flex items-center justify-center gap-2 group"
                >
                  {isLoading ? (
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  ) : (
                    <>
                      {isSignUp ? 'Create Account' : 'Sign In'}
                      <ArrowRightIcon className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
                    </>
                  )}
                </button>

                {/* Divider */}
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-red-700"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-black text-gray-400">or</span>
                  </div>
                </div>

                {/* Social Login */}
                <div className="grid grid-cols-2 gap-4">
                  <button
                    type="button"
                    className="flex items-center justify-center gap-3 px-4 py-3 border border-red-700 rounded-lg text-gray-300 hover:bg-black hover:border-gray-600 transition-all duration-300"
                  >
                    <svg className="w-5 h-5" viewBox="0 0 24 24">
                      <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                      <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                      <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                      <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                    </svg>
                    Google
                  </button>
                  
                  <button
                    type="button"
                    className="flex items-center justify-center gap-3 px-4 py-3 border border-red-700 rounded-lg text-gray-300 hover:bg-black hover:border-gray-600 transition-all duration-300"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                    </svg>
                    Twitter
                  </button>
                </div>
              </form>

              {/* Toggle Form Type */}
              <div className="text-center mt-8">
                <p className="text-gray-400">
                  {isSignUp ? 'Already have an account?' : "Don't have an account?"}
                  {' '}
                  <button
                    onClick={() => setIsSignUp(!isSignUp)}
                    className="text-red-600 hover:text-red-400 font-semibold transition-colors duration-200"
                  >
                    {isSignUp ? 'Sign In' : 'Sign Up'}
                  </button>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;