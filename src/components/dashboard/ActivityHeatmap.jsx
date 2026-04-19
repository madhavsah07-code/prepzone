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
    <div className="flex flex-col gap-2">
      <div className="flex flex-wrap gap-1.5">
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
              className={`w-5 h-5 rounded-[4px] cursor-help transition-colors ${bgColor}`}
            />
          );
        })}
      </div>
      <div className="flex items-center justify-end text-xs text-gray-500 gap-2 mt-2 font-medium">
        <span>Less</span>
        <div className="flex gap-1">
          <div className="w-3 h-3 rounded-[2px] bg-gray-100"></div>
          <div className="w-3 h-3 rounded-[2px] bg-green-200"></div>
          <div className="w-3 h-3 rounded-[2px] bg-green-400"></div>
          <div className="w-3 h-3 rounded-[2px] bg-green-600"></div>
        </div>
        <span>More</span>
      </div>
    </div>
  );
};

export default ActivityHeatmap;