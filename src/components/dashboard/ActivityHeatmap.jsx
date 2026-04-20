import { getLastNDays } from '../../utils/dateUtils';
import { useQuestions } from '../../context/QuestionContext';

export const ActivityHeatmap = () => {
  const { questions } = useQuestions();
  const days = getLastNDays(28); // 4 weeks of data

  const activityMap = questions.reduce((acc, q) => {
    if (q.practiceHistory) {
      q.practiceHistory.forEach(h => {
        const dateStr = new Date(h.date).toISOString().split('T')[0];
        acc[dateStr] = (acc[dateStr] || 0) + 1;
      });
    }
    return acc;
  }, {});

  return (
    <div className="relative flex flex-col gap-3 backdrop-blur-xl bg-white/70 p-4 rounded-2xl border border-white/40 shadow-lg">
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/5 to-purple-500/5 pointer-events-none"></div>
      <div className="relative z-10">
        <div className="flex flex-wrap gap-2">
          {days.map(day => {
            const count = activityMap[day] || 0;
            let bgColor = 'bg-gray-100';
            if (count > 0) bgColor = 'bg-green-200';
            if (count > 2) bgColor = 'bg-green-400';
            if (count > 5) bgColor = 'bg-green-600';

            return (
              <div
                key={day}
                title={`${day}: ${count} questions practiced`}
                className={`w-5 h-5 rounded-md cursor-help transition-all duration-200 ${bgColor} hover:scale-110 hover:shadow-md`}
              />
            );
          })}
        </div>
        <div className="flex items-center justify-end text-xs text-gray-500 gap-2 mt-3 font-medium">
          <span>Less</span>
          <div className="flex gap-1">
            <div className="w-3 h-3 rounded-md bg-gray-100"></div>
            <div className="w-3 h-3 rounded-md bg-green-200"></div>
            <div className="w-3 h-3 rounded-md bg-green-400"></div>
            <div className="w-3 h-3 rounded-md bg-green-600"></div>
          </div>
          <span>More</span>
        </div>
      </div>
    </div>
  );
};

export default ActivityHeatmap;