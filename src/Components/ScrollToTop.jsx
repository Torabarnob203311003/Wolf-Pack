// src/ScrollToTop.js
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // This scrolls the window to the top (0, 0)
    // with a smooth animation whenever the pathname changes.
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'instant' // Change to 'smooth' for smooth scrolling,
    });
  }, [pathname]);

  return null; // This component doesn't render any visible UI.
};

export default ScrollToTop;