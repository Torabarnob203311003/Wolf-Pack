import  { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import axiosSecure from '../../lib/axiosSecure';
import { Wheel } from 'react-custom-roulette';
import { useAuth } from '../../context/AuthContext';
import toast from 'react-hot-toast';

const CARDS_PER_PAGE = 12;

function CompetitionCards() {
  const [activeFilter, setActiveFilter] = useState('prize');
  const [currentPage, setCurrentPage] = useState(1);
  const [allCards, setAllCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [segments, setSegments] = useState([]);
  const navigate = useNavigate();
  const { user, setUser, refetchUser } = useAuth();
  const [mustSpin, setMustSpin] = useState(false);
  const [prizeNumber, setPrizeNumber] = useState(0);

  const filterButtons = [
    { id: 'prize', label: 'PRIZE' },
    // { id: 'spin', label: 'SPIN' },
  ];

  const handleSpinClick = async () => {
    try {

      if(!user){
        toast.error('Please login to spin the wheel.');
        return;
      }

      if (user.credit < 1) {
        toast.error('You have no credits to spin the wheel.');
        return;
      }
    
      const res = await axiosSecure.post('/spinner/start-spin', {
        userId: user._id,
        userName: user.userName,
        email: user.email
      });
      
      const apiData = res.data;

      if (!apiData?.success || !apiData.data?.prize) {
        console.error('Invalid spin response:', apiData);
        return;
      }
      setUser(prev => ({
        ...prev,
        credit: (prev.credit || 0) - 1,
      }));
      const prize = apiData.data.prize;

      // Find index of returned prize label in wheel segments
      const index = segments.findIndex(
        (seg) => seg.option.toString() === prize.label.toString()
      );

      if (index === -1) {
        console.warn('Prize label not found in segments, defaulting to 0');
        setPrizeNumber(0);
      } else {
        setPrizeNumber(index + 1);
      }

      setMustSpin(true);
      await refetchUser();
    } catch (error) {
      console.error('❌ Spin error:', error);
    }
  };

  const fetchSpinner = async () => {
    try {
      const res = await axiosSecure.get('/spinner/get-spinner');

      if (res.data?.success && Array.isArray(res.data.data)) {
        const spinner = res.data.data[0].prizes;
        // console.log(spinner);
        
        // format spinner data for react-custom-roulette
        const formattedSegments = spinner?.map((value) => ({
          option: value.label || value.name || value.amount || String(value),
        })) || [];
        console.log("Formated segmant", formattedSegments);
        
        setSegments(formattedSegments);
      } else {
        console.warn('⚠️ No spinner data found');
      }
    } catch (error) {
      console.error('❌ Error fetching spinner:', error);
    }
  };

  const fetchRaffles = async () => {
    try {
      setLoading(true);
      const response = await axiosSecure('/raffles/get-all-raffle');
      const data = response.data;

      if (data.success && data.data) {
        const activeRaffle = data.data.filter((raffle)=> raffle.status === true);
        
        const transformedCards = activeRaffle.map((raffle) => ({
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
          type: raffle.type,
          status: raffle.status,
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

  useEffect(() => {
    fetchRaffles();
    fetchSpinner();
  }, []);

  // Filter cards based on active filter
  const getFilteredCards = () => {
    if (activeFilter === 'prize') {
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

          {/* Reviews */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-8 text-sm">
            <div className="flex items-center gap-2">
              <span className="text-gray-300">Reviews</span>
              <span className="text-white font-semibold">2,006</span>
            </div>
            
            <div className="flex items-center gap-2">
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <span key={star} className="text-green-400 text-lg leading-none">★</span>
                ))}
              </div>
              <span className="bg-green-500 text-white text-xs font-bold px-2 py-1 rounded leading-none">4.7</span>
            </div>
            
            <span className="text-white font-semibold">Trustpilot</span>
          </div>

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
            
            {/* ✅ Conditionally show SPIN button only if user is logged in */}
            {user && (
              <button
                onClick={() => setActiveFilter('spin')}
                className={`px-4 sm:px-6 py-2 text-xs sm:text-sm font-bold tracking-wider rounded-full border transition-all duration-200 ${activeFilter === 'spin'
                  ? 'text-white border-none shadow-md'
                  : 'text-yellow-400 border-yellow-400 hover:bg-yellow-900/10'
                  }`}
                style={activeFilter === 'spin' ? {
                  background: 'linear-gradient(90deg, #E28B27 0%, #F5D334 29.19%, #F6D63E 32.42%, #F5D334 67.48%, #ECC92F 72.69%, #D5AC22 81.69%, #AE7F0D 93.33%, #966200 100%)'
                } : { background: 'transparent' }}
              >
                SPIN
              </button>
            )}
          </div>

          {activeFilter === 'spin'  && <>
             <div className="flex flex-col items-center justify-center gap-8 min-h-screen text-white p-4" style={{backgroundColor: '#121212'}}>
              {/* Title */}
              <div className="relative z-10 text-center mb-4">
                <h1 className="text-5xl font-bold bg-gradient-to-r from-yellow-400 via-yellow-200 to-yellow-400 bg-clip-text text-transparent drop-shadow-lg">
                  Spin & Win
                </h1>
                <p className="text-gray-400 mt-2 text-lg">Try your luck and win amazing prizes!</p>
              </div>

              {/* Wheel Container with glow effect */}
              <div className="relative z-10">
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full blur-2xl opacity-20 animate-pulse"></div>
                
                <div className="relative p-8 rounded-full" style={{backgroundColor: 'rgba(18, 18, 18, 0.6)'}}>
                  <Wheel
                    mustStartSpinning={mustSpin}
                    prizeNumber={prizeNumber}
                    data={segments.length > 0 ? segments : [{ option: 'Loading...' }]}
                    outerBorderColor={['#FFD700']}
                    outerBorderWidth={8}
                    innerBorderColor={['#1a1a1d']}
                    innerBorderWidth={8}
                    radiusLineColor={['#333']}
                    radiusLineWidth={3}
                    backgroundColors={[
                      '#06B6D4',
                      '#8B5CF6',
                      '#00C4CC',
                      '#EF4444',
                      '#8B5CF6',
                      '#06B6D4',
                      '#FBBF24',
                      '#6A5ACD',
                    ]}
                    textColors={['#fff']}
                    fontSize={16}
                    onStopSpinning={() => setMustSpin(false)}
                    pointerProps={{style: {display: 'none'}}}
                  />

                  {/* Pointer with enhanced styling */}
                  <div className="absolute inset-0 flex items-start justify-center pointer-events-none">
                    <div className="relative mt-[-20px]">
                      <div className="absolute inset-0 w-0 h-0 border-l-[18px] border-l-transparent border-r-[18px] border-r-transparent border-t-[30px] border-t-yellow-400 blur-sm"></div>
                      <div className="relative w-0 h-0 border-l-[18px] border-l-transparent border-r-[18px] border-r-transparent border-t-[30px] border-t-yellow-400 drop-shadow-[0_0_10px_rgba(255,215,0,0.8)]"></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Spin Button with enhanced styling */}
              <button
                onClick={handleSpinClick}
                disabled={mustSpin}
                className="relative z-10 group px-12 py-4 rounded-full bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-400 text-black font-bold text-xl tracking-wider hover:scale-110 active:scale-95 transition-all duration-300 shadow-[0_0_30px_rgba(255,215,0,0.4)] hover:shadow-[0_0_40px_rgba(255,215,0,0.7)] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                <span className="relative z-10 flex items-center gap-3">
                  <svg className="w-6 h-6 group-hover:rotate-180 transition-transform duration-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
                  </svg>
                  {mustSpin ? 'SPINNING...' : 'SPIN NOW'}
                </span>
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-yellow-300 to-yellow-600 opacity-0 group-hover:opacity-100 blur transition-opacity duration-300"></div>
              </button>

              {/* Additional info text */}
              <p className="relative z-10 text-gray-500 text-sm animate-pulse">
                Click the button to spin the wheel
              </p>
            </div>
          </>}
          
          {activeFilter === 'prize'  && <>
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
          </>}
        </div>

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