import { useState } from 'react';
import { Minus, Plus, ShoppingCart, Ticket } from 'lucide-react';
import PaymentModal from '../Checkout/CheckoutForm';
import toast from 'react-hot-toast';
import BotDetectionQuiz from '../BotDetectionQuiz/BotDetectionQuiz';

const TicketPurchaseSection = ({ ticketPrice, maxTickets, raffle }) => {
  const [quantity, setQuantity] = useState(1);
  const [showQuizModal, setShowQuizModal] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [quizPassed, setQuizPassed] = useState(false);

  const handleIncrease = () => {
    if (quantity < maxTickets) {
      setQuantity(quantity + 1);
    }
  };

  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleBuyNow = () => {
    const token = localStorage.getItem('token');
    if (!token) {
      toast.error('Please login to purchase tickets');
      return;
    }

    if (!raffle.status) {
      toast.error('This raffle has ended');
      return;
    }

    const available = raffle.totalTicket - raffle.ticketSold;
    if (available < quantity) {
      toast.error(`Only ${available} tickets remaining`);
      return;
    }

    // Show quiz modal first
    setShowQuizModal(true);
  };

  const handleQuizSuccess = () => {
    setQuizPassed(true);
    setShowPaymentModal(true);
  };

  const totalPrice = (ticketPrice * quantity).toFixed(2);
  const ticketsRemaining = raffle.totalTicket - raffle.ticketSold;

  return (
    <>
      <div className="bg-black py-12 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-white mb-2">
              Purchase Your Tickets
            </h2>
            <p className="text-gray-400 text-sm">
              Select quantity and proceed to checkout
            </p>
          </div>

          {/* Main Card */}
          <div className="bg-gradient-to-br from-gray-900 to-black rounded-2xl border border-yellow-500/30 shadow-2xl overflow-hidden">
            {/* Ticket Info Header */}
            <div className="bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border-b border-yellow-500/30 p-6">
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div className="flex items-center gap-3">
                  <div className="bg-yellow-500 rounded-full p-3">
                    <Ticket className="text-black" size={24} />
                  </div>
                  <div>
                    <h3 className="text-white font-bold text-lg">{raffle.title}</h3>
                    <p className="text-gray-400 text-sm">
                      £{ticketPrice} per ticket
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-gray-400 text-xs">Tickets Remaining</p>
                  <p className="text-yellow-500 text-xl font-bold">
                    {ticketsRemaining.toLocaleString()}
                  </p>
                </div>
              </div>
            </div>

            {/* Quantity Selector */}
            <div className="p-8">
              <div className="grid md:grid-cols-2 gap-8">
                {/* Left: Quantity Controls */}
                <div className="space-y-6">
                  <div>
                    <label className="text-white text-sm font-semibold mb-3 block">
                      Select Quantity
                    </label>
                    <div className="flex items-center gap-4">
                      <button
                        onClick={handleDecrease}
                        disabled={quantity <= 1}
                        className="bg-gray-800 hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed text-white w-12 h-12 rounded-lg flex items-center justify-center transition-colors"
                      >
                        <Minus size={20} />
                      </button>
                      
                      <div className="flex-1 bg-black border border-gray-700 rounded-lg p-4 text-center">
                        <span className="text-white text-3xl font-bold">
                          {quantity}
                        </span>
                        <p className="text-gray-400 text-xs mt-1">
                          {quantity === 1 ? 'ticket' : 'tickets'}
                        </p>
                      </div>
                      
                      <button
                        onClick={handleIncrease}
                        disabled={quantity >= maxTickets || quantity >= ticketsRemaining}
                        className="bg-gray-800 hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed text-white w-12 h-12 rounded-lg flex items-center justify-center transition-colors"
                      >
                        <Plus size={20} />
                      </button>
                    </div>
                    <p className="text-gray-500 text-xs mt-2">
                      Maximum {maxTickets} tickets per user
                    </p>
                  </div>

                  {/* Quick Select Buttons */}
                  <div>
                    <label className="text-white text-sm font-semibold mb-3 block">
                      Quick Select
                    </label>
                    <div className="grid grid-cols-4 gap-2">
                      {[1, 5, 10, maxTickets].map((num) => (
                        <button
                          key={num}
                          onClick={() => setQuantity(Math.min(num, maxTickets, ticketsRemaining))}
                          className={`py-2 rounded-lg font-semibold text-sm transition-all ${
                            quantity === num
                              ? 'bg-yellow-500 text-black'
                              : 'bg-gray-800 text-white hover:bg-gray-700'
                          }`}
                        >
                          {num}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right: Order Summary */}
                <div className="bg-gradient-to-br from-gray-800/50 to-black/50 rounded-xl p-6 border border-gray-700">
                  <h4 className="text-white font-bold text-lg mb-4">
                    Order Summary
                  </h4>
                  
                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Price per ticket</span>
                      <span className="text-white font-semibold">£{ticketPrice}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Quantity</span>
                      <span className="text-white font-semibold">× {quantity}</span>
                    </div>
                    <div className="border-t border-gray-700 pt-3 flex justify-between">
                      <span className="text-white font-bold">Total Amount</span>
                      <span className="text-yellow-500 text-2xl font-bold">
                        £{totalPrice}
                      </span>
                    </div>
                  </div>

                  {/* Benefits */}
                  <div className="bg-black/50 rounded-lg p-4 mb-6">
                    <p className="text-gray-400 text-xs mb-2">What you get:</p>
                    <ul className="space-y-2 text-xs text-gray-300">
                      <li className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-yellow-500 rounded-full"></div>
                        Equal chance to win
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-yellow-500 rounded-full"></div>
                        Instant ticket confirmation
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-yellow-500 rounded-full"></div>
                        Secure payment processing
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-yellow-500 rounded-full"></div>
                        Bot protection verified
                      </li>
                    </ul>
                  </div>

                  {/* Buy Button */}
                  <button
                    onClick={handleBuyNow}
                    disabled={!raffle.status || ticketsRemaining === 0}
                    className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-400 hover:to-orange-400 text-black font-bold py-4 rounded-lg text-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 shadow-lg hover:shadow-yellow-500/50"
                  >
                    <ShoppingCart size={24} />
                    {raffle.status ? 'Buy Now' : 'Raffle Ended'}
                  </button>
                  
                  <p className="text-center text-gray-500 text-xs mt-3">
                    Secure checkout powered by Stripe
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Additional Info */}
          <div className="mt-6 text-center">
            <p className="text-gray-500 text-sm">
              Need help? Contact our support team
            </p>
          </div>
        </div>
      </div>

      {/* Bot Detection Quiz Modal */}
      <BotDetectionQuiz
        isOpen={showQuizModal}
        onClose={() => setShowQuizModal(false)}
        onSuccess={handleQuizSuccess}
      />

      {/* Payment Modal */}
      <PaymentModal
        isOpen={showPaymentModal}
        onClose={() => setShowPaymentModal(false)}
        ticketPrice={ticketPrice}
        quantity={quantity}
        raffleId={raffle._id}
        raffleTitle={raffle.title}
      />
    </>
  );
};

export default TicketPurchaseSection;