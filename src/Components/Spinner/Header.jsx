const Header = ({ activeFilter, setActiveFilter, filterButtons, user }) => {
  return (
    <div className="text-center mb-12">
      <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-yellow-400 via-orange-400 to-yellow-400 bg-clip-text text-transparent mb-6">
        COMPETITIONS
      </h1>

      {/* Trustpilot Rating */}
      {/* <div className="flex items-center justify-center gap-4 mb-8">
        <div className="flex items-center gap-2">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <span key={i} className="text-yellow-400">★</span>
            ))}
          </div>
          <span className="bg-green-600 text-white text-sm px-2 py-1 rounded">4.7</span>
        </div>
        <span className="text-gray-300">Trustpilot • 2,006 Reviews</span>
      </div> */}

      {/* Filter Buttons */}
      <div className="flex flex-wrap justify-center gap-3 mb-8">
        {filterButtons.map((button) => (
          <button
            key={button.id}
            onClick={() => setActiveFilter(button.id)}
            className={`px-6 py-2 rounded-full font-bold transition-all duration-200 ${
              activeFilter === button.id
                ? 'bg-gradient-to-r from-yellow-500 to-orange-600 text-white'
                : 'bg-gray-800 text-yellow-400 border border-yellow-400 hover:bg-yellow-900/20'
            }`}
          >
            {button.label}
          </button>
        ))}
        
        {user && (
          <button
            onClick={() => setActiveFilter('spin')}
            className={`px-6 py-2 rounded-full font-bold transition-all duration-200 ${
              activeFilter === 'spin'
                ? 'bg-gradient-to-r from-yellow-500 to-orange-600 text-white'
                : 'bg-gray-800 text-yellow-400 border border-yellow-400 hover:bg-yellow-900/20'
            }`}
          >
            SPIN WHEEL
          </button>
        )}
      </div>
    </div>
  );
};

export default Header;