import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Tooltip
} from 'recharts';

import { getCoverageByTopic } from '../../utils/statsUtils';
import { TOPICS } from '../../constants/topics';
import { useQuestions } from '../../context/QuestionContext';

export const TopicCoverageChart = () => {
  const { questions } = useQuestions();
  const data = getCoverageByTopic(questions, TOPICS).filter(d => d.total > 0);

  if (data.length === 0)
    return (
      <div className="text-gray-400 text-sm flex h-full items-center justify-center">
        No topic data available yet.
      </div>
    );

  return (
    <div className="relative h-72 w-full bg-black/40 backdrop-blur-xl p-4 rounded-2xl border border-white/10 shadow-lg">

      {/*  Glow */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-orange-500/10 to-orange-600/5 blur-xl opacity-20"></div>

      <div className="relative z-10 h-full w-full">

        <ResponsiveContainer width="100%" height="100%">
          <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>

            {/*  Orange Gradient */}
            <defs>
              <linearGradient id="orangeGradient" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#f97316" />
                <stop offset="100%" stopColor="#ea580c" />
              </linearGradient>
            </defs>

            {/* Grid */}
            <PolarGrid stroke="rgba(255,255,255,0.1)" />

            {/* Axis */}
            <PolarAngleAxis
              dataKey="topic"
              tick={{ fill: '#9ca3af', fontSize: 12 }}
            />

            <PolarRadiusAxis
              angle={30}
              domain={[0, 100]}
              tick={{ fill: '#6b7280', fontSize: 10 }}
            />

            {/*  Radar */}
            <Radar
              name="Confidence %"
              dataKey="percent"
              stroke="#f97316"
              strokeWidth={2}
              fill="url(#orangeGradient)"
              fillOpacity={0.5}
            />

            {/*  Tooltip */}
            <Tooltip
              contentStyle={{
                background: 'rgba(0,0,0,0.8)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '12px',
                color: '#fff'
              }}
            />

          </RadarChart>
        </ResponsiveContainer>

      </div>
    </div>
  );
};

export default TopicCoverageChart;