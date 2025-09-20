import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  EyeIcon, 
  EyeSlashIcon, 
  UserIcon, 
  EnvelopeIcon, 
  LockClosedIcon,
  FilmIcon,
  CheckCircleIcon,
  XCircleIcon,
  PhoneIcon
} from '@heroicons/react/24/outline';

const SignUpPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState(1);
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    dateOfBirth: '',
    preferences: [],
    agreeToTerms: false,
    subscribeNewsletter: false
  });

  const [passwordStrength, setPasswordStrength] = useState(0);
  const [passwordChecks, setPasswordChecks] = useState({
    length: false,
    uppercase: false,
    lowercase: false,
    number: false,
    special: false
  });

  const movieGenres = [
    'Action', 'Adventure', 'Comedy', 'Drama', 'Horror', 'Sci-Fi', 
    'Romance', 'Thriller', 'Animation', 'Documentary', 'Fantasy', 'Mystery'
  ];

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (type === 'checkbox') {
      if (name === 'preferences') {
        const updatedPreferences = checked 
          ? [...formData.preferences, value]
          : formData.preferences.filter(pref => pref !== value);
        setFormData({ ...formData, preferences: updatedPreferences });
      } else {
        setFormData({ ...formData, [name]: checked });
      }
    } else {
      setFormData({ ...formData, [name]: value });
      
      // Password strength check
      if (name === 'password') {
        checkPasswordStrength(value);
      }
    }
  };

  const checkPasswordStrength = (password) => {
    const checks = {
      length: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      number: /\d/.test(password),
      special: /[!@#$%^&*(),.?":{}|<>]/.test(password)
    };
    
    setPasswordChecks(checks);
    setPasswordStrength(Object.values(checks).filter(Boolean).length);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      console.log('Registration submitted:', formData);
      // Handle success - redirect to welcome page or dashboard
    }, 2000);
  };

  const nextStep = () => {
    if (step < 3) setStep(step + 1);
  };

  const prevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  const fontStyle = {
    fontFamily: "'Playfair Display', serif",
    fontOpticalSizing: "auto",
    fontStyle: "normal",
  };

  return (
    <div className="min-h-screen bg-black flex items-center mt-30 justify-center p-4">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-red-900 via-black to-black"></div>
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-red-600/ rounded-full animate-ping"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${3 + Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      <div className="relative w-full max-w-4xl mx-auto">
        <div className="bg-black/90 backdrop-blur-sm rounded-3xl overflow-hidden shadow-2xl border border-red-600/20">
          
          {/* Header */}
          <div className="bg-gradient-to-r from-black to-red-900 p-8 text-center">
            <div className="flex justify-center items-center gap-3 mb-4">
              <div className="p-3 bg-white/20 rounded-2xl">
                <FilmIcon className="w-8 h-8 text-white" />
              </div>
              <h1 style={fontStyle} className="text-4xl font-bold text-white">
                CinemaStream
              </h1>
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">Join the Movie Experience</h2>
            <p className="text-white/80">Create your account in just a few steps</p>
            
            {/* Progress Bar */}
            <div className="flex justify-center mt-6">
              <div className="flex items-center space-x-4">
                {[1, 2, 3].map((stepNum) => (
                  <div key={stepNum} className="flex items-center">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all duration-300 ${
                      step >= stepNum 
                        ? 'bg-white text-red-600' 
                        : 'bg-white/30 text-white'
                    }`}>
                      {step > stepNum ? <CheckCircleIcon className="w-6 h-6" /> : stepNum}
                    </div>
                    {stepNum < 3 && (
                      <div className={`w-16 h-1 mx-2 transition-all duration-300 ${
                        step > stepNum ? 'bg-white' : 'bg-white/30'
                      }`}></div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Form Content */}
          <div className="p-8">
            <form onSubmit={handleSubmit} className="max-w-2xl mx-auto">
              
              {/* Step 1: Personal Information */}
              {step === 1 && (
                <div className="space-y-6">
                  <div className="text-center mb-8">
                    <h3 className="text-2xl font-bold text-white mb-2">Personal Information</h3>
                    <p className="text-gray-400">Tell us a bit about yourself</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* First Name */}
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        First Name *
                      </label>
                      <div className="relative">
                        <UserIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                          type="text"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleInputChange}
                          className="w-full pl-10 pr-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent transition-all duration-300"
                          placeholder="John"
                          required
                        />
                      </div>
                    </div>
                    
                    {/* Last Name */}
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Last Name *
                      </label>
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent transition-all duration-300"
                        placeholder="Doe"
                        required
                      />
                    </div>
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Email Address *
                    </label>
                    <div className="relative">
                      <EnvelopeIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full pl-10 pr-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent transition-all duration-300"
                        placeholder="john.doe@example.com"
                        required
                      />
                    </div>
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Phone Number
                    </label>
                    <div className="relative">
                      <PhoneIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full pl-10 pr-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent transition-all duration-300"
                        placeholder="+1 (555) 123-4567"
                      />
                    </div>
                  </div>

                  {/* Date of Birth */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Date of Birth *
                    </label>
                    <input
                      type="date"
                      name="dateOfBirth"
                      value={formData.dateOfBirth}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent transition-all duration-300"
                      required
                    />
                  </div>
                </div>
              )}

              {/* Step 2: Security */}
              {step === 2 && (
                <div className="space-y-6">
                  <div className="text-center mb-8">
                    <h3 className="text-2xl font-bold text-white mb-2">Account Security</h3>
                    <p className="text-gray-400">Create a secure password for your account</p>
                  </div>

                  {/* Password */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Password *
                    </label>
                    <div className="relative">
                      <LockClosedIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type={showPassword ? 'text' : 'password'}
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        className="w-full pl-10 pr-12 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent transition-all duration-300"
                        placeholder="Create a strong password"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors duration-200"
                      >
                        {showPassword ? <EyeSlashIcon className="w-5 h-5" /> : <EyeIcon className="w-5 h-5" />}
                      </button>
                    </div>
                    
                    {/* Password Strength */}
                    <div className="mt-3">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="flex-1 bg-gray-700 rounded-full h-2">
                          <div 
                            className={`h-full rounded-full transition-all duration-300 ${
                              passwordStrength <= 2 ? 'bg-red-500' :
                              passwordStrength <= 3 ? 'bg-yellow-500' :
                              passwordStrength <= 4 ? 'bg-blue-500' : 'bg-green-500'
                            }`}
                            style={{ width: `${(passwordStrength / 5) * 100}%` }}
                          />
                        </div>
                        <span className="text-sm text-gray-400">
                          {passwordStrength <= 2 ? 'Weak' :
                           passwordStrength <= 3 ? 'Fair' :
                           passwordStrength <= 4 ? 'Good' : 'Strong'}
                        </span>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        {Object.entries(passwordChecks).map(([check, passed]) => (
                          <div key={check} className={`flex items-center gap-2 ${passed ? 'text-green-400' : 'text-gray-400'}`}>
                            {passed ? <CheckCircleIcon className="w-4 h-4" /> : <XCircleIcon className="w-4 h-4" />}
                            <span>
                              {check === 'length' ? '8+ characters' :
                               check === 'uppercase' ? 'Uppercase letter' :
                               check === 'lowercase' ? 'Lowercase letter' :
                               check === 'number' ? 'Number' :
                               'Special character'}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Confirm Password */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Confirm Password *
                    </label>
                    <div className="relative">
                      <LockClosedIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type={showConfirmPassword ? 'text' : 'password'}
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                        className="w-full pl-10 pr-12 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent transition-all duration-300"
                        placeholder="Confirm your password"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors duration-200"
                      >
                        {showConfirmPassword ? <EyeSlashIcon className="w-5 h-5" /> : <EyeIcon className="w-5 h-5" />}
                      </button>
                    </div>
                    {formData.confirmPassword && formData.password !== formData.confirmPassword && (
                      <p className="text-red-400 text-sm mt-1">Passwords do not match</p>
                    )}
                  </div>
                </div>
              )}

              {/* Step 3: Preferences */}
              {step === 3 && (
                <div className="space-y-6">
                  <div className="text-center mb-8">
                    <h3 className="text-2xl font-bold text-white mb-2">Movie Preferences</h3>
                    <p className="text-gray-400">Help us personalize your experience</p>
                  </div>

                  {/* Genre Preferences */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-4">
                      Favorite Genres (Select all that apply)
                    </label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {movieGenres.map((genre) => (
                        <label key={genre} className="flex items-center">
                          <input
                            type="checkbox"
                            name="preferences"
                            value={genre}
                            checked={formData.preferences.includes(genre)}
                            onChange={handleInputChange}
                            className="rounded border-gray-700 bg-gray-900 text-red-600 focus:ring-red-600 focus:ring-offset-0"
                          />
                          <span className="ml-2 text-gray-300">{genre}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Newsletter */}
                  <div className="flex items-start gap-3">
                    <input
                      type="checkbox"
                      name="subscribeNewsletter"
                      checked={formData.subscribeNewsletter}
                      onChange={handleInputChange}
                      className="mt-1 rounded border-gray-700 bg-gray-900 text-red-600 focus:ring-red-600 focus:ring-offset-0"
                    />
                    <div>
                      <p className="text-gray-300">Subscribe to our newsletter</p>
                      <p className="text-gray-500 text-sm">Get updates on new releases, exclusive content, and special offers.</p>
                    </div>
                  </div>

                  {/* Terms Agreement */}
                  <div className="flex items-start gap-3">
                    <input
                      type="checkbox"
                      name="agreeToTerms"
                      checked={formData.agreeToTerms}
                      onChange={handleInputChange}
                      required
                      className="mt-1 rounded border-gray-700 bg-gray-900 text-red-600 focus:ring-red-600 focus:ring-offset-0"
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
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex justify-between mt-8">
                <button
                  type="button"
                  onClick={prevStep}
                  className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                    step === 1 
                      ? 'invisible' 
                      : 'bg-gray-700 hover:bg-gray-600 text-white'
                  }`}
                >
                  Previous
                </button>

                {step < 3 ? (
                  <button
                    type="button"
                    onClick={nextStep}
                    className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105"
                  >
                    Next Step
                  </button>
                ) : (
                  <button
                    type="submit"
                    disabled={isLoading || !formData.agreeToTerms}
                    className="bg-red-600 hover:bg-red-700 disabled:bg-red-800 text-white font-semibold py-3 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 disabled:scale-100 flex items-center gap-2"
                  >
                    {isLoading ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                        Creating Account...
                      </>
                    ) : (
                      'Create Account'
                    )}
                  </button>
                )}
              </div>
            </form>

            {/* Sign In Link */}
            <div className="text-center mt-8 pt-8 border-t border-gray-700">
              <p className="text-gray-400">
                Already have an account?{' '}
                <Link
                  to="/signin"
                  className="text-red-600 hover:text-red-400 font-semibold transition-colors duration-200"
                >
                  Sign In
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;