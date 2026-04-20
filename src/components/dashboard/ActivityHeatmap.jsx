import { getLastNDays } from '../../utils/dateUtils';
import { useQuestions } from '../../context/QuestionContext';

export const ActivityHeatmap = () => {
  const { questions } = useQuestions();
  const days = getLastNDays(28);

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
    <div className="relative flex flex-col gap-3 bg-black/40 backdrop-blur-xl p-4 rounded-2xl border border-white/10 shadow-lg">

      {/*  Glow */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-orange-500/10 to-orange-600/5 blur-xl opacity-20"></div>

      <div className="relative z-10">

        {/*  Grid */}
        <div className="flex flex-wrap gap-2">

          {days.map(day => {
            const count = activityMap[day] || 0;

            let bgColor = 'bg-white/10';
            if (count > 0) bgColor = 'bg-orange-400/30';
            if (count > 2) bgColor = 'bg-orange-500/60';
            if (count > 5) bgColor = 'bg-orange-600';

            return (
              <div
                key={day}
                title={`${day}: ${count} questions practiced`}
                className={`
                  w-5 h-5 rounded-md cursor-help transition-all duration-200
                  ${bgColor}
                  hover:scale-110 hover:shadow-orange-500/30
                `}
              />
            );
          })}

        </div>

        {/*  Legend */}
        <div className="flex items-center justify-end text-xs text-gray-400 gap-2 mt-3">

          <span>Less</span>

          <div className="flex gap-1">
            <div className="w-3 h-3 rounded-md bg-white/10"></div>
            <div className="w-3 h-3 rounded-md bg-orange-400/30"></div>
            <div className="w-3 h-3 rounded-md bg-orange-500/60"></div>
            <div className="w-3 h-3 rounded-md bg-orange-600"></div>
          </div>

          <span>More</span>

        </div>

      </div>

    </div>
  );
};

export default ActivityHeatmap;