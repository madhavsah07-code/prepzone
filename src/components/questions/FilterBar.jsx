import { useQuestions } from '../../context/QuestionContext';
import { TOPICS } from '../../constants/topics';
import { DIFFICULTIES } from '../../constants/difficulty';

export const FilterBar = () => {
  const { filters, setFilters } = useQuestions();

  return (
    <div className="backdrop-blur-xl bg-white/70 p-5 rounded-2xl shadow-lg border border-white/40 flex flex-wrap gap-4 items-center mb-6 hover:shadow-xl transition">
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/5 to-purple-500/5 pointer-events-none"></div>
      <div className="relative z-10 flex flex-wrap gap-4 items-center w-full">
        <div className="flex-1 min-w-[240px]">
          <input
            type="text"
            placeholder="Search questions or companies..."
            value={filters.search}
            onChange={(e) => setFilters({ search: e.target.value })}
            className="w-full border-gray-200 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none sm:text-sm px-4 py-2 bg-white/80"
          />
        </div>
        <select
          value={filters.topic}
          onChange={(e) => setFilters({ topic: e.target.value })}
          className="border-gray-200 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none sm:text-sm py-2 px-3 bg-white/80 hover:shadow-md transition"
        >
          <option value="All">All Topics</option>
          {TOPICS.map(topic => <option key={topic} value={topic}>{topic}</option>)}
        </select>
        <select
          value={filters.difficulty}
          onChange={(e) => setFilters({ difficulty: e.target.value })}
          className="border-gray-200 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none sm:text-sm py-2 px-3 bg-white/80 hover:shadow-md transition"
        >
          <option value="All">All Difficulties</option>
          {DIFFICULTIES.map(d => <option key={d.value} value={d.value}>{d.label}</option>)}
        </select>
        <select
          value={filters.status}
          onChange={(e) => setFilters({ status: e.target.value })}
          className="border-gray-200 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none sm:text-sm py-2 px-3 bg-white/80 hover:shadow-md transition"
        >
          <option value="All">All Statuses</option>
          <option value="not-started">Not Started</option>
          <option value="attempted">Attempted</option>
          <option value="confident">Confident</option>
        </select>
      </div>
    </div>
  );
};

export default FilterBar;