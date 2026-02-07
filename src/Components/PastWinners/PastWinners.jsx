import { useEffect, useState } from 'react';
import { Loader2, Trophy, Calendar, Ticket, User, Mail } from 'lucide-react';
import axiosSecure from '../../lib/axiosSecure';

const PastWinners = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [winnersData, setWinnersData] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [totalWinners, setTotalWinners] = useState(0);
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  
  const cardsPerPage = 10;

  // Fetch winners from API
  const fetchPastWinner = async (page = 1) => {
    try {
      setLoading(true);
      
      const params = new URLSearchParams({
        page: page.toString(),
        limit: cardsPerPage.toString(),
      });
      
      const result = await axiosSecure.get(`/winner/winner-history?${params}`);
      console.log(result.data.data);
      
      if (!result.data.success) {
        throw new Error('Failed to fetch winners');
      }
      
      // Transform API data to match card format
      const transformedData = result.data.data.map((winner) => ({
        id: winner._id,
        car: winner.raffleId?.title || 'N/A',
        image: winner.raffleId?.thumbnail || 'https://images.unsplash.com/photo-1555215695-3004980ad54e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        winner: winner.userId?.userName || winner?.name ||'Anonymous',
        email: winner.userId?.email || winner?.email || '',
        ticketNo: winner.winningTicketId?._id?.slice(-8) || '********',
        date: new Date(winner.createdAt).toLocaleDateString('en-GB', {
          day: 'numeric',
          month: 'short',
          year: 'numeric',
        }),
        time: new Date(winner.createdAt).toLocaleTimeString('en-GB', {
          hour: '2-digit',
          minute: '2-digit'
        }),
        prize: `£${winner.raffleId?.price || 0}`,
        worth: `${winner.raffleId?.totalTicket || 0} TOTAL TICKETS`,
        ticketsSold: winner.raffleId?.ticketSold || 0,
        totalTickets: winner.raffleId?.totalTicket || 0,
      }));

      console.log(transformedData);
      
      setWinnersData(transformedData);
      setTotalPages(result.data.meta.totalPages);
      setTotalWinners(result.data.meta.total);
    } catch (err) {
      console.error('Error fetching winners:', err);
    } finally {
      setLoading(false);
      setInitialLoading(false);
    }
  };

  // Fetch on mount and page change
  useEffect(() => {
    fetchPastWinner(currentPage);
  }, [currentPage]);

  // Handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 300, behavior: 'smooth' });
  };

  // Generate smart pagination
  const getPaginationRange = () => {
    const delta = 2;
    const range = [];
    const rangeWithDots = [];

    for (
      let i = Math.max(2, currentPage - delta);
      i <= Math.min(totalPages - 1, currentPage + delta);
      i++
    ) {
      range.push(i);
    }

    if (currentPage - delta > 2) {
      rangeWithDots.push(1, '...');
    } else {
      rangeWithDots.push(1);
    }

    rangeWithDots.push(...range);

    if (currentPage + delta < totalPages - 1) {
      rangeWithDots.push('...', totalPages);
    } else if (totalPages > 1) {
      rangeWithDots.push(totalPages);
    }

    return rangeWithDots;
  };

  // Calculate pagination info
  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;

  // Initial loading state
  if (initialLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-black">
        <div className="text-center">
          <Loader2 className="animate-spin text-yellow-500 mx-auto mb-4" size={48} />
          <p className="text-white text-sm">Loading winners...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-black min-h-screen">
      {/* Header Section */}
      <div className="py-8 px-4">
        <div className="container mx-auto text-center">
          {/* Main Title */}
          <div className="mb-6">
            <div className="text-4xl md:text-5xl font-bold text-yellow-500 tracking-wide">
              PAST WINNERS
            </div>
            <p className="text-gray-400 text-sm mt-2">
              Celebrating our lucky raffle winners
            </p>
          </div>
          
          {/* Trustpilot Section */}
          <div className="flex items-center justify-center space-x-4">
            {/* <div className="text-white text-sm">
              Reviews 2,006
            </div>
            
            <div className="flex items-center space-x-1">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="w-6 h-6 bg-green-500 flex items-center justify-center rounded">
                  <svg className="w-4 h-4 text-white fill-current" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                </div>
              ))}
            </div> */}
            
            {/* <div className="text-white text-sm font-bold">4.7</div>
            <div className="text-white text-sm">Trustpilot</div> */}
          </div>
        </div>
      </div>

      {/* Cards Section */}
      <div className="container mx-auto px-4 py-8">
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="animate-spin text-yellow-500" size={48} />
          </div>
        ) : winnersData.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20">
            <Trophy className="text-gray-600 mb-4" size={64} />
            <p className="text-gray-400 text-lg">No winners found</p>
          </div>
        ) : (
          <>
            {/* Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {winnersData.map((card) => (
                <div 
                  key={card.id} 
                  className="bg-gradient-to-br from-gray-900 to-black rounded-xl overflow-hidden shadow-2xl hover:shadow-yellow-500/20 transition-all duration-300 transform hover:-translate-y-2 border border-yellow-500/30"
                >
                  {/* Image Section with Overlay */}
                  <div className="relative h-56 overflow-hidden group">
                    <img 
                      src={card.image} 
                      alt={card.car} 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      loading="lazy"
                      onError={(e) => {
                        e.target.src = 'https://images.unsplash.com/photo-1555215695-3004980ad54e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80';
                      }}
                    />
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
                    
                    {/* Trophy Badge */}
                    <div className="absolute top-3 right-3 bg-yellow-500 rounded-full p-2 shadow-lg">
                      <Trophy className="text-black" size={20} />
                    </div>
                    
                    {/* Prize Tag */}
                    <div className="absolute bottom-3 left-3 right-3">
                      <div className="bg-yellow-500 text-black px-3 py-1.5 rounded-lg font-bold text-sm inline-block shadow-lg">
                        {card.prize} PRIZE
                      </div>
                    </div>
                  </div>
                  
                  {/* Content Section */}
                  <div className="p-5">
                    {/* Raffle Title */}
                    <div className="mb-4">
                      <h3 className="text-yellow-400 text-base font-bold leading-tight mb-2">
                        {card.car}
                      </h3>
                      <div className="flex items-center justify-between text-xs text-gray-400">
                        <span className="flex items-center gap-1">
                          <Ticket size={14} />
                          {card.ticketsSold}/{card.totalTickets} sold
                        </span>
                        <span className="bg-gray-800 px-2 py-1 rounded">
                          {/* {((card.ticketsSold / card.totalTickets) * 100).toFixed(0)}% */}
                        </span>
                      </div>
                    </div>

                    {/* Divider */}
                    <div className="border-t border-gray-800 my-4"></div>
                    
                    {/* Winner Info Section */}
                    <div className="space-y-3">
                      {/* Winner Header */}
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center">
                          <User className="text-black" size={16} />
                        </div>
                        <span className="text-yellow-400 font-bold text-sm uppercase tracking-wide">
                          Winner
                        </span>
                      </div>

                      {/* Winner Details */}
                      <div className="bg-gray-900/50 rounded-lg p-3 space-y-2">
                        <div className="flex items-start gap-2">
                          <User className="text-gray-500 mt-0.5" size={14} />
                          <div className="flex-1 min-w-0">
                            <p className="text-white text-sm font-semibold truncate">
                              {card.winner}
                            </p>
                          </div>
                        </div>
                        
                        
                        <div className="flex items-start gap-2">
                          <Ticket className="text-gray-500 mt-0.5" size={14} />
                          <div className="flex-1">
                            <p className="text-gray-400 text-xs">
                              Ticket: <span className="text-yellow-500 font-mono">...{card.ticketNo}</span>
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Date Section */}
                      <div className="flex items-center gap-2 text-xs text-gray-500 bg-gray-900/30 rounded-lg p-2">
                        <Calendar size={14} />
                        <span>Drawn: {card.date} at {card.time}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-12 flex flex-col sm:flex-row justify-center items-center gap-4">
                {/* Previous Button */}
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className={`px-6 py-2.5 rounded-lg text-sm font-semibold transition-all ${
                    currentPage === 1
                      ? 'bg-gray-800 text-gray-600 cursor-not-allowed'
                      : 'bg-gray-800 text-white hover:bg-yellow-500 hover:text-black'
                  }`}
                >
                  ← Previous
                </button>
                
                {/* Page Numbers */}
                <div className="flex gap-2 flex-wrap justify-center">
                  {getPaginationRange().map((page, idx) => (
                    page === '...' ? (
                      <span key={`dots-${idx}`} className="px-2 py-2 text-gray-500 text-sm">
                        •••
                      </span>
                    ) : (
                      <button
                        key={page}
                        onClick={() => handlePageChange(page)}
                        className={`w-11 h-11 rounded-lg text-sm font-bold transition-all ${
                          currentPage === page
                            ? 'bg-yellow-500 text-black shadow-lg shadow-yellow-500/50 scale-110' 
                            : 'bg-gray-800 text-white hover:bg-gray-700'
                        }`}
                      >
                        {page}
                      </button>
                    )
                  ))}
                </div>
                
                {/* Next Button */}
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className={`px-6 py-2.5 rounded-lg text-sm font-semibold transition-all ${
                    currentPage === totalPages
                      ? 'bg-gray-800 text-gray-600 cursor-not-allowed'
                      : 'bg-gray-800 text-white hover:bg-yellow-500 hover:text-black'
                  }`}
                >
                  Next →
                </button>
              </div>
            )}
            
            {/* Page Info */}
            <div className="mt-6 text-center">
              <div className="inline-block bg-gray-900 px-6 py-3 rounded-lg border border-gray-800">
                <p className="text-gray-400 text-sm">
                  Showing <span className="text-yellow-500 font-semibold">{indexOfFirstCard + 1}</span> to <span className="text-yellow-500 font-semibold">{Math.min(indexOfLastCard, totalWinners)}</span> of <span className="text-yellow-500 font-semibold">{totalWinners}</span> winners
                </p>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default PastWinners;