import { useState, useRef, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import logo from '../../../public/northStarLogo.png';
import { User, History, Trophy, Wallet, LogOut, ChevronDown, Coins, RefreshCcw } from 'lucide-react';

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const dropdownRef = useRef(null);
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);

  }, []);

  // Generate consistent gradient based on username
  const getAvatarGradient = (name) => {
    const gradients = [
      'from-purple-500 to-pink-500',
      'from-blue-500 to-cyan-500',
      'from-green-500 to-emerald-500',
      'from-yellow-500 to-orange-500',
      'from-red-500 to-pink-500',
      'from-indigo-500 to-purple-500',
      'from-yellow-600 to-yellow-400',
    ];
    const index = name ? name.charCodeAt(0) % gradients.length : 6;
    return gradients[index];
  };

  const handleLogout = () => {
    logout();
    setIsDropdownOpen(false);
    navigate('/');
  };

  const userPoints = user?.points || 0;

  return (
    <header className="px-4 md:px-6 py-3 md:py-4 bg-black border-b border-gray-900">
      <div className="container flex justify-between items-center mx-auto max-w-7xl">
        {/* Logo Section */}
        <div className="cursor-pointer" onClick={() => navigate('/')}>
          <img className='h-[70px] md:h-[80px]' src={logo} alt="northstar-logo" />
        </div>

        {/* Navigation Links - Desktop Only */}
        <nav className="hidden lg:flex xl:flex-1 xl:justify-center">
          <ul className="flex space-x-6 xl:space-x-8">
            <li>
              <Link
                to="/"
                className="text-sm font-bold tracking-widest uppercase leading-tight hover:opacity-80 transition-opacity"
                style={{ color: '#C39836', fontFamily: 'Kumbh Sans', letterSpacing: '0.65px', lineHeight: '19.5px' }}
              >
                OUR COMPETITIONS
              </Link>
            </li>
            <li>
              <Link
                to="/past-winners"
                className="text-sm font-bold tracking-widest uppercase leading-tight hover:opacity-80 transition-opacity"
                style={{ color: '#C39836', fontFamily: 'Kumbh Sans', letterSpacing: '0.65px', lineHeight: '19.5px' }}
              >
                PAST WINNERS
              </Link>
            </li>
            <li>
              <Link
                to="/about-us"
                className="text-sm font-bold tracking-widest uppercase leading-tight hover:opacity-80 transition-opacity"
                style={{ color: '#C39836', fontFamily: 'Kumbh Sans', letterSpacing: '0.65px', lineHeight: '19.5px' }}
              >
                ABOUT US
              </Link>
            </li>
          </ul>
        </nav>

        {/* Auth Buttons - Hidden on Mobile */}
        <div className="hidden md:flex items-center space-x-3">
          {user && isAuthenticated ? (
            <div className="relative flex items-center gap-3" ref={dropdownRef}>
              {/* Points Display */}
              <div className="flex items-center h-10 gap-2 px-3 py-1.5 bg-gradient-to-r from-yellow-600/20 to-yellow-500/20 border border-yellow-600/30 rounded-full">
                <Coins className="w-4 h-4 text-yellow-500" />
                <span className="text-sm font-semibold text-yellow-500">{user?.credit}</span>
              </div>

              {/* User Profile Button */}
              <button
                onClick={toggleDropdown}
                className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-gray-900/50 border border-gray-800 hover:border-yellow-600/50 transition-all"
              >
                {/* Avatar */}
                <div
                  className={`w-8 h-8 rounded-full bg-gradient-to-br ${getAvatarGradient(user?.userName)} flex items-center justify-center text-white font-bold text-sm`}
                >
                  {user?.userName?.charAt(0).toUpperCase() || 'U'}
                </div>
                {/* User Name - Hidden on smaller screens */}
                <span className="text-sm font-medium text-white hidden lg:block">
                  {user?.userName || 'User'}
                </span>
                <ChevronDown
                  className={`w-4 h-4 text-gray-400 transition-transform ${
                    isDropdownOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {/* Dropdown Menu */}
              {isDropdownOpen && (
                <div className="absolute right-0 top-full mt-2 w-56 bg-[#1a1a1a] border border-gray-800 rounded-lg shadow-xl z-50 overflow-hidden">
                  {/* User Info Header */}
                  <div className="p-3 border-b border-gray-800">
                    <div className="flex items-center gap-2 mb-2">
                      <div
                        className={`w-10 h-10 rounded-full bg-gradient-to-br ${getAvatarGradient(user?.userName)} flex items-center justify-center text-white font-bold`}
                      >
                        {user?.userName?.charAt(0).toUpperCase() || 'U'}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-white font-semibold text-sm truncate">{user?.userName || 'User'}</p>
                        <p className="text-gray-400 text-xs truncate">{user?.email || ''}</p>
                      </div>
                    </div>
                    {/* Points in dropdown */}
                    <div className="flex items-center gap-2 px-2 py-1.5 bg-yellow-500/10 border border-yellow-600/20 rounded">
                      <Coins className="w-4 h-4 text-yellow-500" />
                      <span className="text-xs font-medium text-yellow-500">{user?.credit} Points</span>
                    </div>
                  </div>

                  {/* Menu Items */}
                  <div className="py-1">
                    <button
                      onClick={() => {
                        navigate('/spinning-history');
                        setIsDropdownOpen(false);
                      }}
                      className="w-full px-4 py-2 flex items-center gap-3 hover:bg-gray-800/50 transition-colors text-left group"
                    >
                      <History className="w-4 h-4 text-gray-400 group-hover:text-yellow-500 transition-colors" />
                      <span className="text-sm text-gray-300 group-hover:text-white">Spinning History</span>
                    </button>

                    <button
                      onClick={() => {
                        navigate('/raffle-history');
                        setIsDropdownOpen(false);
                      }}
                      className="w-full px-4 py-2 flex items-center gap-3 hover:bg-gray-800/50 transition-colors text-left group"
                    >
                      <Trophy className="w-4 h-4 text-gray-400 group-hover:text-yellow-500 transition-colors" />
                      <span className="text-sm text-gray-300 group-hover:text-white">Raffle History</span>
                    </button>

                    <button
                      onClick={() => {
                        navigate('/topup');
                        setIsDropdownOpen(false);
                      }}
                      className="w-full px-4 py-2 flex items-center gap-3 hover:bg-gray-800/50 transition-colors text-left group"
                    >
                      <Wallet className="w-4 h-4 text-gray-400 group-hover:text-yellow-500 transition-colors" />
                      <span className="text-sm text-gray-300 group-hover:text-white">Top Up</span>
                    </button>

                    <button
                      onClick={() => {
                        navigate('/swap-reward');
                        setIsDropdownOpen(false);
                      }}
                      className="w-full px-4 py-2 flex items-center gap-3 hover:bg-gray-800/50 transition-colors text-left group"
                    >
                      <RefreshCcw className="w-4 h-4 text-gray-400 group-hover:text-yellow-500 transition-colors" />
                      <span className="text-sm text-gray-300 group-hover:text-white">Swap & Withdraw Reward</span>
                    </button>

                    <div className="border-t border-gray-800 my-1"></div>

                    <button
                      onClick={handleLogout}
                      className="w-full px-4 py-2 flex items-center gap-3 hover:bg-red-500/10 transition-colors text-left group"
                    >
                      <LogOut className="w-4 h-4 text-gray-400 group-hover:text-red-500 transition-colors" />
                      <span className="text-sm text-gray-300 group-hover:text-red-400">Sign Out</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <>
              <button
                className="px-4 lg:px-6 py-1.5 lg:py-2 text-xs lg:text-sm font-medium rounded-full hover:bg-opacity-10 hover:bg-white transition-all relative"
                style={{
                  background: 'linear-gradient(90deg, #C78800 0%, #F5D334 17.79%, #EDC933 27.88%, #D9AD30 45.29%, #D4A52F 49.38%, #F0CC33 70.61%, #F5D334 74.22%, #ECC92F 78.35%, #D5AC22 85.48%, #AE7F0D 94.71%, #966200 100%)',
                  padding: '2px',
                }}
              >
                <span
                  onClick={() => navigate('/sign-in')}
                  className="block w-full h-full px-4 lg:px-8 py-1.5 lg:py-2 bg-gray-900 rounded-full cursor-pointer text-yellow-500"
                >
                  Sign In
                </span>
              </button>
              <button
                onClick={() => navigate('/sign-up')}
                className="px-4 lg:px-8 py-1.5 lg:py-2 text-xs lg:text-sm font-medium text-black rounded-full hover:opacity-90 transition-opacity"
                style={{ background: 'linear-gradient(90deg, #C78800 0%, #F5D334 17.79%, #EDC933 27.88%, #D9AD30 45.29%, #D4A52F 49.38%, #F0CC33 70.61%, #F5D334 74.22%, #ECC92F 78.35%, #D5AC22 85.48%, #AE7F0D 94.71%, #966200 100%)' }}
              >
                Sign Up
              </button>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className={`w-5 h-5 transition-transform duration-200 ${isMenuOpen ? 'rotate-90' : ''}`}
            style={{ color: '#C39836' }}
          >
            {isMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      <div className={`md:hidden overflow-hidden transition-all duration-300 ${isMenuOpen ? 'max-h-[600px] opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="px-4 py-4 space-y-4 border-t border-gray-800 mt-3">
          {/* Mobile User Info */}
          {user && isAuthenticated && (
            <div className="p-3 bg-gray-900/50 rounded-lg border border-gray-800">
              <div className="flex items-center gap-3 mb-3">
                <div
                  className={`w-10 h-10 rounded-full bg-gradient-to-br ${getAvatarGradient(user?.userName)} flex items-center justify-center text-white font-bold`}
                >
                  {user?.userName?.charAt(0).toUpperCase() || 'U'}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-white font-semibold text-sm truncate">{user?.userName || 'User'}</p>
                  <p className="text-gray-400 text-xs truncate">{user?.email || ''}</p>
                </div>
              </div>
              {/* Points in mobile */}
              <div className="flex items-center gap-2 px-3 py-2 bg-yellow-500/10 border border-yellow-600/20 rounded">
                <Coins className="w-4 h-4 text-yellow-500" />
                <span className="text-sm font-medium text-yellow-500">{userPoints} Points</span>
              </div>
            </div>
          )}

          {/* Mobile Navigation */}
          <nav className="space-y-2">
            <Link
              to="/"
              className="block text-sm font-bold tracking-widest uppercase leading-tight py-2 hover:opacity-80 transition-opacity"
              style={{ color: '#C39836', fontFamily: 'Kumbh Sans', letterSpacing: '0.65px', lineHeight: '19.5px' }}
              onClick={() => setIsMenuOpen(false)}
            >
              OUR COMPETITIONS
            </Link>
            <Link
              to="/past-winners"
              className="block text-sm font-bold tracking-widest uppercase leading-tight py-2 hover:opacity-80 transition-opacity"
              style={{ color: '#C39836', fontFamily: 'Kumbh Sans', letterSpacing: '0.65px', lineHeight: '19.5px' }}
              onClick={() => setIsMenuOpen(false)}
            >
              PAST WINNERS
            </Link>
            <Link
              to="/about-us"
              className="block text-sm font-bold tracking-widest uppercase leading-tight py-2 hover:opacity-80 transition-opacity"
              style={{ color: '#C39836', fontFamily: 'Kumbh Sans', letterSpacing: '0.65px', lineHeight: '19.5px' }}
              onClick={() => setIsMenuOpen(false)}
            >
              ABOUT US
            </Link>
          </nav>

          {/* Mobile Auth/User Menu */}
          <div className="flex flex-col space-y-2 pt-4 border-t border-gray-800">
            {user && isAuthenticated ? (
              <>
                <button
                  onClick={() => {
                    navigate('/profile');
                    setIsMenuOpen(false);
                  }}
                  className="flex items-center gap-3 px-4 py-2.5 bg-gray-900/50 hover:bg-gray-800/50 rounded-lg transition-colors text-left border border-gray-800"
                >
                  <User className="w-5 h-5 text-yellow-500" />
                  <span className="text-sm text-white font-medium">Profile</span>
                </button>

                <button
                  onClick={() => {
                    navigate('/spinning-history');
                    setIsMenuOpen(false);
                  }}
                  className="flex items-center gap-3 px-4 py-2.5 bg-gray-900/50 hover:bg-gray-800/50 rounded-lg transition-colors text-left border border-gray-800"
                >
                  <History className="w-5 h-5 text-yellow-500" />
                  <span className="text-sm text-white font-medium">Spinning History</span>
                </button>

                <button
                  onClick={() => {
                    navigate('/raffle-history');
                    setIsMenuOpen(false);
                  }}
                  className="flex items-center gap-3 px-4 py-2.5 bg-gray-900/50 hover:bg-gray-800/50 rounded-lg transition-colors text-left border border-gray-800"
                >
                  <Trophy className="w-5 h-5 text-yellow-500" />
                  <span className="text-sm text-white font-medium">Raffle History</span>
                </button>

                <button
                  onClick={() => {
                    navigate('/topup');
                    setIsMenuOpen(false);
                  }}
                  className="flex items-center gap-3 px-4 py-2.5 bg-gray-900/50 hover:bg-gray-800/50 rounded-lg transition-colors text-left border border-gray-800"
                >
                  <Wallet className="w-5 h-5 text-yellow-500" />
                  <span className="text-sm text-white font-medium">Top Up</span>
                </button>

                <button
                  onClick={handleLogout}
                  className="flex items-center gap-3 px-4 py-2.5 bg-red-500/10 hover:bg-red-500/20 rounded-lg transition-colors text-left border border-red-500/30"
                >
                  <LogOut className="w-5 h-5 text-red-500" />
                  <span className="text-sm text-red-400 font-medium">Sign Out</span>
                </button>
              </>
            ) : (
              <>
                <button
                  className="w-full text-sm font-medium rounded-full hover:bg-opacity-10 hover:bg-white transition-all relative"
                  style={{
                    background: 'linear-gradient(90deg, #C78800 0%, #F5D334 17.79%, #EDC933 27.88%, #D9AD30 45.29%, #D4A52F 49.38%, #F0CC33 70.61%, #F5D334 74.22%, #ECC92F 78.35%, #D5AC22 85.48%, #AE7F0D 94.71%, #966200 100%)',
                    padding: '2px',
                  }}
                >
                  <span
                    onClick={() => {
                      navigate('/sign-in');
                      setIsMenuOpen(false);
                    }}
                    className="block w-full h-full px-8 py-2.5 bg-gray-900 rounded-full text-yellow-500"
                  >
                    Sign In
                  </span>
                </button>
                <button
                  onClick={() => {
                    navigate('/sign-up');
                    setIsMenuOpen(false);
                  }}
                  className="w-full px-8 py-2.5 text-sm font-medium text-black rounded-full hover:opacity-90 transition-opacity"
                  style={{ background: 'linear-gradient(90deg, #C78800 0%, #F5D334 17.79%, #EDC933 27.88%, #D9AD30 45.29%, #D4A52F 49.38%, #F0CC33 70.61%, #F5D334 74.22%, #ECC92F 78.35%, #D5AC22 85.48%, #AE7F0D 94.71%, #966200 100%)' }}
                >
                  Sign Up
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

export default Navbar;