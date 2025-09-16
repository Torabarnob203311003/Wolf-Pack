import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";

// Replace with your actual image or use a placeholder
const cardImage = "https://images.pexels.com/photos/244206/pexels-photo-244206.jpeg";

// 44 demo cards (18 + 26)
const demoCards = Array.from({ length: 44 }).map((_, i) => ({
  id: i + 1,
  title: `F1 WHEEL SPIN TO SURVIVE WIN UP2 40K INSTANTLY #${i + 1}`,
  price: '£2.50 per entry',
  progress: Math.floor(Math.random() * 100),
  progressText: `${Math.floor(Math.random() * 9000) + 1000}/9999`,
  image: cardImage,
}));

const CARDS_PER_PAGE = 12;

function CompetitionCards() {
  const [activeFilter, setActiveFilter] = useState('ALL');
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();

  const filterButtons = [
    { id: 'ALL', label: 'ALL' },
    { id: 'SPIN', label: 'SPIN' },
    { id: 'PRIZE', label: 'PRIZE' },
    { id: 'SCRATCH_CARDS', label: 'SCRATCH CARDS' }
  ];

  // Pagination logic
  const totalPages = Math.ceil(demoCards.length / CARDS_PER_PAGE);
  const startIdx = (currentPage - 1) * CARDS_PER_PAGE;
  const endIdx = startIdx + CARDS_PER_PAGE;
  const cardsToShow = demoCards.slice(startIdx, endIdx);

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-8 tracking-wide"
            style={{
              background: 'linear-gradient(90deg, #E28B27 0%, #F5D334 29.19%, #F6D63E 32.42%, #F5D334 67.48%, #ECC92F 72.69%, #D5AC22 81.69%, #AE7F0D 93.33%, #966200 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              color: 'transparent',
            }}
          >
            COMPETITIONS
          </h2>
          {/* Filter Buttons */}
          <div className="flex flex-wrap justify-center gap-2 sm:gap-4 mb-6">
            {filterButtons.map((button) => (
              <button
                key={button.id}
                onClick={() => setActiveFilter(button.id)}
                className={`px-4 sm:px-6 py-2 text-xs sm:text-sm font-bold tracking-wider rounded-full border transition-all duration-200 ${
                  activeFilter === button.id
                    ? 'text-white border-none shadow-md'
                    : 'text-yellow-400 border-yellow-400 hover:bg-yellow-900/10'
                }`}
                style={activeFilter === button.id ? {
                  background: 'linear-gradient(90deg, #E28B27 0%, #F5D334 29.19%, #F6D63E 32.42%, #F5D334 67.48%, #ECC92F 72.69%, #D5AC22 81.69%, #AE7F0D 93.33%, #966200 100%)'
                } : { background: 'transparent' }}
              >
                {button.label}
              </button>
            ))}
          </div>
          {/* Reviews */}
          <div className="flex items-center justify-center gap-2 text-sm mb-8">
            <span className="text-gray-300">Reviews</span>
            <span className="text-white font-semibold">2,006</span>
            <div className="flex gap-0.5">
              {[1,2,3,4,5].map((star) => (
                <span key={star} className="text-green-400 text-lg">★</span>
              ))}
            </div>
            <span className="bg-green-500 text-white text-xs font-bold px-2 py-0.5 rounded ml-2">4.7</span>
            <span className="text-white font-semibold">Trustpilot</span>
          </div>
        </div>

        {/* Competition Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8 px-2 sm:px-0">
          {cardsToShow.map((card) => (
            <div
              key={card.id}
              className="rounded-xl overflow-hidden shadow-lg border border-yellow-500 flex flex-col w-full max-w-full mx-auto cursor-pointer"
              onClick={() => navigate(`/card/${card.id}`)}
            >
              {/* Card Image Section */}
              <div className="relative w-full h-48">
                <img 
                  src={card.image} 
                  alt={card.title} 
                  className="w-full h-full object-cover rounded-t-xl" 
                />
              </div>
              {/* Card Content Section */}
              <div className="p-4 text-white flex flex-col flex-1">
                {/* Progress Bar with Text */}
                <div className="relative w-full bg-slate-300 h-7 rounded-full mb-4">
                  <div 
                    className="absolute inset-0 rounded-full transition-all duration-500 ease-in-out"
                    style={{
                      width: `${card.progress}%`,
                      background: 'linear-gradient(90deg, #FFFFFF 0%, #E28B27 100%)'
                    }}
                  ></div>
                  <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-sm font-bold text-black">
                    {card.progressText}
                  </span>
                </div>
                {/* Title and Price */}
                <div className="text-center space-y-2 flex-1">
                  <h3
                    className="text-lg sm:text-xl font-bold leading-tight tracking-wide"
                    style={{ color: '#FDED43' }}
                  >
                    {card.title}
                  </h3>
                  <p className="text-sm" style={{ color: '#fff' }}>
                    {card.price}
                  </p>
                </div>
                {/* Button */}
                <button
                  className="w-full py-3 mt-4 text-lg font-bold rounded-lg shadow-lg hover:opacity-90 transition-all duration-300"
                  style={{
                    background:
                      'linear-gradient(90deg, #E28B27 0%, #F5D334 29.19%, #F6D63E 32.42%, #F5D334 67.48%, #ECC92F 72.69%, #D5AC22 81.69%, #AE7F0D 93.33%, #966200 100%)',
                    color: '#fff',
                  }}
                >
                  ENTRY NOW
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-2 mt-12 flex-wrap">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className={`px-3 py-1 rounded-full font-bold ${
                currentPage === 1
                  ? 'bg-gray-700 text-gray-400 cursor-not-allowed'
                  : 'bg-yellow-500 text-black hover:bg-yellow-600'
              }`}
            >
              Prev
            </button>
            {[...Array(totalPages)].map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentPage(idx + 1)}
                className={`px-3 py-1 rounded-full font-bold ${
                  currentPage === idx + 1
                    ? 'bg-gradient-to-r from-yellow-500 to-orange-600 text-black'
                    : 'bg-gray-800 text-yellow-400 hover:bg-yellow-900/10'
                }`}
              >
                {idx + 1}
              </button>
            ))}
            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className={`px-3 py-1 rounded-full font-bold ${
                currentPage === totalPages
                  ? 'bg-gray-700 text-gray-400 cursor-not-allowed'
                  : 'bg-yellow-500 text-black hover:bg-yellow-600'
              }`}
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default CompetitionCards;