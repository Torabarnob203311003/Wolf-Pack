import React from "react";

function Footer() {
  return (
    <footer className="bg-black text-white pt-10 pb-4 px-4">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row justify-between items-start gap-8">
        {/* Left: Logo and Newsletter */}
        <div className="flex flex-col sm:flex-row items-start gap-8 flex-1">
          <div className="flex flex-col items-start gap-3 min-w-[150px]">
            <img
              src="https://cdn-icons-png.flaticon.com/512/616/616408.png"
              alt="Wolf Competitions Logo"
              className="w-16 h-16 object-contain"
            />
            <span className="font-bold tracking-widest text-yellow-400 text-lg -mt-2">
              WOLF
              <br />
              COMPETITIONS
            </span>
            <div className="flex gap-2 mt-2">
              <a
                href="mailto:contact@wolf.com"
                className="text-white font-bold text-sm hover:text-yellow-400 transition"
              >
                CONTACT
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="ml-2"
              >
                <img
                  src="https://cdn-icons-png.flaticon.com/512/2111/2111463.png"
                  alt="Instagram"
                  className="w-7 h-7 inline"
                />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="ml-2"
              >
                <img
                  src="https://cdn-icons-png.flaticon.com/512/733/733547.png"
                  alt="Facebook"
                  className="w-7 h-7 inline"
                />
              </a>
            </div>
          </div>
          <div className="flex flex-col gap-2 mt-2">
            <span className="font-bold text-yellow-400 text-lg">
              BE THE FIRST TO KNOW!
            </span>
            <span className="text-white font-semibold text-sm">
              SIGN UP TO OUR NEWSLETTER FOR THE LATEST
              <br />
              COMPETITIONS AND WINNERS.
            </span>
          </div>
        </div>
        {/* Center: Navigation */}
        <div className="flex flex-col gap-4 items-start flex-1 mt-6 lg:mt-0">
          <a
            href="/"
            className="font-bold text-white hover:text-yellow-400 transition"
          >
            HOME
          </a>
          <a
            href="/about-us"
            className="font-bold text-white hover:text-yellow-400 transition"
          >
            ABOUT US
          </a>
        </div>
        {/* Right: Newsletter Form */}
        <form className="flex flex-col sm:flex-row gap-3 flex-1 w-full max-w-md mt-6 lg:mt-0">
          <input
            type="email"
            placeholder="Your email address"
            className="w-full px-4 py-2 rounded border border-gray-400 bg-black text-white placeholder-gray-400 focus:outline-none"
          />
          <button
            type="submit"
            className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-white font-bold px-8 py-2 rounded transition-all"
          >
            SUBMIT
          </button>
        </form>
      </div>
      {/* Bottom: Copyright and Links */}
      <div className="max-w-7xl mx-auto mt-8 border-t border-gray-700 pt-4 flex flex-col md:flex-row justify-between items-center text-gray-300 text-sm gap-2">
        <div className="flex items-center gap-2">
          <span>Copyright ©</span>
          <img
            src="https://cdn-icons-png.flaticon.com/512/616/616408.png"
            alt="Wolf Competitions Logo"
            className="w-5 h-5 object-contain"
          />
          <span>
            WOLF COMPETITIONS . {new Date().getFullYear()}. All rights reserved
          </span>
        </div>
        <div className="flex gap-2 items-center mt-2 md:mt-0">
          <a
            href="/terms-and-conditions"
            className="hover:underline text-white"
          >
            Terms & Conditions
          </a>
          <span className="text-yellow-400">•</span>
          <a
            href="/privacy-policy"
            className="hover:underline text-white"
          >
            Privacy Policy
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;