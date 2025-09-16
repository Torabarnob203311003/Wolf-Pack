import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./Components/shared/Layout";
import CompetitionCards from "./Components/CompetitionCards/CompetitionCards";
import CardDetails from "./Components/CompetitionCards/CardDetails";
import PastWinners from "./Components/PastWinners/PastWinners"; // Create this component
// import FacebookBanner from "./Components/Facebookbanner/Facebookbanner";
// import Hero from "./Components/Hero/Hero";
// import Navbar from "./Components/Navbar/Navbar";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<CompetitionCards />} />
          <Route path="card/:id" element={<CardDetails />} />
          <Route path="past-winners" element={<PastWinners />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
