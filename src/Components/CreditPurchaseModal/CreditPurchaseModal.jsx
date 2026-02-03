import { useState } from 'react';
import { Loader2, Coins, CheckCircle, X, AlertCircle } from 'lucide-react';
import axiosSecure from '../../lib/axiosSecure';
import toast from 'react-hot-toast';
import TicketPurchaseSection from '../TicketPurchase/TicketPurchase';
import BotDetectionQuiz from '../BotDetectionQuiz/BotDetectionQuiz';

const CreditPurchaseModal = ({ isOpen, onClose, raffle, user, onSuccess }) => {
  const [quantity, setQuantity] = useState(1);
  const [showQuiz, setShowQuiz] = useState(false);
  const [loading, setLoading] = useState(false);
  const [purchaseSuccess, setPurchaseSuccess] = useState(false);
  const [purchasedTickets, setPurchasedTickets] = useState([]);

  const totalCredits = raffle?.price * quantity;
  const hasEnoughCredits = user?.credit >= totalCredits;

  const handleQuantityChange = (newQuantity) => {
    const available = raffle.totalTicket - raffle.ticketSold;
    const max = Math.min(raffle.perUserTicketLimit, available);
    
    if (newQuantity >= 1 && newQuantity <= max) {

      setQuantity(newQuantity);
      document.getElementById('quantityInput').value = Number(newQuantity) ;
    }
  };

  const handleBuyClick = () => {
    if (!user) {
      toast.error('Please login to purchase tickets');
      return;
    }

    if (!hasEnoughCredits) {
      toast.error(`You need ${totalCredits} credits. You have ${user.credit} credits.`);
      return;
    }

    // Show quiz before purchase
    setShowQuiz(true);
  };

  const handleQuizSuccess = async () => {
    setShowQuiz(false);
    
    try {
      setLoading(true);

      // TODO: API IMPLEMENTATION
      const response = await axiosSecure.post('/ticket/buy-ticket-with-credits-coin', {
        userId: user._id,
        raffleId: raffle._id,
        quantity: quantity.toString()
      });

      if (response.data.data?.success === false) {
        // backend error inside data
        toast.error(response.data.data.message || 'Purchase failed');
        return;
      }

      if (response.data.success) {
        setPurchasedTickets(response.data.tickets || []);
        setPurchaseSuccess(true);
        
        toast.success(`Successfully purchased ${quantity} ticket(s)!`);
        
        // Close modal and refresh after 3 seconds
        setTimeout(() => {
          onSuccess?.();
          onClose();
          window.location.reload();
        }, 3000);
      } else {
        throw new Error(response.data.message || 'Purchase failed');
      }
    } catch (error) {
      console.error('Purchase error:', error);
      toast.error(error.response?.data?.message || 'Failed to purchase tickets. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Main Purchase Modal */}
      <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <div className="bg-[#1c1c1c] rounded-xl border border-yellow-500/30 max-w-md w-full shadow-2xl">
          {purchaseSuccess ? (
            /* Success Screen */
            <div className="p-8 text-center">
              <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="text-white" size={32} />
              </div>
              <h2 className="text-white text-2xl font-bold mb-2">Purchase Successful!</h2>
              <p className="text-gray-400 text-sm mb-4">
                You have successfully purchased {quantity} ticket(s) for {raffle.title}
              </p>
              
              {purchasedTickets.length > 0 && (
                <div className="bg-gray-900 rounded-lg p-4 mb-4">
                  <p className="text-gray-400 text-xs mb-2">Your Ticket Numbers:</p>
                  <div className="flex flex-wrap gap-2 justify-center">
                    {purchasedTickets.map((ticket, idx) => (
                      <span key={idx} className="bg-yellow-500 text-black px-3 py-1 rounded-lg font-mono text-sm font-bold">
                        #{ticket.ticketNumber || ticket._id?.slice(-8)}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              
              <p className="text-gray-500 text-xs">Redirecting...</p>
            </div>
          ) : (
            /* Purchase Form */
            <>
              <div className="bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border-b border-yellow-500/30 p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="bg-gradient-to-br from-yellow-500 to-orange-500 rounded-full p-3">
                      <Coins className="text-black" size={24} />
                    </div>
                    <div>
                      <h2 className="text-white text-xl font-bold">Buy with Credits</h2>
                      <p className="text-gray-400 text-sm">{raffle.title}</p>
                    </div>
                  </div>
                  <button
                    onClick={onClose}
                    className="w-8 h-8 rounded-lg bg-gray-800 hover:bg-gray-700 flex items-center justify-center transition"
                  >
                    <X className="text-white" size={18} />
                  </button>
                </div>
              </div>

              <div className="p-6 space-y-6">
                {/* Credit Balance */}
                <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-lg p-4 border border-gray-700">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-400 text-xs mb-1">Your Credits</p>
                      <p className="text-yellow-500 text-2xl font-bold flex items-center gap-2">
                        <Coins size={20} />
                        {user?.credit || 0}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-gray-400 text-xs mb-1">Cost per Ticket</p>
                      <p className="text-white text-xl font-bold">{raffle.price}</p>
                    </div>
                  </div>
                </div>

                {/* Quantity Selector */}
                <div>
                  <label className="text-white text-sm font-semibold mb-3 block">
                    Select Quantity
                  </label>
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => handleQuantityChange(Number(quantity) - 1)}
                      disabled={quantity <= 1}
                      className="bg-gray-800 hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed text-white w-10 h-10 rounded-lg flex items-center justify-center transition-colors"
                    >
                      -
                    </button>
                    
                    <div className="flex-1 bg-black border border-gray-700 rounded-lg p-3 text-center">
                      <input id='quantityInput' min={1} max={Math.min(raffle.perUserTicketLimit, (raffle.totalTicket - raffle.ticketSold))} defaultValue={quantity} type='number' onChange={(e)=> setQuantity(Number(e.target.value))} className="text-white w-full bg-black focus:outline-none  text-2xl font-bold appearance-none [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none"/>
                      
                    </div>
                    
                    <button
                      onClick={() => handleQuantityChange(Number(quantity) + 1)}
                      disabled={quantity >= Math.min(raffle.perUserTicketLimit, raffle.totalTicket - raffle.ticketSold)}
                      className="bg-gray-800 hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed text-white w-10 h-10 rounded-lg flex items-center justify-center transition-colors"
                    >
                      +
                    </button>
                  </div>
                  <p className="text-gray-500 text-xs mt-2">
                    Max {raffle.perUserTicketLimit} tickets per user
                  </p>
                </div>

                {/* Order Summary */}
                <div className="bg-gray-900 rounded-lg p-4 space-y-2">
                  <h3 className="text-white font-semibold text-sm mb-3">Order Summary</h3>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Tickets ({quantity})</span>
                    <span className="text-white">{raffle.price} × {quantity}</span>
                  </div>
                  <div className="border-t border-gray-800 pt-2 flex justify-between">
                    <span className="text-white font-bold">Total Credits</span>
                    <span className="text-yellow-500 text-xl font-bold flex items-center gap-1">
                      <Coins size={18} />
                      {totalCredits}
                    </span>
                  </div>
                </div>

                {/* Insufficient Credits Warning */}
                {!hasEnoughCredits && (
                  <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4 flex items-start gap-3">
                    <AlertCircle className="text-red-500 flex-shrink-0 mt-0.5" size={20} />
                    <div className="flex-1">
                      <p className="text-red-400 text-sm font-medium">Insufficient Credits</p>
                      <p className="text-red-300 text-xs mt-1">
                        You need {totalCredits - (user?.credit || 0)} more credits to complete this purchase.
                      </p>
                    </div>
                  </div>
                )}

                {/* Buy Button */}
                <button
                  onClick={handleBuyClick}
                  disabled={!hasEnoughCredits || loading}
                  className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-400 hover:to-orange-400 text-black font-bold py-4 rounded-lg text-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 shadow-lg"
                >
                  {loading ? (
                    <>
                      <Loader2 className="animate-spin" size={24} />
                      Processing...
                    </>
                  ) : (
                    <>
                      <Coins size={24} />
                      Buy with Credits
                    </>
                  )}
                </button>

                <p className="text-center text-gray-500 text-xs">
                  Credits will be deducted after purchase
                </p>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Bot Detection Quiz */}
      <BotDetectionQuiz
        isOpen={showQuiz}
        onClose={() => setShowQuiz(false)}
        onSuccess={handleQuizSuccess}
      />
    </>
  );
};

export default CreditPurchaseModal;