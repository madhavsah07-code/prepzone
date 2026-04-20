import { useNavigate } from 'react-router-dom';
import StatusBadge from './StatusBadge';
import { DIFFICULTIES } from '../../constants/difficulty';
import { useQuestions } from '../../context/QuestionContext';

export const QuestionCard = ({ question }) => {
  const navigate = useNavigate();
  const { updateQuestion, deleteQuestion } = useQuestions();

  const difficultyObj =
    DIFFICULTIES.find(d => d.value === question.difficulty) || DIFFICULTIES[0];

  const handleStatusChange = (e, newStatus) => {
    e.stopPropagation();
    updateQuestion(question.id, { status: newStatus });
  };

  return (
    <div
      onClick={() => navigate(`/questions/${question.id}`)}
      className="group relative bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl p-5 cursor-pointer shadow-lg hover:shadow-orange-500/20 hover:-translate-y-1 transition-all duration-300 flex flex-col"
    >

      {/*  Glow */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-orange-500/10 to-orange-600/5 opacity-0 group-hover:opacity-100 blur-xl transition"></div>

      <div className="relative z-10 flex flex-col h-full">

        {/*  Title + Status */}
        <div className="flex justify-between items-start mb-3">
          <h4 className="text-base font-semibold text-white line-clamp-2 pr-2 group-hover:text-orange-400 transition">
            {question.title}
          </h4>
          <StatusBadge status={question.status} />
        </div>

        {/*  Tags */}
        <div className="flex flex-wrap items-center gap-2 text-xs mb-4 flex-1">

          <span className="bg-blue-500/10 text-blue-400 px-3 py-1 rounded-lg font-medium">
            {question.topic}
          </span>

          <span className={`bg-${difficultyObj.color}-500/10 text-${difficultyObj.color}-400 px-3 py-1 rounded-lg font-medium`}>
            {difficultyObj.label}
          </span>

          {question.company && (
            <span className="bg-purple-500/10 text-purple-400 px-3 py-1 rounded-lg font-medium">
              {question.company}
            </span>
          )}

        </div>

        {/*  Bottom Section */}
        <div className="flex justify-between items-center mt-auto pt-3 border-t border-white/10">

          {/* Delete */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              if (window.confirm('Are you sure you want to delete this question?')) {
                deleteQuestion(question.id);
              }
            }}
            className="text-sm font-medium text-gray-400 hover:text-red-400 transition-colors"
          >
            Delete
          </button>

          {/* Status Select */}
          <select
            value={question.status}
            onChange={(e) => handleStatusChange(e, e.target.value)}
            onClick={(e) => e.stopPropagation()}
            className="text-xs bg-black/40 border border-white/10 text-gray-300 rounded-lg focus:ring-orange-500 focus:border-orange-500 py-1.5 pl-3 pr-8"
          >
            <option value="not-started" className="bg-black text-white">Not Started</option>
            <option value="attempted" className="bg-black text-white">Attempted</option>
            <option value="confident" className="bg-black text-white">Confident</option>
          </select>

        </div>

      </div>
    </div>
  );
};

export default QuestionCard;