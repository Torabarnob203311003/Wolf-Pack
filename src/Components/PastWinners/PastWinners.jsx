import React from 'react';
import { Link } from "react-router-dom";

function PastWinners() {
  return (
    <div className="max-w-3xl mx-auto p-8 bg-gray-900 text-white rounded-xl mt-8">
      <h2 className="text-2xl font-bold mb-4">Past Winners</h2>
      {/* Add your past winners content here */}
      <p>List of past winners will be shown here.</p>
      <Link to="/past-winners" className="...">Past Winners</Link>
    </div>
  );
}

export default PastWinners;