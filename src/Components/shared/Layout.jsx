import { Outlet } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import Hero from "../Hero/Hero";
import FacebookBanner from "../Facebookbanner/Facebookbanner";

function Layout() {
  return (
    <>
      <Navbar />
      <Hero />
      <FacebookBanner />
      <Outlet />
    </>
  );
}

export default Layout;