import { useEffect, useRef, useState, useCallback } from 'react';

// Import your local sounds - adjust paths based on your project structure
import spinSound from '../assets/spin.wav';
import winSound from '../assets/win.wav';
import jackpotSound from '../assets/royal-win.wav';
import coinSound from '../assets/coin.wav';
import loseSound from '../assets/lose.wav';
import crowdWinSound from '../assets/crowd-win.wav';

/**
 * useAudio Hook
 * Manages sound playback with proper synchronization and browser autoplay policies
 * 
 * Features:
 * - Lazy initialization with user interaction
 * - Proper sound stacking and interruption
 * - Volume management per sound type
 * - Error handling for missing audio files
 */
export const useAudio = () => {
  const [isInitialized, setIsInitialized] = useState(false);
  const audioRefs = useRef({});
  const activeAudioRef = useRef(null);

  // Audio configuration
  const audioConfig = {
    spin: {
      src: spinSound,
      volume: 0.35,
      loop: false,
      duration: 2500 // ms
    },
    win: {
      src: winSound,
      volume: 0.7,
      loop: false,
      duration: 1500
    },
    jackpot: {
      src: jackpotSound,
      volume: 0.8,
      loop: false,
      duration: 2500
    },
    coin: {
      src: coinSound,
      volume: 0.6,
      loop: false,
      duration: 800
    },
    lose: {
      src: loseSound,
      volume: 0.6,
      loop: false,
      duration: 1200
    },
    crowd: {
      src: crowdWinSound,
      volume: 0.7,
      loop: false,
      duration: 2000
    }
  };

  const initAudio = useCallback(() => {
    if (isInitialized) return;

    try {
      console.log('🎵 Initializing audio system...');

      Object.entries(audioConfig).forEach(([key, config]) => {
        try {
          const audio = new Audio(config.src);
          audio.preload = 'auto';
          audio.volume = config.volume;
          audio.muted = false;

          // Handle loading
          const onCanPlay = () => {
            console.log(`✓ Audio loaded: ${key}`);
            audio.removeEventListener('canplaythrough', onCanPlay);
          };

          audio.addEventListener('canplaythrough', onCanPlay, { once: true });

          // Error handling
          audio.onerror = (e) => {
            console.warn(`⚠ Failed to load ${key} audio:`, e);
          };

          audioRefs.current[key] = {
            element: audio,
            config: config,
            isPlaying: false
          };
        } catch (error) {
          console.warn(`⚠ Error creating audio for ${key}:`, error);
        }
      });

      setIsInitialized(true);
      console.log('✓ Audio system initialized');

    } catch (error) {
      console.error('❌ Audio init error:', error);
      setIsInitialized(true); // Mark as initialized anyway to prevent blocking
    }
  }, [isInitialized]);

  /**
   * Play a sound with intelligent handling of conflicts
   * Stops currently playing audio if it's less important
   */
  const playSound = useCallback((type) => {
    if ( !isInitialized) {
      console.log(`⏸ Audio not ready (${type})`, {  isInitialized });
      return null;
    }

    try {
      const audioData = audioRefs.current[type];
      if (!audioData) {
        console.warn(`⚠ No audio found for type: ${type}`);
        return null;
      }

      const { element: audio, config } = audioData;

      // Determine priority for sound interruption
      const soundPriority = {
        jackpot: 5,
        crowd: 4,
        lose: 3,
        win: 2,
        coin: 2,
        spin: 1
      };

      // Stop lower priority sounds
      if (activeAudioRef.current) {
        const activePriority = soundPriority[activeAudioRef.current.type] || 0;
        const newPriority = soundPriority[type] || 0;

        if (activePriority < newPriority) {
          const activeAudio = audioRefs.current[activeAudioRef.current.type];
          if (activeAudio) {
            activeAudio.element.pause();
            activeAudio.element.currentTime = 0;
            activeAudio.isPlaying = false;
          }
        } else if (activePriority >= newPriority && activeAudioRef.current.type !== type) {
          // Don't play lower or equal priority sound unless it's different
          if (type !== 'crowd' && type !== 'coin') {
            console.log(`⏸ Skipping ${type}, ${activeAudioRef.current.type} is playing`);
            return null;
          }
        }
      }

      // Reset and configure audio
      audio.currentTime = 0;
      audio.volume = config.volume;
      audio.loop = config.loop || false;

      // Play the sound
      const playPromise = audio.play();

      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            console.log(`▶ Playing ${type} (${config.volume * 100}% vol)`);
            activeAudioRef.current = { type, startTime: Date.now() };
            audioData.isPlaying = true;

            // Auto-clear playing flag after duration
            setTimeout(() => {
              if (audioData.isPlaying && activeAudioRef.current?.type === type) {
                audioData.isPlaying = false;
                if (activeAudioRef.current?.type === type) {
                  activeAudioRef.current = null;
                }
              }
            }, config.duration);
          })
          .catch(error => {
            console.warn(`⚠ Could not play ${type}:`, error.message);

            // Fallback for iOS/Safari - try muted
            if (error.name === 'NotAllowedError') {
              console.log(`🍎 Browser policy: ${type} blocked`);
              audio.muted = true;
              audio.play()
                .then(() => {
                  console.log(`▶ Playing ${type} (muted)`);
                })
                .catch(muteError => {
                  console.error(`❌ Even muted play failed:`, muteError);
                });
            }
          });
      }

      return audio;
    } catch (error) {
      console.error(`❌ Error playing ${type}:`, error);
      return null;
    }
  }, [ isInitialized]);

  /**
   * Stop a specific sound
   */
  const stopSound = useCallback((type) => {
    const audioData = audioRefs.current[type];
    if (audioData) {
      audioData.element.pause();
      audioData.element.currentTime = 0;
      audioData.isPlaying = false;

      if (activeAudioRef.current?.type === type) {
        activeAudioRef.current = null;
      }
    }
  }, []);

  /**
   * Stop all sounds
   */
  const stopAllSounds = useCallback(() => {
    Object.keys(audioRefs.current).forEach(key => {
      const audioData = audioRefs.current[key];
      if (audioData) {
        audioData.element.pause();
        audioData.element.currentTime = 0;
        audioData.isPlaying = false;
      }
    });
    activeAudioRef.current = null;
  }, []);


  initAudio();





  // Setup user interaction listeners for browser autoplay policy
  useEffect(() => {
    const handleFirstInteraction = () => {
      console.log('👆 User interaction detected');

      // Remove listeners after first interaction
      document.removeEventListener('click', handleFirstInteraction);
      document.removeEventListener('touchstart', handleFirstInteraction);
      document.removeEventListener('keydown', handleFirstInteraction);
    };

    // Listen for user interactions
    document.addEventListener('click', handleFirstInteraction, { once: true });
    document.addEventListener('touchstart', handleFirstInteraction, { once: true });
    document.addEventListener('keydown', handleFirstInteraction, { once: true });

    return () => {
      stopAllSounds();
      document.removeEventListener('click', handleFirstInteraction);
      document.removeEventListener('touchstart', handleFirstInteraction);
      document.removeEventListener('keydown', handleFirstInteraction);
    };
  }, [ stopAllSounds]);

  return {
    isInitialized,
    playSound,
    stopSound,
    stopAllSounds,
    audioConfig
  };
};