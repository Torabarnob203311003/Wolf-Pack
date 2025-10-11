// import React, { useEffect, useState } from 'react';
// import FacebookBanner from '../Facebookbanner/Facebookbanner';
// import About from '../Common/About';
// import Footer from '../Common/Footer';
// import { useParams } from 'react-router-dom';
// import axiosSecure from '../../lib/axiosSecure';

// const CardDetails = () => {
//   const params = useParams();
//   const ticketsSold = 12499;
//   const totalTickets = 45815;
//   const ticketsAvailable = totalTickets - ticketsSold;
//   const progressPercentage = (ticketsSold / totalTickets) * 100;
//   const [raffle, setRaffle] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     axiosSecure(`/raffles/get-single-raffle/${params.id}`)
//       .then(response => {
//         setRaffle(response.data);
//         console.log(response.data);

//         setLoading(false);
//       })
//       .catch(error => {
//         console.error(error);
//         setLoading(false);
//       });
//   }, [params.id])

//   return (
//     <div>
//       <div className="flex justify-center items-center min-h-screen p-4 sm:p-6 lg:p-8">
//         <div className="bg-gray-800 rounded-xl overflow-hidden shadow-2xl max-w-6xl w-full border border-gray-700">
//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 relative">

//             {/* Left Section: Car Image */}
//             <div className="relative">
//               <img
//                 src="https://images.pexels.com/photos/244206/pexels-photo-244206.jpeg"
//                 alt="Yellow BMW M3"
//                 className="w-full h-full object-cover lg:rounded-l-xl rounded-t-xl lg:rounded-tr-none"
//                 style={{ minHeight: '300px', maxHeight: '500px' }} // Adjust height as needed
//               />
//             </div>

//             {/* Right Section: Details and Price */}
//             <div className="p-6 sm:p-8 lg:p-10 text-white relative flex flex-col justify-between lg:rounded-r-xl rounded-b-xl lg:rounded-bl-none">
//               {/* Scroll Indicator (Stylized Scrollbar) */}
//               <div className="absolute right-2 top-0 bottom-0 w-2 bg-gray-700 rounded-full my-4 hidden lg:block">
//                 {/* <div 
//                     className="absolute left-0 w-full bg-gradient-to-b from-yellow-500 to-orange-600 rounded-full" 
//                     style={{ height: '30%', top: '10%' }} // Adjust height and top for scroll position
//                 ></div> */}
//               </div>

//               <div className="flex-grow pr-4 lg:pr-6 custom-scrollbar" style={{ maxHeight: '450px', overflowY: 'auto' }}> {/* Added for scrollability on content */}
//                 <h2 className="text-3xl font-bold mb-2">BM3 M3</h2>
//                 <p className="text-sm text-gray-400 mb-4">£0 per entry</p> {/* Assuming 0 per entry for 'BUY LUCKY DIP' */}

//                 <button
//                   className="text-black font-bold py-2 px-6 rounded-lg text-sm uppercase transition-all duration-300 mb-6 tracking-wide hover:opacity-90"
//                   style={{
//                     background: 'linear-gradient(90deg, #E28B27 0%, #F5D334 29.19%, #F6D63E 32.42%, #F5D334 67.48%, #ECC92F 72.69%, #D5AC22 81.69%, #AE7F0D 93.33%, #966200 100%)'
//                   }}
//                 >
//                   BUY LUCKY DIP
//                 </button>

//                 <p className="text-lg font-semibold mb-2">2015 BMW M3 - 74k Miles</p>
//                 <p className="text-gray-300 mb-4">Over 30K Spent On This Car Alone</p>

//                 {/* Comfort Pack & Technology Pack */}
//                 <p className="text-md font-semibold text-yellow-500 mb-2">Comfort Pack & Technology Pack</p>
//                 <ul className="list-disc pl-5 text-sm text-gray-300 space-y-1 mb-6">
//                   <li>Electric Memory Seats</li>
//                   <li>Heads-Up Display</li>
//                   <li>Harman Kardon Sound System</li>
//                   <li>Rear Camera</li>
//                   <li>Bootmod3 Stage 1 Tune – Dyno Proven 533.3bhp (Mallory Park. Nov 2024)</li>
//                   <li>Full Service History</li>
//                 </ul>

