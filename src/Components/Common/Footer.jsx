// import logo from '../../../public/northStarLogo.png';

// function Footer() {
//   return (
//     <footer className="bg-black text-white pt-10 pb-4 px-4">
//       <div className="max-w-7xl mx-auto flex flex-col lg:flex-row justify-between items-start gap-8">
//         {/* Left: Logo and Newsletter */}
//         <div className="flex flex-col sm:flex-row items-start gap-8 flex-1">
//           <div className="flex flex-col items-start gap-3 min-w-[150px]">
//             <img
//               src={logo}
//               alt="Wolf Competitions Logo"
//               className="w-16 h-16 object-contain"
//             />
//             <span className="font-bold tracking-widest text-yellow-400 text-lg -mt-2">
//               WOLF COMPETITIONS
//             </span>
//             <div className="flex gap-2 mt-2">
//               <a
//                 href="mailto:contact@wolf.com"
//                 className="text-white font-bold text-sm hover:text-yellow-400 transition"
//               >
//                 CONTACT
//               </a>
//               <a
//                 href="https://instagram.com"
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="ml-2"
//               >
//                 <img
//                   src="https://cdn-icons-png.flaticon.com/512/2111/2111463.png"
//                   alt="Instagram"
//                   className="w-7 h-7 inline"
//                 />
//               </a>
//               <a
//                 href="https://facebook.com"
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="ml-2"
//               >
//                 <img
//                   src="https://cdn-icons-png.flaticon.com/512/733/733547.png"
//                   alt="Facebook"
//                   className="w-7 h-7 inline"
//                 />
//               </a>
//             </div>
//           </div>
//           <div className="flex flex-col gap-2 mt-2">
//             <span className="font-bold text-yellow-400 text-lg">
//               BE THE FIRST TO KNOW!
//             </span>
//             <span className="text-white font-semibold text-sm">
//               SIGN UP TO OUR NEWSLETTER FOR THE LATEST
//               <br />
//               COMPETITIONS AND WINNERS.
//             </span>
//           </div>
//         </div>
//         {/* Center: Navigation */}
//         <div className="flex flex-col gap-4 items-start flex-1 mt-6 lg:mt-0">
//           <a
//             href="/"
//             className="font-bold text-white hover:text-yellow-400 transition"
//           >
//             HOME
//           </a>
//           <a
//             href="/about-us"
//             className="font-bold text-white hover:text-yellow-400 transition"
//           >
//             ABOUT US
//           </a>
//         </div>
//         {/* Right: Newsletter Form */}
//         <form className="flex flex-col sm:flex-row gap-3 flex-1 w-full max-w-md mt-6 lg:mt-0">
//           <input
//             type="email"
//             placeholder="Your email address"
//             className="w-full px-4 py-2 rounded border border-gray-400 bg-black text-white placeholder-gray-400 focus:outline-none"
//           />
//           <button
//             type="submit"
//             className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-white font-bold px-8 py-2 rounded transition-all"
//           >
//             SUBMIT
//           </button>
//         </form>
//       </div>
//       {/* Bottom: Copyright and Links */}
//       <div className="max-w-7xl mx-auto mt-8 border-t border-gray-700 pt-4 flex flex-col md:flex-row justify-between items-center text-gray-300 text-sm gap-2">
//         <div className="flex items-center gap-2">
//           <span>Copyright ©</span>
//           <img
//             src="https://cdn-icons-png.flaticon.com/512/616/616408.png"
//             alt="Wolf Competitions Logo"
//             className="w-5 h-5 object-contain"
//           />
//           <span>
//             WOLF COMPETITIONS . {new Date().getFullYear()}. All rights reserved
//           </span>
//         </div>
//         <div className="flex gap-2 items-center mt-2 md:mt-0">
//           <a
//             href="/terms-and-conditions"
//             className="hover:underline text-white"
//           >
//             Terms & Conditions
//           </a>
//           <span className="text-yellow-400">•</span>
//           <a
//             href="/privacy-policy"
//             className="hover:underline text-white"
//           >
//             Privacy Policy
//           </a>
//         </div>
//       </div>
//     </footer>
//   );
// }

// export default Footer;


import logo from '../../../public/northStarLogo.png';

