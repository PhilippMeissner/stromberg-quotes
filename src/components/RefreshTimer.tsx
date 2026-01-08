import { FC, useEffect, useState, useCallback } from 'react';

interface RefreshTimerProps {
  duration: number; // in seconds
  onRefresh: () => void;
  isPaused?: boolean;
}

const RefreshTimer: FC<RefreshTimerProps> = ({ duration, onRefresh, isPaused = false }) => {
  const [secondsLeft, setSecondsLeft] = useState(duration);
  const [isHovered, setIsHovered] = useState(false);

  const resetTimer = useCallback(() => {
    setSecondsLeft(duration);
  }, [duration]);

  const handleManualRefresh = useCallback(() => {
    onRefresh();
    resetTimer();
  }, [onRefresh, resetTimer]);

  useEffect(() => {
    if (isPaused || isHovered) return;

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
  }, [duration, onRefresh, isPaused, isHovered]);

  // Calculate progress - starts full and depletes over time
  const progress = (secondsLeft / duration) * 100;
  const circumference = 2 * Math.PI * 45; // radius = 45
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div className="flex items-center justify-center mt-8">
      <button
        onClick={handleManualRefresh}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="relative w-16 h-16 cursor-pointer transition-all duration-300 hover:scale-110 active:scale-95 opacity-50 hover:opacity-80"
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
            className="transition-all duration-1000 ease-linear"
          />
        </svg>

        {/* Refresh icon - visible on hover */}
        <div className={`absolute inset-0 flex items-center justify-center transition-opacity duration-200 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
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
