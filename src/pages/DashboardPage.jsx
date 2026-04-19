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
      <h1 className="text-2xl font-bold text-gray-900">Overview</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <StreakCard />
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 h-96 flex flex-col">
            <h3 className="text-lg font-bold text-gray-900 mb-2">Topic Confidence</h3>
            <div className="flex-1 min-h-0"><TopicCoverageChart /></div>
          </div>
        </div>
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Activity Map (28 Days)</h3>
            <ActivityHeatmap />
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center"><span className="mr-2 text-red-500">⚠️</span> Weak Topics</h3>
            {weakTopics.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {weakTopics.map(topic => (
                  <span key={topic} className="text-sm font-medium text-red-700 bg-red-50 px-3 py-1.5 rounded-md border border-red-100">{topic}</span>
                ))}
              </div>
            ) : <p className="text-sm text-gray-500">Great job! No weak topics identified yet.</p>}
          </div>
        </div>
      </div>
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Recent Practice Sessions</h3>
        {recentActivity.length > 0 ? (
          <div className="divide-y divide-gray-100">
            {recentActivity.map((activity, idx) => (
              <div key={idx} className="flex justify-between items-center py-3 first:pt-0 last:pb-0">
                <Link to={`/questions/${activity.id}`} className="text-blue-600 hover:text-blue-800 font-medium hover:underline">{activity.title}</Link>
                <div className="flex items-center gap-4">
                  <span className="text-sm text-gray-500 font-mono">{activity.time}s</span>
                  <span className="text-sm font-medium text-gray-600 bg-gray-50 px-2 py-1 rounded">{isToday(activity.practiceDate) ? 'Today' : new Date(activity.practiceDate).toLocaleDateString()}</span>
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