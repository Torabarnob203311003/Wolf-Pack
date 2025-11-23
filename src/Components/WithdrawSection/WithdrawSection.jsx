import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import axiosSecure from "../../lib/axiosSecure";
import toast, { Toaster } from "react-hot-toast";

const WithdrawSection = () => {
  const [selectedPayoutMethod, setSelectedPayoutMethod] = useState(null);
  const [withdrawAmount, setWithdrawAmount] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const { user, refetchUser } = useAuth();

  const payoutMethods = [
    {
      id: "stripe-connect",
      name: "Stripe Payout",
      description: "If you have a Stripe account",
      icon: "🔗",
      fields: [
        {
          name: "emailOrAccountId",
          label: "Email address or Stripe Account ID",
          type: "text",
          placeholder: "Email or acct_...",
          required: true
        }
      ]
    },
    {
      id: "bank-transfer",
      name: "Bank Transfer",
      description: "Collect bank details for transfer",
      icon: "🏦",
      fields: [
        {
          name: "fullName",
          label: "Full Name (account holder)",
          type: "text",
          placeholder: "Enter full name",
          required: true
        },
        {
          name: "accountNumber",
          label: "Bank Account Number / IBAN",
          type: "text",
          placeholder: "Enter account number or IBAN",
          required: true
        },
        {
          name: "routingInfo",
          label: "Sort Code / Routing Number / SWIFT/BIC",
          type: "text",
          placeholder: "Enter routing information",
          required: true
        },
        {
          name: "bankName",
          label: "Bank Name",
          type: "text",
          placeholder: "Enter bank name",
          required: true
        },
        {
          name: "country",
          label: "Country",
          type: "text",
          placeholder: "Enter country",
          required: true
        }
      ]
    },
    {
      id: "debit-card",
      name: "Debit Card Payout",
      description: "Direct to your debit card",
      icon: "💳",
      fields: [
        {
          name: "cardNumber",
          label: "Debit Card Number",
          type: "text",
          placeholder: "1234 5678 9012 3456",
          required: true
        },
        {
          name: "expiryDate",
          label: "Expiry Date",
          type: "text",
          placeholder: "MM/YY",
          required: true
        },
        {
          name: "cardholderName",
          label: "Cardholder Name",
          type: "text",
          placeholder: "Enter name as on card",
          required: true
        }
      ]
    }
  ];

  const [formData, setFormData] = useState({
    "stripe-connect": { emailOrAccountId: "" },
    "bank-transfer": { 
      fullName: "", 
      accountNumber: "", 
      routingInfo: "", 
      bankName: "", 
      country: "" 
    },
    "debit-card": { 
      cardNumber: "", 
      expiryDate: "", 
      cardholderName: "" 
    }
  });

  const handleInputChange = (methodId, fieldName, value) => {
    setFormData(prev => ({
      ...prev,
      [methodId]: {
        ...prev[methodId],
        [fieldName]: value
      }
    }));
  };

  // Handle Max button click
  const handleMaxClick = () => {
    const maxRewardPoints = user?.rewardPoint || 0;
    if (maxRewardPoints > 0) {
      setWithdrawAmount(maxRewardPoints.toString());
      toast.success(`Max reward points (${maxRewardPoints}) selected!`);
    } else {
      toast.error("No reward points available for withdrawal");
    }
  };

  const handleWithdraw = async () => {
    if (!withdrawAmount || parseFloat(withdrawAmount) < 1) {
      toast.error("Enter a valid withdrawal amount 😤");
      return;
    }

    if (!selectedPayoutMethod) {
      toast.error("Please select a payout method");
      return;
    }

    const currentMethod = payoutMethods.find(method => method.id === selectedPayoutMethod);
    const currentFormData = formData[selectedPayoutMethod];

    // Validate required fields
    const missingFields = currentMethod.fields.filter(field => 
      field.required && !currentFormData[field.name]?.trim()
    );

    if (missingFields.length > 0) {
      toast.error(`Please fill in all required fields: ${missingFields.map(f => f.label).join(', ')}`);
      return;
    }

    // Check against rewardPoint instead of credit
    if (parseFloat(withdrawAmount) > (user?.rewardPoint || 0)) {
      toast.error("Insufficient reward points for withdrawal 😬");
      return;
    }

    try {
      setIsProcessing(true);

      // API-ready payload structure - using rewardPoint
      const payload = {
        email: user?.email,
        rewardPoint: parseFloat(withdrawAmount),
        userName: user?.userName,
        userId: user?._id,
        amount: parseFloat(withdrawAmount),
        payoutMethod: selectedPayoutMethod,
        payoutDetails: currentFormData,
        // Additional metadata for tracking
        metadata: {
          userEmail: user?.email,
          timestamp: new Date().toISOString(),
          currency: "GBP",
          pointsType: "rewardPoint"
        }
      };
      
      // API call - replace with your actual withdraw endpoint
      const res = await axiosSecure.post("/withdrawal/request-withdrawal", payload);

      if (res.status === 200 || res.status === 201) {
        toast.success(`💰 Withdrawal request for £${withdrawAmount} submitted successfully!`, {
          position: "top-right",
        });

        // Reset form
        setWithdrawAmount("");
        setSelectedPayoutMethod(null);
        setTimeout( async ()=>{
          await refetchUser();
        }, 3000);

      } else {
        toast.error("Withdrawal failed. Please try again.");
      }
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Withdrawal failed 😬", {
        position: "top-right",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const currentMethod = payoutMethods.find(method => method.id === selectedPayoutMethod);
  const availableRewardPoints = user?.rewardPoint || 0;



  return (
    <div className="min-h-screen bg-[#0f0f0f] text-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-start mb-8">
          <h1 className="text-3xl font-bold mb-2">Withdraw Reward Points</h1>
          <p className="text-gray-400">Convert your reward points to cash with secure payouts</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Withdrawal Amount & Method Selection */}
          <div className="bg-[#161616] rounded-xl border border-gray-800 p-6">
            <h2 className="text-xl font-semibold mb-6">Withdrawal Details</h2>

            {/* Withdrawal Amount */}
            <div className="mb-6">
              <label className="block text-gray-400 text-sm font-medium mb-3">
                Amount to Withdraw (£1 = 1 reward point)
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg">
                  £
                </span>
                <input
                  type="number"
                  value={withdrawAmount}
                  onChange={(e) => setWithdrawAmount(e.target.value)}
                  placeholder="Enter amount"
                  min="1"
                  max={availableRewardPoints}
                  className="w-full bg-[#1a1a1a] border-2 border-gray-700 rounded-lg py-4 pl-10 pr-20 text-white focus:border-yellow-500 focus:outline-none"
                />
                {/* Max Button */}
                <button
                  onClick={handleMaxClick}
                  disabled={availableRewardPoints === 0}
                  className={`absolute right-2 top-1/2 -translate-y-1/2 px-3 py-1.5 rounded text-xs font-medium transition-all ${
                    availableRewardPoints > 0
                      ? "bg-yellow-500 text-black hover:bg-yellow-400"
                      : "bg-gray-600 text-gray-400 cursor-not-allowed"
                  }`}
                >
                  MAX
                </button>
              </div>
              <div className="flex justify-between items-center text-sm text-gray-400 mt-2">
                <span>
                  Available reward points: <span className="text-green-400">{availableRewardPoints.toLocaleString()}</span>
                </span>
                {availableRewardPoints > 0 && (
                  <button
                    onClick={handleMaxClick}
                    className="text-yellow-400 hover:text-yellow-300 text-xs underline"
                  >
                    Use all reward points
                  </button>
                )}
              </div>
            </div>

            {/* Payout Method Selection */}
            <div>
              <h3 className="text-lg font-medium mb-4">Select Payout Method</h3>
              <div className="space-y-4">
                {payoutMethods.map((method) => (
                  <button
                    key={method.id}
                    onClick={() => setSelectedPayoutMethod(method.id)}
                    className={`w-full p-4 rounded-lg border-2 text-left transition-all ${
                      selectedPayoutMethod === method.id
                        ? "border-yellow-500 bg-yellow-500/10"
                        : "border-gray-700 hover:border-gray-600"
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div className="text-2xl">{method.icon}</div>
                      <div className="flex-1 text-left">
                        <div className="text-white font-semibold">{method.name}</div>
                        <div className="text-gray-400 text-sm mt-1">{method.description}</div>
                      </div>
                      {selectedPayoutMethod === method.id && (
                        <div className="text-yellow-500">✓</div>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Available Points Summary */}
            {withdrawAmount && (
              <div className="bg-[#1a1a1a] p-4 rounded-lg border border-gray-700 mt-6">
                <h3 className="text-white font-semibold mb-3">Withdrawal Summary</h3>
                <div className="flex justify-between text-gray-400 text-sm">
                  <span>Withdrawal Amount:</span>
                  <span>£{withdrawAmount}</span>
                </div>
                <div className="flex justify-between text-gray-400 text-sm mt-2">
                  <span>Reward Points Deducted:</span>
                  <span>{parseFloat(withdrawAmount).toLocaleString()} pts</span>
                </div>
                <div className="flex justify-between text-gray-400 text-sm mt-2">
                  <span>Remaining Reward Points:</span>
                  <span className="text-green-400">
                    {(availableRewardPoints - parseFloat(withdrawAmount)).toLocaleString()} pts
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Payout Method Details */}
          <div className="bg-[#161616] rounded-xl border border-gray-800 p-6">
            <h2 className="text-xl font-semibold mb-6">
              {currentMethod ? `${currentMethod.name} Details` : "Payout Details"}
            </h2>

            {!selectedPayoutMethod ? (
              <div className="text-center py-12 text-gray-400">
                <div className="text-6xl mb-4">💸</div>
                <p>Select a payout method to continue</p>
              </div>
            ) : (
              <div className="space-y-4">
                {currentMethod.fields.map((field) => (
                  <div key={field.name}>
                    <label className="block text-gray-400 text-sm font-medium mb-2">
                      {field.label} {field.required && <span className="text-red-400">*</span>}
                    </label>
                    <input
                      type={field.type}
                      value={formData[selectedPayoutMethod][field.name]}
                      onChange={(e) => handleInputChange(selectedPayoutMethod, field.name, e.target.value)}
                      placeholder={field.placeholder}
                      className="w-full bg-[#1a1a1a] border-2 border-gray-700 rounded-lg py-3 px-4 text-white focus:border-yellow-500 focus:outline-none"
                      required={field.required}
                    />
                  </div>
                ))}

                {/* Additional Info based on method */}
                {selectedPayoutMethod === "stripe-connect" && (
                  <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4 mt-4">
                    <p className="text-blue-400 text-sm">
                      💡 <strong>Recommended:</strong> Fastest processing times. Ensure your Stripe account is verified.
                    </p>
                  </div>
                )}

                {selectedPayoutMethod === "bank-transfer" && (
                  <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4 mt-4">
                    <p className="text-green-400 text-sm">
                      ⏱️ <strong>Processing:</strong> 2-5 business days. Double-check your bank details.
                    </p>
                  </div>
                )}

                {selectedPayoutMethod === "debit-card" && (
                  <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-4 mt-4">
                    <p className="text-purple-400 text-sm">
                      💳 <strong>Instant:</strong> Funds typically appear within 24 hours on your card.
                    </p>
                  </div>
                )}

                {/* Withdraw Button */}
                <button
                  onClick={handleWithdraw}
                  disabled={!withdrawAmount || isProcessing || parseFloat(withdrawAmount) < 1}
                  className={`w-full px-4 py-2.5 rounded-lg font-semibold text-sm transition-all mt-6 ${
                    withdrawAmount && !isProcessing && parseFloat(withdrawAmount) >= 1
                      ? "text-black bg-gradient-to-r from-green-600 via-green-400 to-green-700 hover:shadow-lg hover:from-green-500 hover:to-green-600"
                      : "bg-gray-800 text-gray-500 cursor-not-allowed"
                  }`}
                >
                  {isProcessing ? "Processing..." : `Withdraw £${withdrawAmount || 0}`}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      <Toaster/>
    </div>
  );
};

export default WithdrawSection;