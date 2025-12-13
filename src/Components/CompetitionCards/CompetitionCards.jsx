// import  { useEffect, useState } from 'react';
// import { useNavigate } from "react-router-dom";
// import axiosSecure from '../../lib/axiosSecure';
// import { Wheel } from 'react-custom-roulette';
// import { useAuth } from '../../context/AuthContext';
// import toast from 'react-hot-toast';

// const CARDS_PER_PAGE = 12;

// function CompetitionCards() {
//   const [activeFilter, setActiveFilter] = useState('prize');
//   const [currentPage, setCurrentPage] = useState(1);
//   const [allCards, setAllCards] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [segments, setSegments] = useState([]);
//   const navigate = useNavigate();
//   const { user, setUser, refetchUser } = useAuth();
//   const [mustSpin, setMustSpin] = useState(false);
//   const [prizeNumber, setPrizeNumber] = useState(0);

//   const filterButtons = [
//     { id: 'prize', label: 'PRIZE' },
//     // { id: 'spin', label: 'SPIN' },
//   ];

//   const handleSpinClick = async () => {
//     try {

//       if(!user){
//         toast.error('Please login to spin the wheel.');
//         return;
//       }

//       if (user.credit < 1) {
//         toast.error('You have no credits to spin the wheel.');
//         return;
//       }
    
//       const res = await axiosSecure.post('/spinner/start-spin', {
//         userId: user._id,
//         userName: user.userName,
//         email: user.email
//       });
      
//       const apiData = res.data;

//       if (!apiData?.success || !apiData.data?.prize) {
//         console.error('Invalid spin response:', apiData);
//         return;
//       }
//       setUser(prev => ({
//         ...prev,
//         credit: (prev.credit || 0) - 1,
//       }));
//       const prize = apiData.data.prize;

//       // Find index of returned prize label in wheel segments
//       const index = segments.findIndex(
//         (seg) => seg.option.toString() === prize.label.toString()
//       );

//       if (index === -1) {
//         console.warn('Prize label not found in segments, defaulting to 0');
//         setPrizeNumber(0);
//       } else {
//         setPrizeNumber(index + 1);
//       }

//       setMustSpin(true);
//       await refetchUser();
//     } catch (error) {
//       console.error('❌ Spin error:', error);
//     }
//   };

//   const fetchSpinner = async () => {
//     try {
//       const res = await axiosSecure.get('/spinner/get-spinner');

//       if (res.data?.success && Array.isArray(res.data.data)) {
//         const spinner = res.data.data[0].prizes;
//         // console.log(spinner);
        
//         // format spinner data for react-custom-roulette
//         const formattedSegments = spinner?.map((value) => ({
//           option: value.label || value.name || value.amount || String(value),
//         })) || [];
//         console.log("Formated segmant", formattedSegments);
        
//         setSegments(formattedSegments);
//       } else {
//         console.warn('⚠️ No spinner data found');
//       }
//     } catch (error) {
//       console.error('❌ Error fetching spinner:', error);
//     }
//   };

//   const fetchRaffles = async () => {
//     try {
//       setLoading(true);
//       const response = await axiosSecure('/raffles/get-all-raffle');
//       const data = response.data;

//       if (data.success && data.data) {
//         const activeRaffle = data.data.filter((raffle)=> raffle.status === true);
        
//         const transformedCards = activeRaffle.map((raffle) => ({
//           id: raffle._id,
//           title: raffle.title,
//           price: `£${raffle.price} per entry`,
//           progress: Math.floor((raffle.ticketSold / raffle.totalTicket) * 100),
//           progressText: `${raffle.ticketSold}/${raffle.totalTicket}`,
//           image: raffle.thumbnail,
//           details: raffle.details,
//           totalTicket: raffle.totalTicket,
//           ticketSold: raffle.ticketSold,
//           perUserTicketLimit: raffle.perUserTicketLimit,
//           type: raffle.type,
//           status: raffle.status,
//         }));
        
//         setAllCards(transformedCards);
//       }
//     } catch (err) {
//       console.error('Error fetching raffles:', err);
//       setError('Failed to load raffles');
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchRaffles();
//     fetchSpinner();
//   }, []);

//   // Filter cards based on active filter
//   const getFilteredCards = () => {
//     if (activeFilter === 'prize') {
//       return allCards;
//     }
//     return allCards.filter(card => card.type === activeFilter);
//   };

