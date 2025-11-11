import { useEffect, useState, useMemo } from 'react';
import axiosSecure from '../../lib/axiosSecure';
import { useAuth } from '../../context/AuthContext';

const SpinningHistoryPage = () => {
  const [spinnerHistory, setSpinnerHistory] = useState([]);
  const [meta, setMeta] = useState(null);
  const [componentLoading, setComponentLoading] = useState(true);
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const { user, loading } = useAuth();
  const itemsPerPage = 10;

  // Fetch paginated spin history
  const fetchUserSpinHistory = async (page = 1) => {
    try {
      setComponentLoading(true);
      const { data } = await axiosSecure.get(
        `/spinner/user-spinning-history-and-overview?id=${user?._id}&page=${page}&limit=${itemsPerPage}`
      );

      setSpinnerHistory(data.data.data || []);
      setMeta(data.data.meta);
    } catch (error) {
      console.error('Failed to fetch spin history:', error);
    } finally {
      setComponentLoading(false);
    }
  };

  useEffect(() => {
    if (user?._id && !loading) {
      fetchUserSpinHistory(currentPage);
    }
  }, [user, loading, currentPage]);

  // Filters
  const filterOptions = [
    { value: 'all', label: 'All Spins' },
    { value: 'jackpot', label: 'Jackpots' },
    { value: 'win', label: 'Wins Only' },
    { value: 'no-win', label: 'No Wins' },
  ];

  const filteredHistory = useMemo(() => {
    switch (selectedFilter) {
      case 'jackpot':
        return spinnerHistory.filter((s) => s.reward?.toLowerCase() === 'jackpot');
      case 'win':
        return spinnerHistory.filter((s) => s.value > 0);
      case 'no-win':
        return spinnerHistory.filter((s) => s.value === 0);
      default:
        return spinnerHistory;
    }
  }, [spinnerHistory, selectedFilter]);

  // Stats


  // Reward badge color
  const getPrizeBadgeColor = (reward) => {
    switch (reward?.toLowerCase()) {
      case 'jackpot':
        return 'bg-gradient-to-r from-yellow-500 to-orange-500 text-white shadow-lg shadow-orange-500/25';
      case '$1':
      case '$5':
      case '$10':
        return 'bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-lg shadow-green-500/25';
      case 'zero':
      case '0':
        return 'bg-gray-800 text-gray-400 border border-gray-700';
      default:
        return 'bg-purple-600 text-white';
    }
  };

  // Pagination handlers
  const totalPages = meta ? Math.ceil(meta.totalSpins / itemsPerPage) : 1;

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  // Loading screen
  if (componentLoading) {
    return (
      <div className="flex justify-center items-center h-screen bg-[#0d0d0d]">
        <div className="flex gap-2">
          <div className="w-3 h-12 bg-[#36d7b7] rounded animate-pulse"></div>
          <div className="w-3 h-12 bg-[#36d7b7] rounded animate-pulse delay-150"></div>
          <div className="w-3 h-12 bg-[#36d7b7] rounded animate-pulse delay-300"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0f0f0f] text-white p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">My Spinning History</h1>
        <p className="text-gray-400 mb-8">Track your spinning activity and winnings</p>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-[#161616] rounded-xl p-6 border border-gray-800 hover:border-gray-700 transition">
            <p className="text-gray-400 text-sm mb-1">Total Spins</p>
            <p className="text-2xl font-bold">{meta.totalSpins || 0}</p>
          </div>
          <div className="bg-[#161616] rounded-xl p-6 border border-gray-800 hover:border-gray-700 transition">
            <p className="text-gray-400 text-sm mb-1">Total Winnings</p>
            <p className="text-2xl font-bold text-green-400">${meta.totalWinning || 0}</p>
          </div>
          <div className="bg-[#161616] rounded-xl p-6 border border-gray-800 hover:border-gray-700 transition">
            <p className="text-gray-400 text-sm mb-1">Jackpots Won</p>
            <p className="text-2xl font-bold text-yellow-400">{meta.totalJackpots || 0}</p>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-2 bg-[#161616] rounded-lg p-2 border border-gray-800 mb-6">
          {filterOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => {
                setSelectedFilter(option.value);
                setCurrentPage(1);
              }}
              className={`px-4 py-2 text-sm rounded-md transition-all ${
                selectedFilter === option.value
                  ? 'bg-[#DA9F0A] text-black font-semibold shadow-lg shadow-[#36d7b7]/25'
                  : 'text-gray-400 hover:text-white hover:bg-[#1f1f1f]'
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>

        {/* Table */}
        <div className="bg-[#161616] rounded-xl border border-gray-800 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-800 bg-[#1a1a1a]">
                  <th className="text-gray-400 py-4 px-6 text-left text-xs uppercase tracking-wider">Reward</th>
                  <th className="text-gray-400 py-4 px-6 text-left text-xs uppercase tracking-wider">Value</th>
                  <th className="text-gray-400 py-4 px-6 text-left text-xs uppercase tracking-wider">Date</th>
                </tr>
              </thead>
              <tbody>
                {filteredHistory.map((spin) => (
                  <tr key={spin._id} className="border-b border-gray-800 hover:bg-[#1f1f1f] transition">
                    <td className="py-4 px-6">
                      <span
                        className={`${getPrizeBadgeColor(
                          spin.reward
                        )} px-4 py-2 rounded-full text-xs font-bold uppercase`}
                      >
                        {spin.reward}
                      </span>
                    </td>
                    <td className="py-4 px-6 font-bold text-green-400">${spin.value}</td>
                    <td className="py-4 px-6 text-gray-400">
                      {new Date(spin.date).toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Empty state */}
          {filteredHistory.length === 0 && (
            <div className="text-center py-10 text-gray-400">
              No spins found for this filter.
            </div>
          )}

          {/* Pagination */}
          {meta && totalPages > 1 && (
            <div className="flex items-center justify-between px-6 py-4 border-t border-gray-800 bg-[#1a1a1a]">
              <div className="text-sm text-gray-400">
                Page {meta.page} of {totalPages} ({meta.totalSpins} total spins)
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handlePageChange(meta.page - 1)}
                  disabled={meta.page === 1}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition ${
                    meta.page === 1
                      ? 'bg-gray-800 text-gray-600 cursor-not-allowed'
                      : 'bg-[#DA9F0A] text-black hover:bg-[#DA9F0A]/80'
                  }`}
                >
                  Previous
                </button>
                <button
                  onClick={() => handlePageChange(meta.page + 1)}
                  disabled={meta.page === totalPages}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition ${
                    meta.page === totalPages
                      ? 'bg-gray-800 text-gray-600 cursor-not-allowed'
                      : 'bg-[#DA9F0A] text-black hover:bg-[#DA9F0A]/80'
                  }`}
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SpinningHistoryPage;
