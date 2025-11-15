// import { useState } from 'react';
// import { Minus, Plus, X } from 'lucide-react';
// import axiosSecure from '../../lib/axiosSecure';
// import { useAuth } from '../../context/AuthContext';

// const TicketPurchaseSection = ({ ticketPrice = 30, maxTickets = 50, raffle }) => {
//     const [ticketCount, setTicketCount] = useState(0);
//     const [loading, setLoading] = useState(false);
//     const [showQuiz, setShowQuiz] = useState(false);
//     const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
//     const [userAnswer, setUserAnswer] = useState('');
//     const totalPrice = ticketCount * ticketPrice;
//     const {user} = useAuth();

//     const questions = [
//         {
//             question: "What is 2 + 2?",
//             answer: "4"
//         },
//         {
//             question: "What is the capital of France?",
//             answer: "paris"
//         },
//         {
//             question: "How many days are in a week?",
//             answer: "7"
//         },
//         {
//             question: "What color is the sky on a clear day?",
//             answer: "blue"
//         },
//         {
//             question: "What is 10 - 5?",
//             answer: "5"
//         },
//         {
//             question: "How many hours are in a day?",
//             answer: "24"
//         },
//         {
//             question: "What is the opposite of hot?",
//             answer: "cold"
//         },
//         {
//             question: "What do you call a baby dog?",
//             answer: "puppy"
//         },
//         {
//             question: "How many sides does a triangle have?",
//             answer: "3"
//         },
//         {
//             question: "What is the largest planet in our solar system?",
//             answer: "jupiter"
//         },
//         {
//             question: "What is the color of grass?",
//             answer: "green"
//         },
//         {
//             question: "What is 3 × 3?",
//             answer: "9"
//         },
//         {
//             question: "How many months are in a year?",
//             answer: "12"
//         },
//         {
//             question: "What is the capital of England?",
//             answer: "london"
//         },
//         {
//             question: "What do you use to write on paper?",
//             answer: "pen"
//         },
//         {
//             question: "What is 15 ÷ 3?",
//             answer: "5"
//         },
//         {
//             question: "What is the freezing point of water in Celsius?",
//             answer: "0"
//         },
//         {
//             question: "How many legs does a spider have?",
//             answer: "8"
//         },
//         {
//             question: "What is the color of the sun?",
//             answer: "yellow"
//         },
//         {
//             question: "What is 100 ÷ 10?",
//             answer: "10"
//         }
//     ];

//     const handleDecrease = () => {
//         setTicketCount(prev => Math.max(1, prev - 1));
//     };

//     const handleIncrease = () => {
//         setTicketCount(prev => Math.min(maxTickets, prev + 1));
//     };

//     const handleSliderChange = (e) => {
//         setTicketCount(parseInt(e.target.value));
//     };

//     const handleGetLuckyDip = () => {
//         if (ticketCount < 1) {
//             alert('Please select at least 1 ticket');
//             return;
//         }
//         setShowQuiz(true);
//         setCurrentQuestionIndex(Math.floor(Math.random() * questions.length));
//         setUserAnswer('');
//     };

//     const handleQuizSubmit = () => {
//         const currentQuestion = questions[currentQuestionIndex];
        
//         // Case-insensitive comparison and trim whitespace
//         if (userAnswer.trim().toLowerCase() === currentQuestion.answer.toLowerCase()) {
//             setShowQuiz(false);
//             handleBuyTickets();
//         } else {
//             // Try another random question
//             let newIndex;
//             do {
//                 newIndex = Math.floor(Math.random() * questions.length);
//             } while (newIndex === currentQuestionIndex);
            
//             setCurrentQuestionIndex(newIndex);
//             setUserAnswer('');
//             alert('Incorrect answer. Try another question!');
//         }
//     };

//     const handleQuizClose = () => {
//         setShowQuiz(false);
//         setUserAnswer('');
//     };

//     const handleBuyTickets = async () => {
//         // Validation checks
//         if(!user){
//             alert('Please login to purchase tickets');
//             return;
//         }

//         if (!raffle || !raffle._id) {
//             alert('Raffle information is missing');
//             return;
//         }

//         if (ticketCount < 1) {
//             alert('Please select at least 1 ticket');
//             return;
//         }

//         if (ticketCount > maxTickets) {
//             alert(`Maximum ${maxTickets} tickets allowed per user`);
//             return;
//         }

//         // Check if raffle is still active
//         if (raffle.status === false) {
//             alert('This raffle has ended. Ticket purchase is closed.');
//             return;
//         }

//         // Check if tickets are still available
//         const remainingTickets = raffle.totalTicket - raffle.ticketSold;
//         if (remainingTickets <= 0) {
//             alert('Sorry, all tickets have been sold out!');
//             return;
//         }

