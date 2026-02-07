import { useEffect, useState } from 'react';
import Confetti from './Confetti';

const PrizeModal = ({ prize, onClose }) => {
  const [visible, setVisible] = useState(true);
  const [showContent, setShowContent] = useState(false);

  const determinePrizeType = (prize) => {
    if (!prize) return 'lose';

    const label = prize.label?.toLowerCase() || '';
    const value = prize.value || 0;

    if (label.toLowerCase().includes('jackpot')) return 'jackpot';
    if (value <= 0) return 'lose';
    if (value > 0 && !(label.toLowerCase().includes('jackpot'))) return 'coin';
    return 'win';
  };

  const prizeType = determinePrizeType(prize);

  // Animation and auto-close logic
  useEffect(() => {
    if (!prize) return;

    // Show content after brief delay
    setTimeout(() => setShowContent(true), 200);

    // Auto-close timer
    const closeTimer = setTimeout(() => {
      setVisible(false);
      setTimeout(() => {
        onClose();
      }, 400);
    }, 4500);

    return () => {
      clearTimeout(closeTimer);
    };
  }, [prize, onClose]);

  if (!visible || !prize) return null;

  const getModalConfig = (type) => {
    const configs = {
      win: {
        title: 'Congratulations!',
        icon: '🎉',
        bgColor: 'from-green-600 to-emerald-700',
        borderColor: 'border-green-500',
        accentColor: '#10B981',
        buttonText: 'CLAIM PRIZE',
        messageColor: 'text-green-300'
      },
      jackpot: {
        title: 'JACKPOT WINNER!',
        icon: '🎰',
        bgColor: 'from-yellow-600 to-orange-600',
        borderColor: 'border-yellow-500',
        accentColor: '#FCD34D',
        buttonText: 'CLAIM JACKPOT',
        messageColor: 'text-yellow-300'
      },
      coin: {
        title: 'Reward Points Won!',
        icon: '🪙',
        bgColor: 'from-amber-600 to-yellow-600',
        borderColor: 'border-amber-500',
        accentColor: '#F59E0B',
        buttonText: 'COLLECT COINS',
        messageColor: 'text-amber-300'
      },
      lose: {
        title: 'Better Luck Next Time',
        icon: '🎯',
        bgColor: 'from-gray-700 to-gray-800',
        borderColor: 'border-gray-600',
        accentColor: '#9CA3AF',
        buttonText: 'TRY AGAIN',
        messageColor: 'text-gray-300'
      }
    };
    return configs[type] || configs.lose;
  };

  const config = getModalConfig(prizeType);

  return (
    <>
      {/* Confetti for winning prizes */}
      {prizeType !== 'lose' && <Confetti type={prizeType} />}

      {/* Backdrop */}
      <div className={`fixed inset-0 z-50 bg-black transition-opacity duration-300 ${visible ? 'opacity-50' : 'opacity-0'}`}></div>

      {/* Modal */}
      <div className={`fixed  inset-0 z-50 flex items-center justify-center pointer-events-none transition-opacity duration-300 ${visible ? 'opacity-100' : 'opacity-0'}`}>
        <div className={`pointer-events-auto relative mx-4 max-w-md w-full transition-all duration-500 transform ${showContent ? 'scale-100 opacity-100' : 'scale-90 opacity-0'
          }`}>

          {/* Animated background blur glow */}
          <div className={`absolute inset-0 bg-gradient-to-r ${config.bgColor} rounded-3xl blur-2xl opacity-30 animate-pulse`}></div>

          {/* Main modal card */}
          <div className={`relative  max-w-80 mx-auto bg-gradient-to-br from-gray-950 via-gray-900 to-black p-8 md:p-10 rounded-3xl border-2 ${config.borderColor} shadow-2xl`}>

            {/* Top accent line */}
            <div className={`absolute top-0 left-1/2 transform -translate-x-1/2 h-1 w-24 bg-gradient-to-r ${config.bgColor} rounded-full`}></div>

            <div className="text-center">

              {/* Icon with animation */}
              <div className={`mb-6 text-6xl md:text-7xl animate-bounce`} style={{ color: config.accentColor }}>
                {config.icon}
              </div>

              {/* Title */}
              <h2 className={`text-3xl md:text-4xl font-black mb-2 ${config.messageColor}`}>
                {config.title}
              </h2>

              {/* Prize label */}
              <div className="mb-6">
                <p className="text-gray-400 text-sm mb-3 uppercase tracking-widest font-semibold">{prizeType === 'lose'? '' : 'You Won'}</p>
                <h3 className={`text-2xl md:text-3xl font-black mb-4 drop-shadow-lg`} style={{ color: config.accentColor }}>
                  {prize.label}
                </h3>

                {/* Prize value badge (if applicable) */}
                {prize.value && prizeType !== 'lose' && (
                  <div className={`inline-block px-6 py-3 rounded-full bg-gradient-to-r ${config.bgColor} text-white font-black text-lg md:text-xl animate-pulse border-2 ${config.borderColor}`}>
                    +{prizeType === 'lose'? '' : prize.value }
                  </div>
                )}
              </div>
              <div>
                <button
                  onClick={() => {
                    setVisible(false);
                    setTimeout(() => onClose(), 300);
                  }}
                  className={`mt-4 px-8 py-3 rounded-full bg-yellow-600 text-white font-bold text-lg hover:scale-105 transition-all duration-200 shadow-lg w-full`}
                >
                  OK
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PrizeModal;