
import axiosSecure from "../../lib/axiosSecure";
import { useAuth } from "../../context/AuthContext";
import toast from "react-hot-toast";

// Initialize Stripe (replace with your publishable key)
// const stripePromise = loadStripe(
//   "pk_test_51PcPm62MP0L90YjvNNkd1UGVrq9nu0QWdLfYT4pIF7xAJcfykwMCNeTiZVhSswnCNFHdp2WbqZJweJcxk9IRxARE00OCcRlb8N"
// );
// const stripePromise = loadStripe('pk_live_51SSPIO45dgA4YHR7Kj2Vi6446tbMmCKBSZb0CHYYjIuQeersc9Uak4sFmFhIkLP7YYXiQgkaJbTwJLADoEnpUlZU004WxG69RL');


const PaymentModal = ({
  isOpen,
  quantity,
  raffleId,
}) => {
  const { user } = useAuth();

  const handleCheckoutRedirect = async () => {
    const response = await axiosSecure.post("/ticket/create-ticket", {
      userId: user._id,
      raffleId: raffleId,
      quantity: quantity.toString(),
    });



    if (response.data.data?.url) {
      window.location.href = response.data.data.url;
    } else {
      toast.error(response.data.data.message || "Purchase failed");
      return;
    }
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
        <div className="w-full max-w-md rounded-2xl border border-gray-800 bg-[#1c1c1c] shadow-2xl">
          {/* Header */}
          <div className="border-b border-gray-800 p-6">
            <h2 className="text-xl font-bold text-white">Secure Checkout</h2>
            <p className="mt-1 text-sm text-gray-400">
              You’ll be redirected to Stripe to complete your payment securely.
            </p>
          </div>

          {/* Content */}
          <div className="p-6 space-y-4">
            <div className="rounded-lg border border-gray-800 bg-black p-4">
              <p className="text-sm text-gray-300">
                🔒 Stripe will handle your payment details.
              </p>
              <p className="mt-1 text-xs text-gray-500">
                We never store your card information.
              </p>
            </div>

            <ul className="space-y-2 text-sm text-gray-400">
              <li>• Multiple payment methods supported</li>
              <li>• Bank-level security</li>
              <li>• Instant confirmation after payment</li>
            </ul>
          </div>

          {/* Action */}
          <div className="p-6 pt-0">
            <button
              onClick={handleCheckoutRedirect}
              className="w-full rounded-xl bg-gradient-to-r from-yellow-500 to-orange-500 py-3 font-semibold text-black transition hover:opacity-90 active:scale-[0.98]"
            >
              Continue to Secure Payment
            </button>

            <p className="mt-3 text-center text-xs text-gray-500">
              Powered by Stripe
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default PaymentModal;