//   const filteredCards = getFilteredCards();

//   // Reset to page 1 when filter changes
//   useEffect(() => {
//     setCurrentPage(1);
//   }, [activeFilter]);

//   // Pagination logic
//   const totalPages = Math.ceil(filteredCards.length / CARDS_PER_PAGE);
//   const startIdx = (currentPage - 1) * CARDS_PER_PAGE;
//   const endIdx = startIdx + CARDS_PER_PAGE;
//   const cardsToShow = filteredCards.slice(startIdx, endIdx);
  
//   if (loading) {
//     return (
//       <div className="py-12 px-4 text-center">
//         <p className="text-white text-lg">Loading raffles...</p>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="py-12 px-4 text-center">
//         <p className="text-red-500 text-lg">{error}</p>
//       </div>
//     );
//   }

//   return (
//     <div className="py-12 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-7xl mx-auto">
//         {/* Header */}
//         <div className="text-center mb-8">
//           <h2
//             className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-8 tracking-wide"
//             style={{
//               background: 'linear-gradient(90deg, #E28B27 0%, #F5D334 29.19%, #F6D63E 32.42%, #F5D334 67.48%, #ECC92F 72.69%, #D5AC22 81.69%, #AE7F0D 93.33%, #966200 100%)',
//               WebkitBackgroundClip: 'text',
//               WebkitTextFillColor: 'transparent',
//               backgroundClip: 'text',
//               color: 'transparent',
//             }}
//           >
//             COMPETITIONS
//           </h2>

//           {/* Reviews */}
//           <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-8 text-sm">
//             <div className="flex items-center gap-2">
//               <span className="text-gray-300">Reviews</span>
//               <span className="text-white font-semibold">2,006</span>
//             </div>
            
//             <div className="flex items-center gap-2">
//               <div className="flex gap-1">
//                 {[1, 2, 3, 4, 5].map((star) => (
//                   <span key={star} className="text-green-400 text-lg leading-none">★</span>
//                 ))}
//               </div>
//               <span className="bg-green-500 text-white text-xs font-bold px-2 py-1 rounded leading-none">4.7</span>
//             </div>
            
//             <span className="text-white font-semibold">Trustpilot</span>
//           </div>

//           {/* Filter Buttons */}
//           <div className="flex flex-wrap justify-center gap-2 sm:gap-4 mb-6">
//             {filterButtons.map((button) => (
//               <button
//                 key={button.id}
//                 onClick={() => setActiveFilter(button.id)}
//                 className={`px-4 sm:px-6 py-2 text-xs sm:text-sm font-bold tracking-wider rounded-full border transition-all duration-200 ${activeFilter === button.id
//                   ? 'text-white border-none shadow-md'
//                   : 'text-yellow-400 border-yellow-400 hover:bg-yellow-900/10'
//                   }`}
//                 style={activeFilter === button.id ? {
//                   background: 'linear-gradient(90deg, #E28B27 0%, #F5D334 29.19%, #F6D63E 32.42%, #F5D334 67.48%, #ECC92F 72.69%, #D5AC22 81.69%, #AE7F0D 93.33%, #966200 100%)'
//                 } : { background: 'transparent' }}
//               >
//                 {button.label}
//               </button>
//             ))}
            
//             {/* ✅ Conditionally show SPIN button only if user is logged in */}
//             {user && (
//               <button
//                 onClick={() => setActiveFilter('spin')}
//                 className={`px-4 sm:px-6 py-2 text-xs sm:text-sm font-bold tracking-wider rounded-full border transition-all duration-200 ${activeFilter === 'spin'
//                   ? 'text-white border-none shadow-md'
//                   : 'text-yellow-400 border-yellow-400 hover:bg-yellow-900/10'
//                   }`}
//                 style={activeFilter === 'spin' ? {
//                   background: 'linear-gradient(90deg, #E28B27 0%, #F5D334 29.19%, #F6D63E 32.42%, #F5D334 67.48%, #ECC92F 72.69%, #D5AC22 81.69%, #AE7F0D 93.33%, #966200 100%)'
//                 } : { background: 'transparent' }}
//               >
//                 SPIN
//               </button>
//             )}
//           </div>

