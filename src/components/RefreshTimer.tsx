import { FC, useEffect, useState, useCallback } from 'react';

interface RefreshTimerProps {
  duration: number; // in seconds
  onRefresh: () => void;
  isPaused?: boolean;
}

// Funny Stromberg-themed messages for different time ranges
const getStrombergMessage = (secondsLeft: number, totalDuration: number): string => {
  const percentage = (secondsLeft / totalDuration) * 100;

  if (percentage > 80) {
    return "Erstmal Kaffee holen...";
  } else if (percentage > 60) {
    return "Bernd denkt nach...";
  } else if (percentage > 40) {
    return "Gleich kommt's!";
  } else if (percentage > 20) {
    return "Weisheit incoming...";
  } else if (percentage > 10) {
    return "Fast geschafft!";
  } else {
    return "Jetzt aber!";
  }
};

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
    if (isPaused) return;

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
  }, [duration, onRefresh, isPaused]);

  // Calculate progress for circular indicator
  const progress = ((duration - secondsLeft) / duration) * 100;
  const circumference = 2 * Math.PI * 45; // radius = 45
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div className="flex flex-col items-center gap-4 mt-12">
      {/* Status message */}
      <div className="text-gray-400 text-sm animate-pulse">
        {getStrombergMessage(secondsLeft, duration)}
      </div>

      {/* Circular timer button */}
      <button
        onClick={handleManualRefresh}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="relative w-24 h-24 cursor-pointer group transition-transform duration-300 hover:scale-110 active:scale-95"
        title="Klick mich für sofortige Weisheit!"
        aria-label="Neues Zitat laden"
      >
        {/* Background circle */}
        <svg className="w-24 h-24 transform -rotate-90" viewBox="0 0 100 100">
          {/* Track */}
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke="rgba(75, 85, 99, 0.3)"
            strokeWidth="6"
          />
          {/* Progress */}
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke="url(#gradient)"
            strokeWidth="6"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            className="transition-all duration-1000 ease-linear"
          />
          {/* Gradient definition */}
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#f59e0b" />
              <stop offset="100%" stopColor="#ef4444" />
            </linearGradient>
          </defs>
        </svg>

        {/* Center content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          {isHovered ? (
            // Refresh icon on hover
            <svg
              className="w-8 h-8 text-amber-400 animate-spin"
              style={{ animationDuration: '2s' }}
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
          ) : (
            // Countdown display
            <>
              <span className="text-2xl font-bold text-white">{secondsLeft}</span>
              <span className="text-xs text-gray-400">Sek.</span>
            </>
          )}
        </div>
      </button>

      {/* Hint text */}
      <div className="text-gray-500 text-xs transition-opacity duration-300 opacity-60 group-hover:opacity-100">
        {isHovered ? "Los geht's!" : "Oder klick zum Skippen"}
      </div>
    </div>
  );
};

export default RefreshTimer;
