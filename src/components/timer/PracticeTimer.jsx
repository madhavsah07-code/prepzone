import { useTimer } from '../../hooks/useTimer';
import Button from '../ui/Button';

export const PracticeTimer = ({ onComplete }) => {
  const { time, isRunning, start, pause, reset } = useTimer();

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  const handleStop = () => {
    pause();
    if (time > 0 && onComplete) {
      onComplete(time);
    }
    reset();
  };

  return (
    <div className="flex items-center space-x-8 backdrop-blur-xl bg-white/70 p-6 rounded-2xl border border-white/40 shadow-lg hover:shadow-xl transition">
      {/* Circular Timer */}
      <div className="relative flex items-center justify-center">
        <svg className="w-28 h-28 -rotate-90">
          <circle
            cx="56"
            cy="56"
            r="50"
            stroke="rgba(0,0,0,0.1)"
            strokeWidth="8"
            fill="transparent"
          />
          <circle
            cx="56"
            cy="56"
            r="50"
            stroke="url(#gradient)"
            strokeWidth="8"
            fill="transparent"
            strokeDasharray={2 * Math.PI * 50}
            strokeDashoffset={(2 * Math.PI * 50) - (time % 60) / 60 * (2 * Math.PI * 50)}
            className="transition-all duration-500"
          />
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#2563eb" />
              <stop offset="100%" stopColor="#9333ea" />
            </linearGradient>
          </defs>
        </svg>

        {/* Time Text */}
        <div className="absolute flex flex-col items-center">
          <span className="text-xl font-mono font-bold text-gray-800">
            {formatTime(time)}
          </span>
          <span className="text-xs text-gray-500 uppercase">Timer</span>
        </div>
      </div>

      {/* Controls */}
      <div className="flex flex-col space-y-2">
        {!isRunning ? (
          <Button size="sm" onClick={start}>Start</Button>
        ) : (
          <Button size="sm" variant="secondary" onClick={pause}>Pause</Button>
        )}

        <Button
          size="sm"
          variant="danger"
          disabled={time === 0}
          onClick={handleStop}
        >
          Stop & Log Time
        </Button>
      </div>
    </div>
  );
};

export default PracticeTimer;