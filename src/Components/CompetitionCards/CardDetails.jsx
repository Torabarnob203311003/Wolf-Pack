import { useEffect, useState } from 'react';
import FacebookBanner from '../Facebookbanner/Facebookbanner';
import About from '../Common/About';
import Footer from '../Common/Footer';
import { useParams } from 'react-router-dom';
import axiosSecure from '../../lib/axiosSecure';
import TicketPurchaseSection from '../TicketPurchase/TicketPurchase';
import htmlReactParser from 'html-react-parser';

const CardDetails = () => {
  const params = useParams();
  const [raffle, setRaffle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axiosSecure(`/raffles/get-single-raffle/${params.id}`)
      .then(response => {
        if (response.data.success && response.data.data) {
          setRaffle(response.data.data);
        }
        console.log(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error(error);
        setError('Failed to load raffle details');
        setLoading(false);
      });
  }, [params.id])

  if (loading) {
    return (
      <div>
        <div className="flex justify-center items-center min-h-screen">
          <p className="text-white text-lg">Loading raffle details...</p>
        </div>
        <FacebookBanner />
        <About />
        <Footer />
      </div>
    );
  }

  const progressPercentage = (raffle.ticketSold / raffle.totalTicket) * 100;


  if (error || !raffle) {
    return (
      <div>
        <div className="flex justify-center items-center min-h-screen">
          <p className="text-red-500 text-lg">{error || 'Raffle not found'}</p>
        </div>
        <FacebookBanner />
        <About />
        <Footer />
      </div>
    );
  }

  const ticketsSold = raffle.ticketSold;
  const totalTickets = raffle.totalTicket;
  const ticketsAvailable = totalTickets - ticketsSold;

  return (
    <div>
      <div className="flex justify-center items-center min-h-screen p-4 sm:p-6 lg:p-8">
        <div className="bg-[#282727] rounded-xl overflow-hidden shadow-2xl max-w-6xl w-full border border-gray-700">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 relative">

            {/* Left Section: Raffle Image */}
            <div className="relative">
              <img
                src={raffle.thumbnail}
                alt={raffle.title}
                className="w-full h-full object-cover lg:rounded-l-xl rounded-t-xl lg:rounded-tr-none"
                style={{ minHeight: '300px', maxHeight: '600px' }}
              />
            </div>

            {/* Right Section: Details and Price */}
            <div className="p-6 sm:p-8 lg:p-10 text-white relative flex flex-col justify-between lg:rounded-r-xl rounded-b-xl lg:rounded-bl-none">
              {/* Scroll Indicator (Stylized Scrollbar) */}
              <div className="absolute right-2 top-0 bottom-0 w-2 bg-gray-700 rounded-full my-4 hidden lg:block">
                {/* <div 
                    className="absolute left-0 w-full bg-gradient-to-b from-yellow-500 to-orange-600 rounded-full" 
                    style={{ height: '30%', top: '10%' }} // Adjust height and top for scroll position
                ></div> */}
              </div>

              <div className="flex-grow pr-4 lg:pr-6 custom-scrollbar" style={{ maxHeight: '450px', overflowY: 'auto' }}> {/* Added for scrollability on content */}
                <h2 className="text-3xl font-bold mb-2">{raffle.title}</h2>
                <p className="text-sm text-gray-400 mb-4">£{raffle.price} per entry</p>

                <button
                  className="text-black font-bold py-2 px-6 rounded-lg text-sm uppercase transition-all duration-300 mb-6 tracking-wide hover:opacity-90"
                  style={{
                    background: 'linear-gradient(90deg, #E28B27 0%, #F5D334 29.19%, #F6D63E 32.42%, #F5D334 67.48%, #ECC92F 72.69%, #D5AC22 81.69%, #AE7F0D 93.33%, #966200 100%)'
                  }}
                >
                  BUY LUCKY DIP
                </button>

                <p className="text-lg font-semibold mb-2">{raffle.title}</p>
                <p className="text-gray-300 mb-4">{htmlReactParser(raffle.details)}</p>

                {/* Raffle Details */}
                <p className="text-md font-semibold text-yellow-500 mb-2">Raffle Information</p>
                <ul className="list-disc pl-5 text-sm text-gray-300 space-y-1 mb-6">
                  <li>Total Tickets Available: {raffle.totalTicket.toLocaleString()}</li>
                  <li>Price Per Entry: £{raffle.price}</li>
                  <li>Max Tickets Per User: {raffle.perUserTicketLimit}</li>
                  <li>Status: {raffle.status ? 'Active' : 'Inactive'}</li>
                </ul>

                {/* Prize Details */}
                <p className="text-md font-semibold text-yellow-500 mb-2">Prize Details</p>
                <ul className="list-disc pl-5 text-sm text-gray-300 space-y-1 mb-6">
                  <li>Exclusive prize opportunity</li>
                  <li>One lucky winner will be selected</li>
                  <li>All tickets have equal chance of winning</li>
                  <li>Draw to be conducted fairly and transparently</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Bottom Section: Progress Bar and Ticket Info */}
          <div className="p-6  text-white text-center border-t border-gray-700">
           <div className="relative w-full h-4 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="absolute left-0 h-full rounded-full transition-all duration-500 ease-in-out"
                style={{
                  width: `${progressPercentage}%`,
                  background: 'linear-gradient(90deg, #FFFFFF 0%, #E28B27 100%)'
                }}
              ></div>

              {/* Show percentage text */}
              <span className="absolute inset-0 flex items-center justify-center text-sm font-semibold text-black">
                {progressPercentage.toFixed(1)}%
              </span>
            </div>

            <div className="flex justify-between items-center text-sm font-semibold mt-4 px-2">
              <div className="text-left">
                {/* <span className="text-yellow-500 text-lg sm:text-xl font-bold">{ticketsSold.toLocaleString()}</span> */}
                <span className="text-yellow-500 text-lg sm:text-xl font-bold">{raffle.ticketSold}</span>
                <p className="text-gray-400">Tickets sold</p>
              </div>
              <div className="text-right">
                <span className="text-yellow-500 text-lg sm:text-xl font-bold">{ticketsAvailable.toLocaleString()}</span>
                <p className="text-gray-400">Ticket available</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <FacebookBanner />

      <TicketPurchaseSection
        ticketPrice={raffle.price}
        maxTickets={raffle.perUserTicketLimit}
        raffle={raffle}
      />

      <About />

      {/* <Footer /> */}
    </div>

  );
};

export default CardDetails;