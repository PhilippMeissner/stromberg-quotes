import { FC, useState, useCallback, useEffect } from 'react';
import { useIsMobile, useInterval } from '../hooks';

interface RefreshTimerProps {
  duration: number;
  onRefresh: () => void;
  isPaused?: boolean;
}

const CIRCLE_RADIUS = 45;
const CIRCUMFERENCE = 2 * Math.PI * CIRCLE_RADIUS;
const MOBILE_PULSE_DELAY_MS = 6000;

const RefreshTimer: FC<RefreshTimerProps> = ({ duration, onRefresh, isPaused = false }) => {
  const [secondsLeft, setSecondsLeft] = useState(duration);
  const [isHovered, setIsHovered] = useState(false);
  const [shouldPulse, setShouldPulse] = useState(false);
  const isMobile = useIsMobile();

  const resetTimer = useCallback(() => {
    setSecondsLeft(duration);
  }, [duration]);

  const handleManualRefresh = useCallback(() => {
    onRefresh();
    resetTimer();
    setShouldPulse(false);
  }, [onRefresh, resetTimer]);

  const isTimerActive = !isMobile && !isPaused && !isHovered;

  useInterval(() => {
    setSecondsLeft((prev) => {
      if (prev <= 1) {
        onRefresh();
        return duration;
      }
      return prev - 1;
    });
  }, isTimerActive ? 1000 : null);

  useEffect(() => {
    if (!isMobile) return;

    const timeout = setTimeout(() => {
      setShouldPulse(true);
    }, MOBILE_PULSE_DELAY_MS);

    return () => clearTimeout(timeout);
  }, [isMobile]);

  const progress = isMobile ? 100 : (secondsLeft / duration) * 100;
  const strokeDashoffset = CIRCUMFERENCE - (progress / 100) * CIRCUMFERENCE;

  return (
    <div className="flex items-center justify-center mt-8">
      <div className="relative w-16 h-16">
        {shouldPulse && isMobile && (
          <span className="absolute inset-0 w-16 h-16 rounded-full border-2 border-gray-400 animate-ping-soft" />
        )}
        <button
          onClick={handleManualRefresh}
          onMouseEnter={() => !isMobile && setIsHovered(true)}
          onMouseLeave={() => !isMobile && setIsHovered(false)}
          className={`relative w-16 h-16 cursor-pointer transition-transform duration-300 active:scale-95 opacity-50 ${isMobile ? 'active:opacity-80' : 'hover:scale-110 hover:opacity-80'}`}
          aria-label="Neues Zitat laden"
        >
        <svg className="w-16 h-16 transform -rotate-90" viewBox="0 0 100 100">
          <circle
            cx="50"
            cy="50"
            r={CIRCLE_RADIUS}
            fill="none"
            stroke="rgba(75, 85, 99, 0.3)"
            strokeWidth="4"
          />
          <circle
            cx="50"
            cy="50"
            r={CIRCLE_RADIUS}
            fill="none"
            stroke="rgba(156, 163, 175, 0.6)"
            strokeWidth="4"
            strokeLinecap="round"
            strokeDasharray={CIRCUMFERENCE}
            strokeDashoffset={strokeDashoffset}
            className={isTimerActive ? 'transition-all duration-1000 ease-linear' : ''}
          />
        </svg>

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
    </div>
  );
};

export default RefreshTimer;
