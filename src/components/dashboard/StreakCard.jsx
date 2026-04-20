import { useStreak } from '../../hooks/useStreak';
import { useQuestions } from '../../context/QuestionContext';

export const StreakCard = () => {
  const { questions } = useQuestions();
  const { currentStreak, todayCount } = useStreak(questions);

  return (
    <div className="relative flex items-center justify-between p-6 rounded-2xl bg-black/40 backdrop-blur-xl border border-white/10 shadow-lg">

      {/*  Glow */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-orange-500/10 to-orange-600/5 blur-xl opacity-20"></div>

      {/*  Left */}
      <div className="relative z-10">
        <h3 className="text-lg font-semibold text-white">
          Current Streak
        </h3>

        <p className="text-sm text-gray-400 mt-1">
          You practiced{' '}
          <span className="text-orange-400 font-semibold">
            {todayCount}
          </span>{' '}
          question(s) today
        </p>
      </div>

      {/*  Right Badge */}
      <div className="relative z-10 flex items-center space-x-3 bg-white/5 px-5 py-3 rounded-xl border border-white/10 hover:scale-105 transition">

        <span className="text-3xl animate-pulse">🔥</span>

        <span className="text-3xl font-black bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent">
          {currentStreak}
          <span className="text-sm font-medium text-gray-400 uppercase tracking-wider ml-1">
            days
          </span>
        </span>

      </div>

    </div>
  );
};

export default StreakCard;