//         if (ticketCount > remainingTickets) {
//             alert(`Only ${remainingTickets} tickets remaining. Please reduce your quantity.`);
//             return;
//         }

//         // Confirm purchase
//         const confirmPurchase = window.confirm(
//             `Are you sure you want to purchase ${ticketCount} ticket(s) for £${totalPrice}?`
//         );

//         if (!confirmPurchase) {
//             return;
//         }

//         try {
//             setLoading(true);

//             const response = await axiosSecure.post('/ticket/create-ticket', {
//                 userId: user._id,
//                 raffleId: raffle._id,
//                 quantity: ticketCount
//             });

//             if (response.data.success) {
//                 alert(`Success! You have purchased ${ticketCount} ticket(s) for £${totalPrice}`);

//                 // Reset ticket count
//                 setTicketCount(1);

//                 // Optionally reload page or update raffle data
//                 window.location.reload();

//                 // Or navigate to tickets page
//                 // window.location.href = '/my-tickets';
//             }
//         } catch (error) {
//             console.error('Error purchasing tickets:', error);

//             // Handle specific error messages from backend
//             const errorMessage = error.response?.data?.message ||
//                 error.response?.data?.errorSources?.[0]?.message ||
//                 'Failed to purchase tickets. Please try again.';

//             alert(errorMessage);
//         } finally {
//             setLoading(false);
//         }
//     };

//     // Calculate remaining tickets
//     const remainingTickets = raffle ? raffle.totalTicket - raffle.ticketSold : 0;
//     const isRaffleClosed = raffle?.status === false;
//     const isSoldOut = remainingTickets <= 0;

//     return (
//         <div className="w-full bg-[#121212] py-8 px-4">
//             <div className="max-w-6xl mx-auto">
//                 {/* Status Messages */}
//                 {isRaffleClosed && (
//                     <div className="text-center mb-4">
//                         <p className="text-red-500 font-semibold">⚠️ This raffle has ended</p>
//                     </div>
//                 )}

//                 {isSoldOut && !isRaffleClosed && (
//                     <div className="text-center mb-4">
//                         <p className="text-red-500 font-semibold">🎉 All tickets sold out!</p>
//                     </div>
//                 )}

//                 {!isSoldOut && !isRaffleClosed && (
//                     <div className="text-center mb-4">
//                         <p className="text-yellow-500 text-sm">
//                             {remainingTickets} tickets remaining
//                         </p>
//                     </div>
//                 )}

//                 {/* Main Container */}
//                 <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-8">

//                     {/* Minus Button */}
//                     <button
//                         onClick={handleDecrease}
//                         disabled={ticketCount <= 1 || loading || isRaffleClosed || isSoldOut}
//                         className="flex items-center justify-center w-12 h-12 rounded-lg bg-gray-700 hover:bg-gray-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
//                     >
//                         <Minus className="w-6 h-6 text-yellow-500" />
//                     </button>

//                     {/* Ticket Count Display */}
//                     <div className="absolute top-16 sm:relative min-w-[100px] sm:top-0 bg-black px-4 py-1 rounded-md border border-yellow-500">
//                         <span className="text-white font-bold text-sm">{ticketCount} tickets</span>
//                     </div>

//                     {/* Slider Container */}
//                     <div className="flex-1 max-w-md">
//                         <input
//                             type="range"
//                             min="0"
//                             max={Math.min(maxTickets, remainingTickets)}
//                             value={ticketCount}
//                             onChange={handleSliderChange}
//                             disabled={loading || isRaffleClosed || isSoldOut}
//                             className="w-full h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer slider disabled:cursor-not-allowed disabled:opacity-50"
//                             style={{
//                                 background: `linear-gradient(to right, #E28B27 0%, #E28B27 ${(ticketCount / (Math.min(maxTickets, remainingTickets)) * 100)}%, #4b5563 ${(ticketCount / (Math.min(maxTickets, remainingTickets)) * 100)}%, #4b5563 100%)`
//                             }}
//                         />
//                     </div>

//                     {/* Plus Button */}
//                     <button
//                         onClick={handleIncrease}
//                         disabled={ticketCount >= Math.min(maxTickets, remainingTickets) || loading || isRaffleClosed || isSoldOut}
//                         className="flex items-center justify-center w-12 h-12 rounded-lg bg-gray-700 hover:bg-gray-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
//                     >
//                         <Plus className="w-6 h-6 text-yellow-500" />
//                     </button>

