import { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { Wheel } from 'react-custom-roulette';
import PrizeModal from './PrizeModal';
import { useAudio } from '../../hooks/useAudio';
import { Sparkles, Trophy, Coins, Zap, Volume2, VolumeX } from 'lucide-react';
import axiosSecure from '../../lib/axiosSecure';

const SpinWheel = ({ user, onSpinComplete, segments = [] }) => {
  const [mustSpin, setMustSpin] = useState(false);
  const [prizeNumber, setPrizeNumber] = useState(0);
  const [winningPrize, setWinningPrize] = useState(null);
  const [showPrizeModal, setShowPrizeModal] = useState(false);
  const [spinCount, setSpinCount] = useState(0);
  const [isSpinning, setIsSpinning] = useState(false);
    const [soundEnabled, setSoundEnabled] = useState(true);


  const { playSound, stopAllSounds, isInitialized } = useAudio();
  const spinningAudioRef = useRef(null);
  const spinTimeoutRef = useRef(null);

  // Memoized wheel data
  const wheelData = useMemo(() => {
    return segments.map(segment => ({
      option: segment.label || 'Unknown'
    }));
  }, [segments]);

  // Memoized jackpot value
  const jackpotValue = useMemo(() => {
    return segments.find(s => s.option === 'JACKPOT')?.prizeData?.value || 500;
  }, [segments]);

  // Memoized canSpin condition
  const canSpin = useMemo(() => {
    return !isSpinning && !mustSpin && user && user.credit >= 1 && wheelData.length > 0
  }, [isSpinning, mustSpin, user, wheelData.length, soundEnabled, isInitialized]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (spinTimeoutRef.current) clearTimeout(spinTimeoutRef.current);
      if (spinningAudioRef.current) {
        spinningAudioRef.current.pause();
        spinningAudioRef.current.currentTime = 0;
      }
      stopAllSounds();
    };
  }, [stopAllSounds]);

  // Optimized spin sound handling
  const playSpinSound = useCallback(() => {
    if (soundEnabled && isInitialized) {
      spinningAudioRef.current = playSound('spin');
      if (spinningAudioRef.current) {
        spinningAudioRef.current.loop = false;
        spinningAudioRef.current.volume = 0.3;
      }
    }
  }, [soundEnabled, isInitialized, playSound]);

  // Optimized prize sound handling
  const playPrizeSound = useCallback((prize) => {
    if ( !soundEnabled || !isInitialized || !prize) return;

    if (prize.label.toLowerCase() === 'jackpot') {
      playSound('jackpot');
      setTimeout(() => playSound('crowd'), 800);
    } else if (prize.value <= 0) {
      playSound('lose');
    } else if (prize.value > 0 && !prize.label.toLowerCase().includes('jackpot')) {
      playSound('coin');
      setTimeout(() => playSound('crowd'), 800);
    } else {
      playSound('win');
    }
  }, [soundEnabled, isInitialized, playSound]);

  // Handle spin click
  const handleSpinClick = useCallback(async () => {
    if (!user || user.credit < 1) {
      alert('You need at least 1 credit to spin!');
      return;
    }

    if (isSpinning || mustSpin) return;

    setIsSpinning(true);
    setSpinCount(prev => prev + 1);
    stopAllSounds();

    try {
      const res = await axiosSecure.post('/spinner/start-spin', { 
        userId: user._id, 
        userName: user.userName, 
        email: user.email 
      });

      if (res.data?.success && res.data.data.prize) {
        setWinningPrize(res.data.data.prize);
        setPrizeNumber(res.data.data.prize.id - 1);
      } else {
        console.warn('No Prize data found!');
        setWinningPrize({
          id: 0,
          label: "Try Again",
          value: 0
        });
        setPrizeNumber(0);
      }
    } catch (error) {
      console.error('❌ Error fetching spinner:', error);
      setWinningPrize({
        id: 0,
        label: "Try Again",
        value: 0
      });
      setPrizeNumber(0);
    }

    // Play spin sound
    playSpinSound();

    // Start wheel animation
    setTimeout(() => {
      setMustSpin(true);
    }, 300);
  }, [ isInitialized, soundEnabled, user, isSpinning, mustSpin, playSpinSound]);

  // Handle stop spinning
  const handleStopSpinning = useCallback(() => {
    if (spinningAudioRef.current) {
      spinningAudioRef.current.pause();
      spinningAudioRef.current.currentTime = 0;
      spinningAudioRef.current = null;
    }

    setMustSpin(false);

    spinTimeoutRef.current = setTimeout(() => {
      setIsSpinning(false);
      setShowPrizeModal(true);

      playPrizeSound(winningPrize);

      if (onSpinComplete) {
        setTimeout(() => onSpinComplete(), 2000);
      }
    }, 1200);
  }, [winningPrize, onSpinComplete, playPrizeSound]);

  // Memoized game rules
  const gameRules = useMemo(() => [
    '1 credit = 1 spin',
    'Win coins or prizes',
    'Jackpot is the big prize',
    'Every spin could be a winner'
  ], []);

  return (
    <div className="relative min-h-screen w-full mx-auto flex flex-col items-center justify-center py-4 sm:py-8 md:py-12 px-4 sm:px-6 overflow-hidden">

      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 sm:top-20 left-4 sm:left-10 w-48 sm:w-72 h-48 sm:h-72 bg-purple-500/5 rounded-full blur-2xl sm:blur-3xl"></div>
        <div className="absolute bottom-10 sm:bottom-20 right-4 sm:right-10 w-64 sm:w-96 h-64 sm:h-96 bg-blue-500/5 rounded-full blur-2xl sm:blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-64 sm:h-96 bg-gradient-to-r from-yellow-500/10 via-transparent to-orange-500/10 blur-2xl sm:blur-3xl"></div>
      </div>

      {/* Header with animated title */}
      <div className="relative z-10 text-center mb-6 sm:mb-8 md:mb-12 px-4">
        <div className="inline-flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
          <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 text-yellow-400 animate-pulse" />
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold">
            <span className="bg-gradient-to-r from-yellow-400 via-orange-400 to-yellow-400 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient">
              WHEEL OF FORTUNE
            </span>
          </h1>
          <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 text-yellow-400 animate-pulse" />
        </div>
        <p className="text-gray-400 text-sm sm:text-base md:text-lg font-light">Spin the wheel and win amazing rewards</p>
      </div>

      <div className="relative z-10 w-full ">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8 items-start">
          
          {/* Left Stats Panel - Hidden on mobile, shown on desktop */}
          <div className="hidden lg:flex flex-col space-y-4 sm:space-y-6">
            {/* Credits Card */}
            <div className="glass-card p-4 sm:p-6 rounded-xl sm:rounded-2xl border border-gray-800/50 hover:border-yellow-500/30 transition-all duration-300 hover:scale-[1.02]">
              <div className="flex items-center justify-between mb-2 sm:mb-3">
                <span className="text-gray-400 text-xs sm:text-sm font-medium uppercase tracking-wider">Your Credits</span>
                <Coins className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-500" />
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">{user?.credit || 0}</span>
                <span className="text-gray-500 text-sm sm:text-base">credits</span>
              </div>
            </div>

            {/* Jackpot Card */}
            <div className="glass-card p-4 sm:p-6 rounded-xl sm:rounded-2xl border border-red-500/20 hover:border-red-500/40 transition-all duration-300 hover:scale-[1.02] relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 sm:w-32 sm:h-32 bg-red-500/5 rounded-full -translate-y-8 sm:-translate-y-16 translate-x-8 sm:translate-x-16"></div>
              <div className="flex items-center justify-between mb-2 sm:mb-3 relative">
                <span className="text-gray-400 text-xs sm:text-sm font-medium uppercase tracking-wider">Jackpot</span>
                <Trophy className="w-4 h-4 sm:w-5 sm:h-5 text-red-400" />
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl sm:text-3xl md:text-4xl font-bold text-red-400">£{jackpotValue}</span>
                <span className="text-gray-500 text-sm sm:text-base">big win</span>
              </div>
            </div>

            {/* Spin Counter */}
            <div className="glass-card p-4 sm:p-6 rounded-xl sm:rounded-2xl border border-gray-800/50 hover:border-purple-500/30 transition-all duration-300 hover:scale-[1.02]">
              <div className="flex items-center justify-between mb-2 sm:mb-3">
                <span className="text-gray-400 text-xs sm:text-sm font-medium uppercase tracking-wider">Spins Today</span>
                <Zap className="w-4 h-4 sm:w-5 sm:h-5 text-purple-400" />
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">{spinCount}</span>
                <span className="text-gray-500 text-sm sm:text-base">spins</span>
              </div>
            </div>
          </div>

          {/* Mobile Stats - Top bar for mobile */}
          <div className="lg:hidden grid grid-cols-3 gap-2 sm:gap-3 mb-4 sm:mb-6">
            <div className="glass-card p-3 sm:p-4 rounded-xl border border-gray-800/50">
              <div className="flex items-center justify-between mb-1">
                <Coins className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-500" />
              </div>
              <div className="text-center">
                <span className="text-lg sm:text-xl font-bold text-white">{user?.credit || 0}</span>
                <p className="text-xs text-gray-400 mt-1">Credits</p>
              </div>
            </div>
            
            <div className="glass-card p-3 sm:p-4 rounded-xl border border-red-500/20">
              <div className="flex items-center justify-between mb-1">
                <Trophy className="w-3 h-3 sm:w-4 sm:h-4 text-red-400" />
              </div>
              <div className="text-center">
                <span className="text-lg sm:text-xl font-bold text-red-400">£{jackpotValue}</span>
                <p className="text-xs text-gray-400 mt-1">Jackpot</p>
              </div>
            </div>
            
            <div className="glass-card p-3 sm:p-4 rounded-xl border border-gray-800/50">
              <div className="flex items-center justify-between mb-1">
                <Zap className="w-3 h-3 sm:w-4 sm:h-4 text-purple-400" />
              </div>
              <div className="text-center">
                <span className="text-lg sm:text-xl font-bold text-white">{spinCount}</span>
                <p className="text-xs text-gray-400 mt-1">Spins</p>
              </div>
            </div>
          </div>

          {/* Center Wheel */}
          <div className="flex flex-col items-center justify-center z-30 lg:col-span-2 xl:col-span-1">
            {/* Wheel Container */}
            <div className="relative mb-6 sm:mb-8 w-full max-w-md mx-auto">
              {/* Outer glow effect */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-yellow-500/20 via-orange-500/20 to-yellow-500/20 blur-2xl sm:blur-3xl scale-125 animate-pulse"></div>

              {/* Wheel Shadow Container */}
              <div className="relative bg-gradient-to-br from-gray-900 to-black rounded-full  ">
                {/* Wheel Border with gradient */}
                <div className="relative rounded-full p-0.5  bg-gradient-to-r from-yellow-500 via-orange-500 to-yellow-500">
                  <div className="rounded-full bg-gradient-to-br from-gray-900 to-black ">
                    <div className="rounded-full overflow-hidden bg-gradient-to-br from-gray-800 to-gray-900 -rotate-[46.5deg]">
                      {wheelData.length > 0 ? (
                        <Wheel
                          mustStartSpinning={mustSpin}
                          prizeNumber={prizeNumber}
                          data={wheelData}
                          outerBorderColor="#F59E0B"
                          outerBorderWidth={2}
                          innerRadius={15}
                          radiusLineColor="#374151"
                          radiusLineWidth={1}
                          textDistance={60}
                          fontSize={16}
                          fontWeight="bold"
                          perpendicularText={false}
                          onStopSpinning={handleStopSpinning}
                          spinDuration={0.6}
                          backgroundColors={[
                            '#10B981', '#F59E0B', '#EF4444', '#8B5CF6',
                            '#10B981', '#F59E0B', '#EF4444', '#8B5CF6'
                          ]}
                          textColors={['#FFFFFF', '#FFFFFF', '#FFFFFF', '#FFFFFF', '#FFFFFF', '#FFFFFF', '#FFFFFF', '#FFFFFF']}
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center min-h-[300px] sm:min-h-[350px] md:min-h-[400px]">
                          <div className="text-gray-400 text-sm sm:text-base">Loading wheel...</div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Center Spin Button */}
                <button
                  onClick={handleSpinClick}
                  disabled={!canSpin}
                  className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20"
                  aria-label="Spin the wheel"
                >
                  <div className="relative w-16 h-16 sm:w-20 sm:h-20">
                    {/* Pulsing ring */}
                    <div className="absolute inset-0 rounded-full bg-gradient-to-r from-yellow-500 to-orange-500 animate-ping opacity-20"></div>

                    {/* Center button */}
                    <div className={`absolute inset-0 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 shadow-2xl border-4 border-yellow-200/50 flex items-center justify-center transition-all duration-300 ${canSpin ? 'hover:scale-110 active:scale-95' : 'opacity-70'}`}>
                      <span className="text-white font-black text-xs sm:text-sm">SPIN</span>
                    </div>
                  </div>
                </button>

                {/* Pointer Arrow */}
                <div className="absolute -top-3 sm:-top-4 left-1/2 transform -translate-x-1/2 z-20">
                  <div className="relative">
                    <div className="w-3 h-3 sm:w-4 sm:h-4 bg-gradient-to-r from-yellow-400 to-orange-400 transform rotate-45"></div>
                    <div className="absolute top-1 left-1/2 transform -translate-x-1/2 -translate-y-1 w-0 h-0 border-l-3 sm:border-l-4 border-l-transparent border-r-3 sm:border-r-4 border-r-transparent border-t-3 sm:border-t-4 border-t-yellow-200"></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Main Spin Button */}
            <button
              onClick={handleSpinClick}
              disabled={!canSpin}
              className={`
                relative w-full max-w-sm sm:max-w-md px-6 sm:px-8 py-3 sm:py-4 rounded-xl sm:rounded-2xl font-bold text-base sm:text-lg
                transition-all duration-300 uppercase tracking-wider
                overflow-hidden group
                ${canSpin
                  ? 'bg-gradient-to-r from-yellow-500 to-orange-500 hover:shadow-2xl hover:shadow-yellow-500/30'
                  : 'bg-gray-800 cursor-not-allowed'
                }
              `}
              aria-label={!soundEnabled || !isInitialized ? "Enable sound and spin" : "Spin the wheel"}
            >
              {/* Button shine effect */}
              <div className="absolute inset-0 translate-x-full group-hover:translate-x-0 transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>

              <div className="relative flex items-center justify-center gap-2 sm:gap-3">
                { isSpinning ? (
                  <>
                    <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    <span className="text-sm sm:text-base">SPINNING...</span>
                  </>
                ) : (
                  <>
                    <div className="w-4 h-4 sm:w-5 sm:h-5 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full"></div>
                    <span className="text-sm sm:text-base">SPIN THE WHEEL</span>
                  </>
                )}
              </div>
            </button>

            {/* Status Messages */}
            <div className="mt-3 sm:mt-4 text-center h-5 sm:h-6">
              {!soundEnabled && !isInitialized && (
                <p className="text-yellow-400/80 text-xs sm:text-sm font-medium">Click to enable sound effects</p>
              )}
              {isSpinning && (
                <p className="text-yellow-400/80 text-xs sm:text-sm font-medium animate-pulse">Good luck! The wheel is spinning...</p>
              )}
              {!canSpin && user && user.credit < 1 && soundEnabled && isInitialized && (
                <p className="text-red-400/80 text-xs sm:text-sm font-medium">Need more credits to spin</p>
              )}
            </div>
          </div>

          {/* Right Info Panel - Hidden on mobile, shown on desktop */}
          <div className="hidden lg:flex flex-col space-y-4 sm:space-y-6">
            {/* Game Rules */}
            <div className="glass-card p-4 sm:p-6 rounded-xl sm:rounded-2xl border border-gray-800/50 hover:border-blue-500/30 transition-all duration-300 hover:scale-[1.02]">
              <h3 className="text-white font-bold text-base sm:text-lg mb-3 sm:mb-4 flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                How to Play
              </h3>
              <ul className="space-y-2 sm:space-y-3">
                {gameRules.map((rule, index) => (
                  <li key={index} className="flex items-center gap-2 sm:gap-3 text-gray-400 group">
                    <div className="w-1.5 h-1.5 bg-blue-500/50 rounded-full group-hover:bg-blue-500 transition-colors"></div>
                    <span className="text-xs sm:text-sm group-hover:text-white transition-colors">{rule}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Sound Control */}
            <div className="glass-card p-4 sm:p-6 rounded-xl sm:rounded-2xl border border-gray-800/50 hover:border-green-500/30 transition-all duration-300 hover:scale-[1.02]">
              <h3 className="text-white font-bold text-base sm:text-lg mb-3 sm:mb-4 flex items-center gap-2">
                {soundEnabled ? (
                  <Volume2 className="w-4 h-4 sm:w-5 sm:h-5 text-green-500" />
                ) : (
                  <VolumeX className="w-4 h-4 sm:w-5 sm:h-5 text-red-500" />
                )}
                Sound Effects
              </h3>
              <p className="text-xs sm:text-sm text-gray-400 mb-3 sm:mb-4">Toggle sound effects for better experience</p>
              <button
                onClick={()=>setSoundEnabled(!soundEnabled)}
                className={`
                  w-full py-2 rounded-lg font-medium text-sm sm:text-base transition-all duration-300
                  ${soundEnabled
                    ? 'bg-green-500/20 text-green-400 hover:bg-green-500/30'
                    : 'bg-red-500/20 text-red-400 hover:bg-red-500/30'
                  }
                `}
              >
                {soundEnabled ? 'Disable Sound' : 'Enable Sound'}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Info Panel */}
      <div className="lg:hidden mt-6 sm:mt-8 w-full max-w-lg mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          {/* Game Rules */}
          <div className="glass-card p-4 rounded-xl border border-gray-800/50">
            <h3 className="text-white font-bold text-sm sm:text-base mb-3 flex items-center gap-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              How to Play
            </h3>
            <ul className="space-y-2">
              {gameRules.slice(0, 2).map((rule, index) => (
                <li key={index} className="flex items-center gap-2 text-gray-400">
                  <div className="w-1.5 h-1.5 bg-blue-500/50 rounded-full"></div>
                  <span className="text-xs sm:text-sm">{rule}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Sound Control */}
          <div className="glass-card p-4 rounded-xl border border-gray-800/50">
            <h3 className="text-white font-bold text-sm sm:text-base mb-3 flex items-center gap-2">
              {soundEnabled ? (
                <Volume2 className="w-4 h-4 text-green-500" />
              ) : (
                <VolumeX className="w-4 h-4 text-red-500" />
              )}
              Sound
            </h3>
            <button
              onClick={()=>setSoundEnabled(!soundEnabled)}
              className={`
                w-full py-2 rounded-lg font-medium text-sm transition-all duration-300
                ${soundEnabled
                  ? 'bg-green-500/20 text-green-400 hover:bg-green-500/30'
                  : 'bg-red-500/20 text-red-400 hover:bg-red-500/30'
                }
              `}
            >
              {soundEnabled ? 'Disable' : 'Enable'}
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-6 sm:mt-8 md:mt-12 text-center">
        <p className="text-gray-500 text-xs sm:text-sm">Spin responsibly • Luck is on your side</p>
      </div>

      {/* Prize Modal */}
      {showPrizeModal && winningPrize && (
        <PrizeModal
          prize={winningPrize}
          onClose={() => {
            setShowPrizeModal(false);
            setWinningPrize(null);
          }}
        />
      )}

      <style jsx>{`
        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .animate-gradient {
          animation: gradient 3s ease infinite;
          background-size: 200% auto;
        }
        .glass-card {
          backdrop-filter: blur(10px);
          background: linear-gradient(135deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02));
        }
      `}</style>
    </div>
  );
};

export default SpinWheel;