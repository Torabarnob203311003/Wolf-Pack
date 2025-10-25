import { useState } from 'react'
import { Link, Router, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, isAuthenticated, logout } = useAuth()
  const navigate = useNavigate();
  

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
 
  return (
    <header className="px-4 md:px-6 py-3 md:py-4">
      <div className="container flex justify-between items-center mx-auto max-w-7xl">
        {/* Logo Section */}
        <div className="flex items-center">
          <div className="w-8 md:w-10 lg:w-12 h-8 md:h-10 lg:h-12 mr-2 md:mr-3 flex-shrink-0">
            <svg viewBox="0 0 100 100" className="w-full h-full">
              <path
                d="M50 10 C35 10 25 20 25 35 L25 45 C25 50 27 55 30 58 L35 65 C40 70 45 72 50 72 C55 72 60 70 65 65 L70 58 C73 55 75 50 75 45 L75 35 C75 20 65 10 50 10 Z M40 30 C42 28 45 30 45 33 C45 36 42 38 40 36 C38 34 38 32 40 30 Z M60 30 C62 32 62 34 60 36 C58 38 55 36 55 33 C55 30 58 28 60 30 Z M50 45 L45 50 L50 55 L55 50 Z"
                fill="#C39836"
              />
            </svg>
          </div>
          <div>
            <div className="text-white font-bold text-sm md:text-base lg:text-lg">WOLF</div>
            <div className="text-xs md:text-sm" style={{ color: '#C39836' }}>COMPETITIONS</div>
          </div>
        </div>

        {/* Navigation Links - Desktop Only */}
        <nav className="hidden lg:flex xl:flex-1 xl:justify-center">
          <ul className="flex space-x-6 xl:space-x-8">
            <li>
              <Link to="/"
                href="#"
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
                to="/"
                className="text-sm font-bold tracking-widest uppercase leading-tight hover:opacity-80 transition-opacity"
                style={{ color: '#C39836', fontFamily: 'Kumbh Sans', letterSpacing: '0.65px', lineHeight: '19.5px' }}
              >
                About US
              </Link>
            </li>
          </ul>
        </nav>

        {/* Auth Buttons - Hidden on Mobile */}
        <div className="hidden md:flex items-center space-x-2 lg:space-x-3">
          {user && isAuthenticated ? (<button
            className="px-4 lg:px-6 py-1.5 lg:py-2 text-xs lg:text-sm font-medium rounded-full hover:bg-opacity-10 hover:bg-white transition-all relative"
            style={{
              color: '#C39836',
              background: 'linear-gradient(90deg, #C78800 0%, #F5D334 17.79%, #EDC933 27.88%, #D9AD30 45.29%, #D4A52F 49.38%, #F0CC33 70.61%, #F5D334 74.22%, #ECC92F 78.35%, #D5AC22 85.48%, #AE7F0D 94.71%, #966200 100%)',
              padding: '2px',
            }}
          >
            <span
              onClick={logout}
              className="block w-full h-full px-4 lg:px-8 py-1.5 lg:py-2 bg-gray-900  rounded-full"
              style={{ color: 'linear-gradient(90deg, #C78800 0%, #F5D334 17.79%, #EDC933 27.88%, #D9AD30 45.29%, #D4A52F 49.38%, #F0CC33 70.61%, #F5D334 74.22%, #ECC92F 78.35%, #D5AC22 85.48%, #AE7F0D 94.71%, #966200 100%)' }}
            >
              Sign Out
            </span>
          </button>): (<>
            <button
            className="px-4 lg:px-6 py-1.5 lg:py-2 text-xs lg:text-sm font-medium rounded-full hover:bg-opacity-10 hover:bg-white transition-all relative"
            style={{
              color: '#C39836',
              background: 'linear-gradient(90deg, #C78800 0%, #F5D334 17.79%, #EDC933 27.88%, #D9AD30 45.29%, #D4A52F 49.38%, #F0CC33 70.61%, #F5D334 74.22%, #ECC92F 78.35%, #D5AC22 85.48%, #AE7F0D 94.71%, #966200 100%)',
              padding: '2px',
            }}
          >
            <span
              onClick={() => navigate('/sign-in')}
              className="block w-full h-full px-4 lg:px-8 py-1.5 lg:py-2 bg-gray-900  rounded-full"
              style={{ color: 'linear-gradient(90deg, #C78800 0%, #F5D334 17.79%, #EDC933 27.88%, #D9AD30 45.29%, #D4A52F 49.38%, #F0CC33 70.61%, #F5D334 74.22%, #ECC92F 78.35%, #D5AC22 85.48%, #AE7F0D 94.71%, #966200 100%)' }}
            >
              Sign In
            </span>
          </button>
          <button
            onClick={()=> navigate('/sign-up')}
            className="px-4 lg:px-8 py-1.5 lg:py-2 text-xs lg:text-sm font-medium text-white rounded-full hover:opacity-90 transition-opacity"
            style={{ background: 'linear-gradient(90deg, #C78800 0%, #F5D334 17.79%, #EDC933 27.88%, #D9AD30 45.29%, #D4A52F 49.38%, #F0CC33 70.61%, #F5D334 74.22%, #ECC92F 78.35%, #D5AC22 85.48%, #AE7F0D 94.71%, #966200 100%)' }}
          >
            Sign Up
          </button>
          </>)}
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
      <div className={`md:hidden overflow-hidden transition-all duration-300 ${isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="px-4 py-4 space-y-4 border-t border-gray-800 mt-3">
          {/* Mobile Navigation */}
          <nav className="space-y-3">
            <a
              href="#"
              className="block text-sm font-bold tracking-widest uppercase leading-tight py-2 hover:opacity-80 transition-opacity"
              style={{ color: '#C39836', fontFamily: 'Kumbh Sans', letterSpacing: '0.65px', lineHeight: '19.5px' }}
              onClick={() => setIsMenuOpen(false)}
            >
              OUR COMPETITIONS
            </a>
            <Link
              to="/past-winners"
              className="block text-sm font-bold tracking-widest uppercase leading-tight py-2 hover:opacity-80 transition-opacity"
              style={{ color: '#C39836', fontFamily: 'Kumbh Sans', letterSpacing: '0.65px', lineHeight: '19.5px' }}
              onClick={() => setIsMenuOpen(false)}
            >
              PAST WINNERS
            </Link>
            <a
              href="#"
              className="block text-sm font-bold tracking-widest uppercase leading-tight py-2 hover:opacity-80 transition-opacity"
              style={{ color: '#C39836', fontFamily: 'Kumbh Sans', letterSpacing: '0.65px', lineHeight: '19.5px' }}
              onClick={() => setIsMenuOpen(false)}
            >
              JACKPOTS
            </a>
          </nav>

          {/* Mobile Auth Buttons */}
          <div className="flex flex-col space-y-3 pt-4 border-t border-gray-800">
            {user && isAuthenticated ? (<>
            <button
              className="w-full text-sm font-medium rounded-full hover:bg-opacity-10 hover:bg-white transition-all relative"
              style={{
                background: 'linear-gradient(90deg, #C78800 0%, #F5D334 17.79%, #EDC933 27.88%, #D9AD30 45.29%, #D4A52F 49.38%, #F0CC33 70.61%, #F5D334 74.22%, #ECC92F 78.35%, #D5AC22 85.48%, #AE7F0D 94.71%, #966200 100%)',
                padding: '2px',
              }}
            >
              <span
               onClick={logout}
                className="block w-full h-full px-8 py-2.5 bg-gray-900 rounded-full"
                style={{ color: 'linear-gradient(90deg, #C78800 0%, #F5D334 17.79%, #EDC933 27.88%, #D9AD30 45.29%, #D4A52F 49.38%, #F0CC33 70.61%, #F5D334 74.22%, #ECC92F 78.35%, #D5AC22 85.48%, #AE7F0D 94.71%, #966200 100%)' }}
              >
                Sign Out
              </span>
            </button>
            </>):(<>
              <button
              className="w-full text-sm font-medium rounded-full hover:bg-opacity-10 hover:bg-white transition-all relative"
              style={{
                background: 'linear-gradient(90deg, #C78800 0%, #F5D334 17.79%, #EDC933 27.88%, #D9AD30 45.29%, #D4A52F 49.38%, #F0CC33 70.61%, #F5D334 74.22%, #ECC92F 78.35%, #D5AC22 85.48%, #AE7F0D 94.71%, #966200 100%)',
                padding: '2px',
              }}
            >
              <span
                onClick={()=> navigate('/sign-in')}
                className="block w-full h-full px-8 py-2.5 bg-gray-900 rounded-full"
                style={{ color: 'linear-gradient(90deg, #C78800 0%, #F5D334 17.79%, #EDC933 27.88%, #D9AD30 45.29%, #D4A52F 49.38%, #F0CC33 70.61%, #F5D334 74.22%, #ECC92F 78.35%, #D5AC22 85.48%, #AE7F0D 94.71%, #966200 100%)' }}
              >
                Sign in
              </span>
            </button>
            <button
              onClick={()=> navigate('/sign-up')}
              className="w-full px-8 py-2.5 text-sm font-medium text-white rounded-full hover:opacity-90 transition-opacity"
              style={{ background: 'linear-gradient(90deg, #C78800 0%, #F5D334 17.79%, #EDC933 27.88%, #D9AD30 45.29%, #D4A52F 49.38%, #F0CC33 70.61%, #F5D334 74.22%, #ECC92F 78.35%, #D5AC22 85.48%, #AE7F0D 94.71%, #966200 100%)' }}
            >
              Sign Up
            </button>
            </>)}
            
            
          </div>
        </div>
      </div>
    </header>
  )
}

export default Navbar