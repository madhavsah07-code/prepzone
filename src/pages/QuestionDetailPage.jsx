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
    <div className="max-w-4xl mx-auto space-y-10 px-6 min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-100">
      <div className="flex justify-between items-start">
        <div className="flex-1 pr-4">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-3">{question.title}</h1>
          <div className="flex flex-wrap gap-3 items-center">
            <StatusBadge status={question.status} />
            <span className="text-sm font-medium bg-blue-100 text-blue-700 px-3 py-1 rounded-lg shadow-sm">{question.topic}</span>
            {question.company && <span className="text-sm font-medium bg-purple-100 text-purple-700 px-3 py-1 rounded-lg shadow-sm">{question.company}</span>}
          </div>
        </div>
        <div className="flex gap-3 flex-col sm:flex-row">
           <select
             value={question.status}
             onChange={(e) => updateQuestion(id, { status: e.target.value })}
             className="text-sm font-medium border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none shadow-sm"
           >
             <option value="not-started">Not Started</option>
             <option value="attempted">Attempted</option>
             <option value="confident">Confident</option>
           </select>
           <Button variant="danger" size="sm" onClick={handleDelete}>Delete</Button>
        </div>
      </div>

      <div className="backdrop-blur-xl bg-white/70 p-8 rounded-2xl shadow-lg border border-white/40 hover:shadow-xl transition">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 border-b border-gray-200 pb-2">Practice Session</h3>
        <PracticeTimer onComplete={handlePracticeComplete} />
      </div>

      <div className="backdrop-blur-xl bg-white/70 p-8 rounded-2xl shadow-lg border border-white/40 flex flex-col hover:shadow-xl transition">
         <h3 className="text-lg font-semibold text-gray-800 mb-4 border-b border-gray-200 pb-2">Solution Notes</h3>
         <textarea
           ref={textareaRef}
           value={notes}
           onChange={(e) => setNotes(e.target.value)}
           onBlur={handleNotesBlur}
           rows={10}
           className="w-full border-gray-200 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none p-4 font-mono text-sm bg-white/80"
           placeholder="Write your approach, time/space complexity, and code snippets here..."
         />
         <p className="text-xs text-gray-500 mt-3 font-medium">Notes auto-save when clicking outside the box.</p>
      </div>
    </div>
  );
};

export default QuestionDetailPage;