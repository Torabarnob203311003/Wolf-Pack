import React from 'react';

function FacebookBanner() {
  return (
    <div 
      className="w-full max-w-7xl mx-auto mt-8 sm:mt-12 md:mt-16 px-3 sm:px-4 md:px-6 lg:px-8 py-3 sm:py-4 md:py-5 flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4 md:gap-6 rounded-xl sm:rounded-2xl mx-3 sm:mx-4 md:mx-auto"
      style={{
        background: '#FDED43'
      }}
    >
      {/* Left Section - Logo and Text */}
      <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-3 md:gap-4 flex-1 text-center sm:text-left w-full sm:w-auto">
        {/* Facebook Icon */}
        <div className="flex-shrink-0">
          <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-blue-600 rounded-full flex items-center justify-center">
            <svg 
              className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-white" 
              fill="currentColor" 
              viewBox="0 0 24 24"
            >
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
            </svg>
          </div>
        </div>

        {/* Text Content */}
        <div className="flex-1 min-w-0 text-center sm:text-left px-2 sm:px-0">
          <div className="text-gray-800 text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl font-medium leading-tight">
            Keep up to date with all of our latest competitions, power hours and live draws.
          </div>
          <div 
            className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl font-medium font-bold mt-1 sm:mt-1.5"
            style={{ color: '#E28B27' }}
          >
            Join our Facebook page 
          </div>
        </div>
      </div>

      {/* Right Section - Button */}
      <div className="flex-shrink-0 w-full sm:w-auto mt-2 sm:mt-0">
        <button 
          onClick={()=> window.location = "https://www.northstarcompetitions.co.uk/sign-up"}
          className="w-full sm:w-auto px-4 sm:px-6 md:px-8 py-2 sm:py-2.5 md:py-3 text-white  font-bold text-sm sm:text-base md:text-lg rounded-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gray-600 focus:ring-opacity-50 hover:opacity-90 shadow-lg"
          style={{
            background: 'linear-gradient(90deg, #E28B27 0%, #F5D334 29.19%, #F6D63E 32.42%, #F5D334 67.48%, #ECC92F 72.69%, #D5AC22 81.69%, #AE7F0D 93.33%, #966200 100%)'
          }}
        >
          JOIN NOW
        </button>
      </div>
    </div>
  );
}

export default FacebookBanner;