//           {activeFilter === 'spin'  && <>
//              <div className="flex flex-col items-center justify-center gap-8 min-h-screen text-white p-4" style={{backgroundColor: '#121212'}}>
//               {/* Title */}
//               <div className="relative z-10 text-center mb-4">
//                 <h1 className="text-5xl font-bold bg-gradient-to-r from-yellow-400 via-yellow-200 to-yellow-400 bg-clip-text text-transparent drop-shadow-lg">
//                   Spin & Win
//                 </h1>
//                 <p className="text-gray-400 mt-2 text-lg">Try your luck and win amazing prizes!</p>
//               </div>

//               {/* Wheel Container with glow effect */}
//               <div className="relative z-10">
//                 <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full blur-2xl opacity-20 animate-pulse"></div>
                
//                 <div className="relative p-8 rounded-full" style={{backgroundColor: 'rgba(18, 18, 18, 0.6)'}}>
//                   <Wheel
//                     mustStartSpinning={mustSpin}
//                     prizeNumber={prizeNumber}
//                     data={segments.length > 0 ? segments : [{ option: 'Loading...' }]}
//                     outerBorderColor={['#FFD700']}
//                     outerBorderWidth={8}
//                     innerBorderColor={['#1a1a1d']}
//                     innerBorderWidth={8}
//                     radiusLineColor={['#333']}
//                     radiusLineWidth={3}
//                     backgroundColors={[
//                       '#06B6D4',
//                       '#8B5CF6',
//                       '#00C4CC',
//                       '#EF4444',
//                       '#8B5CF6',
//                       '#06B6D4',
//                       '#FBBF24',
//                       '#6A5ACD',
//                     ]}
//                     textColors={['#fff']}
//                     fontSize={16}
//                     onStopSpinning={() => setMustSpin(false)}
//                     pointerProps={{style: {display: 'none'}}}
//                   />

//                   {/* Pointer with enhanced styling */}
//                   <div className="absolute inset-0 flex items-start justify-center pointer-events-none">
//                     <div className="relative mt-[-20px]">
//                       <div className="absolute inset-0 w-0 h-0 border-l-[18px] border-l-transparent border-r-[18px] border-r-transparent border-t-[30px] border-t-yellow-400 blur-sm"></div>
//                       <div className="relative w-0 h-0 border-l-[18px] border-l-transparent border-r-[18px] border-r-transparent border-t-[30px] border-t-yellow-400 drop-shadow-[0_0_10px_rgba(255,215,0,0.8)]"></div>
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               {/* Spin Button with enhanced styling */}
//               <button
//                 onClick={handleSpinClick}
//                 disabled={mustSpin}
//                 className="relative z-10 group px-12 py-4 rounded-full bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-400 text-black font-bold text-xl tracking-wider hover:scale-110 active:scale-95 transition-all duration-300 shadow-[0_0_30px_rgba(255,215,0,0.4)] hover:shadow-[0_0_40px_rgba(255,215,0,0.7)] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
//               >
//                 <span className="relative z-10 flex items-center gap-3">
//                   <svg className="w-6 h-6 group-hover:rotate-180 transition-transform duration-500" fill="currentColor" viewBox="0 0 20 20">
//                     <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
//                   </svg>
//                   {mustSpin ? 'SPINNING...' : 'SPIN NOW'}
//                 </span>
//                 <div className="absolute inset-0 rounded-full bg-gradient-to-r from-yellow-300 to-yellow-600 opacity-0 group-hover:opacity-100 blur transition-opacity duration-300"></div>
//               </button>

//               {/* Additional info text */}
//               <p className="relative z-10 text-gray-500 text-sm animate-pulse">
//                 Click the button to spin the wheel
//               </p>
//             </div>
//           </>}
          
//           {activeFilter === 'prize'  && <>
//              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8 px-2 sm:px-0">
//             {cardsToShow.map((card) => (
//               <div
//                 key={card.id}
//                 className="rounded-xl overflow-hidden shadow-lg border border-yellow-500 flex flex-col w-full max-w-full mx-auto cursor-pointer hover:scale-105 transition-transform duration-300"
//                 onClick={() => navigate(`/card/${card.id}`)}
//               >
//                 {/* Card Image Section with Type Badge */}
//                 <div className="relative w-full h-48">
//                   <img
//                     src={card.image}
//                     alt={card.title}
//                     className="w-full h-full object-cover rounded-t-xl"
//                   />
//                   {/* Badge for card type */}
//                   <div 
//                     className="absolute top-2 right-2 px-3 py-1 rounded-full text-xs font-bold uppercase"
//                     style={{
//                       background: card.type === 'spin' 
//                         ? 'linear-gradient(90deg, #9333EA 0%, #C084FC 100%)'
//                         : 'linear-gradient(90deg, #059669 0%, #10B981 100%)',
//                       color: '#fff'
//                     }}
//                   >
//                     {card.type === 'spin' ? '🎰 SPIN' : '🎁 PRIZE'}
//                   </div>
//                 </div>

