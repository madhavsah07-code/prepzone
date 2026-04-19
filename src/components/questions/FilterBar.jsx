import { useQuestions } from '../../context/QuestionContext';
import { TOPICS } from '../../constants/topics';
import { DIFFICULTIES } from '../../constants/difficulty';

export const FilterBar = () => {
  const { filters, setFilters } = useQuestions();

  return (
    <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 flex flex-wrap gap-4 items-center mb-6">
      <div className="flex-1 min-w-[240px]">
        <input
          type="text"
          placeholder="Search questions or companies..."
          value={filters.search}
          onChange={(e) => setFilters({ search: e.target.value })}
          className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm px-4 py-2"
        />
      </div>
      <select
        value={filters.topic}
        onChange={(e) => setFilters({ topic: e.target.value })}
        className="border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm py-2"
      >
        <option value="All">All Topics</option>
        {TOPICS.map(topic => <option key={topic} value={topic}>{topic}</option>)}
      </select>
      <select
        value={filters.difficulty}
        onChange={(e) => setFilters({ difficulty: e.target.value })}
        className="border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm py-2"
      >
        <option value="All">All Difficulties</option>
        {DIFFICULTIES.map(d => <option key={d.value} value={d.value}>{d.label}</option>)}
      </select>
      <select
        value={filters.status}
        onChange={(e) => setFilters({ status: e.target.value })}
        className="border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm py-2"
      >
        <option value="All">All Statuses</option>
        <option value="not-started">Not Started</option>
        <option value="attempted">Attempted</option>
        <option value="confident">Confident</option>
      </select>
    </div>
  );
};

export default FilterBar;