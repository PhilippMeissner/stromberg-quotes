import { FC } from 'react';

const CIRCLE_RADIUS = 45;
const CIRCUMFERENCE = 2 * Math.PI * CIRCLE_RADIUS;

interface CircularProgressProps {
  progress: number;
  isAnimating?: boolean;
  className?: string;
}

const CircularProgress: FC<CircularProgressProps> = ({
  progress,
  isAnimating = false,
  className = 'w-16 h-16',
}) => {
  const strokeDashoffset = CIRCUMFERENCE - (progress / 100) * CIRCUMFERENCE;

  return (
    <svg className={`${className} transform -rotate-90`} viewBox="0 0 100 100">
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
        className={isAnimating ? 'transition-all duration-1000 ease-linear' : ''}
      />
    </svg>
  );
};

export default CircularProgress;
