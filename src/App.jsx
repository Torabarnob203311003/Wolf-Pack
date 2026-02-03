import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./Components/shared/Layout";
import CompetitionCards from "./Components/CompetitionCards/CompetitionCards";
import CardDetails from "./Components/CompetitionCards/CardDetails";
import PastWinners from "./Components/PastWinners/PastWinners";
import About from "./Components/Common/About";
import ScrollToTop from "./Components/ScrollToTop";
import Navbar from "./Components/Navbar/Navbar";
import FacebookBanner from "./Components/Facebookbanner/Facebookbanner";
import Footer from "./Components/Common/Footer";
import SignIn from "./Pages/SignIn/SignIn";
import SignUp from "./Pages/SignUp/SignUp";
import SpinningHistoryPage from "./Pages/SpinningHistory/SpinningHistory";
import RaffleHistory from "./Pages/RaffleHistory/RaffleHistory";
import TopUpPage from "./Pages/TopUpPage/TopUpPage";
import PrivateRoute from "./PrivateRouter/PrivateRoute";
import RewardsSwapPage from "./Pages/RewardsSwap/RewardsSwapPage";
import Profile from "./Pages/Profile/Profile";
import AboutUs from "./Pages/AboutUs/AboutUs";
import Terms from "./Pages/Terms/Terms";
import Privacy from "./Pages/Privacy/Privacy";
import CookiePolicy from "./Pages/Cookie/Cookie";
import ForgetPassword from "./Pages/ForgetPassword/ForgetPassword";
import VerifyOTP from "./Pages/VerifyOTP/VerifyOTP";
import ResetPassword from "./Pages/ResetPassword/ResetPassword";
import Success from "./Pages/Success/Success";
import SponsorPage from "./Pages/Sponsor/Sponsor";

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Layout />}>
          <Route
            index
            element={
              <>
                <CompetitionCards />
                <About />
              </>
            }
          />
          <Route
            path="card/:id"
            element={
              <>
                <CardDetails />
              </>
            }
          />
        </Route>

        <Route
          path="/past-winners"
          element={
            <>
              <Navbar />
              <PastWinners />
              <FacebookBanner />
              <About />
              <Footer />
            </>
          }
        />

        <Route
          path="/sponsor"
          element={
            <>
              <Navbar />
              <SponsorPage/>
              <Footer />
            </>
          }
        />

        <Route 
          path="/about-us" 
          element={
            <>
              <Navbar/>
              <AboutUs/>
              <Footer/>
            </>
          }  
        />

        <Route 
          path="/terms-and-conditions" 
          element={
            <>
              <Navbar/>
              <Terms />
              <Footer/>
            </>
          }  
        />

        <Route 
          path="/privacy-policy" 
          element={
            <>
              <Navbar/>
              <Privacy />
              <Footer/>
            </>
          }  
        />

        <Route 
          path="/cookie-policy" 
          element={
            <>
              <Navbar/>
              <CookiePolicy />
              <Footer/>
            </>
          }  
        />

        {/* Protected Routes */}
        <Route element={<PrivateRoute />}>
          <Route path='/profile' element={
            <>
              <Navbar />
              <Profile />
              <Footer />
            </>
          }
          />
          <Route
            path="/spinning-history"
            element={
              <>
                <Navbar />
                <SpinningHistoryPage />
                <Footer />
              </>
            }
          />

          <Route
            path="/swap-reward"
            element={
              <>
                <Navbar />
                <RewardsSwapPage />
                <Footer />
              </>
            }
          />

          <Route
            path="/raffle-history"
            element={
              <>
                <Navbar />
                <RaffleHistory />
                <Footer />
              </>
            }
          />

          <Route
            path="/topup"
            element={
              <>
                <Navbar />
                <TopUpPage />
                <Footer />
              </>
            }
          />
          <Route
            path="/success"
            element={
              <>
                <Navbar />
                <Success />
                <Footer />
              </>
            }
          />

        </Route>
          
  
        {/* ✅ Auth Routes */}
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/forgot-password" element={<ForgetPassword/>}/>
        <Route path="/verify-otp" element={<VerifyOTP/>} />
        <Route path="/reset-password" element={<ResetPassword/>} />
      </Routes>
    </Router>
  );
}

export default App;
