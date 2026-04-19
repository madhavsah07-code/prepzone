import { useNavigate } from 'react-router-dom';
import StatusBadge from './StatusBadge';
import { DIFFICULTIES } from '../../constants/difficulty';
import { useQuestions } from '../../context/QuestionContext';

export const QuestionCard = ({ question }) => {
  const navigate = useNavigate();
  const { updateQuestion } = useQuestions();
  const difficultyObj = DIFFICULTIES.find(d => d.value === question.difficulty) || DIFFICULTIES[0];

  const handleStatusChange = (e, newStatus) => {
    e.stopPropagation();
    updateQuestion(question.id, { status: newStatus });
  };

  return (
    <div
      onClick={() => navigate(`/questions/${question.id}`)}
      className="bg-white shadow-sm border border-gray-200 rounded-xl p-5 cursor-pointer hover:shadow-md transition-all duration-200 flex flex-col"
    >
      <div className="flex justify-between items-start mb-3">
        <h4 className="text-base font-semibold text-gray-900 line-clamp-2 pr-2">{question.title}</h4>
        <StatusBadge status={question.status} />
      </div>
      <div className="flex flex-wrap items-center gap-2 text-xs mb-4 flex-1">
        <span className="bg-blue-50 text-blue-700 px-2.5 py-1 rounded-md font-medium">{question.topic}</span>
        <span className={`text-${difficultyObj.color}-700 bg-${difficultyObj.color}-50 px-2.5 py-1 rounded-md font-medium`}>{difficultyObj.label}</span>
        {question.company && <span className="bg-purple-50 text-purple-700 px-2.5 py-1 rounded-md font-medium">{question.company}</span>}
      </div>
      <div className="flex justify-end mt-auto pt-3 border-t border-gray-100">
         <select
           value={question.status}
           onChange={(e) => handleStatusChange(e, e.target.value)}
           onClick={e => e.stopPropagation()}
           className="text-xs border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 py-1 pl-2 pr-6 shadow-sm"
         >
           <option value="not-started">Mark Not Started</option>
           <option value="attempted">Mark Attempted</option>
           <option value="confident">Mark Confident</option>
         </select>
      </div>
    </div>
  );
};

export default QuestionCard;