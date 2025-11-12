import { useState } from 'react';
import toast from 'react-hot-toast';
import axiosSecure from '../../lib/axiosSecure';
import { useAuth } from '../../context/AuthContext';

const RewardsSwapPage = () => {
  const [activeTab, setActiveTab] = useState('swap');
  const [swapAmount, setSwapAmount] = useState('');
  const [withdrawAmount, setWithdrawAmount] = useState('');
  const [withdrawMethod, setWithdrawMethod] = useState('');
  const [accountDetails, setAccountDetails] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const {user, refetchUser} = useAuth();

  // Mock user data
  const userData = {
    rewardPoints: user?.rewardPoint,
    credits: user?.credit,
    conversionRate: 1, 
  };

  const withdrawMethods = [
    { value: 'paypal', label: 'PayPal', icon: '💳' },
    { value: 'bank', label: 'Bank Transfer', icon: '🏦' },
    { value: 'crypto', label: 'Cryptocurrency', icon: '₿' },
  ];

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

    console.log(response.data);

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

  const handleWithdraw = async () => {
    const amount = Number(withdrawAmount);
    if (!withdrawAmount || isNaN(amount) || amount <= 0) {
      toast.error('Please enter a valid amount');
      return;
    }
    if (amount > userData.rewardPoints) {
      toast.error('Insufficient reward points');
      return;
    }
    if (!withdrawMethod) {
      toast.error('Please select a withdrawal method');
      return;
    }
    if (!accountDetails) {
      toast.error('Please enter account details');
      return;
    }

    setIsProcessing(true);
    // Simulate API call

    await refetchUser();

    
    setTimeout(() => {
      toast.success(`Withdrawal request for ${amount} points submitted successfully!`);
      setWithdrawAmount('');
      setAccountDetails('');
      setIsProcessing(false);
    }, 1500);
  };

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
            <p className="text-black/60 text-xs mt-2">≈ ${calculateCredits(userData.rewardPoints)} USD</p>
          </div>
          <div className="bg-[#161616] rounded-xl p-6 border border-gray-800 hover:border-gray-700 transition">
            <p className="text-gray-400 text-sm mb-1">Current Credits</p>
            <p className="text-4xl font-bold text-white">${userData.credits}</p>
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
        {activeTab === 'withdraw' && (
          <div className="bg-[#161616] rounded-xl border border-gray-800 p-6">
            <h2 className="text-xl font-bold mb-4">Withdraw Reward Points</h2>
            <p className="text-gray-400 text-sm mb-6">Cash out your reward points directly to your preferred payment method</p>

            <div className="space-y-6">
              {/* Amount Input */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Amount (Points)
                </label>
                <div className="relative">
                  <input
                    type="number"
                    value={withdrawAmount}
                    onChange={(e) => setWithdrawAmount(e.target.value)}
                    placeholder="Enter points to withdraw"
                    className="w-full bg-[#1f1f1f] border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#E7B20E] focus:ring-2 focus:ring-[#E7B20E]/20 transition"
                  />
                  <button
                    onClick={() => setWithdrawAmount(String(userData.rewardPoints))}
                    className="absolute right-2 top-1/2 -translate-y-1/2 px-3 py-1 bg-gray-700 hover:bg-gray-600 rounded text-xs font-medium transition"
                  >
                    MAX
                  </button>
                </div>
              </div>

              {/* Withdrawal Methods */}
              {/* <div>
                <label className="block text-sm font-medium text-gray-300 mb-3">
                  Withdrawal Method
                </label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {withdrawMethods.map((method) => (
                    <button
                      key={method.value}
                      onClick={() => setWithdrawMethod(method.value)}
                      className={`p-4 rounded-lg border-2 transition ${
                        withdrawMethod === method.value
                          ? 'border-[#E7B20E] bg-[#E7B20E]/10'
                          : 'border-gray-700 bg-[#1f1f1f] hover:border-gray-600'
                      }`}
                    >
                      <div className="text-3xl mb-2">{method.icon}</div>
                      <div className="text-sm font-medium">{method.label}</div>
                    </button>
                  ))}
                </div>
              </div> */}

              {/* Account Details */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Account Details
                </label>
                <textarea
                  value={accountDetails}
                  onChange={(e) => setAccountDetails(e.target.value)}
                  placeholder={`Enter your ${withdrawMethod ? withdrawMethods.find(m => m.value === withdrawMethod)?.label : 'payment'} account details...`}
                  rows={3}
                  className="w-full bg-[#1f1f1f] border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#E7B20E] focus:ring-2 focus:ring-[#E7B20E]/20 transition resize-none"
                />
              </div>

              {/* Conversion Display */}
              {Number(withdrawAmount) > 0 && (
                <div className="bg-[#1f1f1f] border border-gray-700 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-400 text-sm">Withdrawal amount</p>
                      <p className="text-2xl font-bold text-[#E7B20E]">${calculateCredits(Number(withdrawAmount))}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-gray-400 text-sm">Processing fee</p>
                      <p className="text-sm font-medium">$0.00</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Withdraw Button */}
              <button
                onClick={handleWithdraw}
                disabled={isProcessing || Number(withdrawAmount) <= 0 || !withdrawMethod}
                className={`w-full py-4 rounded-lg font-bold text-black transition ${
                  isProcessing || Number(withdrawAmount) <= 0 || !withdrawMethod
                    ? 'bg-gray-700 cursor-not-allowed'
                    : 'bg-[#E7B20E] hover:bg-[#2bc4a4] shadow-lg shadow-[#E7B20E]/25'
                }`}
              >
                {isProcessing ? 'Processing...' : 'Request Withdrawal'}
              </button>

              {/* Warning Box */}
              <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4">
                <p className="text-yellow-400 text-sm">
                  ⚠️ Withdrawal requests are processed within 24-48 hours. Minimum withdrawal: 1000 points.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Recent Transactions */}
        <div className="mt-8 bg-[#161616] rounded-xl border border-gray-800 p-6">
          <h3 className="text-lg font-bold mb-4">Recent Transactions</h3>
          <div className="space-y-3">
            {[
              { type: 'swap', amount: 1000, value: 50, date: '2025-11-08', status: 'completed' },
              { type: 'withdraw', amount: 2000, value: 100, date: '2025-11-06', status: 'pending' },
              { type: 'swap', amount: 500, value: 25, date: '2025-11-05', status: 'completed' },
            ].map((transaction, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-[#1f1f1f] rounded-lg border border-gray-800 hover:border-gray-700 transition">
                <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    transaction.type === 'swap' ? 'bg-blue-500/20 text-blue-400' : 'bg-purple-500/20 text-purple-400'
                  }`}>
                    {transaction.type === 'swap' ? '💱' : '💸'}
                  </div>
                  <div>
                    <p className="font-medium">{transaction.type === 'swap' ? 'Swap to Credits' : 'Withdrawal'}</p>
                    <p className="text-sm text-gray-400">{transaction.amount} points → ${transaction.value}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`text-sm font-medium ${
                    transaction.status === 'completed' ? 'text-green-400' : 'text-yellow-400'
                  }`}>
                    {transaction.status === 'completed' ? '✓ Completed' : '⏳ Pending'}
                  </p>
                  <p className="text-xs text-gray-500">{transaction.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RewardsSwapPage;