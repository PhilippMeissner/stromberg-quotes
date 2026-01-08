import { FC, useEffect, useState, useCallback } from 'react';

interface RefreshTimerProps {
  duration: number; // in seconds
  onRefresh: () => void;
  isPaused?: boolean;
}

const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
      const isSmallScreen = typeof window.matchMedia === 'function'
        ? window.matchMedia('(max-width: 768px)').matches
        : false;
      setIsMobile(isTouchDevice && isSmallScreen);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return isMobile;
};

const RefreshTimer: FC<RefreshTimerProps> = ({ duration, onRefresh, isPaused = false }) => {
  const [secondsLeft, setSecondsLeft] = useState(duration);
  const [isHovered, setIsHovered] = useState(false);
  const isMobile = useIsMobile();

  const resetTimer = useCallback(() => {
    setSecondsLeft(duration);
  }, [duration]);

  const handleManualRefresh = useCallback(() => {
    onRefresh();
    resetTimer();
  }, [onRefresh, resetTimer]);

  // Timer only runs on desktop
  useEffect(() => {
    if (isMobile || isPaused || isHovered) return;

    const interval = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          onRefresh();
          return duration;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [duration, onRefresh, isPaused, isHovered, isMobile]);

  // Calculate progress - on mobile always full, on desktop depletes over time
  const progress = isMobile ? 100 : (secondsLeft / duration) * 100;
  const circumference = 2 * Math.PI * 45; // radius = 45
  const strokeDashoffset = circumference - (progress / 100) * circumference;


  return (
    <div className="flex items-center justify-center mt-8">
      <button
        onClick={handleManualRefresh}
        onMouseEnter={() => !isMobile && setIsHovered(true)}
        onMouseLeave={() => !isMobile && setIsHovered(false)}
        className={`relative w-16 h-16 cursor-pointer transition-all duration-300 active:scale-95 opacity-50 ${isMobile ? 'active:opacity-80' : 'hover:scale-110 hover:opacity-80'}`}
        aria-label="Neues Zitat laden"
      >
        <svg className="w-16 h-16 transform -rotate-90" viewBox="0 0 100 100">
          {/* Track */}
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke="rgba(75, 85, 99, 0.3)"
            strokeWidth="4"
          />
          {/* Progress */}
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke="rgba(156, 163, 175, 0.6)"
            strokeWidth="4"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            className={isMobile ? '' : 'transition-all duration-1000 ease-linear'}
          />
        </svg>

        {/* Refresh icon - always visible */}
        <div className="absolute inset-0 flex items-center justify-center">
          <svg
            className="w-6 h-6 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
            />
          </svg>
        </div>
      </button>
    </div>
  );
};

export default RefreshTimer;