//                 {/* Card Content Section */}
//                 <div className="p-4 text-white flex flex-col flex-1">
//                   {/* Progress Bar with Text */}
//                   <div className="relative w-full bg-slate-300 h-7 rounded-full mb-4">
//                     <div
//                       className="absolute inset-0 rounded-full transition-all duration-500 ease-in-out"
//                       style={{
//                         width: `${(card.ticketSold / card.totalTicket) * 100}%`,
//                         background: 'linear-gradient(90deg, #FFFFFF 0%, #E28B27 100%)'
//                       }}
//                     ></div>
//                     <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-sm font-bold text-black">
//                       {`${card.ticketSold}/${card.totalTicket}`}
//                     </span>
//                   </div>

//                   {/* Title and Price */}
//                   <div className="text-center space-y-2 flex-1">
//                     <h3
//                       className="text-lg sm:text-xl font-bold leading-tight tracking-wide"
//                       style={{ color: '#FDED43' }}
//                     >
//                       {card.title}
//                     </h3>
//                     <p className="text-sm" style={{ color: '#fff' }}>
//                       {card.price}
//                     </p>
//                   </div>

//                   {/* Button */}
//                   <button
//                     onClick={(e) => {
//                       e.stopPropagation();
//                       navigate(`/card/${card.id}`);
//                     }}
//                     className="w-full py-3 mt-4 text-lg font-bold rounded-lg shadow-lg hover:opacity-90 transition-all duration-300"
//                     style={{
//                       background:
//                         'linear-gradient(90deg, #E28B27 0%, #F5D334 29.19%, #F6D63E 32.42%, #F5D334 67.48%, #ECC92F 72.69%, #D5AC22 81.69%, #AE7F0D 93.33%, #966200 100%)',
//                       color: '#fff',
//                     }}
//                   >
//                     ENTRY NOW
//                   </button>
//                 </div>
//               </div>
//             ))}
//           </div>
//           </>}
//         </div>