function Footer() {
  return (
    <footer className="bg-black text-white border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Column 1: Logo and Description */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <img
                src={logo}
                alt="North Star Competitions Logo"
                className="w-12 h-12 object-contain"
              />
              <span 
                className="font-bold text-lg tracking-wide bg-gradient-to-r from-yellow-600 via-yellow-400 to-yellow-700 bg-clip-text text-transparent"
              >
                NORTH STAR
              </span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-4">
              Your destination for exciting competitions and amazing prizes. Join thousands of winners today.
            </p>
            {/* Social Links */}
            <div className="flex gap-3">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-900 border border-gray-800 rounded-lg flex items-center justify-center hover:bg-yellow-500 hover:border-yellow-500 transition-all group"
                aria-label="Instagram"
              >
                <svg className="w-5 h-5 text-gray-400 group-hover:text-black transition-colors" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-900 border border-gray-800 rounded-lg flex items-center justify-center hover:bg-yellow-500 hover:border-yellow-500 transition-all group"
                aria-label="Facebook"
              >
                <svg className="w-5 h-5 text-gray-400 group-hover:text-black transition-colors" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-900 border border-gray-800 rounded-lg flex items-center justify-center hover:bg-yellow-500 hover:border-yellow-500 transition-all group"
                aria-label="Twitter"
              >
                <svg className="w-5 h-5 text-gray-400 group-hover:text-black transition-colors" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="text-white font-bold text-sm uppercase tracking-wider mb-4">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <a href="/" className="text-gray-400 hover:text-yellow-500 text-sm transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="/about-us" className="text-gray-400 hover:text-yellow-500 text-sm transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="/competitions" className="text-gray-400 hover:text-yellow-500 text-sm transition-colors">
                  Competitions
                </a>
              </li>
              <li>
                <a href="/winners" className="text-gray-400 hover:text-yellow-500 text-sm transition-colors">
                  Winners
                </a>
              </li>
              <li>
                <a href="/how-it-works" className="text-gray-400 hover:text-yellow-500 text-sm transition-colors">
                  How It Works
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Legal */}
          <div>
            <h3 className="text-white font-bold text-sm uppercase tracking-wider mb-4">Legal</h3>
            <ul className="space-y-3">
              <li>
                <a href="/terms-and-conditions" className="text-gray-400 hover:text-yellow-500 text-sm transition-colors">
                  Terms & Conditions
                </a>
              </li>
              <li>
                <a href="/privacy-policy" className="text-gray-400 hover:text-yellow-500 text-sm transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="/cookie-policy" className="text-gray-400 hover:text-yellow-500 text-sm transition-colors">
                  Cookie Policy
                </a>
              </li>
              <li>
                <a href="/responsible-gaming" className="text-gray-400 hover:text-yellow-500 text-sm transition-colors">
                  Responsible Gaming
                </a>
              </li>
              <li>
                <a href="/faq" className="text-gray-400 hover:text-yellow-500 text-sm transition-colors">
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Newsletter */}
          <div>
            <h3 className="text-white font-bold text-sm uppercase tracking-wider mb-4">Stay Updated</h3>
            <p className="text-gray-400 text-sm mb-4">
              Subscribe to our newsletter for the latest competitions and exclusive offers.
            </p>
            <form className="space-y-3" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="Your email address"
                className="w-full px-4 py-2.5 rounded-lg bg-gray-900 border border-gray-800 text-white text-sm placeholder-gray-500 focus:outline-none focus:border-yellow-500 transition-colors"
                required
              />
              <button
                type="submit"
                className="w-full px-4 py-2.5 rounded-lg font-semibold text-sm text-black bg-gradient-to-r from-yellow-600 via-yellow-400 to-yellow-700 transition-all hover:shadow-lg hover:shadow-yellow-500/20"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2 text-gray-400 text-sm">
              <span>© {new Date().getFullYear()} North Star Competitions. All rights reserved.</span>
            </div>
            
            <div className="flex items-center gap-4">
              <a href="/terms-and-conditions" className="text-gray-400 hover:text-yellow-500 text-sm transition-colors">
                Terms
              </a>
              <span className="text-gray-700">•</span>
              <a href="/privacy-policy" className="text-gray-400 hover:text-yellow-500 text-sm transition-colors">
                Privacy
              </a>
              <span className="text-gray-700">•</span>
              <a href="mailto:support@northstar.com" className="text-gray-400 hover:text-yellow-500 text-sm transition-colors">
                Contact
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;