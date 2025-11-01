import { BrowserRouter as Router, Routes, Route, Outlet } from "react-router-dom";
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

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={
            <>
              <CompetitionCards />
              <About />
            </>
          } />
          <Route path="card/:id" element={
            <>
              <CardDetails />
            </>
          } />
        </Route>

        <Route path="/past-winners" element={
          <>
            <Navbar />
            <PastWinners />
            <FacebookBanner />
            <About />
            <Footer />
          </>
        } />

        <Route path="/spinning-history" element={
         <>
          <Navbar/>  
          <SpinningHistoryPage/>
          <Footer/>
         </>
        } />

        <Route path="/raffle-history" element={
         <>
          <Navbar/>  
          <RaffleHistory/>
          <Footer/>
         </>
        } />

         <Route path="/topup" element={
         <>
          <Navbar/>  
          <TopUpPage/>
          <Footer/>
         </>
        } />


        <Route path="/sign-in" element={<SignIn/>} />
        <Route path="/sign-up" element={<SignUp/>} />
      </Routes>
    </Router>
  );
}

export default App;
