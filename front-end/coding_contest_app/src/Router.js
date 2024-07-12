import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ContestHistory from "./host/dashboard/Dashboard";
import Leaderboard from "./host/leaderboard/Leaderboard";

function ApplicationRouter() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ContestHistory />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        {/* <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} /> */}
      </Routes>
    </Router>
  );
}

export default ApplicationRouter;