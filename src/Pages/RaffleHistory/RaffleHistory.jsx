import { useState, useEffect } from 'react';
import axiosSecure from '../../lib/axiosSecure';
import { useAuth } from '../../context/AuthContext';

const RaffleHistory = () => {
  const [historyData, setHistoryData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedRaffle, setExpandedRaffle] = useState(null);
  
  const { user } = useAuth();

  useEffect(() => {
    const fetchRaffleHistory = async () => {
      if (!user?._id) return;
      
      try {
        setLoading(true);
        const response = await axiosSecure.get(
          `/raffles/get-single-user-raffle-history/${user._id}`
        );
        setHistoryData(response.data.data);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch raffle history');
      } finally {
        setLoading(false);
      }
    };

    fetchRaffleHistory();
  }, [user]);

  const toggleRaffle = (raffleId) => {
    setExpandedRaffle(expandedRaffle === raffleId ? null : raffleId);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0f0f0f] flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-400">Loading your raffle history...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#0f0f0f] flex items-center justify-center">
        <div className="bg-red-500/10 border border-red-500 rounded-xl p-6 max-w-md">
          <p className="text-red-400 text-center">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0f0f0f] text-white p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">My Raffle History</h1>
          <p className="text-gray-400">Track your raffle participation</p>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-[#161616] rounded-xl p-6 border border-gray-800 hover:border-gray-700 transition-colors">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm mb-1">Total Raffles Participated</p>
                <p className="text-3xl font-bold text-white">{historyData?.totalRaffles || 0}</p>
              </div>
              <div className="w-14 h-14 bg-blue-500/20 rounded-lg flex items-center justify-center">
                <span className="text-3xl">🎯</span>
              </div>
            </div>
          </div>

          <div className="bg-[#161616] rounded-xl p-6 border border-gray-800 hover:border-gray-700 transition-colors">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm mb-1">Total Tickets Purchased</p>
                <p className="text-3xl font-bold text-green-400">{historyData?.totalTickets || 0}</p>
              </div>
              <div className="w-14 h-14 bg-green-500/20 rounded-lg flex items-center justify-center">
                <span className="text-3xl">🎫</span>
              </div>
            </div>
          </div>
        </div>

        {/* Raffles List */}
        <div className="bg-[#161616] rounded-xl border border-gray-800">
          <div className="p-6 border-b border-gray-800">
            <h2 className="text-xl font-semibold text-white">Your Raffles</h2>
          </div>

          <div className="divide-y divide-gray-800">
            {historyData?.raffles && historyData.raffles.length > 0 ? (
              historyData.raffles.map((raffle) => (
                <div key={raffle.raffleId} className="p-6 hover:bg-[#1a1a1a] transition-colors">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-white mb-2">
                        {raffle.raffleName}
                      </h3>
                      <div className="flex items-center gap-4 text-sm">
                        <span className="text-gray-400">
                          Raffle ID: <span className="text-gray-300 font-mono">{raffle.raffleId}</span>
                        </span>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          raffle.status 
                            ? 'bg-green-500/20 text-green-400 border border-green-500/30' 
                            : 'bg-red-500/20 text-red-400 border border-red-500/30'
                        }`}>
                          {raffle.status ? 'Active' : 'Inactive'}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <p className="text-gray-400 text-sm mb-1">Total Tickets</p>
                        <p className="text-2xl font-bold text-[#F3C240]">{raffle.totalTickets}</p>
                      </div>
                      <button
                        onClick={() => toggleRaffle(raffle.raffleId)}
                        className="ml-4 px-4 py-2 bg-gray-800 hover:bg-gray-700 text-gray-300 rounded-lg border border-gray-700 transition-colors text-sm font-medium"
                      >
                        {expandedRaffle === raffle.raffleId ? 'Hide Tickets' : 'View Tickets'}
                      </button>
                    </div>
                  </div>

                  {/* Expandable Tickets Section */}
                  {expandedRaffle === raffle.raffleId && (
                    <div className="mt-4 pt-4 border-t border-gray-800">
                      <h4 className="text-sm font-medium text-gray-400 mb-3">Your Ticket IDs:</h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                        {raffle.tickets.map((ticket, index) => (
                          <div
                            key={ticket.ticketId}
                            className="bg-gray-900/50 border border-gray-800 rounded-lg px-3 py-2 font-mono text-xs text-gray-300 hover:border-gray-700 transition-colors"
                          >
                            <span className="text-gray-500">#{index + 1}</span> {ticket.ticketId}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))
            ) : (
              <div className="text-center py-16">
                <div className="w-24 h-24 mx-auto mb-4 bg-gray-800 rounded-full flex items-center justify-center">
                  <span className="text-5xl">🎫</span>
                </div>
                <h3 className="text-xl font-medium text-gray-300 mb-2">No Raffle History</h3>
                <p className="text-gray-500">You haven't participated in any raffles yet</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RaffleHistory;