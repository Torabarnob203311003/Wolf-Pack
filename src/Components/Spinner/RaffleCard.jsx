import { useNavigate } from 'react-router-dom';

const RaffleCard = ({ card }) => {
  const navigate = useNavigate();
  const progress = Math.floor((card.ticketSold / card.totalTicket) * 100);

  return (
    <div
      key={card.id}
      className="rounded-xl overflow-hidden shadow-lg border border-yellow-500 flex flex-col w-full max-w-full mx-auto cursor-pointer hover:scale-105 transition-transform duration-300"
      onClick={() => navigate(`/card/${card.id}`)}
    >
      {/* Card Image */}
      <div className="relative w-full h-full">
        <img
          src={card.image}
          alt={card.title}
          className="w-full h-full object-cover rounded-t-xl"
        />
        <div
          className="absolute top-2 right-2 px-3 py-1 rounded-full text-xs font-bold uppercase"
          style={{
            background: card.type === 'spin'
              ? 'linear-gradient(90deg, #9333EA 0%, #C084FC 100%)'
              : 'linear-gradient(90deg, #059669 0%, #10B981 100%)',
            color: '#fff'
          }}
        >
          {card.type === 'spin' ? '🎰 SPIN' : '🎁 PRIZE'}
        </div>
      </div>

      {/* Card Content */}
      <div className="p-4 text-white flex flex-col flex-1">
        <div className="relative w-full bg-slate-300 h-7 rounded-full mb-4">
          <div
            className="absolute inset-0 rounded-full transition-all duration-500 ease-in-out"
            style={{
              width: `${progress}%`,
              background: 'linear-gradient(90deg, #FFFFFF 0%, #E28B27 100%)'
            }}
          ></div>
          <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-sm font-bold text-black">
            {`${card.ticketSold}/${card.totalTicket}`}
          </span>
        </div>

        <div className="text-center space-y-2 flex-1">
          <h3
            className="text-lg sm:text-xl font-bold leading-tight tracking-wide"
            style={{ color: '#FDED43' }}
          >
            {card.title}
          </h3>
          <p className="text-sm" style={{ color: '#fff' }}>
            {card.price}
          </p>
        </div>

        <button
          onClick={(e) => {
            e.stopPropagation();
            navigate(`/card/${card.id}`);
          }}
          className="w-full py-3 mt-4 text-lg font-bold rounded-lg shadow-lg hover:opacity-90 transition-all duration-300"
          style={{
            background:
              'linear-gradient(90deg, #E28B27 0%, #F5D334 29.19%, #F6D63E 32.42%, #F5D334 67.48%, #ECC92F 72.69%, #D5AC22 81.69%, #AE7F0D 93.33%, #966200 100%)',
            color: '#fff',
          }}
        >
          ENTRY NOW
        </button>
      </div>
    </div>
  );
};

export default RaffleCard;