//         {/* Pagination */}
//         {totalPages > 1 && (
//           <div className="flex justify-center items-center gap-2 mt-12 flex-wrap">
//             <button
//               onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
//               disabled={currentPage === 1}
//               className={`px-3 py-1 rounded-full font-bold ${currentPage === 1
//                 ? 'bg-gray-700 text-gray-400 cursor-not-allowed'
//                 : 'bg-yellow-500 text-black hover:bg-yellow-600'
//                 }`}
//             >
//               Prev
//             </button>
//             {[...Array(totalPages)].map((_, idx) => (
//               <button
//                 key={idx}
//                 onClick={() => setCurrentPage(idx + 1)}
//                 className={`px-3 py-1 rounded-full font-bold ${currentPage === idx + 1
//                   ? 'bg-gradient-to-r from-yellow-500 to-orange-600 text-black'
//                   : 'bg-gray-800 text-yellow-400 hover:bg-yellow-900/10'
//                   }`}
//               >
//                 {idx + 1}
//               </button>
//             ))}
//             <button
//               onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
//               disabled={currentPage === totalPages}
//               className={`px-3 py-1 rounded-full font-bold ${currentPage === totalPages
//                 ? 'bg-gray-700 text-gray-400 cursor-not-allowed'
//                 : 'bg-yellow-500 text-black hover:bg-yellow-600'
//                 }`}
//             >
//               Next
//             </button>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// export default CompetitionCards;
import { useEffect, useState, useRef, useCallback } from 'react';
import { useNavigate } from "react-router-dom";
import axiosSecure from '../../lib/axiosSecure';
import { Wheel } from 'react-custom-roulette';
import { useAuth } from '../../context/AuthContext';
import toast from 'react-hot-toast';
import spinSound from '../../assets/mixkit-bike-wheel-spinning-1613.wav';
import jackpotSound from '../../assets/mixkit-medieval-show-fanfare-announcement-226.wav';
import winSound from '../../assets/mixkit-medium-size-crowd-applause-485.wav';
import coinSound from '../../assets/mixkit-winning-a-coin-video-game-2069.wav';
import loseSound from '../../assets/mixkit-losing-bleeps-2026.wav';


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
  const [winningPrize, setWinningPrize] = useState(null);
  const [showPrizeAnimation, setShowPrizeAnimation] = useState(false);
  const [audioEnabled, setAudioEnabled] = useState(false);
  const [audioInitialized, setAudioInitialized] = useState(false);
  const [confettiParticles, setConfettiParticles] = useState([]);
  
  // Audio references - Using YOUR CDN URLs
  const audioFiles = useRef({
    spin: spinSound,
    win: winSound,
    jackpot: jackpotSound,
    coin: coinSound,
    lose: loseSound
  });

  // Audio element refs
  const spinAudioRef = useRef(null);
  const winAudioRef = useRef(null);
  const jackpotAudioRef = useRef(null);
  const coinAudioRef = useRef(null);
  const loseAudioRef = useRef(null);
  
  // Track if user has interacted with page
  const userInteractedRef = useRef(false);

  const filterButtons = [
    { id: 'prize', label: 'PRIZE' },
  ];

  // Initialize audio elements
  const initAudio = useCallback(() => {
    try {
      console.log('Initializing audio...');
      
      // Create audio elements with your URLs
      spinAudioRef.current = new Audio(audioFiles.current.spin);
      winAudioRef.current = new Audio(audioFiles.current.win);
      jackpotAudioRef.current = new Audio(audioFiles.current.jackpot);
      coinAudioRef.current = new Audio(audioFiles.current.coin);
      loseAudioRef.current = new Audio(audioFiles.current.lose);
      
      // Configure audio elements
      const audioElements = [
        spinAudioRef.current,
        winAudioRef.current,
        jackpotAudioRef.current,
        coinAudioRef.current,
        loseAudioRef.current
      ];
      
      audioElements.forEach(audio => {
        if (audio) {
          audio.preload = 'auto';
          audio.volume = 0.5;
          audio.muted = false;
          
          // Handle loading errors
          audio.onerror = () => {
            console.error(`Failed to load audio: ${audio.src}`);
          };
          
          // Handle success loading
          audio.oncanplaythrough = () => {
            console.log(`Audio loaded: ${audio.src}`);
          };
        }
      });
      
      // Spin audio should loop
      if (spinAudioRef.current) {
        spinAudioRef.current.loop = true;
      }
      
      setAudioInitialized(true);
      setAudioEnabled(true);
      console.log('Audio initialized successfully');
      
    } catch (error) {
      console.error('Audio init error:', error);
      setAudioEnabled(false);
    }
  }, []);

  // Play sound function with proper user interaction handling
  const playSound = useCallback((type) => {
    if (!audioEnabled || !audioInitialized || !userInteractedRef.current) {
      console.log('Audio not ready:', { audioEnabled, audioInitialized, userInteracted: userInteractedRef.current });
      return null;
    }
    
    try {
      let audio = null;
      
      switch(type) {
        case 'spin':
          audio = spinAudioRef.current;
          break;
        case 'win':
          audio = winAudioRef.current;
          break;
        case 'jackpot':
          audio = jackpotAudioRef.current;
          break;
        case 'coin':
          audio = coinAudioRef.current;
          break;
        case 'lose':
          audio = loseAudioRef.current;
          break;
      }
      
      if (audio) {
        // Reset audio to start
        audio.currentTime = 0;
        audio.volume = 0.5;
        
        // For mobile browsers, we need to ensure audio is unmuted
        audio.muted = false;
        
        const playPromise = audio.play();
        
        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              console.log(`${type} sound playing successfully`);
            })
            .catch(error => {
              console.error(`Could not play ${type} sound:`, error);
              // Try to play with muted first (for iOS)
              audio.muted = true;
              audio.play().then(() => {
                // Now unmute (iOS requires playing once muted before unmuting)
                audio.muted = false;
              }).catch(e => {
                console.error('Even muted play failed:', e);
              });
            });
        }
        
        return audio;
      }
    } catch (error) {
      console.error(`Error playing ${type} sound:`, error);
    }
    
    return null;
  }, [audioEnabled, audioInitialized]);

  // Stop a specific sound
  const stopSound = useCallback((audio) => {
    if (audio) {
      try {
        audio.pause();
        audio.currentTime = 0;
      } catch (e) {
        console.error('Error stopping sound:', e);
      }
    }
  }, []);

  // Stop all sounds
  const stopAllSounds = useCallback(() => {
    [spinAudioRef.current, winAudioRef.current, jackpotAudioRef.current, 
     coinAudioRef.current, loseAudioRef.current].forEach(stopSound);
  }, [stopSound]);

  // Handle spin click
  const handleSpinClick = async () => {
    try {
      // First click: Enable audio if not already initialized
      if (!audioInitialized || !userInteractedRef.current) {
        // Mark that user has interacted
        userInteractedRef.current = true;
        
        // Initialize audio
        initAudio();
        
        // Play a test sound to ensure audio works
        setTimeout(() => {
          const testAudio = new Audio();
          testAudio.src = 'data:audio/wav;base64,UklGRigAAABXQVZFZm10IBIAAAABAAEARKwAAIhYAQACABAAZGF0YQQAAAAAAA==';
          testAudio.volume = 0.01;
          testAudio.play().catch(() => {});
        }, 100);
        
        toast.success('🎵 Sound enabled! Click SPIN NOW again to spin.');
        return;
      }

      if (!user) {
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
      setWinningPrize(prize);

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

      // Play spinning sound
      if (audioEnabled) {
        // Stop any previous sounds
        stopAllSounds();
        // Play spin sound
        playSound('spin');
      }

      setMustSpin(true);
      await refetchUser();
    } catch (error) {
      console.error('❌ Spin error:', error);
      toast.error('Failed to spin. Please try again.');
    }
  };

  // Create confetti effect
  const createConfetti = () => {
    const particles = [];
    const colors = ['#FFD700', '#FF6B6B', '#4ECDC4', '#FFA500', '#FFFFFF'];
    
    for (let i = 0; i < 50; i++) {
      particles.push({
        id: i,
        x: Math.random() * 100,
        y: -10,
        rotation: Math.random() * 360,
        color: colors[Math.floor(Math.random() * colors.length)],
        size: Math.random() * 10 + 5,
        speed: Math.random() * 3 + 2,
        rotationSpeed: Math.random() * 10 - 5,
      });
    }
    
    setConfettiParticles(particles);
    
    const interval = setInterval(() => {
      setConfettiParticles(prev => 
        prev.map(p => ({
          ...p,
          y: p.y + p.speed,
          rotation: p.rotation + p.rotationSpeed,
        })).filter(p => p.y < 110)
      );
    }, 30);
    
    setTimeout(() => {
      clearInterval(interval);
      setTimeout(() => {
        setConfettiParticles([]);
      }, 1000);
    }, 2000);
  };

  // Handle wheel stop
  const handleStopSpinning = () => {
    setMustSpin(false);
    
    // Stop spinning sound
    if (spinAudioRef.current) {
      stopSound(spinAudioRef.current);
    }
    
    if (winningPrize && audioEnabled) {
      // Play appropriate prize sound
      const prizeType = winningPrize.type || winningPrize.label || '';
      const prizeName = winningPrize.name || winningPrize.label || '';
      
      let soundType = 'win';
      
      if (prizeType.toLowerCase().includes('jackpot') || 
        prizeName.toLowerCase().includes('jackpot')) {
        soundType = 'jackpot';
      } else if (prizeType.toLowerCase().includes('coin') || 
        prizeType.toLowerCase().includes('credit')) {
        soundType = 'coin';
      } else if (prizeType.toLowerCase().includes('try again') || 
                prizeName.toLowerCase().includes('try again')) {
        soundType = 'lose';
      }
      
      // Wait a moment then play the win sound
      setTimeout(() => {
        playSound(soundType);
      }, 300);
      
      createConfetti();
      setShowPrizeAnimation(true);
      
      setTimeout(() => {
        setShowPrizeAnimation(false);
      }, 5000);
    }
  };

  const fetchSpinner = async () => {
    try {
      const res = await axiosSecure.get('/spinner/get-spinner');

      if (res.data?.success && Array.isArray(res.data.data)) {
        const spinner = res.data.data[0].prizes;
        
        const formattedSegments = spinner?.map((prize) => ({
          option: prize.label || prize.name || prize.amount || String(prize),
          prizeData: prize
        })) || [];
        
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
    
    // Set up user interaction tracking
    const handleUserInteraction = () => {
      userInteractedRef.current = true;
      console.log('User interacted with page');
      
      // Remove listeners after first interaction
      document.removeEventListener('click', handleUserInteraction);
      document.removeEventListener('touchstart', handleUserInteraction);
      document.removeEventListener('keydown', handleUserInteraction);
    };
    
    // Listen for various user interactions
    document.addEventListener('click', handleUserInteraction, { once: true });
    document.addEventListener('touchstart', handleUserInteraction, { once: true });
    document.addEventListener('keydown', handleUserInteraction, { once: true });
    
    return () => {
      // Clean up audio elements
      stopAllSounds();
      
      // Remove listeners
      document.removeEventListener('click', handleUserInteraction);
      document.removeEventListener('touchstart', handleUserInteraction);
      document.removeEventListener('keydown', handleUserInteraction);
    };
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
      {/* Confetti */}
      {confettiParticles.length > 0 && (
        <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
          {confettiParticles.map((particle) => (
            <div
              key={particle.id}
              className="absolute rounded-sm"
              style={{
                left: `${particle.x}vw`,
                top: `${particle.y}vh`,
                width: `${particle.size}px`,
                height: `${particle.size}px`,
                transform: `rotate(${particle.rotation}deg)`,
                backgroundColor: particle.color,
                opacity: 0.8,
              }}
            />
          ))}
        </div>
      )}

      {/* Prize Animation Modal */}
      {showPrizeAnimation && winningPrize && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
          <div className="relative animate-pulse">
            <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 rounded-full blur-3xl opacity-60"></div>
            
            <div className="relative bg-gradient-to-br from-gray-900 via-black to-gray-800 p-8 rounded-3xl border-4 border-yellow-500 shadow-2xl max-w-md mx-4">
              <div className="text-center">
                <div className="mb-6 animate-bounce">
                  <svg className="w-24 h-24 mx-auto text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
                  </svg>
                </div>
                
                <h2 className="text-4xl font-bold mb-2 bg-gradient-to-r from-yellow-300 via-orange-300 to-yellow-300 bg-clip-text text-transparent">
                  Congratulations!
                </h2>
                <p className="text-gray-300 mb-2">You won:</p>
                
                <h3 className="text-3xl font-bold mb-6 text-white drop-shadow-[0_0_10px_rgba(255,215,0,0.8)]">
                  {winningPrize.label}
                </h3>
                
                <div className="inline-block px-4 py-2 rounded-full bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold mb-6">
                  {winningPrize.value || 'Prize'}
                </div>
                
                <button
                  onClick={() => setShowPrizeAnimation(false)}
                  className="mt-4 px-8 py-3 rounded-full bg-gradient-to-r from-yellow-500 to-orange-600 text-black font-bold text-lg hover:scale-105 transition-transform duration-200 shadow-lg"
                >
                  CLAIM PRIZE
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

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

          {activeFilter === 'spin' && (
            <div className="flex flex-col items-center justify-center gap-8 min-h-screen text-white p-4 relative" style={{backgroundColor: '#121212'}}>
              {/* Wheel animation overlay */}
              {mustSpin && (
                <div className="absolute inset-0 z-0 overflow-hidden">
                  {[...Array(20)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute w-2 h-2 bg-yellow-400 rounded-full animate-ping"
                      style={{
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                        animationDelay: `${Math.random() * 2}s`,
                        opacity: Math.random() * 0.5 + 0.5,
                      }}
                    />
                  ))}
                </div>
              )}

              {/* Title */}
              <div className="relative z-10 text-center mb-4">
                <h1 className="text-5xl font-bold bg-gradient-to-r from-yellow-400 via-yellow-200 to-yellow-400 bg-clip-text text-transparent drop-shadow-lg">
                  Spin & Win
                </h1>
                <p className="text-gray-400 mt-2 text-lg">Try your luck and win amazing prizes!</p>
                
                {/* Audio instructions */}
                {!audioInitialized && (
                  <div className="mt-4 p-3 bg-yellow-500/20 rounded-lg border border-yellow-500/30">
                    <p className="text-yellow-300 text-sm">
                      🔊 <strong>Note:</strong> Click "ENABLE SOUND & SPIN" once to enable sound, then click again to spin!
                    </p>
                  </div>
                )}
              </div>

              {/* Wheel Container */}
              <div className="relative z-10">
                <div className={`absolute inset-0 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full blur-2xl opacity-20 ${mustSpin ? 'animate-pulse' : ''}`}></div>
                
                <div className="relative p-8 rounded-full" style={{backgroundColor: 'rgba(18, 18, 18, 0.6)'}}>
                  <Wheel
                    mustStartSpinning={mustSpin}
                    prizeNumber={prizeNumber}
                    data={segments.length > 0 ? segments.map(s => ({ option: s.option })) : [{ option: 'Loading...' }]}
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
                    onStopSpinning={handleStopSpinning}
                    pointerProps={{style: {display: 'none'}}}
                    spinDuration={0.5}
                  />

                  {/* Pointer */}
                  <div className="absolute inset-0 flex items-start justify-center pointer-events-none">
                    <div className="relative mt-[-20px]">
                      <div className="absolute inset-0 w-0 h-0 border-l-[18px] border-l-transparent border-r-[18px] border-r-transparent border-t-[30px] border-t-yellow-400 blur-sm"></div>
                      <div className="relative w-0 h-0 border-l-[18px] border-l-transparent border-r-[18px] border-r-transparent border-t-[30px] border-t-yellow-400 drop-shadow-[0_0_10px_rgba(255,215,0,0.8)]"></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Spin Button */}
              <button
                onClick={handleSpinClick}
                disabled={mustSpin}
                className={`relative z-10 group px-12 py-4 rounded-full bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-400 text-black font-bold text-xl tracking-wider transition-all duration-300 shadow-[0_0_30px_rgba(255,215,0,0.4)] disabled:opacity-50 disabled:cursor-not-allowed ${mustSpin ? '' : 'hover:scale-110 active:scale-95 hover:shadow-[0_0_40px_rgba(255,215,0,0.7)]'}`}
              >
                <span className="relative z-10 flex items-center gap-3">
                  <svg className={`w-6 h-6 transition-transform duration-500 ${mustSpin ? 'animate-spin' : 'group-hover:rotate-180'}`} fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
                  </svg>
                  {!audioInitialized ? 'ENABLE SOUND & SPIN' : mustSpin ? 'SPINNING...' : 'SPIN NOW'}
                </span>
              </button>

              {/* Sound status */}
              <div className={`px-6 py-3 rounded-full ${audioEnabled && audioInitialized ? 'bg-green-500/20 border border-green-500/30' : 'bg-yellow-500/20 border border-yellow-500/30'}`}>
                <p className={`text-sm ${audioEnabled && audioInitialized ? 'text-green-300' : 'text-yellow-300'}`}>
                  {audioEnabled && audioInitialized ? '🔊 Sound ready - Spin to hear effects!' : '🔇 Click "ENABLE SOUND & SPIN" first'}
                </p>
              </div>

              {/* Credits */}
              <div className="relative z-10 bg-gradient-to-r from-gray-800 to-gray-900 px-6 py-3 rounded-full border border-yellow-500/30">
                <p className="text-gray-300">
                  Credits Available: <span className="text-yellow-400 font-bold">{user?.credit || 0}</span>
                </p>
              </div>

              <p className="relative z-10 text-gray-500 text-sm">
                {mustSpin ? 'Wheel is spinning...' : audioInitialized ? 'Click to spin the wheel' : 'First click enables sound'}
              </p>
            </div>
          )}
          
          {activeFilter === 'prize' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8 px-2 sm:px-0">
              {cardsToShow.map((card) => (
                <div
                  key={card.id}
                  className="rounded-xl overflow-hidden shadow-lg border border-yellow-500 flex flex-col w-full max-w-full mx-auto cursor-pointer hover:scale-105 transition-transform duration-300"
                  onClick={() => navigate(`/card/${card.id}`)}
                >
                  {/* Card Image */}
                  <div className="relative w-full h-full">
                    <img
                      src={card.image}
                      alt={card.title}
                      className="w-full h-full object-cover rounded-t-xl"
                    />
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

                  {/* Card Content */}
                  <div className="p-4 text-white flex flex-col flex-1">
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