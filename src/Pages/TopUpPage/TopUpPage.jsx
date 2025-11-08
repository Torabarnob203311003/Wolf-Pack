import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import axiosSecure from "../../lib/axiosSecure";
import toast from "react-hot-toast";

const TopUpPage = () => {
  const [selectedAmount, setSelectedAmount] = useState(null);
  const [customAmount, setCustomAmount] = useState("");
  const [selectedMethod, setSelectedMethod] = useState("revolut");
  const [isProcessing, setIsProcessing] = useState(false);
  const { user } = useAuth();

  const amountOptions = [
    { amount: 10, points: 10 },
    { amount: 20, points: 20 },
    { amount: 50, points: 50 },
    { amount: 100, points: 100 },
    { amount: 200, points: 200 },
    { amount: 500, points: 500 },
  ];

  const paymentMethods = [
    {
      id: "revolut",
      name: "Revolut",
      icon: "🏦",
      description: "Instant processing • Secure payment",
      fees: "No fees",
    },
  ];

  const calculateCustomPoints = (amount) => {
    const basePoints = amount * 100;
    let bonus = 0;
    if (amount >= 500) bonus = 25000;
    else if (amount >= 200) bonus = 8000;
    else if (amount >= 100) bonus = 3000;
    else if (amount >= 50) bonus = 1000;
    else if (amount >= 20) bonus = 200;
    return { points: basePoints + bonus, bonus };
  };

  const handlePayment = async () => {
    const amount = customAmount
      ? parseFloat(customAmount)
      : selectedAmount || 0;
    if (!amount || amount < 1) return alert("Enter a valid amount");

    try {
      setIsProcessing(true);
      const payload = { userId: user?._id, credit: amount };
      const res = await axiosSecure.patch("/top-up", payload);

      if (res.status === 200 || res.status === 201) {
        toast.success(
          `✅ Top-up successful! You purchased ${
            calculateCustomPoints(amount).points
          } points.`,
          {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          }
        );
      } else {
        toast.error("Something went wrong. Try again.");
      }
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Payment failed.");
    } finally {
      setIsProcessing(false);
    }
  };

  const currentPoints = customAmount
    ? calculateCustomPoints(parseFloat(customAmount) || 0)
    : amountOptions.find((opt) => opt.amount === selectedAmount) || {
        points: 0,
        bonus: 0,
      };

  const totalAmount = customAmount
    ? parseFloat(customAmount) || 0
    : selectedAmount || 0;

  return (
    <div className="min-h-screen bg-[#0f0f0f] text-white p-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-start mb-8">
          <h1 className="text-3xl font-bold mb-2">Top Up Your Account</h1>
          <p className="text-gray-400">
            Buy points instantly with secure payments
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Amount Selection */}
          <div className="bg-[#161616] rounded-xl border border-gray-800 p-6">
            <h2 className="text-xl font-semibold mb-6">Select Amount</h2>
            <div className="grid grid-cols-2 gap-4 mb-6">
              {amountOptions.map((option) => (
                <button
                  key={option.amount}
                  onClick={() => {
                    setSelectedAmount(option.amount);
                    setCustomAmount("");
                  }}
                  className={`relative p-4 rounded-lg border-2 transition-all ${
                    selectedAmount === option.amount
                      ? "border-yellow-500 bg-yellow-500/10 shadow-yellow-500/25"
                      : "border-gray-700 bg-[#1a1a1a] hover:border-gray-600"
                  }`}
                >
                  <div className="text-center">
                    <div className="text-2xl font-bold mb-1">
                      ${option.amount}
                    </div>
                    <div className="text-green-400 font-semibold">
                      {option.points.toLocaleString()} pts
                    </div>
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
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg">
                  $
                </span>
                <input
                  type="number"
                  value={customAmount}
                  onChange={(e) => {
                    setCustomAmount(e.target.value);
                    setSelectedAmount(null);
                  }}
                  placeholder="Enter amount"
                  min="1"
                  className="w-full bg-[#1a1a1a] border-2 border-gray-700 rounded-lg py-4 pl-10 pr-4 text-white focus:border-yellow-500 focus:outline-none"
                />
              </div>
            </div>

            {totalAmount > 0 && (
              <div className="bg-[#1a1a1a] p-4 rounded-lg border border-gray-700">
                <h3 className="text-white font-semibold mb-3">
                  Points Summary
                </h3>
                <div className="flex justify-between text-gray-400 text-sm">
                  <span>Base:</span>
                  <span>{(totalAmount * 100).toLocaleString()} pts</span>
                </div>
                {currentPoints.bonus > 0 && (
                  <div className="flex justify-between text-yellow-400 text-sm">
                    <span>Bonus:</span>
                    <span>+{currentPoints.bonus.toLocaleString()} pts</span>
                  </div>
                )}
                <div className="border-t border-gray-700 mt-2 pt-2 flex justify-between font-semibold">
                  <span>Total:</span>
                  <span className="text-green-400">
                    {currentPoints.points.toLocaleString()} pts
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Payment Section */}
          <div className="bg-[#161616] rounded-xl border border-gray-800 p-6">
            <h2 className="text-xl font-semibold mb-6">Payment Method</h2>
            <div className="space-y-4 mb-6">
              {paymentMethods.map((method) => (
                <button
                  key={method.id}
                  onClick={() => setSelectedMethod(method.id)}
                  className={`w-full p-4 rounded-lg border-2 text-left ${
                    selectedMethod === method.id
                      ? "border-yellow-500 bg-yellow-500/10"
                      : "border-gray-700 hover:border-gray-600"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="text-2xl">{method.icon}</div>
                      <div>
                        <div className="text-white font-semibold">
                          {method.name}
                        </div>
                        <div className="text-gray-400 text-sm">
                          {method.description}
                        </div>
                        <div className="text-green-400 text-sm">
                          {method.fees}
                        </div>
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>

            {totalAmount > 0 && (
              <div className="bg-[#1a1a1a] p-4 rounded-lg border border-gray-700 mb-6">
                <h3 className="font-semibold mb-3">Order Summary</h3>
                <div className="space-y-2 text-sm text-gray-400">
                  <div className="flex justify-between">
                    <span>Amount:</span>
                    <span>${totalAmount}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Points:</span>
                    <span>{currentPoints.points.toLocaleString()}</span>
                  </div>
                  <div className="border-t border-gray-700 pt-2 flex justify-between text-white font-semibold">
                    <span>Total:</span>
                    <span className="text-green-400">${totalAmount}</span>
                  </div>
                </div>
              </div>
            )}

            <button
              onClick={handlePayment}
              disabled={!totalAmount || isProcessing}
              className={`w-full px-4 py-2.5 rounded-lg font-semibold text-sm transition-all ${
                totalAmount && !isProcessing
                  ? "text-black bg-gradient-to-r from-yellow-600 via-yellow-400 to-yellow-700 hover:shadow-lg"
                  : "bg-gray-800 text-gray-500 cursor-not-allowed"
              }`}
            >
              {isProcessing ? "Processing..." : `Pay $${totalAmount || 0}`}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopUpPage;
