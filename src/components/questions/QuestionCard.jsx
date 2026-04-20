import { useNavigate } from 'react-router-dom';
import StatusBadge from './StatusBadge';
import { DIFFICULTIES } from '../../constants/difficulty';
import { useQuestions } from '../../context/QuestionContext';

export const QuestionCard = ({ question }) => {
  const navigate = useNavigate();
  const { updateQuestion, deleteQuestion } = useQuestions();
  const difficultyObj = DIFFICULTIES.find(d => d.value === question.difficulty) || DIFFICULTIES[0];

  const handleStatusChange = (e, newStatus) => {
    e.stopPropagation();
    updateQuestion(question.id, { status: newStatus });
  };

  return (
    <div
      onClick={() => navigate(`/questions/${question.id}`)}
      className="group relative backdrop-blur-xl bg-white/80 shadow-md border border-white/40 rounded-2xl p-5 cursor-pointer hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 flex flex-col"
    >
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition"></div>
      <div className="relative z-10 flex flex-col h-full">
        <div className="flex justify-between items-start mb-3">
          <h4 className="text-base font-semibold text-gray-800 line-clamp-2 pr-2 group-hover:text-blue-600 transition">{question.title}</h4>
          <StatusBadge status={question.status} />
        </div>
        <div className="flex flex-wrap items-center gap-2 text-xs mb-4 flex-1">
          <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-lg shadow-sm font-medium">{question.topic}</span>
          <span className={`text-${difficultyObj.color}-700 bg-${difficultyObj.color}-100 px-3 py-1 rounded-lg shadow-sm font-medium`}>{difficultyObj.label}</span>
          {question.company && <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-lg shadow-sm font-medium">{question.company}</span>}
        </div>
        {/* Replace your current bottom div with this: */}
        <div className="flex justify-between items-center mt-auto pt-3 border-t border-white/5">
          <button
            onClick={(e) => {
              e.stopPropagation(); // Prevents the card from navigating when you click delete
              if (window.confirm('Are you sure you want to delete this question?')) {
                deleteQuestion(question.id);
              }
            }}
            className="text-sm font-medium text-gray-500 hover:text-red-400 transition-colors focus:outline-none"
          >
            Delete
          </button>

          <select
            value={question.status}
            onChange={(e) => handleStatusChange(e, e.target.value)}
            onClick={e => e.stopPropagation()}
            className="text-xs bg-white/5 border-white/10 text-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 py-1.5 pl-3 pr-8"
          >
            <option value="not-started" className="bg-gray-900 text-white">Not Started</option>
            <option value="attempted" className="bg-gray-900 text-white">Attempted</option>
            <option value="confident" className="bg-gray-900 text-white">Confident</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default QuestionCard;