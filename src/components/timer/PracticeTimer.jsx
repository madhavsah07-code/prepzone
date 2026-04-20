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

  const circumference = 2 * Math.PI * 50;
  const progress = (time % 60) / 60;
  const offset = circumference - progress * circumference;

  return (
    <div className="flex items-center space-x-8 bg-black/40 backdrop-blur-xl p-6 rounded-2xl border border-white/10 shadow-lg">

      {/*  Circular Timer */}
      <div className="relative flex items-center justify-center">

        {/* Glow */}
        <div className="absolute w-32 h-32 bg-orange-500/20 blur-2xl rounded-full animate-pulse"></div>

        <svg className="w-28 h-28 -rotate-90 relative z-10">

          {/* Background */}
          <circle
            cx="56"
            cy="56"
            r="50"
            stroke="rgba(255,255,255,0.1)"
            strokeWidth="8"
            fill="transparent"
          />

          {/* Progress */}
          <circle
            cx="56"
            cy="56"
            r="50"
            stroke="url(#orangeGradient)"
            strokeWidth="8"
            fill="transparent"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            className="transition-all duration-500"
          />

          <defs>
            <linearGradient id="orangeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#f97316" />
              <stop offset="100%" stopColor="#ea580c" />
            </linearGradient>
          </defs>

        </svg>

        {/*  Time Text */}
        <div className="absolute flex flex-col items-center z-10">
          <span className="text-xl font-mono font-bold text-white">
            {formatTime(time)}
          </span>
          <span className="text-xs text-gray-400 uppercase tracking-wider">
            Timer
          </span>
        </div>

      </div>

      {/*  Controls */}
      <div className="flex flex-col space-y-3">

        {!isRunning ? (
          <Button size="sm" onClick={start}>
            Start
          </Button>
        ) : (
          <Button size="sm" variant="secondary" onClick={pause}>
            Pause
          </Button>
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