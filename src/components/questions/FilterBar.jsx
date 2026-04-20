import { useQuestions } from '../../context/QuestionContext';
import { TOPICS } from '../../constants/topics';
import { DIFFICULTIES } from '../../constants/difficulty';

export const FilterBar = () => {
  const { filters, setFilters } = useQuestions();

  return (
    <div className="relative backdrop-blur-xl bg-black/40 p-5 rounded-2xl shadow-lg border border-white/10 flex flex-wrap gap-4 items-center mb-6 hover:shadow-orange-500/20 transition">

      {/*  Orange Glow */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-orange-500/10 to-orange-600/5 pointer-events-none"></div>

      <div className="relative z-10 flex flex-wrap gap-4 items-center w-full">

        {/*  Search */}
        <div className="flex-1 min-w-[240px]">
          <input
            type="text"
            placeholder="Search questions or companies..."
            value={filters.search}
            onChange={(e) => setFilters({ search: e.target.value })}
            className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-2 text-white placeholder-gray-500 focus:ring-2 focus:ring-orange-500 outline-none"
          />
        </div>

        {/*  Topic */}
        <select
          value={filters.topic}
          onChange={(e) => setFilters({ topic: e.target.value })}
          className="bg-black/40 border border-white/10 text-gray-300 rounded-xl py-2 px-3 focus:ring-2 focus:ring-orange-500 outline-none"
        >
          <option value="All" className="bg-black text-white">All Topics</option>
          {TOPICS.map(topic => (
            <option key={topic} value={topic} className="bg-black text-white">
              {topic}
            </option>
          ))}
        </select>

        {/* Difficulty */}
        <select
          value={filters.difficulty}
          onChange={(e) => setFilters({ difficulty: e.target.value })}
          className="bg-black/40 border border-white/10 text-gray-300 rounded-xl py-2 px-3 focus:ring-2 focus:ring-orange-500 outline-none"
        >
          <option value="All" className="bg-black text-white">All Difficulties</option>
          {DIFFICULTIES.map(d => (
            <option key={d.value} value={d.value} className="bg-black text-white">
              {d.label}
            </option>
          ))}
        </select>

        {/*  Status */}
        <select
          value={filters.status}
          onChange={(e) => setFilters({ status: e.target.value })}
          className="bg-black/40 border border-white/10 text-gray-300 rounded-xl py-2 px-3 focus:ring-2 focus:ring-orange-500 outline-none"
        >
          <option value="All" className="bg-black text-white">All Statuses</option>
          <option value="not-started" className="bg-black text-white">Not Started</option>
          <option value="attempted" className="bg-black text-white">Attempted</option>
          <option value="confident" className="bg-black text-white">Confident</option>
        </select>

      </div>
    </div>
  );
};

export default FilterBar;