//                     {/* GET LUCKY DIP Button */}
//                     <button
//                         onClick={handleGetLuckyDip}
//                         disabled={loading || isRaffleClosed || isSoldOut}
//                         className="px-6 py-2 bg-yellow-500 hover:bg-yellow-600 text-black font-bold rounded-lg transition-colors text-sm sm:text-base disabled:opacity-50 disabled:cursor-not-allowed min-w-[160px]"
//                     >
//                         {loading ? (
//                             <span className="flex items-center justify-center gap-2">
//                                 <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
//                                     <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
//                                     <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                                 </svg>
//                                 Processing...
//                             </span>
//                         ) : (
//                             'GET LUCKY DIP'
//                         )}
//                     </button>
//                 </div>

//                 {/* Bottom Text */}
//                 <div className="text-center mt-6">
//                     <p className="text-yellow-500 text-sm font-semibold">Free Postal Entry Route</p>
//                     <p className="text-white text-center mt-2 text-sm">
//                         Total: <span className="text-yellow-500 font-bold">£{totalPrice.toFixed(2)}</span>
//                     </p>
//                     {!isRaffleClosed && !isSoldOut && (
//                         <p className="text-gray-400 text-xs mt-1">
//                             Max {maxTickets} tickets per user
//                         </p>
//                     )}
//                 </div>
//             </div>

//             {/* Quiz Modal */}
//             {showQuiz && (
//                 <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
//                     <div className="bg-[#1a1a1a] rounded-lg p-6 max-w-md w-full border border-yellow-500">
//                         <div className="flex justify-between items-center mb-4">
//                             <h3 className="text-yellow-500 font-bold text-lg">Lucky Dip Challenge</h3>
//                             <button
//                                 onClick={handleQuizClose}
//                                 className="text-gray-400 hover:text-white transition-colors"
//                             >
//                                 <X className="w-6 h-6" />
//                             </button>
//                         </div>
                        
//                         <div className="mb-6">
//                             <p className="text-white mb-4 text-center">
//                                 Answer this simple question to get your lucky dip tickets!
//                             </p>
//                             <div className="bg-black p-4 rounded-lg border border-gray-700">
//                                 <p className="text-yellow-500 font-semibold text-center text-lg mb-4">
//                                     {questions[currentQuestionIndex].question}
//                                 </p>
//                                 <input
//                                     type="text"
//                                     value={userAnswer}
//                                     onChange={(e) => setUserAnswer(e.target.value)}
//                                     placeholder="Enter your answer..."
//                                     className="w-full px-3 py-2 bg-gray-800 text-white rounded-lg border border-gray-600 focus:border-yellow-500 focus:outline-none"
//                                     onKeyPress={(e) => {
//                                         if (e.key === 'Enter') {
//                                             handleQuizSubmit();
//                                         }
//                                     }}
//                                 />
//                             </div>
//                         </div>

//                         <div className="flex gap-3">
//                             <button
//                                 onClick={handleQuizClose}
//                                 className="flex-1 px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors"
//                             >
//                                 Cancel
//                             </button>
//                             <button
//                                 onClick={handleQuizSubmit}
//                                 disabled={!userAnswer.trim()}
//                                 className="flex-1 px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-black font-bold rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
//                             >
//                                 Submit Answer
//                             </button>
//                         </div>
//                     </div>
//                 </div>
//             )}

//             <style jsx>
//                 {`
//                     .slider::-webkit-slider-thumb {
//                         appearance: none;
//                         width: 24px;
//                         height: 24px;
//                         border-radius: 50%;
//                         background: radial-gradient(circle at 30% 30%, #FED34F, #E28B27);
//                         cursor: pointer;
//                         box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
//                         border: 3px solid white;
//                     }

//                     .slider::-moz-range-thumb {
//                         width: 24px;
//                         height: 24px;
//                         border-radius: 50%;
//                         background: radial-gradient(circle at 30% 30%, #FED34F, #E28B27);
//                         cursor: pointer;
//                         box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
//                         border: 3px solid white;
//                     }

//                     .slider::-moz-range-track {
//                         background: transparent;
//                         border: none;
//                     }
//                 `}
//             </style>
//         </div>
//     );
// };

// export default TicketPurchaseSection;


import { useState } from 'react';
import { Minus, Plus, ShoppingCart, Ticket } from 'lucide-react';
import PaymentModal from '../Checkout/CheckoutForm';


const TicketPurchaseSection = ({ ticketPrice, maxTickets, raffle }) => {
  const [quantity, setQuantity] = useState(1);
  const [showPaymentModal, setShowPaymentModal] = useState(false);

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
    // Check if user is logged in
    const token = localStorage.getItem('token');
    if (!token) {
      alert('Please login to purchase tickets');
      // Redirect to login or show login modal
      return;
    }

    // Check if raffle is active
    if (!raffle.status) {
      alert('This raffle has ended');
      return;
    }

    // Check if tickets are available
    const available = raffle.totalTicket - raffle.ticketSold;
    if (available < quantity) {
      alert(`Only ${available} tickets remaining`);
      return;
    }

    // Open payment modal
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