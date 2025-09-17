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

function App() {
  return (
    <Router>
      <ScrollToTop/>
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
      </Routes>
    </Router>
  );
}

export default App;
