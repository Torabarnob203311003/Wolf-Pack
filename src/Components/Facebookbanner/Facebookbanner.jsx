import React from 'react';

function FacebookBanner() {
  return (
    <div 
      className="w-full max-w-7xl mx-auto mt-16 px-4 sm:px-6 lg:px-8 py-3 sm:py-4 flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4"
      style={{
        background: 'linear-gradient(90deg, #C78800 0%, #F5D334 17.79%, #EDC933 27.88%, #D9AD30 45.29%, #D4A52F 49.38%, #F0CC33 70.61%, #F5D334 74.22%, #ECC92F 78.35%, #D5AC22 85.48%, #AE7F0D 94.71%, #966200 100%)'
      }}
    >
      {/* Left Section - Logo and Text */}
      <div className="flex items-center gap-3 sm:gap-4 flex-1 text-center sm:text-left">
        {/* Facebook Icon */}
        <div className="flex-shrink-0">
          <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-600 rounded-full flex items-center justify-center">
            <svg 
              className="w-5 h-5 sm:w-6 sm:h-6 text-white" 
              fill="currentColor" 
              viewBox="0 0 24 24"
            >
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
            </svg>
          </div>
        </div>

        {/* Text Content */}
        <div className="flex-1 min-w-0">
          <div className="text-gray-800 text-sm sm:text-base lg:text-lg font-medium leading-tight">
            Keep up to date with all of our latest competitions, power hours and live draws.
          </div>
          <div className="text-gray-700 text-xs sm:text-sm lg:text-base font-medium mt-0.5 sm:mt-1">
            Join our FB group – Over 40,000 members
          </div>
        </div>
      </div>

      {/* Right Section - Button */}
      <div className="flex-shrink-0 w-full sm:w-auto">
        <button 
          className="w-full sm:w-auto px-6 sm:px-8 py-2 sm:py-2.5 bg-gray-800 hover:bg-gray-700 text-white font-medium text-sm sm:text-base rounded transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-600 focus:ring-opacity-50"
        >
          Join Now
        </button>
      </div>
    </div>
  );
}

export default FacebookBanner;