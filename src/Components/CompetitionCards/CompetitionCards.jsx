import { useEffect, useState } from "react";
import axiosSecure from "../../lib/axiosSecure";
import { useAuth } from "../../context/AuthContext";
import Header from "../Spinner/Header";
import SpinWheel from "../Spinner/SpinWheel";
import RaffleCard from "../Spinner/RaffleCard";
import Pagination from "../Spinner/Pagination";


const CARDS_PER_PAGE = 12;

function CompetitionCards() {
  const [activeFilter, setActiveFilter] = useState('prize');
  const [currentPage, setCurrentPage] = useState(1);
  const [allCards, setAllCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [segments, setSegments] = useState([]);
  const { user, refetchUser } = useAuth();

  const filterButtons = [
    { id: 'prize', label: 'PRIZE' },
  ];

  const fetchRaffles = async () => {
    try {
      setLoading(true);
      const response = await axiosSecure('/raffles/get-all-raffle');
      const data = response.data;

      if (data.success && data.data) {
        const activeRaffle = data.data.filter((raffle) => raffle.status === true);

        const transformedCards = activeRaffle.map((raffle) => ({
          id: raffle._id,
          title: raffle.title,
          price: `£${raffle.price} per entry`,
          progress: Math.floor((raffle.ticketSold / raffle.totalTicket) * 100),
          progressText: `${raffle.ticketSold}/${raffle.totalTicket}`,
          image: raffle.thumbnail,
          details: raffle.details,
          totalTicket: raffle.totalTicket,
          ticketSold: raffle.ticketSold,
          perUserTicketLimit: raffle.perUserTicketLimit,
          type: raffle.type,
          status: raffle.status,
        }));

        setAllCards(transformedCards);
      }
    } catch (err) {
      console.error('Error fetching raffles:', err);
      setError('Failed to load raffles');
    } finally {
      setLoading(false);
    }
  };

  const fetchSpinner = async () => {
    try {
      const res = await axiosSecure.get('/spinner/get-spinner');

      if (res.data?.success && Array.isArray(res.data.data)) {
        const spinnerSegments = res.data.data[0].prizes;


        console.log('Spinner segments:', spinnerSegments);

        setSegments(spinnerSegments);
      } else {
        console.warn('No spinner data found, using defaults');
      }
    } catch (error) {
      console.error('❌ Error fetching spinner:', error);
    }
  };





  useEffect(() => {
    fetchRaffles();
    fetchSpinner();
  }, []);

  const handleSpinComplete = () => {
    refetchUser();
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const filteredCards = activeFilter === 'prize'
    ? allCards
    : allCards.filter(card => card.type === activeFilter);

  const totalPages = Math.ceil(filteredCards.length / CARDS_PER_PAGE);
  const startIdx = (currentPage - 1) * CARDS_PER_PAGE;
  const endIdx = startIdx + CARDS_PER_PAGE;
  const cardsToShow = filteredCards?.slice(startIdx, endIdx);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-red-500 text-xl">{error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950 py-8 px-4">
      <Header
        activeFilter={activeFilter}
        setActiveFilter={setActiveFilter}
        filterButtons={filterButtons}
        user={user}
      />

      <div className="">
        {activeFilter === 'spin' && (
          <SpinWheel
            user={user}
            onSpinComplete={handleSpinComplete}
            segments={segments}
          />
        )}

        {activeFilter === 'prize' && (
          <>
            <div className="max-w-7xl">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 px-5">
                {cardsToShow.map((card) => (
                  <RaffleCard key={card.id} card={card} />
                ))}
              </div>
            </div>

            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </>
        )}

        {activeFilter === 'prize' && cardsToShow.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-400 text-xl">No competitions available at the moment.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default CompetitionCards;