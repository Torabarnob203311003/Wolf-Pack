import React from 'react';
import { useParams, useNavigate } from "react-router-dom";

const cardImage = "https://images.pexels.com/photos/244206/pexels-photo-244206.jpeg";

function CardDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  // For demo, just show the ID and a back button
  return (
    <div className="max-w-2xl mx-auto p-8 bg-gray-900 text-white rounded-xl mt-8">
      <button
        className="mb-4 px-4 py-2 bg-yellow-500 text-black rounded"
        onClick={() => navigate(-1)}
      >
        Back
      </button>
      <h2 className="text-2xl font-bold mb-4">Card Details for Card #{id}</h2>
      <img src={cardImage} alt="Card" className="w-full rounded mb-4" />
      {/* Add more details as needed */}
      <p>More details about card #{id} go here.</p>
    </div>
  );
}

export default CardDetails;
