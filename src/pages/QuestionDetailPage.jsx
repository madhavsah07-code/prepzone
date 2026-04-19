import { useParams, useNavigate } from 'react-router-dom';
import { useQuestions } from '../context/QuestionContext';
import { useState, useEffect, useRef } from 'react';
import PracticeTimer from '../components/timer/PracticeTimer';
import StatusBadge from '../components/questions/StatusBadge';
import Button from '../components/ui/Button';
import toast from 'react-hot-toast';

export const QuestionDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { questions, updateQuestion, deleteQuestion } = useQuestions();
  const question = questions.find(q => q.id === id);

  const [notes, setNotes] = useState(question?.notes || '');
  const textareaRef = useRef(null);

  useEffect(() => {
    if (question) setNotes(question.notes || '');
  }, [question]);

  if (!question) return <div className="p-6 text-gray-500">Question not found.</div>;

  const handleNotesBlur = () => {
    if (notes !== question.notes) {
      updateQuestion(id, { notes });
      toast.success('Notes automatically saved');
    }
  };

  const handlePracticeComplete = (timeSpent) => {
    const newHistory = [...(question.practiceHistory || []), { date: new Date().toISOString(), timeSpent }];
    updateQuestion(id, { practiceHistory: newHistory });
    toast.success(`Practice logged: ${timeSpent} seconds`);
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this question?')) {
      deleteQuestion(id);
      navigate('/questions');
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="flex justify-between items-start">
        <div className="flex-1 pr-4">
          <h1 className="text-3xl font-extrabold text-gray-900 mb-3">{question.title}</h1>
          <div className="flex flex-wrap gap-3 items-center">
            <StatusBadge status={question.status} />
            <span className="text-sm font-medium bg-blue-50 text-blue-700 px-3 py-1 rounded-md">{question.topic}</span>
            {question.company && <span className="text-sm font-medium bg-purple-50 text-purple-700 px-3 py-1 rounded-md">{question.company}</span>}
          </div>
        </div>
        <div className="flex gap-3 flex-col sm:flex-row">
           <select
             value={question.status}
             onChange={(e) => updateQuestion(id, { status: e.target.value })}
             className="text-sm font-medium border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 shadow-sm"
           >
             <option value="not-started">Not Started</option>
             <option value="attempted">Attempted</option>
             <option value="confident">Confident</option>
           </select>
           <Button variant="danger" size="sm" onClick={handleDelete}>Delete</Button>
        </div>
      </div>

      <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200">
        <h3 className="text-lg font-bold text-gray-900 mb-4 border-b pb-2">Practice Session</h3>
        <PracticeTimer onComplete={handlePracticeComplete} />
      </div>

      <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200 flex flex-col">
         <h3 className="text-lg font-bold text-gray-900 mb-4 border-b pb-2">Solution Notes</h3>
         <textarea
           ref={textareaRef}
           value={notes}
           onChange={(e) => setNotes(e.target.value)}
           onBlur={handleNotesBlur}
           rows={10}
           className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 p-4 font-mono text-sm"
           placeholder="Write your approach, time/space complexity, and code snippets here..."
         />
         <p className="text-xs text-gray-400 mt-3 font-medium">Notes auto-save when clicking outside the box.</p>
      </div>
    </div>
  );
};

export default QuestionDetailPage;