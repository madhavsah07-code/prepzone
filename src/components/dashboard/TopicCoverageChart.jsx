import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Tooltip } from 'recharts';
import { getCoverageByTopic } from '../../utils/statsUtils';
import { TOPICS } from '../../constants/topics';
import { useQuestions } from '../../context/QuestionContext';

export const TopicCoverageChart = () => {
  const { questions } = useQuestions();
  const data = getCoverageByTopic(questions, TOPICS).filter(d => d.total > 0);

  if (data.length === 0) return <div className="text-gray-500 text-sm flex h-full items-center justify-center">No topic data available yet.</div>;

  return (
    <div className="relative h-72 w-full backdrop-blur-xl bg-white/70 p-4 rounded-2xl border border-white/40 shadow-lg">
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/5 to-purple-500/5 pointer-events-none"></div>
      <div className="relative z-10 h-full w-full">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
            <defs>
              <linearGradient id="colorGradient" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#3b82f6" />
                <stop offset="100%" stopColor="#9333ea" />
              </linearGradient>
            </defs>
            <PolarGrid stroke="#d1d5db" />
            <PolarAngleAxis dataKey="topic" tick={{ fill: '#374151', fontSize: 12, fontWeight: 600 }} />
            <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fill: '#6b7280', fontSize: 11 }} />
            <Radar name="Confidence %" dataKey="percent" stroke="#6366f1" strokeWidth={3} fill="url(#colorGradient)" fillOpacity={0.6} />
            <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', backdropFilter: 'blur(10px)', background: 'rgba(255,255,255,0.8)', boxShadow: '0 8px 20px rgba(0,0,0,0.1)' }} />
          </RadarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default TopicCoverageChart;