//                 {/* Exterior */}
//                 <p className="text-md font-semibold text-yellow-500 mb-2">Exterior</p>
//                 <ul className="list-disc pl-5 text-sm text-gray-300 space-y-1 mb-6">
//                   <li>Wrapped in Speed Yellow (original Mineral White) – door shuts. inside doors & boot professionally finished</li>
//                   <li>Genuine CS Rear Lights</li>
//                   <li>Genuine Icon V.2 Adaptive Headlights</li>
//                 </ul>
//               </div>
//             </div>
//           </div>

//           {/* Bottom Section: Progress Bar and Ticket Info */}
//           <div className="p-6  text-white text-center border-t border-gray-700">
//             <div className="relative w-full h-8 bg-zinc-300 rounded-full mb-4 flex items-center justify-center">
//               <div
//                 className="absolute left-0 h-full rounded-full transition-all duration-500 ease-in-out"
//                 style={{
//                   width: `${progressPercentage}%`,
//                   background: 'linear-gradient(90deg, #FFFFFF 0%, #E28B27 100%)'
//                 }}
//               ></div>
//               <span className="relative z-10 text-sm font-bold text-black drop-shadow-sm">
//                 {`${Math.round(progressPercentage)}%`}
//               </span>
//             </div>

//             <div className="flex justify-between items-center text-sm font-semibold mt-4 px-2">
//               <div className="text-left">
//                 <span className="text-yellow-500 text-lg sm:text-xl font-bold">{ticketsSold.toLocaleString()}</span>
//                 <p className="text-gray-400">Tickets sold</p>
//               </div>
//               <div className="text-right">
//                 <span className="text-yellow-500 text-lg sm:text-xl font-bold">{ticketsAvailable.toLocaleString()}</span>
//                 <p className="text-gray-400">Ticket available</p>
//               </div>
//             </div>
//           </div>
//         </div>




//       </div>



//       <FacebookBanner />

//       <About />


//     </div>

//   );
// };

// export default CardDetails;


import React, { useEffect, useState } from 'react';
import FacebookBanner from '../Facebookbanner/Facebookbanner';
import About from '../Common/About';
import Footer from '../Common/Footer';
import { useParams } from 'react-router-dom';
import axiosSecure from '../../lib/axiosSecure';
import TicketPurchaseSection from '../TicketPurchase/TicketPurchase';

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
  // const progressPercentage = (ticketsSold / totalTickets) * 100;

  return (
    <div>
      <div className="flex justify-center items-center min-h-screen p-4 sm:p-6 lg:p-8">
        <div className="bg-gray-800 rounded-xl overflow-hidden shadow-2xl max-w-6xl w-full border border-gray-700">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 relative">

            {/* Left Section: Raffle Image */}
            <div className="relative">
              <img
                src={raffle.thumbnail}
                alt={raffle.title}
                className="w-full h-full object-cover lg:rounded-l-xl rounded-t-xl lg:rounded-tr-none"
                style={{ minHeight: '300px', maxHeight: '500px' }}
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
                <p className="text-gray-300 mb-4">{raffle.details}</p>

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
            <div className="relative w-full h-8 bg-zinc-300 rounded-full mb-4 flex items-center justify-center">
              <div
                className="absolute left-0 h-full rounded-full transition-all duration-500 ease-in-out"
                style={{
                  // width: `${progressPercentage}%`,
                  width: `70%`,
                  background: 'linear-gradient(90deg, #FFFFFF 0%, #E28B27 100%)'
                }}
              ></div>
              <span className="relative z-10 text-sm font-bold text-black drop-shadow-sm">
                {/* {`${Math.round(progressPercentage)}%`} */}
                {`70%`}
              </span>
            </div>

            <div className="flex justify-between items-center text-sm font-semibold mt-4 px-2">
              <div className="text-left">
                {/* <span className="text-yellow-500 text-lg sm:text-xl font-bold">{ticketsSold.toLocaleString()}</span> */}
                <span className="text-yellow-500 text-lg sm:text-xl font-bold">7,000</span>
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

      <TicketPurchaseSection />

      <About />

      {/* <Footer /> */}
    </div>

  );
};

export default CardDetails;