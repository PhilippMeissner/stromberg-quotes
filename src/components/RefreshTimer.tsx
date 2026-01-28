import { FC, useState, useCallback, useEffect } from 'react';
import { useIsMobile, useInterval } from '../hooks';
import { CircularProgress, RefreshIcon } from '../icons';
import { TIMERS } from '../constants';

interface RefreshTimerProps {
  duration: number;
  onRefresh: () => void;
  isPaused?: boolean;
}

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
    }, TIMERS.MOBILE_PULSE_DELAY_MS);

    return () => clearTimeout(timeout);
  }, [isMobile]);

  const progress = isMobile ? 100 : (secondsLeft / duration) * 100;

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
          <CircularProgress progress={progress} isAnimating={isTimerActive} />
          <div className="absolute inset-0 flex items-center justify-center">
            <RefreshIcon className="w-6 h-6 text-gray-400" />
          </div>
        </button>
      </div>
    </div>
  );
};

export default RefreshTimer;
