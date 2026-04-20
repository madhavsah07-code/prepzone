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
    <div className="space-y-8 max-w-7xl mx-auto px-6 min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-100">
      <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Overview</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-7">
        <div className="lg:col-span-2 space-y-6">
          <StreakCard />
          <div className="backdrop-blur-xl bg-white/70 border border-white/40 p-6 rounded-2xl shadow-lg h-96 flex flex-col hover:shadow-xl transition">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">Topic Confidence</h3>
            <div className="flex-1 min-h-0"><TopicCoverageChart /></div>
          </div>
        </div>
        <div className="space-y-6">
          <div className="backdrop-blur-xl bg-white/70 border border-white/40 p-6 rounded-2xl shadow-lg hover:shadow-xl transition">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">Activity Map (28 Days)</h3>
            <ActivityHeatmap />
          </div>
          <div className="backdrop-blur-xl bg-white/70 border border-white/40 p-6 rounded-2xl shadow-lg hover:shadow-xl transition">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center"><span className="mr-2 text-red-500">⚠️</span> Weak Topics</h3>
            {weakTopics.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {weakTopics.map(topic => (
                  <span key={topic} className="text-sm font-medium text-red-700 bg-red-100 px-3 py-1.5 rounded-lg shadow-sm">{topic}</span>
                ))}
              </div>
            ) : <p className="text-sm text-gray-500">Great job! No weak topics identified yet.</p>}
          </div>
        </div>
      </div>
      <div className="backdrop-blur-xl bg-white/70 border border-white/40 p-6 rounded-2xl shadow-lg hover:shadow-xl transition">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Recent Practice Sessions</h3>
        {recentActivity.length > 0 ? (
          <div className="divide-y divide-gray-200">
            {recentActivity.map((activity, idx) => (
              <div key={idx} className="flex justify-between items-center py-3 first:pt-0 last:pb-0 hover:bg-white/50 px-2 rounded-lg transition">
                <Link to={`/questions/${activity.id}`} className="text-blue-600 hover:text-purple-600 font-semibold transition">{activity.title}</Link>
                <div className="flex items-center gap-4">
                  <span className="text-sm text-gray-600 font-mono">{activity.time}s</span>
                  <span className="text-sm font-medium text-gray-700 bg-gray-100 px-2 py-1 rounded-lg">{isToday(activity.practiceDate) ? 'Today' : new Date(activity.practiceDate).toLocaleDateString()}</span>
                </div>
              </div>
            ))}
          </div>
        ) : <p className="text-sm text-gray-500">No recent activity recorded.</p>}
      </div>
    </div>
  );
};

export default DashboardPage;