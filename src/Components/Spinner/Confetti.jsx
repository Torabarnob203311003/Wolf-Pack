import { useState, useEffect } from 'react';

const Confetti = ({ type = 'win', duration = 3500 }) => {
  const [particles, setParticles] = useState([]);

  const colorSchemes = {
    win: {
      colors: ['#10B981', '#34D399', '#6EE7B7', '#A7F3D0', '#FFFFFF'],
      particleCount: 80
    },
    lose: {
      colors: ['#EF4444', '#F87171', '#FCA5A5', '#FECACA', '#FEE2E2'],
      particleCount: 40
    },
    jackpot: {
      colors: ['#FFD700', '#FCD34D', '#FBBF24', '#FF0000', '#FF6B6B', '#FFFFFF'],
      particleCount: 150
    },
    coin: {
      colors: ['#F59E0B', '#FBBF24', '#FCD34D', '#FFD700', '#FFFFFF'],
      particleCount: 100
    }
  };

  useEffect(() => {
    const scheme = colorSchemes[type] || colorSchemes.win;
    const newParticles = [];
    
    for (let i = 0; i < scheme.particleCount; i++) {
      newParticles.push({
        id: i,
        x: Math.random() * 100,
        y: -10,
        rotation: Math.random() * 360,
        color: scheme.colors[Math.floor(Math.random() * scheme.colors.length)],
        size: Math.random() * 12 + 4,
        speed: Math.random() * 4 + 2.5,
        rotationSpeed: Math.random() * 15 - 7.5,
        shape: Math.random() > 0.6 ? 'circle' : 'square',
        vx: Math.random() * 2 - 1, // horizontal velocity
        wobble: Math.random() * 0.5 + 0.2
      });
    }
    
    setParticles(newParticles);
    
    const interval = setInterval(() => {
      setParticles(prev => 
        prev.map(p => ({
          ...p,
          y: p.y + p.speed,
          x: p.x + p.vx * Math.sin(p.y / 10) * p.wobble,
          rotation: p.rotation + p.rotationSpeed,
        })).filter(p => p.y < 110)
      );
    }, 20);
    
    const timeout = setTimeout(() => {
      clearInterval(interval);
      setTimeout(() => {
        setParticles([]);
      }, 500);
    }, duration);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [type, duration]);

  if (particles.length === 0) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {particles.map((particle) => (
        <div
          key={particle.id}
          className={`absolute transition-opacity ${particle.shape === 'circle' ? 'rounded-full' : ''}`}
          style={{
            left: `${particle.x}vw`,
            top: `${particle.y}vh`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            transform: `rotate(${particle.rotation}deg)`,
            backgroundColor: particle.color,
            opacity: Math.max(0, 1 - (particle.y / 100) * 0.5),
            boxShadow: `0 0 ${particle.size / 2}px ${particle.color}88`,
            willChange: 'transform, opacity'
          }}
        />
      ))}
    </div>
  );
};

export default Confetti;