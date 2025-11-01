import { useState, useMemo } from 'react';

const SpinningHistoryPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedFilter, setSelectedFilter] = useState('all');
  const itemsPerPage = 10;

  // Mock data - replace with your actual data
  const spinnerHistory = [
    {
      id: '1',
      prize: 'JACKPOT',
      prizeValue: 1000,
      spinDate: '2024-01-15 14:30:25'
    },
    {
      id: '2',
      prize: 'Big Win',
      prizeValue: 500,
      spinDate: '2024-01-15 14:25:10'
    },
    {
      id: '3',
      prize: 'Small Win',
      prizeValue: 50,
      spinDate: '2024-01-15 14:20:45'
    },
    {
      id: '4',
      prize: 'No Win',
      prizeValue: 0,
      spinDate: '2024-01-15 14:15:30'
    },
    {
      id: '5',
      prize: 'Medium Win',
      prizeValue: 100,
      spinDate: '2024-01-15 14:10:15'
    },
    {
      id: '6',
      prize: 'JACKPOT',
      prizeValue: 2000,
      spinDate: '2024-01-15 14:05:00'
    },
    {
      id: '7',
      prize: 'No Win',
      prizeValue: 0,
      spinDate: '2024-01-15 14:00:45'
    },
    // Add more mock data as needed...
  ];

  // Filter options
  const filterOptions = [
    { value: 'all', label: 'All Spins' },
    { value: 'jackpot', label: 'Jackpots' },
    { value: 'win', label: 'Wins Only' },
    { value: 'no-win', label: 'No Wins' }
  ];

  // Calculate statistics
  const stats = useMemo(() => {
    const totalSpins = spinnerHistory.length;
    const totalWinning = spinnerHistory.reduce((sum, spin) => sum + spin.prizeValue, 0);
    const totalJackpots = spinnerHistory.filter(spin => spin.prize === 'JACKPOT').length;
    const biggestWin = Math.max(...spinnerHistory.map(spin => spin.prizeValue));
    
    return {
      totalSpins,
      totalWinning,
      totalJackpots,
      biggestWin
    };
  }, [spinnerHistory]);

  // Filter and paginate data
  const filteredHistory = useMemo(() => {
    let filtered = spinnerHistory;
    
    switch (selectedFilter) {
      case 'jackpot':
        filtered = spinnerHistory.filter(spin => spin.prize === 'JACKPOT');
        break;
      case 'win':
        filtered = spinnerHistory.filter(spin => spin.prizeValue > 0);
        break;
      case 'no-win':
        filtered = spinnerHistory.filter(spin => spin.prizeValue === 0);
        break;
      default:
        filtered = spinnerHistory;
    }
    
    return filtered;
  }, [spinnerHistory, selectedFilter]);

  const paginatedHistory = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredHistory.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredHistory, currentPage]);

  const totalPages = Math.ceil(filteredHistory.length / itemsPerPage);

  // Prize badge color function
  const getPrizeBadgeColor = (prize) => {
    switch (prize) {
      case 'JACKPOT':
        return 'bg-gradient-to-r from-yellow-500 to-orange-500 text-white shadow-lg shadow-orange-500/25';
      case 'Big Win':
        return 'bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-lg shadow-green-500/25';
      case 'Medium Win':
        return 'bg-gradient-to-r from-blue-500 to-cyan-600 text-white shadow-lg shadow-blue-500/25';
      case 'Small Win':
        return 'bg-gradient-to-r from-purple-500 to-pink-600 text-white shadow-lg shadow-purple-500/25';
      default:
        return 'bg-gray-700 text-gray-300 border border-gray-600';
    }
  };

  return (
    <div className="min-h-screen bg-[#0f0f0f] text-white p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">My Spinning History</h1>
          <p className="text-gray-400">Track your spinning activity and winnings</p>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-[#161616] rounded-xl p-6 border border-gray-800 hover:border-gray-700 transition-colors">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm mb-1">Total Spins</p>
                <p className="text-2xl font-bold text-white">{stats.totalSpins}</p>
              </div>
              <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center">
                <span className="text-blue-400 text-xl">🎯</span>
              </div>
            </div>
          </div>

          <div className="bg-[#161616] rounded-xl p-6 border border-gray-800 hover:border-gray-700 transition-colors">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm mb-1">Total Winnings</p>
                <p className="text-2xl font-bold text-green-400">${stats.totalWinning.toLocaleString()}</p>
              </div>
              <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center">
                <span className="text-green-400 text-xl">💰</span>
              </div>
            </div>
          </div>

          <div className="bg-[#161616] rounded-xl p-6 border border-gray-800 hover:border-gray-700 transition-colors">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm mb-1">Jackpots Won</p>
                <p className="text-2xl font-bold text-yellow-400">{stats.totalJackpots}</p>
              </div>
              <div className="w-12 h-12 bg-yellow-500/20 rounded-lg flex items-center justify-center">
                <span className="text-yellow-400 text-xl">🎰</span>
              </div>
            </div>
          </div>
        </div>

        {/* Controls Section */}
        <div className="bg-[#161616] rounded-xl border border-gray-800 mb-6">
          <div className="p-6 border-b border-gray-800">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div className="flex items-center gap-4">
                <h2 className="text-lg font-semibold text-white">Spin Records</h2>
                <span className="bg-gray-800 text-gray-300 px-3 py-1 rounded-full text-sm">
                  {filteredHistory.length} records
                </span>
              </div>
              
              <div className="flex flex-wrap gap-3">
                {/* Filter Buttons */}
                <div className="flex bg-gray-900 rounded-lg p-1 border border-gray-700">
                  {filterOptions.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => {
                        setSelectedFilter(option.value);
                        setCurrentPage(1);
                      }}
                      className={`px-4 py-2 text-sm rounded-md transition-all ${
                        selectedFilter === option.value
                          ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/25'
                          : 'text-gray-400 hover:text-white hover:bg-gray-800'
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-800 bg-[#1a1a1a]">
                  <th className="text-gray-400 text-left py-4 px-6 font-medium text-xs uppercase tracking-wider">SPIN ID</th>
                  <th className="text-gray-400 text-left py-4 px-6 font-medium text-xs uppercase tracking-wider">PRIZE</th>
                  <th className="text-gray-400 text-left py-4 px-6 font-medium text-xs uppercase tracking-wider">VALUE</th>
                  <th className="text-gray-400 text-left py-4 px-6 font-medium text-xs uppercase tracking-wider">DATE & TIME</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800">
                {paginatedHistory.map((spin) => (
                  <tr 
                    key={spin.id}
                    className="hover:bg-[#252525] transition-all duration-200 group"
                  >
                    <td className="py-4 px-6">
                      <span className="text-white text-sm font-medium group-hover:text-blue-400 transition-colors">
                        #{spin.id}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <span className={`${getPrizeBadgeColor(spin.prize)} px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wide inline-block min-w-[120px] text-center`}>
                        {spin.prize}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <span className={`text-lg font-bold ${
                        spin.prizeValue > 0 
                          ? 'text-green-400' 
                          : 'text-gray-400'
                      }`}>
                        ${spin.prizeValue.toLocaleString()}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex flex-col">
                        <span className="text-white text-sm font-medium">
                          {new Date(spin.spinDate).toLocaleDateString()}
                        </span>
                        <span className="text-gray-400 text-xs">
                          {new Date(spin.spinDate).toLocaleTimeString()}
                        </span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Empty State */}
            {paginatedHistory.length === 0 && (
              <div className="text-center py-12">
                <div className="w-24 h-24 mx-auto mb-4 bg-gray-800 rounded-full flex items-center justify-center">
                  <span className="text-4xl">🎰</span>
                </div>
                <h3 className="text-lg font-medium text-gray-300 mb-2">No spins found</h3>
                <p className="text-gray-500">Try adjusting your filters to see more results</p>
              </div>
            )}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="px-6 py-4 border-t border-gray-800 flex items-center justify-between">
              <div className="text-sm text-gray-400">
                Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, filteredHistory.length)} of {filteredHistory.length} results
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="px-4 py-2 text-sm bg-gray-800 text-gray-300 rounded-lg border border-gray-700 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-700 transition-colors"
                >
                  Previous
                </button>
                <button
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 text-sm bg-gray-800 text-gray-300 rounded-lg border border-gray-700 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-700 transition-colors"
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