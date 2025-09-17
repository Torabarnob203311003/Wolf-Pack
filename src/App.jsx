import { BrowserRouter as Router, Routes, Route, Outlet } from "react-router-dom";
import Layout from "./Components/shared/Layout";
import CompetitionCards from "./Components/CompetitionCards/CompetitionCards";
import CardDetails from "./Components/CompetitionCards/CardDetails";
import PastWinners from "./Components/PastWinners/PastWinners";
import About from "./Components/Common/About";
import ScrollToTop from "./Components/ScrollToTop";

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
          <Route path="past-winners" element={
            
            
            <PastWinners /> } />
          
          <Route path="about" element={<About />} />
          
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
