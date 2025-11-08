import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import Hero from "../Hero/Hero";
import FacebookBanner from "../Facebookbanner/Facebookbanner";
import Footer from "../Common/Footer";
import About from "../Common/About";
import { Toaster } from "react-hot-toast";

function Layout() {
  const location = useLocation();
  const isCardDetails = location.pathname.startsWith("/card/");

  return (
    <>
      <Navbar />
      {!isCardDetails && (
        <>
          <Hero />
          <FacebookBanner />
        </>
      )}
      <Toaster/>
      <Outlet />
      <Footer />
     
    </>
  );
}

export default Layout;