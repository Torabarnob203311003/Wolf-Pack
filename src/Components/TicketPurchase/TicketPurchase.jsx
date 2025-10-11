import React, { useState } from 'react';
import { Minus, Plus } from 'lucide-react';

const TicketPurchaseSection = ({ ticketPrice = 30, maxTickets = 50 }) => {
    const [ticketCount, setTicketCount] = useState(29);
    const totalPrice = ticketCount * ticketPrice;

    const handleDecrease = () => {
        setTicketCount(prev => Math.max(1, prev - 1));
    };

    const handleIncrease = () => {
        setTicketCount(prev => Math.min(maxTickets, prev + 1));
    };

    const handleSliderChange = (e) => {
        setTicketCount(parseInt(e.target.value));
    };

    return (
        <div className="w-full bg-[#121212] py-8 px-4">
            <div className="max-w-6xl mx-auto">
                {/* Title */}
                <h3 className="text-white text-center text-lg sm:text-xl font-semibold mb-8">
                    Choose how many spins you would like to purchase:
                </h3>

                {/* Main Container */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-8">

                    {/* Minus Button */}
                    <button
                        onClick={handleDecrease}
                        disabled={ticketCount <= 1}
                        className="flex items-center justify-center w-12 h-12 rounded-lg bg-gray-700 hover:bg-gray-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <Minus className="w-6 h-6 text-yellow-500" />
                    </button>

                    {/* Ticket Count Display */}
                    <div className="absolute top-16 sm:relative sm:top-0 bg-black px-4 py-1 rounded-md border border-yellow-500">
                        <span className="text-white font-bold text-sm">{ticketCount} tickets</span>
                    </div>

                    {/* Slider Container */}
                    <div className="flex-1 max-w-md">
                        <input
                            type="range"
                            min="1"
                            max={maxTickets}
                            value={ticketCount}
                            onChange={handleSliderChange}
                            className="w-full h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer slider"
                            style={{
                                background: `linear-gradient(to right, #E28B27 0%, #E28B27 ${(ticketCount / maxTickets) * 100}%, #4b5563 ${(ticketCount / maxTickets) * 100}%, #4b5563 100%)`
                            }}
                        />
                    </div>

                    {/* Plus Button */}
                    <button
                        onClick={handleIncrease}
                        disabled={ticketCount >= maxTickets}
                        className="flex items-center justify-center w-12 h-12 rounded-lg bg-gray-700 hover:bg-gray-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <Plus className="w-6 h-6 text-yellow-500" />
                    </button>

                    {/* GET LUCKY DIP Button */}
                    <button className="px-6 py-2 bg-yellow-500 hover:bg-yellow-600 text-black font-bold rounded-lg transition-colors text-sm sm:text-base">
                        GET LUCKY DIP
                    </button>
                </div>

                {/* Bottom Text */}
                <div className="text-center mt-6">
                    <p className="text-yellow-500 text-sm font-semibold">Free Postal Entry Route</p>
                    <p className="text-white text-center mt-2 text-sm">
                        Total: <span className="text-yellow-500 font-bold">£{totalPrice}</span>
                    </p>
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