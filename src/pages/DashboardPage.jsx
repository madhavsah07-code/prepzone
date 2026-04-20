import StreakCard from '../components/dashboard/StreakCard';
import TopicCoverageChart from '../components/dashboard/TopicCoverageChart';
import ActivityHeatmap from '../components/dashboard/ActivityHeatmap';
import { useQuestions } from '../context/QuestionContext';
import { getWeakTopics } from '../utils/statsUtils';
import { isToday } from '../utils/dateUtils';
import { Link } from 'react-router-dom';

export const DashboardPage = () => {
  const { questions } = useQuestions();
  const weakTopics = getWeakTopics(questions);

  const recentActivity = questions
    .filter(q => q.practiceHistory && q.practiceHistory.length > 0)
    .flatMap(q => q.practiceHistory.map(h => ({ ...q, practiceDate: h.date, time: h.timeSpent })))
    .sort((a, b) => new Date(b.practiceDate) - new Date(a.practiceDate))
    .slice(0, 5);

  return (
    <div className="space-y-6 max-w-7xl mx-auto">

      {/*  Title */}
      <h1 className="text-3xl font-bold bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent">
        Overview
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* LEFT */}
        <div className="lg:col-span-2 space-y-6">

          {/*  Streak */}
          <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-lg">
            <StreakCard />
          </div>

          {/*  Chart */}
          <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-lg h-96 flex flex-col">
            <h3 className="text-lg font-bold text-white mb-2">Topic Confidence</h3>
            <div className="flex-1 min-h-0">
              <TopicCoverageChart />
            </div>
          </div>

        </div>

        {/* RIGHT */}
        <div className="space-y-6">

          {/*  Heatmap */}
          <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-lg">
            <h3 className="text-lg font-bold text-white mb-4">
              Activity Map (28 Days)
            </h3>
            <ActivityHeatmap />
          </div>

          {/*  Weak Topics */}
          <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-lg">
            <h3 className="text-lg font-bold text-white mb-4 flex items-center">
              <span className="mr-2 text-orange-400">⚠️</span> Weak Topics
            </h3>

            {weakTopics.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {weakTopics.map(topic => (
                  <span
                    key={topic}
                    className="text-sm font-medium text-orange-400 bg-orange-500/10 px-3 py-1.5 rounded-lg border border-orange-500/20"
                  >
                    {topic}
                  </span>
                ))}
              </div>
            ) : (
              <p className="text-sm text-gray-400">
                Great job! No weak topics identified yet.
              </p>
            )}
          </div>

        </div>
      </div>

      {/*  Recent Activity */}
      <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-lg">
        <h3 className="text-lg font-bold text-white mb-4">
          Recent Practice Sessions
        </h3>

        {recentActivity.length > 0 ? (
          <div className="divide-y divide-white/10">
            {recentActivity.map((activity, idx) => (
              <div key={idx} className="flex justify-between items-center py-3">

                <Link
                  to={`/questions/${activity.id}`}
                  className="text-orange-400 hover:text-orange-300 font-medium transition"
                >
                  {activity.title}
                </Link>

                <div className="flex items-center gap-4">
                  <span className="text-sm text-gray-400 font-mono">
                    {activity.time}s
                  </span>

                  <span className="text-sm font-medium text-gray-300 bg-white/5 px-2 py-1 rounded">
                    {isToday(activity.practiceDate)
                      ? 'Today'
                      : new Date(activity.practiceDate).toLocaleDateString()}
                  </span>
                </div>

              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-gray-400">
            No recent activity recorded.
          </p>
        )}
      </div>

    </div>
  );
};

export default DashboardPage;