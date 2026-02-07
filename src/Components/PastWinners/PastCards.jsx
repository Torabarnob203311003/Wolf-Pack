import React, { useState } from 'react';

const PastCARDS = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const cardsPerPage = 25;
  // Sample data for 25 cards with different cars and winners
  const cardData = [
    { 
      car: "BMW M3 COMPETITION", 
      image: "https://images.unsplash.com/photo-1555215695-3004980ad54e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      winner: "Caroline Wright", 
      ticketNo: "0000 105185",
      date: "Monday 30th June 19:30",
      prize: "40K CASH WHEEL",
      worth: "349K WORTH OF INSTANT WINS"
    },
    { 
      car: "MERCEDES AMG GT", 
      image: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      winner: "James Mitchell", 
      ticketNo: "0000 105186",
      date: "Tuesday 1st July 19:30",
      prize: "35K CASH WHEEL",
      worth: "280K WORTH OF INSTANT WINS"
    },
    { 
      car: "AUDI R8 V10", 
      image: "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      winner: "Sarah Johnson", 
      ticketNo: "0000 105187",
      date: "Wednesday 2nd July 19:30",
      prize: "45K CASH WHEEL",
      worth: "320K WORTH OF INSTANT WINS"
    },
    { 
      car: "PORSCHE 911 TURBO", 
      image: "https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      winner: "Michael Brown", 
      ticketNo: "0000 105188",
      date: "Thursday 3rd July 19:30",
      prize: "50K CASH WHEEL",
      worth: "400K WORTH OF INSTANT WINS"
    },
    { 
      car: "LAMBORGHINI HURACAN", 
      image: "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      winner: "Emma Davis", 
      ticketNo: "0000 105189",
      date: "Friday 4th July 19:30",
      prize: "55K CASH WHEEL",
      worth: "450K WORTH OF INSTANT WINS"
    },
    { 
      car: "FERRARI 488 GTB", 
      image: "https://images.unsplash.com/photo-1583121274602-3e2820c69888?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      winner: "David Wilson", 
      ticketNo: "0000 105190",
      date: "Saturday 5th July 19:30",
      prize: "60K CASH WHEEL",
      worth: "500K WORTH OF INSTANT WINS"
    },
    { 
      car: "McLAREN 720S", 
      image: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      winner: "Lisa Anderson", 
      ticketNo: "0000 105191",
      date: "Sunday 6th July 19:30",
      prize: "42K CASH WHEEL",
      worth: "380K WORTH OF INSTANT WINS"
    },
    { 
      car: "BENTLEY CONTINENTAL", 
      image: "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      winner: "Robert Taylor", 
      ticketNo: "0000 105192",
      date: "Monday 7th July 19:30",
      prize: "48K CASH WHEEL",
      worth: "420K WORTH OF INSTANT WINS"
    },
    { 
      car: "JAGUAR F-TYPE", 
      image: "https://images.unsplash.com/photo-1555215695-3004980ad54e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      winner: "Jennifer White", 
      ticketNo: "0000 105193",
      date: "Tuesday 8th July 19:30",
      prize: "38K CASH WHEEL",
      worth: "310K WORTH OF INSTANT WINS"
    },
    { 
      car: "ASTON MARTIN DB11", 
      image: "https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      winner: "Christopher Lee", 
      ticketNo: "0000 105194",
      date: "Wednesday 9th July 19:30",
      prize: "52K CASH WHEEL",
      worth: "440K WORTH OF INSTANT WINS"
    },
    { 
      car: "MASERATI GRANTURISMO", 
      image: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      winner: "Amanda Clark", 
      ticketNo: "0000 105195",
      date: "Thursday 10th July 19:30",
      prize: "44K CASH WHEEL",
      worth: "360K WORTH OF INSTANT WINS"
    },
    { 
      car: "DODGE CHALLENGER", 
      image: "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      winner: "Kevin Martinez", 
      ticketNo: "0000 105196",
      date: "Friday 11th July 19:30",
      prize: "36K CASH WHEEL",
      worth: "290K WORTH OF INSTANT WINS"
    },
    { 
      car: "CHEVROLET CORVETTE", 
      image: "https://images.unsplash.com/photo-1583121274602-3e2820c69888?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      winner: "Nicole Garcia", 
      ticketNo: "0000 105197",
      date: "Saturday 12th July 19:30",
      prize: "46K CASH WHEEL",
      worth: "390K WORTH OF INSTANT WINS"
    },
    { 
      car: "FORD MUSTANG GT", 
      image: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      winner: "Daniel Rodriguez", 
      ticketNo: "0000 105198",
      date: "Sunday 13th July 19:30",
      prize: "34K CASH WHEEL",
      worth: "275K WORTH OF INSTANT WINS"
    },
    { 
      car: "TESLA MODEL S PLAID", 
      image: "https://images.unsplash.com/photo-1555215695-3004980ad54e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      winner: "Stephanie Lewis", 
      ticketNo: "0000 105199",
      date: "Monday 14th July 19:30",
      prize: "41K CASH WHEEL",
      worth: "335K WORTH OF INSTANT WINS"
    },
    { 
      car: "BMW i8 HYBRID", 
      image: "https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      winner: "Matthew Walker", 
      ticketNo: "0000 105200",
      date: "Tuesday 15th July 19:30",
      prize: "39K CASH WHEEL",
      worth: "315K WORTH OF INSTANT WINS"
    },
    { 
      car: "NISSAN GTR NISMO", 
      image: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      winner: "Rebecca Hall", 
      ticketNo: "0000 105201",
      date: "Wednesday 16th July 19:30",
      prize: "47K CASH WHEEL",
      worth: "405K WORTH OF INSTANT WINS"
    },
    { 
      car: "ACURA NSX HYBRID", 
      image: "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      winner: "Brandon Allen", 
      ticketNo: "0000 105202",
      date: "Thursday 17th July 19:30",
      prize: "43K CASH WHEEL",
      worth: "370K WORTH OF INSTANT WINS"
    },
    { 
      car: "LOTUS EVORA GT", 
      image: "https://images.unsplash.com/photo-1583121274602-3e2820c69888?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      winner: "Michelle Young", 
      ticketNo: "0000 105203",
      date: "Friday 18th July 19:30",
      prize: "37K CASH WHEEL",
      worth: "295K WORTH OF INSTANT WINS"
    },
    { 
      car: "ALFA ROMEO GIULIA", 
      image: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      winner: "Joshua King", 
      ticketNo: "0000 105204",
      date: "Saturday 19th July 19:30",
      prize: "49K CASH WHEEL",
      worth: "425K WORTH OF INSTANT WINS"
    },
    { 
      car: "INFINITI Q60 COUPE", 
      image: "https://images.unsplash.com/photo-1555215695-3004980ad54e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      winner: "Megan Wright", 
      ticketNo: "0000 105205",
      date: "Sunday 20th July 19:30",
      prize: "35K CASH WHEEL",
      worth: "285K WORTH OF INSTANT WINS"
    },
    { 
      car: "GENESIS G70 SPORT", 
      image: "https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      winner: "Tyler Lopez", 
      ticketNo: "0000 105206",
      date: "Monday 21st July 19:30",
      prize: "40K CASH WHEEL",
      worth: "340K WORTH OF INSTANT WINS"
    },
    { 
      car: "LEXUS LC500", 
      image: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      winner: "Ashley Hill", 
      ticketNo: "0000 105207",
      date: "Tuesday 22nd July 19:30",
      prize: "45K CASH WHEEL",
      worth: "385K WORTH OF INSTANT WINS"
    },
    { 
      car: "CADILLAC CTS-V", 
      image: "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      winner: "Ryan Scott", 
      ticketNo: "0000 105208",
      date: "Wednesday 23rd July 19:30",
      prize: "42K CASH WHEEL",
      worth: "355K WORTH OF INSTANT WINS"
    },
    { 
      car: "BUICK REGAL GS", 
      image: "https://images.unsplash.com/photo-1583121274602-3e2820c69888?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      winner: "Crystal Green", 
      ticketNo: "0000 105209",
      date: "Thursday 24th July 19:30",
      prize: "38K CASH WHEEL",
      worth: "320K WORTH OF INSTANT WINS"
    }
  ];

  // Calculate total pages
  const totalPages = Math.ceil(cardData.length / cardsPerPage);
  
  // Get current page data
  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  const currentCards = cardData.slice(indexOfFirstCard, indexOfLastCard);
  
  // Handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    // Scroll to top of cards section
    window.scrollTo({ top: 300, behavior: 'smooth' });
  };

  return (
    <div>
      {/* Header Section */}
      <div className=" py-8 px-4">
        <div className="container mx-auto text-center">
          {/* Main Title */}
          <div className="mb-6">
            <div className="text-4xl md:text-5xl font-bold text-yellow-500 tracking-wide">
              PAST WINNERS
            </div>
          </div>
          
          {/* Trustpilot Section */}
          {/* <div className="flex items-center justify-center space-x-4"> */}
            {/* <div className="text-white text-sm">
              Reviews 2,006
            </div>
            
            <div className="flex items-center space-x-1">
              <div className="w-6 h-6 bg-green-500 flex items-center justify-center">
                <svg className="w-4 h-4 text-white fill-current" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              </div>
              <div className="w-6 h-6 bg-green-500 flex items-center justify-center">
                <svg className="w-4 h-4 text-white fill-current" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              </div>
              <div className="w-6 h-6 bg-green-500 flex items-center justify-center">
                <svg className="w-4 h-4 text-white fill-current" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              </div>
              <div className="w-6 h-6 bg-green-500 flex items-center justify-center">
                <svg className="w-4 h-4 text-white fill-current" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              </div>
              <div className="w-6 h-6 bg-green-500 flex items-center justify-center">
                <svg className="w-4 h-4 text-white fill-current" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              </div>
            </div>
            
            <div className="text-white text-sm font-bold">
              4.7
            </div>
            
            <div className="text-white text-sm">
              Trustpilot
            </div> */}
          {/* </div> */}
        </div>
      </div>

      {/* Cards Section */}
      <div className="container mx-auto px-4 py-8">
        {/* Responsive Grid: 1 col on small, 3 cols on md, 4 cols on lg+ */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {currentCards.map((card, index) => (
            <div key={index} className="bg-black rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300" style={{border: '1px solid #FDED43'}}>
              {/* Car Image */}
              <div className="relative">
                <img 
                  src={card.image} 
                  alt={card.car} 
                  className="w-full h-64 object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black bg-opacity-20"></div>
              </div>
              
              {/* Content */}
              <div className="p-4">
                {/* Title */}
                <div className="text-center mb-3">
                  <h2 className="text-yellow-400 text-sm font-bold leading-tight">
                    {card.car} OR {card.prize}
                  </h2>
                  <p className="text-yellow-400 text-xs font-semibold mt-1">
                    {card.worth}
                  </p>
                </div>
                
                {/* Draw Date */}
                <div className="text-center mb-3">
                  <p className="text-white text-xs">
                    Drawn {card.date}
                  </p>
                </div>
                
                {/* Winner Info */}
                <div className="rounded-lg p-3">
                  <div className="text-center">
                    <p className="text-yellow-400 text-xs font-bold mb-1">
                      WINNER:
                    </p>
                    <p className="text-white text-xs mb-1">
                      No. {card.ticketNo}
                    </p>
                    <p className="text-white text-xs font-semibold">
                      Name: {card.winner}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Pagination */}
        <div className="mt-12 flex justify-center items-center space-x-2">
          {/* Previous Button */}
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              currentPage === 1
                ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
                : 'bg-gray-800 text-white hover:bg-gray-700'
            }`}
          >
            Previous
          </button>
          
          {/* Page Numbers */}
          <div className="flex space-x-1">
            {[...Array(totalPages)].map((_, index) => {
              const pageNumber = index + 1;
              return (
                <button
                  key={pageNumber}
                  onClick={() => handlePageChange(pageNumber)}
                  className={`w-10 h-10 rounded-lg text-sm font-bold transition-all ${
                    currentPage === pageNumber
                      ? 'text-black font-bold'
                      : 'bg-gray-800 text-white hover:bg-gray-700'
                  }`}
                  style={currentPage === pageNumber ? {background: '#FDED43'} : {}}
                >
                  {pageNumber}
                </button>
              );
            })}
          </div>
          
          {/* Next Button */}
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              currentPage === totalPages
                ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
                : 'bg-gray-800 text-white hover:bg-gray-700'
            }`}
          >
            Next
          </button>
        </div>
        
        {/* Page Info */}
        <div className="mt-4 text-center text-gray-400 text-sm">
          Showing {indexOfFirstCard + 1} to {Math.min(indexOfLastCard, cardData.length)} of {cardData.length} winners
        </div>
      </div>
    </div>
  );
};

export default PastCARDS;