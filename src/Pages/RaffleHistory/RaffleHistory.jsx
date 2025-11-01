import { useState, useMemo } from 'react';

const RaffleHistory = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedFilter, setSelectedFilter] = useState('all');
  const itemsPerPage = 10;

  // Mock data - replace with your actual data
  const raffleHistory = useMemo(() => [
    {
      id: '1',
      raffleName: 'Mega Jackpot Draw',
      ticketNumber: 'A-001-25',
      prize: 'Grand Prize',
      prizeValue: 5000,
      drawDate: '2024-01-15 20:30:25',
      status: 'won'
    },
    {
      id: '2',
      raffleName: 'Weekly Lucky Draw',
      ticketNumber: 'WL-042-25',
      prize: 'Consolation',
      prizeValue: 100,
      drawDate: '2024-01-14 18:15:10',
      status: 'won'
    },
    {
      id: '3',
      raffleName: 'Daily Raffle',
      ticketNumber: 'DR-789-25',
      prize: 'No Win',
      prizeValue: 0,
      drawDate: '2024-01-14 12:00:45',
      status: 'lost'
    },
    {
      id: '4',
      raffleName: 'Premium Draw',
      ticketNumber: 'PD-156-25',
      prize: 'Second Prize',
      prizeValue: 1000,
      drawDate: '2024-01-13 22:45:30',
      status: 'won'
    },
    {
      id: '5',
      raffleName: 'Weekend Special',
      ticketNumber: 'WS-333-25',
      prize: 'No Win',
      prizeValue: 0,
      drawDate: '2024-01-12 16:20:15',
      status: 'lost'
    },
    {
      id: '6',
      raffleName: 'Mega Jackpot Draw',
      ticketNumber: 'A-002-25',
      prize: 'JACKPOT',
      prizeValue: 10000,
      drawDate: '2024-01-11 21:10:00',
      status: 'won'
    },
    {
      id: '7',
      raffleName: 'Daily Raffle',
      ticketNumber: 'DR-655-25',
      prize: 'Small Prize',
      prizeValue: 50,
      drawDate: '2024-01-11 14:30:45',
      status: 'won'
    },
    {
      id: '8',
      raffleName: 'Monthly Grand',
      ticketNumber: 'MG-888-25',
      prize: 'No Win',
      prizeValue: 0,
      drawDate: '2024-01-10 19:15:20',
      status: 'lost'
    }
  ], []);

  // Filter options
  const filterOptions = [
    { value: 'all', label: 'All Raffles' },
    { value: 'won', label: 'Wins Only' },
    { value: 'lost', label: 'No Wins' },
    { value: 'jackpot', label: 'Jackpots' }
  ];

  // Calculate statistics
  const stats = useMemo(() => {
    const totalRaffles = raffleHistory.length;
    const totalWinning = raffleHistory.reduce((sum, raffle) => sum + raffle.prizeValue, 0);
    const totalWins = raffleHistory.filter(raffle => raffle.status === 'won').length;
    const totalJackpots = raffleHistory.filter(raffle => raffle.prize === 'JACKPOT').length;
    const biggestWin = Math.max(...raffleHistory.map(raffle => raffle.prizeValue));
    
    return {
      totalRaffles,
      totalWinning,
      totalWins,
      totalJackpots,
      biggestWin
    };
  }, [raffleHistory]);

  // Filter and paginate data
  const filteredHistory = useMemo(() => {
    let filtered = raffleHistory;
    
    switch (selectedFilter) {
      case 'won':
        filtered = raffleHistory.filter(raffle => raffle.status === 'won');
        break;
      case 'lost':
        filtered = raffleHistory.filter(raffle => raffle.status === 'lost');
        break;
      case 'jackpot':
        filtered = raffleHistory.filter(raffle => raffle.prize === 'JACKPOT');
        break;
      default:
        filtered = raffleHistory;
    }
    
    return filtered;
  }, [raffleHistory, selectedFilter]);

  const paginatedHistory = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredHistory.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredHistory, currentPage]);

  const totalPages = Math.ceil(filteredHistory.length / itemsPerPage);

  // Prize badge color function
  const getPrizeBadgeColor = (prize, status) => {
    if (status === 'lost') {
      return 'bg-gray-700 text-gray-300 border border-gray-600';
    }
    
    switch (prize) {
      case 'JACKPOT':
        return 'bg-gradient-to-r from-yellow-500 to-orange-500 text-white shadow-lg shadow-orange-500/25';
      case 'Grand Prize':
        return 'bg-gradient-to-r from-purple-500 to-pink-600 text-white shadow-lg shadow-purple-500/25';
      case 'Second Prize':
        return 'bg-gradient-to-r from-blue-500 to-cyan-600 text-white shadow-lg shadow-blue-500/25';
      case 'Consolation':
        return 'bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-lg shadow-green-500/25';
      case 'Small Prize':
        return 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg shadow-indigo-500/25';
      default:
        return 'bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-lg shadow-green-500/25';
    }
  };

  // Status badge component
  const StatusBadge = ({ status }) => (
    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold ${
      status === 'won' 
        ? 'bg-green-500/20 text-green-400 border border-green-500/30' 
        : 'bg-gray-500/20 text-gray-400 border border-gray-500/30'
    }`}>
      {status === 'won' ? (
        <>
          <span className="w-1.5 h-1.5 bg-green-400 rounded-full mr-2"></span>
          WON
        </>
      ) : (
        <>
          <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mr-2"></span>
          NO WIN
        </>
      )}
    </span>
  );

  return (
    <div className="min-h-screen bg-[#0f0f0f] text-white p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">My Raffle History</h1>
          <p className="text-gray-400">Track your raffle participation and winnings</p>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-[#161616] rounded-xl p-6 border border-gray-800 hover:border-gray-700 transition-colors">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm mb-1">Total Raffles</p>
                <p className="text-2xl font-bold text-white">{stats.totalRaffles}</p>
              </div>
              <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center">
                <span className="text-blue-400 text-xl">🎫</span>
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
                <p className="text-gray-400 text-sm mb-1">Raffles Won</p>
                <p className="text-2xl font-bold text-purple-400">{stats.totalWins}</p>
              </div>
              <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center">
                <span className="text-purple-400 text-xl">🏆</span>
              </div>
            </div>
          </div>

          <div className="bg-[#161616] rounded-xl p-6 border border-gray-800 hover:border-gray-700 transition-colors">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm mb-1">Jackpots</p>
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
                <h2 className="text-lg font-semibold text-white">Raffle Records</h2>
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
                  <th className="text-gray-400 text-left py-4 px-6 font-medium text-xs uppercase tracking-wider">RAFFLE ID</th>
                  <th className="text-gray-400 text-left py-4 px-6 font-medium text-xs uppercase tracking-wider">RAFFLE NAME</th>
                  <th className="text-gray-400 text-left py-4 px-6 font-medium text-xs uppercase tracking-wider">TICKET NO.</th>
                  <th className="text-gray-400 text-left py-4 px-6 font-medium text-xs uppercase tracking-wider">STATUS</th>
                  <th className="text-gray-400 text-left py-4 px-6 font-medium text-xs uppercase tracking-wider">PRIZE</th>
                  <th className="text-gray-400 text-left py-4 px-6 font-medium text-xs uppercase tracking-wider">VALUE</th>
                  <th className="text-gray-400 text-left py-4 px-6 font-medium text-xs uppercase tracking-wider">DRAW DATE</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800">
                {paginatedHistory.map((raffle) => (
                  <tr 
                    key={raffle.id}
                    className="hover:bg-[#252525] transition-all duration-200 group"
                  >
                    <td className="py-4 px-6">
                      <span className="text-white text-sm font-medium group-hover:text-blue-400 transition-colors">
                        #{raffle.id}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <span className="text-white text-sm font-medium">
                        {raffle.raffleName}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <span className="text-gray-400 text-sm font-mono bg-gray-900 px-3 py-1.5 rounded-lg border border-gray-800">
                        {raffle.ticketNumber}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <StatusBadge status={raffle.status} />
                    </td>
                    <td className="py-4 px-6">
                      <span className={`${getPrizeBadgeColor(raffle.prize, raffle.status)} px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wide inline-block min-w-[100px] text-center`}>
                        {raffle.prize}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <span className={`text-lg font-bold ${
                        raffle.prizeValue > 0 
                          ? 'text-green-400' 
                          : 'text-gray-400'
                      }`}>
                        ${raffle.prizeValue.toLocaleString()}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex flex-col">
                        <span className="text-white text-sm font-medium">
                          {new Date(raffle.drawDate).toLocaleDateString()}
                        </span>
                        <span className="text-gray-400 text-xs">
                          {new Date(raffle.drawDate).toLocaleTimeString()}
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
                  <span className="text-4xl">🎫</span>
                </div>
                <h3 className="text-lg font-medium text-gray-300 mb-2">No raffle records found</h3>
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

export default RaffleHistory;