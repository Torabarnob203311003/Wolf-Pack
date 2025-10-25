import  { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import axiosSecure from '../../lib/axiosSecure';
import { Wheel } from 'react-custom-roulette';

const CARDS_PER_PAGE = 12;

function CompetitionCards() {
  const [activeFilter, setActiveFilter] = useState('ALL');
  const [currentPage, setCurrentPage] = useState(1);
  const [allCards, setAllCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const [mustSpin, setMustSpin] = useState(false);
  const [prizeNumber, setPrizeNumber] = useState(0);

  const filterButtons = [
    { id: 'ALL', label: 'ALL' },
    { id: 'spin', label: 'SPIN' },
    { id: 'prize', label: 'PRIZE' },
  ];

  const segments = [
  { option: '$0' },
  { option: '$1' },
  { option: '$2' },
  { option: '$5' },
  { option: '$25' },
  { option: '$50' },
  { option: '👑 JACKPOT' },
  { option: '🔴 ZERO' },
];


const handleSpinClick = (customIndex) => {
  let newPrizeNumber;

  // Option 1 — fully manual control:
  if (typeof customIndex === "number") {
    newPrizeNumber = customIndex; // You decide which segment to stop at
  } 
  // Option 2 — random fallback:
  else {
    newPrizeNumber = Math.floor(Math.random() * segments.length);
  }

  setPrizeNumber(newPrizeNumber);
  setMustSpin(true);
};


  useEffect(() => {
    const fetchRaffles = async () => {
      try {
        setLoading(true);
        const response = await axiosSecure('/raffles/get-all-raffle');
        const data = response.data;

        if (data.success && data.data) {
          const transformedCards = data.data.map((raffle) => ({
            id: raffle._id,
            title: raffle.title,
            price: `£${raffle.price} per entry`,
            progress: Math.floor((raffle.ticketSold / raffle.totalTicket) * 100),
            progressText: `${raffle.ticketSold}/${raffle.totalTicket}`,
            image: raffle.thumbnail,
            details: raffle.details,
            totalTicket: raffle.totalTicket,
            ticketSold: raffle.ticketSold,
            perUserTicketLimit: raffle.perUserTicketLimit,
            type: raffle.type, // 'spin' or 'prize'
          }));
          setAllCards(transformedCards);
        }
      } catch (err) {
        console.error('Error fetching raffles:', err);
        setError('Failed to load raffles');
      } finally {
        setLoading(false);
      }
    };

    fetchRaffles();
  }, []);

  // Filter cards based on active filter
  const getFilteredCards = () => {
    if (activeFilter === 'ALL') {
      return allCards;
    }
    return allCards.filter(card => card.type === activeFilter);
  };

  const filteredCards = getFilteredCards();

  // Reset to page 1 when filter changes
  useEffect(() => {
    setCurrentPage(1);
  }, [activeFilter]);

  // Pagination logic
  const totalPages = Math.ceil(filteredCards.length / CARDS_PER_PAGE);
  const startIdx = (currentPage - 1) * CARDS_PER_PAGE;
  const endIdx = startIdx + CARDS_PER_PAGE;
  const cardsToShow = filteredCards.slice(startIdx, endIdx);

  if (loading) {
    return (
      <div className="py-12 px-4 text-center">
        <p className="text-white text-lg">Loading raffles...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-12 px-4 text-center">
        <p className="text-red-500 text-lg">{error}</p>
      </div>
    );
  }

  //  const handleSpinClick = () => {
  //   const newPrizeNumber = Math.floor(Math.random() * segments.length);
  //   setPrizeNumber(newPrizeNumber);
  //   setMustSpin(true);
  // };

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
                className={`px-4 sm:px-6 py-2 text-xs sm:text-sm font-bold tracking-wider rounded-full border transition-all duration-200 ${activeFilter === button.id
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
              {[1, 2, 3, 4, 5].map((star) => (
                <span key={star} className="text-green-400 text-lg">★</span>
              ))}
            </div>
            <span className="bg-green-500 text-white text-xs font-bold px-2 py-0.5 rounded ml-2">4.7</span>
            <span className="text-white font-semibold">Trustpilot</span>
          </div>
        </div>

        {/* Active Filter Indicator */}
        <div className="text-center mb-6">
          <p className="text-yellow-400 text-sm">
            {/* Showing {filteredCards.length} {activeFilter === 'ALL' ? 'competitions' : activeFilter.toUpperCase() + ' competitions'} */}
          </p>
        </div>

        {/* Competition Cards Grid */}
        {cardsToShow.length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-6  min-h-screen text-white">
          <div className="relative">
            <Wheel
              mustStartSpinning={mustSpin}
              prizeNumber={prizeNumber}
              data={segments}
              outerBorderColor={['#FFD700']} // gold border
              outerBorderWidth={6}
              innerBorderColor={['#1a1a1d']} // dark inner ring
              innerBorderWidth={6}
              radiusLineColor={['#222']}
              radiusLineWidth={2}
              backgroundColors={[
                '#00C4CC', // teal
                '#F9A602', // gold/orange
                '#F94144', // red
                '#6A5ACD', // blue/purple
              ]}
              textColors={['#fff']}
              fontSize={16}
              onStopSpinning={() => setMustSpin(false)}
              pointerProps={{style: {display: 'none'}}}
            />

            <div className="absolute inset-0 flex items-start justify-center">
              <div className="mt-[-15px] w-0 h-0 border-l-[15px] border-l-transparent border-r-[15px] border-r-transparent border-t-[25px] border-t-[#FFD700] drop-shadow-[0_0_5px_#FFD700]" />
            </div>
          </div>

      {/* <div className="w-[80%] max-w-sm bg-[#141417] rounded-full h-4 overflow-hidden">
        <div
          className="bg-gradient-to-r from-[#FFD700] to-[#ffb400] h-full text-xs text-black text-right pr-2"
          style={{ width: `${(6870 / 9999) * 100}%` }}
        >
          6870/9999
        </div>
      </div> */}

      {/* <p className="font-semibold tracking-wider text-[#FFD700] text-sm">
        WOLF 50/50 – 10K EDITION 50%
      </p> */}



      <button
        onClick={handleSpinClick}
        className="px-8 py-3 rounded-md bg-gradient-to-b from-[#FFD700] to-[#b8860b] text-black font-bold tracking-wide hover:scale-105 transition-transform duration-200 shadow-[0_0_20px_rgba(255,215,0,0.4)]"
      >
        SPIN NOW
      </button>
      
      <button onClick={() => handleSpinClick(7)}>Spin Jackpot</button> 
      <button onClick={() => handleSpinClick(3)}>Spin $2</button>    

    </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8 px-2 sm:px-0">
            {cardsToShow.map((card) => (
              <div
                key={card.id}
                className="rounded-xl overflow-hidden shadow-lg border border-yellow-500 flex flex-col w-full max-w-full mx-auto cursor-pointer hover:scale-105 transition-transform duration-300"
                onClick={() => navigate(`/card/${card.id}`)}
              >
                {/* Card Image Section with Type Badge */}
                <div className="relative w-full h-48">
                  <img
                    src={card.image}
                    alt={card.title}
                    className="w-full h-full object-cover rounded-t-xl"
                  />
                  {/* Badge for card type */}
                  <div 
                    className="absolute top-2 right-2 px-3 py-1 rounded-full text-xs font-bold uppercase"
                    style={{
                      background: card.type === 'spin' 
                        ? 'linear-gradient(90deg, #9333EA 0%, #C084FC 100%)'
                        : 'linear-gradient(90deg, #059669 0%, #10B981 100%)',
                      color: '#fff'
                    }}
                  >
                    {card.type === 'spin' ? '🎰 SPIN' : '🎁 PRIZE'}
                  </div>
                </div>

                {/* Card Content Section */}
                <div className="p-4 text-white flex flex-col flex-1">
                  {/* Progress Bar with Text */}
                  <div className="relative w-full bg-slate-300 h-7 rounded-full mb-4">
                    <div
                      className="absolute inset-0 rounded-full transition-all duration-500 ease-in-out"
                      style={{
                        width: `${(card.ticketSold / card.totalTicket) * 100}%`,
                        background: 'linear-gradient(90deg, #FFFFFF 0%, #E28B27 100%)'
                      }}
                    ></div>
                    <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-sm font-bold text-black">
                      {`${card.ticketSold}/${card.totalTicket}`}
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
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/card/${card.id}`);
                    }}
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
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-2 mt-12 flex-wrap">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className={`px-3 py-1 rounded-full font-bold ${currentPage === 1
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
                className={`px-3 py-1 rounded-full font-bold ${currentPage === idx + 1
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
              className={`px-3 py-1 rounded-full font-bold ${currentPage === totalPages
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