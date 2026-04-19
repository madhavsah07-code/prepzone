import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Tooltip } from 'recharts';
import { getCoverageByTopic } from '../../utils/statsUtils';
import { TOPICS } from '../../constants/topics';
import { useQuestions } from '../../context/QuestionContext';

export const TopicCoverageChart = () => {
  const { questions } = useQuestions();
  const data = getCoverageByTopic(questions, TOPICS).filter(d => d.total > 0);

  if (data.length === 0) return <div className="text-gray-500 text-sm flex h-full items-center justify-center">No topic data available yet.</div>;

  return (
    <div className="h-72 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="75%" data={data}>
          <PolarGrid stroke="#e5e7eb" />
          <PolarAngleAxis dataKey="topic" tick={{ fill: '#4b5563', fontSize: 11, fontWeight: 500 }} />
          <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fill: '#9ca3af', fontSize: 10 }} />
          <Radar name="Confidence %" dataKey="percent" stroke="#3b82f6" strokeWidth={2} fill="#60a5fa" fillOpacity={0.5} />
          <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TopicCoverageChart;