import { useEffect, useState } from 'react';

const Success = () => {
  const [countdown, setCountdown] = useState(5);

  // Mock payment data - replace with actual data from your payment flow
  const paymentData = {
    transactionId: 'TXN-' + Math.random().toString(36).substr(2, 9).toUpperCase(),
    amount: 50.00,
    currency: 'GBP',
    date: new Date().toLocaleString(),
    paymentMethod: 'Credit Card',
    cardLastFour: '4242',
    itemsPurchased: 'Premium Credits Package',
    creditsAdded: 50,
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          // Redirect to dashboard or home
          // window.location.href = '/dashboard';
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleDownloadReceipt = () => {
    // Implement receipt download logic
    alert('Receipt download started');
  };

  const handleGoToDashboard = () => {
    // Navigate to dashboard
    // window.location.href = '/dashboard';
    alert('Navigate to dashboard');
  };

  return (
    <div className="min-h-screen bg-[#0f0f0f] text-white flex items-center justify-center p-6">
      <div className="max-w-2xl w-full">
        {/* Success Animation Container */}
        <div className="bg-[#161616] rounded-xl border border-gray-800 overflow-hidden">
          {/* Success Header */}
          <div className="bg-gradient-to-br from-[#a8820f] to-[#E7B20E] p-8 text-center relative overflow-hidden">
            {/* Animated background effect */}
            <div className="absolute inset-0 opacity-20">
              <div className="absolute top-0 left-1/4 w-32 h-32 bg-white rounded-full blur-3xl animate-pulse"></div>
              <div className="absolute bottom-0 right-1/4 w-40 h-40 bg-white rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
            </div>

            {/* Success Icon */}
            <div className="relative mb-4">
              <div className="w-24 h-24 mx-auto bg-black/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                <svg className="w-12 h-12 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              </div>
            </div>

            <h1 className="text-3xl font-bold text-black mb-2">Payment Successful!</h1>
            <p className="text-black/70 text-lg">Your transaction has been completed</p>
          </div>

          {/* Payment Details */}
          <div className="p-8 space-y-6">
            {/* Transaction Info */}
            <div className="bg-[#1f1f1f] rounded-lg p-6 border border-gray-800">
              <h2 className="text-lg font-bold mb-4 text-[#E7B20E]">Transaction Details</h2>
              
              <div className="space-y-3">
                <div className="flex justify-between items-center py-2 border-b border-gray-800">
                  <span className="text-gray-400 text-sm">Transaction ID</span>
                  <span className="font-mono text-sm font-medium">{paymentData.transactionId}</span>
                </div>
                
                <div className="flex justify-between items-center py-2 border-b border-gray-800">
                  <span className="text-gray-400 text-sm">Amount Paid</span>
                  <span className="text-xl font-bold text-[#E7B20E]">
                    £{paymentData.amount.toFixed(2)} {paymentData.currency}
                  </span>
                </div>
                
                <div className="flex justify-between items-center py-2 border-b border-gray-800">
                  <span className="text-gray-400 text-sm">Payment Method</span>
                  <span className="font-medium">{paymentData.paymentMethod} •••• {paymentData.cardLastFour}</span>
                </div>
                
                <div className="flex justify-between items-center py-2 border-b border-gray-800">
                  <span className="text-gray-400 text-sm">Date & Time</span>
                  <span className="font-medium text-sm">{paymentData.date}</span>
                </div>
                
                <div className="flex justify-between items-center py-2">
                  <span className="text-gray-400 text-sm">Item</span>
                  <span className="font-medium">{paymentData.itemsPurchased}</span>
                </div>
              </div>
            </div>

            {/* Credits Added */}
            <div className="bg-gradient-to-br from-[#a8820f]/20 to-[#E7B20E]/20 rounded-lg p-6 border border-[#E7B20E]/30">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm mb-1">Credits Added to Your Account</p>
                  <p className="text-3xl font-bold text-[#E7B20E]">+{paymentData.creditsAdded} Credits</p>
                </div>
                <div className="w-16 h-16 bg-[#E7B20E] rounded-full flex items-center justify-center">
                  <svg className="w-8 h-8 text-black" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1.41 16.09V20h-2.67v-1.93c-1.71-.36-3.16-1.46-3.27-3.4h1.96c.1 1.05.82 1.87 2.65 1.87 1.96 0 2.4-.98 2.4-1.59 0-.83-.44-1.61-2.67-2.14-2.48-.6-4.18-1.62-4.18-3.67 0-1.72 1.39-2.84 3.11-3.21V4h2.67v1.95c1.86.45 2.79 1.86 2.85 3.39H14.3c-.05-1.11-.64-1.87-2.22-1.87-1.5 0-2.4.68-2.4 1.64 0 .84.65 1.39 2.67 1.91s4.18 1.39 4.18 3.91c-.01 1.83-1.38 2.83-3.12 3.16z"/>
                  </svg>
                </div>
              </div>
            </div>

            {/* Success Message */}
            <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <svg className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <div>
                  <p className="text-green-400 font-medium text-sm">Payment Confirmed</p>
                  <p className="text-green-400/70 text-sm mt-1">
                    A confirmation email has been sent to your registered email address.
                  </p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <button
                onClick={handleDownloadReceipt}
                className="flex-1 px-6 py-3 bg-[#1f1f1f] hover:bg-[#2a2a2a] border border-gray-700 rounded-lg font-medium transition flex items-center justify-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Download Receipt
              </button>
              
              <button
                onClick={handleGoToDashboard}
                className="flex-1 px-6 py-3 bg-[#E7B20E] hover:bg-[#e9b005] text-black rounded-lg font-bold transition shadow-lg shadow-[#E7B20E]/25"
              >
                Go to Dashboard
              </button>
            </div>

            {/* Auto Redirect Notice */}
            {countdown > 0 && (
              <div className="text-center pt-4">
                <p className="text-gray-500 text-sm">
                  Redirecting to dashboard in {countdown} seconds...
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Additional Help */}
        <div className="mt-6 text-center">
          <p className="text-gray-400 text-sm">
            Need help? Contact our{' '}
            <a href="/support" className="text-[#E7B20E] hover:underline">
              support team
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Success;