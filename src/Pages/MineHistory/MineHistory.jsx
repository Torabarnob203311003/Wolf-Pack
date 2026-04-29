import { useEffect, useState } from 'react';
import axiosSecure from '../../lib/axiosSecure';
import { useAuth } from '../../context/AuthContext';

const RESULT_LABELS = {
  won: { label: 'Won', color: 'bg-green-500/20 text-green-400 border border-green-500/30' },
  cashout: { label: 'Cashout', color: 'bg-green-500/20 text-green-400 border border-green-500/30' },
  lost: { label: 'Lost', color: 'bg-red-500/20 text-red-400 border border-red-500/30' },
  pending: { label: 'Pending', color: 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30' },
};

const MineHistoryPage = () => {
  const [games, setGames] = useState([]);
  const [stats, setStats] = useState(null);
  const [total, setTotal] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [statsLoading, setStatsLoading] = useState(true);
  const { user, loading: authLoading } = useAuth();
  const limit = 20;

  const fetchHistory = async (page = 1) => {
    try {
      setLoading(true);
      const { data } = await axiosSecure.get(`/mine/v1/history?page=${page}&limit=${limit}`);
      setGames(data.games || []);
      setTotal(data.total || 0);
    } catch (error) {
      console.error('Failed to fetch mine history:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      setStatsLoading(true);
      const { data } = await axiosSecure.get('/credit-history/mine-analysis');
      setStats(data.data);
    } catch (error) {
      console.error('Failed to fetch mine stats:', error);
    } finally {
      setStatsLoading(false);
    }
  };

  useEffect(() => {
    if (user && !authLoading) {
      fetchHistory(currentPage);
      fetchStats();
    }
  }, [user, authLoading, currentPage]);

  const totalPages = Math.ceil(total / limit);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const getResultBadge = (result) => {
    const config = RESULT_LABELS[result] || { label: result, color: 'bg-gray-800 text-gray-400 border border-gray-700' };
    return (
      <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${config.color}`}>
        {config.label}
      </span>
    );
  };

  if (loading && statsLoading) {
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

  const winRate = stats && stats.totalGames > 0
    ? Math.round((stats.winCount / stats.totalGames) * 100)
    : 0;

  return (
    <div className="min-h-screen bg-[#0f0f0f] text-white p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">Mine Game History</h1>
        <p className="text-gray-400 mb-8">Track your mine game activity and results</p>

        {/* Stats */}
        {!statsLoading && stats && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-[#161616] rounded-xl p-5 border border-gray-800 hover:border-gray-700 transition">
              <p className="text-gray-400 text-sm mb-1">Total Games</p>
              <p className="text-2xl font-bold">{stats.totalGames}</p>
            </div>
            <div className="bg-[#161616] rounded-xl p-5 border border-gray-800 hover:border-gray-700 transition">
              <p className="text-gray-400 text-sm mb-1">Win Rate</p>
              <p className="text-2xl font-bold text-yellow-400">{winRate}%</p>
            </div>
            <div className="bg-[#161616] rounded-xl p-5 border border-gray-800 hover:border-gray-700 transition">
              <p className="text-gray-400 text-sm mb-1">Total Bet</p>
              <p className="text-2xl font-bold">{stats.totalBet} cr</p>
            </div>
            <div className="bg-[#161616] rounded-xl p-5 border border-gray-800 hover:border-gray-700 transition">
              <p className="text-gray-400 text-sm mb-1">Net P/L</p>
              <p className={`text-2xl font-bold ${stats.netProfit >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                {stats.netProfit >= 0 ? '+' : ''}{stats.netProfit?.toFixed(2)} rp
              </p>
            </div>
          </div>
        )}

        {/* No stats yet */}
        {!statsLoading && !stats && (
          <div className="bg-[#161616] rounded-xl p-6 border border-gray-800 mb-8 text-center text-gray-400">
            No mine games played yet.
          </div>
        )}

        {/* History Table */}
        <div className="bg-[#161616] rounded-xl border border-gray-800 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-800 bg-[#1a1a1a]">
                  <th className="text-gray-400 py-4 px-6 text-left text-xs uppercase tracking-wider">Result</th>
                  <th className="text-gray-400 py-4 px-6 text-left text-xs uppercase tracking-wider">Bet</th>
                  <th className="text-gray-400 py-4 px-6 text-left text-xs uppercase tracking-wider">Payout (rp)</th>
                  <th className="text-gray-400 py-4 px-6 text-left text-xs uppercase tracking-wider">Multiplier</th>
                  <th className="text-gray-400 py-4 px-6 text-left text-xs uppercase tracking-wider">Mines</th>
                  <th className="text-gray-400 py-4 px-6 text-left text-xs uppercase tracking-wider">Tiles Revealed</th>
                  <th className="text-gray-400 py-4 px-6 text-left text-xs uppercase tracking-wider">Date</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={7} className="py-10 text-center text-gray-400">Loading...</td>
                  </tr>
                ) : games.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="py-10 text-center text-gray-400">No games found.</td>
                  </tr>
                ) : (
                  games.map((game) => (
                    <tr key={game.gameId} className="border-b border-gray-800 hover:bg-[#1f1f1f] transition">
                      <td className="py-4 px-6">{getResultBadge(game.result)}</td>
                      <td className="py-4 px-6 font-semibold">{game.bet} cr</td>
                      <td className="py-4 px-6">
                        <span className={
                          game.result === 'lost'
                            ? 'text-red-400 font-bold'
                            : 'text-green-400 font-bold'
                        }>
                          {game.result === 'lost'
                            ? '—'
                            : `+${game.currentPayout?.toFixed(2)} rp`}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-gray-300">×{game.multiplier?.toFixed(4)}</td>
                      <td className="py-4 px-6 text-gray-300">{game.mines}</td>
                      <td className="py-4 px-6 text-gray-300">{game.revealed}</td>
                      <td className="py-4 px-6 text-gray-400">
                        {new Date(game.expiresAt).toLocaleString()}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between px-6 py-4 border-t border-gray-800 bg-[#1a1a1a]">
              <div className="text-sm text-gray-400">
                Page {currentPage} of {totalPages} ({total} total games)
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition ${
                    currentPage === 1
                      ? 'bg-gray-800 text-gray-600 cursor-not-allowed'
                      : 'bg-[#DA9F0A] text-black hover:bg-[#DA9F0A]/80'
                  }`}
                >
                  Previous
                </button>
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition ${
                    currentPage === totalPages
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

export default MineHistoryPage;
