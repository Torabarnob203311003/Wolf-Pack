import { useState } from 'react';

const TopUpPage = () => {
  const [selectedAmount, setSelectedAmount] = useState(null);
  const [customAmount, setCustomAmount] = useState('');
  const [selectedMethod, setSelectedMethod] = useState('revolut');
  const [isProcessing, setIsProcessing] = useState(false);

  // Predefined amount options
  const amountOptions = [
    { amount: 10, points: 1000, bonus: 0, popular: false },
    { amount: 20, points: 2200, bonus: 200, popular: false },
    { amount: 50, points: 6000, bonus: 1000, popular: true },
    { amount: 100, points: 13000, bonus: 3000, popular: false },
    { amount: 200, points: 28000, bonus: 8000, popular: false },
    { amount: 500, points: 75000, bonus: 25000, popular: false },
  ];

  // Payment methods
  const paymentMethods = [
    {
      id: 'revolut',
      name: 'Revolut',
      icon: '🏦',
      description: 'Instant processing • Secure payment',
      fees: 'No fees'
    }
  ];

  // Calculate points for custom amount
  const calculateCustomPoints = (amount) => {
    const basePoints = amount * 100;
    let bonus = 0;
    
    if (amount >= 500) bonus = 25000;
    else if (amount >= 200) bonus = 8000;
    else if (amount >= 100) bonus = 3000;
    else if (amount >= 50) bonus = 1000;
    else if (amount >= 20) bonus = 200;
    
    return {
      points: basePoints + bonus,
      bonus: bonus
    };
  };

  const handleAmountSelect = (amount) => {
    setSelectedAmount(amount);
    setCustomAmount('');
  };

  const handleCustomAmountChange = (value) => {
    setCustomAmount(value);
    setSelectedAmount(null);
  };

  const handlePayment = async () => {
    const amount = customAmount ? parseFloat(customAmount) : selectedAmount;
    if (!amount || amount < 1) return;

    setIsProcessing(true);
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      // Handle successful payment here
      alert(`Payment successful! You've purchased ${calculateCustomPoints(amount).points} points.`);
    }, 2000);
  };

  const currentPoints = customAmount 
    ? calculateCustomPoints(parseFloat(customAmount) || 0)
    : amountOptions.find(opt => opt.amount === selectedAmount) || { points: 0, bonus: 0 };

  const totalAmount = customAmount ? parseFloat(customAmount) || 0 : selectedAmount || 0;

  return (
    <div className="min-h-screen bg-[#0f0f0f] text-white p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-start mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Top Up Your Account</h1>
          <p className="text-gray-400">Buy points instantly with secure payments</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Amount Selection */}
          <div className="bg-[#161616] rounded-xl border border-gray-800 p-6">
            <h2 className="text-xl font-semibold text-white mb-6">Select Amount</h2>
            
            {/* Predefined Amounts */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              {amountOptions.map((option) => (
                <button
                  key={option.amount}
                  onClick={() => handleAmountSelect(option.amount)}
                  className={`relative p-4 rounded-lg border-2 transition-all duration-200 ${
                    selectedAmount === option.amount
                      ? 'border-yellow-500 bg-yellow-500/10 shadow-lg shadow-yellow-500/25'
                      : 'border-gray-700 bg-[#1a1a1a] hover:border-gray-600 hover:bg-[#202020]'
                  }`}
                >
                  {option.popular && (
                    <span className="absolute -top-2 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-yellow-600 to-yellow-400 text-black px-2 py-1 rounded-full text-xs font-bold">
                      POPULAR
                    </span>
                  )}
                  <div className="text-center">
                    <div className="text-2xl font-bold text-white mb-1">${option.amount}</div>
                    <div className="text-lg font-semibold text-green-400 mb-1">
                      {option.points.toLocaleString()} pts
                    </div>
                    {option.bonus > 0 && (
                      <div className="text-xs text-yellow-400 bg-yellow-400/10 px-2 py-1 rounded">
                        +{option.bonus.toLocaleString()} bonus
                      </div>
                    )}
                  </div>
                </button>
              ))}
            </div>

            {/* Custom Amount */}
            <div className="mb-6">
              <label className="block text-gray-400 text-sm font-medium mb-3">
                Or enter custom amount
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg">$</span>
                <input
                  type="number"
                  value={customAmount}
                  onChange={(e) => handleCustomAmountChange(e.target.value)}
                  placeholder="Enter amount"
                  min="1"
                  className="w-full bg-[#1a1a1a] border-2 border-gray-700 rounded-lg py-4 pl-10 pr-4 text-white placeholder-gray-500 focus:border-yellow-500 focus:outline-none transition-colors"
                />
              </div>
            </div>

            {/* Points Calculation */}
            {totalAmount > 0 && (
              <div className="bg-[#1a1a1a] rounded-lg p-4 border border-gray-700">
                <h3 className="text-white font-semibold mb-3">Points Summary</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between text-gray-400">
                    <span>Base Points:</span>
                    <span>{(totalAmount * 100).toLocaleString()} pts</span>
                  </div>
                  {currentPoints.bonus > 0 && (
                    <div className="flex justify-between text-yellow-400">
                      <span>Bonus Points:</span>
                      <span>+{currentPoints.bonus.toLocaleString()} pts</span>
                    </div>
                  )}
                  <div className="border-t border-gray-700 pt-2 flex justify-between text-white font-semibold">
                    <span>Total Points:</span>
                    <span className="text-green-400">{currentPoints.points.toLocaleString()} pts</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Right Column - Payment Method */}
          <div className="bg-[#161616] rounded-xl border border-gray-800 p-6">
            <h2 className="text-xl font-semibold text-white mb-6">Payment Method</h2>
            
            {/* Payment Methods */}
            <div className="space-y-4 mb-6">
              {paymentMethods.map((method) => (
                <button
                  key={method.id}
                  onClick={() => setSelectedMethod(method.id)}
                  className={`w-full p-4 rounded-lg border-2 text-left transition-all duration-200 ${
                    selectedMethod === method.id
                      ? 'border-yellow-500 bg-yellow-500/10 shadow-lg shadow-yellow-500/25'
                      : 'border-gray-700 bg-[#1a1a1a] hover:border-gray-600'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="text-2xl">{method.icon}</div>
                      <div>
                        <div className="text-white font-semibold">{method.name}</div>
                        <div className="text-gray-400 text-sm">{method.description}</div>
                        <div className="text-green-400 text-sm">{method.fees}</div>
                      </div>
                    </div>
                    {selectedMethod === method.id && (
                      <div className="w-6 h-6 bg-gradient-to-r from-yellow-600 to-yellow-400 rounded-full flex items-center justify-center">
                        <div className="w-2 h-2 bg-black rounded-full"></div>
                      </div>
                    )}
                  </div>
                </button>
              ))}
            </div>

            {/* Payment Details */}
            {totalAmount > 0 && (
              <div className="bg-[#1a1a1a] rounded-lg p-4 border border-gray-700 mb-6">
                <h3 className="text-white font-semibold mb-3">Order Summary</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between text-gray-400">
                    <span>Amount:</span>
                    <span>${totalAmount}</span>
                  </div>
                  <div className="flex justify-between text-gray-400">
                    <span>Points:</span>
                    <span>{currentPoints.points.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-gray-400">
                    <span>Payment Method:</span>
                    <span>Revolut</span>
                  </div>
                  <div className="border-t border-gray-700 pt-2 flex justify-between text-white font-semibold">
                    <span>Total to Pay:</span>
                    <span className="text-green-400">${totalAmount}</span>
                  </div>
                </div>
              </div>
            )}

            {/* Payment Button - Using your yellow gradient */}
            <button
              onClick={handlePayment}
              disabled={!totalAmount || totalAmount < 1 || isProcessing}
              className={`w-full px-4 py-2.5 rounded-lg font-semibold text-sm transition-all ${
                totalAmount && totalAmount >= 1 && !isProcessing
                  ? 'text-black bg-gradient-to-r from-yellow-600 via-yellow-400 to-yellow-700 hover:shadow-lg hover:shadow-yellow-500/20'
                  : 'bg-gray-800 text-gray-500 cursor-not-allowed border border-gray-700'
              }`}
            >
              {isProcessing ? (
                <div className="flex items-center justify-center gap-3">
                  <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
                  Processing Payment...
                </div>
              ) : (
                `Pay $${totalAmount || 0}`
              )}
            </button>

            {/* Security Features */}
            <div className="mt-6 text-center">
              <div className="flex items-center justify-center gap-4 text-gray-400 text-sm">
                <div className="flex items-center gap-1">
                  <span>🔒</span>
                  <span>SSL Secure</span>
                </div>
                <div className="flex items-center gap-1">
                  <span>🛡️</span>
                  <span>Encrypted</span>
                </div>
                <div className="flex items-center gap-1">
                  <span>⚡</span>
                  <span>Instant</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <div className="bg-[#161616] rounded-lg p-4 border border-gray-800 text-center">
            <div className="text-2xl mb-2">⚡</div>
            <h3 className="text-white font-semibold mb-1">Instant Processing</h3>
            <p className="text-gray-400 text-sm">Points added to your account immediately</p>
          </div>
          <div className="bg-[#161616] rounded-lg p-4 border border-gray-800 text-center">
            <div className="text-2xl mb-2">🛡️</div>
            <h3 className="text-white font-semibold mb-1">Secure Payment</h3>
            <p className="text-gray-400 text-sm">Bank-level security with Revolut</p>
          </div>
          <div className="bg-[#161616] rounded-lg p-4 border border-gray-800 text-center">
            <div className="text-2xl mb-2">🎁</div>
            <h3 className="text-white font-semibold mb-1">Bonus Points</h3>
            <p className="text-gray-400 text-sm">Get extra points on larger top-ups</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopUpPage;