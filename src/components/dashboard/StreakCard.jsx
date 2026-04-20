import { useStreak } from '../../hooks/useStreak';
import { useQuestions } from '../../context/QuestionContext';

export const StreakCard = () => {
  const { questions } = useQuestions();
  const { currentStreak, todayCount } = useStreak(questions);

  return (
    <div className="relative flex items-center justify-between p-6 rounded-2xl backdrop-blur-xl bg-white/70 border border-white/40 shadow-lg hover:shadow-2xl transition-all duration-300">
      {/* Glow Background */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-orange-400/10 to-pink-500/10 pointer-events-none"></div>

      {/* Left Content */}
      <div className="relative z-10">
        <h3 className="text-lg font-semibold text-gray-800">Current Streak</h3>
        <p className="text-sm text-gray-500 font-medium mt-1">
          You practiced <span className="text-blue-600 font-semibold">{todayCount}</span> question(s) today
        </p>
      </div>

      {/* Right Badge */}
      <div className="relative z-10 flex items-center space-x-3 bg-white/80 px-5 py-3 rounded-xl shadow-md hover:scale-105 transition">
        <span className="text-3xl animate-pulse">🔥</span>
        <span className="text-3xl font-black bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent">
          {currentStreak}
          <span className="text-sm font-medium text-gray-500 uppercase tracking-wider ml-1">
            days
          </span>
        </span>
      </div>
    </div>
  );
};

export default StreakCard;