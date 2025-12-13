import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import axiosSecure from '../../lib/axiosSecure';
import { useAuth } from '../../context/AuthContext';
import WithdrawSection from '../../Components/WithdrawSection/WithdrawSection';

const RewardsSwapPage = () => {
  const [activeTab, setActiveTab] = useState('swap');
  const [swapAmount, setSwapAmount] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [withdrawalHistory, setWithdrawalHistory] = useState([]);
  const { user, refetchUser } = useAuth();

  // Mock user data
  const userData = {
    rewardPoints: user?.rewardPoint,
    credits: user?.credit,
    conversionRate: 1, 
  };

  const calculateCredits = (points) => {
    return (points / userData.conversionRate).toFixed(2);
  };

  const handleSwap = async () => {
    const amount = Number(swapAmount);
    if (!swapAmount || isNaN(amount) || amount <= 0) {
      toast.error("Please enter a valid amount");
      return;
    }
    if (amount > userData.rewardPoints) {
      toast.error("Insufficient reward points");
      return;
    }

    setIsProcessing(true);
    try {
      // Calculate credit based on your conversion rate
      const credit = amount / userData.conversionRate;

      const response = await axiosSecure.patch(`/top-up/swap`, {
        userId: user && '_id' in user ? user._id : undefined,
        credit: credit,
        rewardPoint: amount,
      });

      console.log(response.data.status);
      
      await refetchUser();
      
      toast.success(
        `Successfully swapped ${amount} points → $${credit.toFixed(2)} credits!`
      );

      // optionally update UI locally
      userData.rewardPoints -= amount;
      userData.credits += credit;
      setSwapAmount("");
    } catch (error) {
      const message =
        error?.response?.data?.message || "Swap failed. Please try again.";
      toast.error(message);
    } finally {
      setIsProcessing(false);
    }
  };

  const fetchWithdrawalHistory = async () =>{
    try{
      const response = await axiosSecure.get(`/withdrawal/${user.email}/user-withdrawals-history`)
      
      setWithdrawalHistory(response.data.data);
    }catch(error){
      console.error("Error fetching withdrawal history:", error);
    }
  }

  useEffect(()=>{
    fetchWithdrawalHistory();
  }, []);

  return (
    <div className="min-h-screen bg-[#0f0f0f] text-white p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Rewards Center</h1>
          <p className="text-gray-400">Swap your reward points or withdraw them</p>
        </div>

        {/* Balance Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-gradient-to-br from-[#a8820f] to-[#E7B20E] rounded-xl p-6 shadow-lg shadow-[#E7B20E]/20">
            <p className="text-black/70 text-sm mb-1 font-medium">Available Reward Points</p>
            <p className="text-4xl font-bold text-black">{userData.rewardPoints}</p>
            <p className="text-black/60 text-xs mt-2">≈ £{calculateCredits(userData.rewardPoints)} GBP</p>
          </div>
          <div className="bg-[#161616] rounded-xl p-6 border border-gray-800 hover:border-gray-700 transition">
            <p className="text-gray-400 text-sm mb-1">Current Credits</p>
            <p className="text-4xl font-bold text-white">£{userData.credits}</p>
            <p className="text-gray-500 text-xs mt-2">1 Credit = {userData.conversionRate} Points</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6 bg-[#161616] rounded-lg p-1 border border-gray-800">
          <button
            onClick={() => setActiveTab('swap')}
            className={`flex-1 px-6 py-3 text-sm font-medium rounded-md transition-all ${
              activeTab === 'swap'
                ? 'bg-[#E7B20E] text-black shadow-lg shadow-[#E7B20E]/25'
                : 'text-gray-400 hover:text-white hover:bg-[#1f1f1f]'
            }`}
          >
            💱 Swap to Credits
          </button>
          <button
            onClick={() => setActiveTab('withdraw')}
            className={`flex-1 px-6 py-3 text-sm font-medium rounded-md transition-all ${
              activeTab === 'withdraw'
                ? 'bg-[#E7B20E] text-black shadow-lg shadow-[#E7B20E]/25'
                : 'text-gray-400 hover:text-white hover:bg-[#1f1f1f]'
            }`}
          >
            💸 Withdraw Points
          </button>
        </div>

        {/* Swap Section */}
        {activeTab === 'swap' && (
          <div className="bg-[#161616] rounded-xl border border-gray-800 p-6">
            <h2 className="text-xl font-bold mb-4">Swap Points to Credits</h2>
            <p className="text-gray-400 text-sm mb-6">Convert your reward points into account credits that you can use for purchases</p>

            <div className="space-y-6">
              {/* Input Field */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Amount (Points)
                </label>
                <div className="relative">
                  <input
                    type="number"
                    value={swapAmount}
                    onChange={(e) => setSwapAmount(e.target.value)}
                    placeholder="Enter points to swap"
                    className="w-full bg-[#1f1f1f] border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#E7B20E] focus:ring-2 focus:ring-[#E7B20E]/20 transition"
                  />
                  <button
                    onClick={() => setSwapAmount(String(userData.rewardPoints))}
                    className="absolute right-2 top-1/2 -translate-y-1/2 px-3 py-1 bg-gray-700 hover:bg-gray-600 rounded text-xs font-medium transition"
                  >
                    MAX
                  </button>
                </div>
              </div>

              {/* Conversion Display */}
              {Number(swapAmount) > 0 && (
                <div className="bg-[#1f1f1f] border border-gray-700 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-400 text-sm">You'll receive</p>
                      <p className="text-2xl font-bold text-[#E7B20E]">${calculateCredits(Number(swapAmount))}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-gray-400 text-sm">Conversion rate</p>
                      <p className="text-sm font-medium">{userData.conversionRate} pts = $1</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Swap Button */}
              <button
                onClick={handleSwap}
                disabled={isProcessing || Number(swapAmount) <= 0}
                className={`w-full py-4 rounded-lg font-bold text-black transition ${
                  isProcessing || Number(swapAmount) <= 0
                    ? 'bg-gray-700 cursor-not-allowed'
                    : 'bg-[#E7B20E] hover:bg-[#e9b005] shadow-lg shadow-[#E7B20E]/25'
                }`}
              >
                {isProcessing ? 'Processing...' : 'Swap Now'}
              </button>

              {/* Info Box */}
              <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
                <p className="text-blue-400 text-sm">
                  ℹ️ Credits will be added to your account instantly and can be used for any purchase on the platform.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Withdraw Section */}
        {activeTab === 'withdraw' && ( <WithdrawSection/> )}

        {/* Recent Transactions */}
        <div className="mt-8 bg-[#161616] rounded-xl border border-gray-800 p-6">
  <h3 className="text-lg font-bold mb-4">Recent Transactions</h3>
  
  {withdrawalHistory.length === 0 ? (
    <div className="text-center py-10 text-gray-400">
      <p>No withdrawal history found</p>
    </div>
  ) : (
    <div className="space-y-3">
      {withdrawalHistory.map((transaction) => {
        const getStatusColor = (status) => {
          switch (status) {
            case 'completed':
              return 'text-green-400';
            case 'pending':
              return 'text-yellow-400';
            case 'cancelled':
              return 'text-red-400';
            case 'rejected':
              return 'text-red-400';
            default:
              return 'text-gray-400';
          }
        };

        const getStatusIcon = (status) => {
          switch (status) {
            case 'completed':
              return '✓';
            case 'pending':
              return '⏳';
            case 'cancelled':
              return '✕';
            case 'rejected':
              return '✕';
            default:
              return '•';
          }
        };

        const getMethodIcon = (method) => {
          const methodLower = method?.toLowerCase() || '';
          if (methodLower.includes('stripe') || methodLower.includes('paypal')) return '💳';
          if (methodLower.includes('bank')) return '🏦';
          if (methodLower.includes('debit') || methodLower.includes('card')) return '💳';
          if (methodLower.includes('crypto')) return '₿';
          return '💸';
        };

        return (
          <div 
            key={transaction._id} 
            className="flex items-center justify-between p-4 bg-[#1f1f1f] rounded-lg border border-gray-800 hover:border-gray-700 transition"
          >
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full flex items-center justify-center bg-purple-500/20 text-purple-400">
                {getMethodIcon(transaction.payoutMethod)}
              </div>
              <div>
                <p className="font-medium capitalize">
                  {transaction.payoutMethod.replace('-', ' ')} Withdrawal
                </p>
                <p className="text-sm text-gray-400">
                  {transaction.rewardPoint} points → £{transaction.rewardPoint}
                </p>
                {transaction.payoutDetails?.emailOrAccountId && (
                  <p className="text-xs text-gray-500 mt-1">
                    To: {transaction.payoutDetails.emailOrAccountId}
                  </p>
                )}
                {transaction.payoutDetails?.bankName && (
                  <p className="text-xs text-gray-500 mt-1">
                    To: {transaction.payoutDetails.bankName}
                  </p>
                )}
              </div>
            </div>
                <div className="text-right">
                  <p className={`text-sm font-medium ${getStatusColor(transaction.status)}`}>
                    {getStatusIcon(transaction.status)} {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
                  </p>
                    <p className="text-xs text-gray-500">
                      {new Date(transaction.createdAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric'
                      })}
                    </p>
                  </div>
                </div>
              );
            })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RewardsSwapPage;