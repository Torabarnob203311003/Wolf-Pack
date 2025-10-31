import { useState } from 'react';
import { Minus, Plus } from 'lucide-react';
import axiosSecure from '../../lib/axiosSecure';
import { useAuth } from '../../context/AuthContext';

const TicketPurchaseSection = ({ ticketPrice = 30, maxTickets = 50, raffle }) => {
    const [ticketCount, setTicketCount] = useState(0);
    const [loading, setLoading] = useState(false);
    const totalPrice = ticketCount * ticketPrice;
    const {user} = useAuth();

    const handleDecrease = () => {
        setTicketCount(prev => Math.max(1, prev - 1));
    };

    const handleIncrease = () => {
        setTicketCount(prev => Math.min(maxTickets, prev + 1));
    };

    const handleSliderChange = (e) => {
        setTicketCount(parseInt(e.target.value));
    };

    const handleBuyTickets = async () => {
        // Validation checks
        if(!user){
            alert('Please login to purchase tickets');
            return;
        }

        if (!raffle || !raffle._id) {
            alert('Raffle information is missing');
            return;
        }

        if (ticketCount < 1) {
            alert('Please select at least 1 ticket');
            return;
        }

        if (ticketCount > maxTickets) {
            alert(`Maximum ${maxTickets} tickets allowed per user`);
            return;
        }

        // Check if raffle is still active
        if (raffle.status === false) {
            alert('This raffle has ended. Ticket purchase is closed.');
            return;
        }

        // Check if tickets are still available
        const remainingTickets = raffle.totalTicket - raffle.ticketSold;
        if (remainingTickets <= 0) {
            alert('Sorry, all tickets have been sold out!');
            return;
        }

        if (ticketCount > remainingTickets) {
            alert(`Only ${remainingTickets} tickets remaining. Please reduce your quantity.`);
            return;
        }

        // Confirm purchase
        const confirmPurchase = window.confirm(
            `Are you sure you want to purchase ${ticketCount} ticket(s) for £${totalPrice}?`
        );

        if (!confirmPurchase) {
            return;
        }

        try {
            setLoading(true);

            const response = await axiosSecure.post('/ticket/create-ticket', {
                userId: user._id,
                raffleId: raffle._id,
                quantity: ticketCount
            });

            if (response.data.success) {
                alert(`Success! You have purchased ${ticketCount} ticket(s) for £${totalPrice}`);

                // Reset ticket count
                setTicketCount(1);

                // Optionally reload page or update raffle data
                window.location.reload();

                // Or navigate to tickets page
                // window.location.href = '/my-tickets';
            }
        } catch (error) {
            console.error('Error purchasing tickets:', error);

            // Handle specific error messages from backend
            const errorMessage = error.response?.data?.message ||
                error.response?.data?.errorSources?.[0]?.message ||
                'Failed to purchase tickets. Please try again.';

            alert(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    // Calculate remaining tickets
    const remainingTickets = raffle ? raffle.totalTicket - raffle.ticketSold : 0;
    const isRaffleClosed = raffle?.status === false;
    const isSoldOut = remainingTickets <= 0;

    return (
        <div className="w-full bg-[#121212] py-8 px-4">
            <div className="max-w-6xl mx-auto">
                {/* Status Messages */}
                {isRaffleClosed && (
                    <div className="text-center mb-4">
                        <p className="text-red-500 font-semibold">⚠️ This raffle has ended</p>
                    </div>
                )}

                {isSoldOut && !isRaffleClosed && (
                    <div className="text-center mb-4">
                        <p className="text-red-500 font-semibold">🎉 All tickets sold out!</p>
                    </div>
                )}

                {!isSoldOut && !isRaffleClosed && (
                    <div className="text-center mb-4">
                        <p className="text-yellow-500 text-sm">
                            {remainingTickets} tickets remaining
                        </p>
                    </div>
                )}

                {/* Main Container */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-8">

                    {/* Minus Button */}
                    <button
                        onClick={handleDecrease}
                        disabled={ticketCount <= 1 || loading || isRaffleClosed || isSoldOut}
                        className="flex items-center justify-center w-12 h-12 rounded-lg bg-gray-700 hover:bg-gray-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <Minus className="w-6 h-6 text-yellow-500" />
                    </button>

                    {/* Ticket Count Display */}
                    <div className="absolute top-16 sm:relative min-w-[100px] sm:top-0 bg-black px-4 py-1 rounded-md border border-yellow-500">
                        <span className="text-white font-bold text-sm">{ticketCount} tickets</span>
                    </div>

                    {/* Slider Container */}
                    <div className="flex-1 max-w-md">
                        <input
                            type="range"
                            min="0"
                            max={Math.min(maxTickets, remainingTickets)}
                            value={ticketCount}
                            onChange={handleSliderChange}
                            disabled={loading || isRaffleClosed || isSoldOut}
                            className="w-full h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer slider disabled:cursor-not-allowed disabled:opacity-50"
                            style={{
                                background: `linear-gradient(to right, #E28B27 0%, #E28B27 ${(ticketCount / (Math.min(maxTickets, remainingTickets)) * 100)}%, #4b5563 ${(ticketCount / (Math.min(maxTickets, remainingTickets)) * 100)}%, #4b5563 100%)`
                            }}
                        />
                    </div>

                    {/* Plus Button */}
                    <button
                        onClick={handleIncrease}
                        disabled={ticketCount >= Math.min(maxTickets, remainingTickets) || loading || isRaffleClosed || isSoldOut}
                        className="flex items-center justify-center w-12 h-12 rounded-lg bg-gray-700 hover:bg-gray-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <Plus className="w-6 h-6 text-yellow-500" />
                    </button>

                    {/* GET LUCKY DIP Button */}
                    <button
                        onClick={handleBuyTickets}
                        disabled={loading || isRaffleClosed || isSoldOut}
                        className="px-6 py-2 bg-yellow-500 hover:bg-yellow-600 text-black font-bold rounded-lg transition-colors text-sm sm:text-base disabled:opacity-50 disabled:cursor-not-allowed min-w-[160px]"
                    >
                        {loading ? (
                            <span className="flex items-center justify-center gap-2">
                                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Processing...
                            </span>
                        ) : (
                            'GET LUCKY DIP'
                        )}
                    </button>
                </div>

                {/* Bottom Text */}
                <div className="text-center mt-6">
                    <p className="text-yellow-500 text-sm font-semibold">Free Postal Entry Route</p>
                    <p className="text-white text-center mt-2 text-sm">
                        Total: <span className="text-yellow-500 font-bold">£{totalPrice.toFixed(2)}</span>
                    </p>
                    {!isRaffleClosed && !isSoldOut && (
                        <p className="text-gray-400 text-xs mt-1">
                            Max {maxTickets} tickets per user
                        </p>
                    )}
                </div>
            </div>

            <style jsx>
                {`
                    .slider::-webkit-slider-thumb {
                        appearance: none;
                        width: 24px;
                        height: 24px;
                        border-radius: 50%;
                        background: radial-gradient(circle at 30% 30%, #FED34F, #E28B27);
                        cursor: pointer;
                        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
                        border: 3px solid white;
                    }

                    .slider::-moz-range-thumb {
                        width: 24px;
                        height: 24px;
                        border-radius: 50%;
                        background: radial-gradient(circle at 30% 30%, #FED34F, #E28B27);
                        cursor: pointer;
                        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
                        border: 3px solid white;
                    }

                    .slider::-moz-range-track {
                        background: transparent;
                        border: none;
                    }
                `}
            </style>
        </div>
    );
};

export default TicketPurchaseSection;