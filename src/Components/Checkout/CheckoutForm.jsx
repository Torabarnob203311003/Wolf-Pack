import { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { Loader2, CreditCard, Lock, Check, X } from 'lucide-react';
import axiosSecure from '../../lib/axiosSecure';
import { useAuth } from '../../context/AuthContext';

// Initialize Stripe (replace with your publishable key)
const stripePromise = loadStripe('pk_test_51PcPm62MP0L90YjvNNkd1UGVrq9nu0QWdLfYT4pIF7xAJcfykwMCNeTiZVhSswnCNFHdp2WbqZJweJcxk9IRxARE00OCcRlb8N');

const CheckoutForm = ({ ticketPrice, quantity, raffleId, onSuccess, onCancel }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState(false);
  const {user} = useAuth();

  const totalAmount = ticketPrice * quantity;
  const userId = user?._id;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setLoading(true);
    setError(null);
    setProcessing(true);

    try {
      // Step 1: Create payment intent
      const { data: intentData } = await axiosSecure.post('/ticket/create-payment-intent', {
        userId,
        raffleId,
        quantity
      });
      
      const clientSecret = intentData.data.clientSecret;

      const { error: stripeError, paymentIntent } =
      
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        }
      });
      

      if (stripeError) {
        throw new Error(stripeError.message);
      }

      if (paymentIntent.status === 'succeeded') {
        // Step 3: Confirm with backend and create tickets
        const { data: confirmData } = await axiosSecure.post('/ticket/create-ticket', {
          paymentIntentId: paymentIntent.id,
          userId,
          raffleId,
          quantity
        });
        console.log(paymentIntent.id);
        
        //paymentIntent.id
        
        if (confirmData.success) {
          onSuccess(confirmData.tickets);
        } else {
          throw new Error(confirmData.message || 'Failed to create tickets');
        }
      } else {
        throw new Error('Payment was not successful');
      }

    } catch (err) {
      console.error('Payment error:', err);
      setError(err.message || 'Payment failed. Please try again.');
    } finally {
      setLoading(false);
      setProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Order Summary */}
      <div className="bg-gray-900 rounded-lg p-4 border border-gray-800">
        <h3 className="text-white font-semibold mb-3">Order Summary</h3>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between text-gray-400">
            <span>Tickets ({quantity})</span>
            <span>£{ticketPrice} × {quantity}</span>
          </div>
          <div className="border-t border-gray-800 pt-2 flex justify-between text-white font-semibold">
            <span>Total</span>
            <span>£{totalAmount.toFixed(2)}</span>
          </div>
        </div>
      </div>

      {/* Card Element */}
      <div className="bg-gray-900 rounded-lg p-4 border border-gray-800">
        <label className="text-white text-sm font-medium mb-2 flex items-center gap-2">
          <CreditCard size={16} />
          Card Details
        </label>
        <div className="bg-black rounded-lg p-3 border border-gray-700">
          <CardElement
            options={{
              style: {
                base: {
                  fontSize: '16px',
                  color: '#fff',
                  '::placeholder': {
                    color: '#6b7280',
                  },
                },
                invalid: {
                  color: '#ef4444',
                },
              },
            }}
          />
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4 flex items-start gap-3">
          <X className="text-red-500 flex-shrink-0 mt-0.5" size={20} />
          <div className="flex-1">
            <p className="text-red-500 text-sm font-medium">Payment Failed</p>
            <p className="text-red-400 text-xs mt-1">{error}</p>
          </div>
        </div>
      )}

      {/* Security Notice */}
      <div className="flex items-center gap-2 text-xs text-gray-400">
        <Lock size={14} />
        <span>Secure payment powered by Stripe</span>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3">
        <button
          type="button"
          onClick={onCancel}
          disabled={loading}
          className="flex-1 bg-gray-800 text-white py-3 rounded-lg font-semibold hover:bg-gray-700 transition-colors disabled:opacity-50"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={!stripe || loading || processing}
          className="flex-1 bg-gradient-to-r from-yellow-500 to-orange-500 text-black py-3 rounded-lg font-semibold hover:opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <Loader2 className="animate-spin" size={20} />
              Processing...
            </>
          ) : (
            <>
              <Lock size={18} />
              Pay £{totalAmount.toFixed(2)}
            </>
          )}
        </button>
      </div>
    </form>
  );
};

const PaymentModal = ({ isOpen, onClose, ticketPrice, quantity, raffleId, raffleTitle }) => {
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [purchasedTickets, setPurchasedTickets] = useState([]);

  const handlePaymentSuccess = (tickets) => {
    setPurchasedTickets(tickets);
    setPaymentSuccess(true);
    
    // Close modal after 3 seconds
    setTimeout(() => {
      onClose();
      // window.location.reload();
      window.location.href = '/raffle-history';

    }, 3000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-[#1c1c1c] rounded-xl border border-gray-800 max-w-md w-full shadow-2xl">
        {paymentSuccess ? (
          /* Success Screen */
          <div className="p-8 text-center">
            <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Check className="text-white" size={32} />
            </div>
            <h2 className="text-white text-2xl font-bold mb-2">Payment Successful!</h2>
            <p className="text-gray-400 text-sm mb-4">
              You have successfully purchased {quantity} ticket(s) for {raffleTitle}
            </p>
            
            <div className="bg-gray-900 rounded-lg p-4 mb-4">
              <p className="text-gray-400 text-xs mb-2">Your Ticket Numbers:</p>
              <div className="flex flex-wrap gap-2 justify-center">
                {purchasedTickets.map((ticket, idx) => (
                  <span key={idx} className="bg-yellow-500 text-black px-3 py-1 rounded-lg font-mono text-sm font-bold">
                    #{ticket.ticketNumber}
                  </span>
                ))}
              </div>
            </div>
            
            <p className="text-gray-500 text-xs">Redirecting...</p>
          </div>
        ) : (
          /* Payment Form */
          <>
            <div className="p-6 border-b border-gray-800">
              <h2 className="text-white text-xl font-bold">Complete Your Purchase</h2>
              <p className="text-gray-400 text-sm mt-1">{raffleTitle}</p>
            </div>
            
            <div className="p-6">
              <Elements stripe={stripePromise}>
                <CheckoutForm
                  ticketPrice={ticketPrice}
                  quantity={quantity}
                  raffleId={raffleId}
                  onSuccess={handlePaymentSuccess}
                  onCancel={onClose}
                />
              </Elements>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default PaymentModal;