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
    <div className="flex items-center space-x-6 bg-gray-50 p-5 rounded-xl border border-gray-200 w-max shadow-sm">
      <div className="flex flex-col">
        <span className="text-3xl font-mono font-bold text-gray-800 tracking-wider">{formatTime(time)}</span>
        <span className="text-xs text-gray-500 font-medium uppercase tracking-wider mt-1">Timer</span>
      </div>
      <div className="flex space-x-2">
        {!isRunning ? (
          <Button size="sm" onClick={start}>Start</Button>
        ) : (
          <Button size="sm" variant="secondary" onClick={pause}>Pause</Button>
        )}
        <Button size="sm" variant="danger" disabled={time === 0} onClick={handleStop}>Stop & Log Time</Button>
      </div>
    </div>
  );
};

export default PracticeTimer;