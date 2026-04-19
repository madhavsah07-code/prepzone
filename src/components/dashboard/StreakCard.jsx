import { useStreak } from '../../hooks/useStreak';
import { useQuestions } from '../../context/QuestionContext';

export const StreakCard = () => {
  const { questions } = useQuestions();
  const { currentStreak, todayCount } = useStreak(questions);

  return (
    <div className="bg-gradient-to-r from-orange-50 to-orange-100 p-6 rounded-xl shadow-sm border border-orange-200 flex items-center justify-between">
      <div>
        <h3 className="text-lg font-bold text-orange-900">Current Streak</h3>
        <p className="text-sm text-orange-700 font-medium mt-1">You've practiced {todayCount} question(s) today</p>
      </div>
      <div className="flex items-center space-x-3 bg-white px-4 py-2 rounded-lg shadow-sm">
        <span className="text-3xl drop-shadow-sm">🔥</span>
        <span className="text-3xl font-black text-orange-600">{currentStreak} <span className="text-sm font-medium text-gray-500 uppercase tracking-wider">days</span></span>
      </div>
    </div>
  );
};

export default StreakCard;