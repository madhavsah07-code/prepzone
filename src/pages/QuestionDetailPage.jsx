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

  if (!question)
    return <div className="p-6 text-gray-400">Question not found.</div>;

  const handleNotesBlur = () => {
    if (notes !== question.notes) {
      updateQuestion(id, { notes });
      toast.success('Notes automatically saved');
    }
  };

  const handlePracticeComplete = (timeSpent) => {
    const newHistory = [
      ...(question.practiceHistory || []),
      { date: new Date().toISOString(), timeSpent }
    ];
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
    <div className="max-w-4xl mx-auto space-y-10 px-6">

      {/* 🔥 Header */}
      <div className="flex justify-between items-start">

        <div className="flex-1 pr-4">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent mb-3">
            {question.title}
          </h1>

          <div className="flex flex-wrap gap-3 items-center">
            <StatusBadge status={question.status} />

            <span className="text-sm font-medium bg-blue-500/10 text-blue-400 px-3 py-1 rounded-lg">
              {question.topic}
            </span>

            {question.company && (
              <span className="text-sm font-medium bg-purple-500/10 text-purple-400 px-3 py-1 rounded-lg">
                {question.company}
              </span>
            )}
          </div>
        </div>

        <div className="flex gap-3 flex-col sm:flex-row">

          <select
            value={question.status}
            onChange={(e) => updateQuestion(id, { status: e.target.value })}
            className="text-sm bg-black/40 border border-white/10 text-gray-300 rounded-lg focus:ring-orange-500 focus:outline-none"
          >
            <option value="not-started" className="bg-black text-white">Not Started</option>
            <option value="attempted" className="bg-black text-white">Attempted</option>
            <option value="confident" className="bg-black text-white">Confident</option>
          </select>

          <Button variant="danger" size="sm" onClick={handleDelete}>
            Delete
          </Button>

        </div>
      </div>

      {/*  Practice Section */}
      <div className="bg-black/40 backdrop-blur-xl p-8 rounded-2xl shadow-lg border border-white/10">
        <h3 className="text-lg font-semibold text-white mb-4 border-b border-white/10 pb-2">
          Practice Session
        </h3>

        <PracticeTimer onComplete={handlePracticeComplete} />
      </div>

      {/*  Notes Section */}
      <div className="bg-black/40 backdrop-blur-xl p-8 rounded-2xl shadow-lg border border-white/10 flex flex-col">

        <h3 className="text-lg font-semibold text-white mb-4 border-b border-white/10 pb-2">
          Solution Notes
        </h3>

        <textarea
          ref={textareaRef}
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          onBlur={handleNotesBlur}
          rows={10}
          className="w-full bg-black/40 border border-white/10 rounded-xl p-4 text-gray-300 font-mono text-sm focus:ring-2 focus:ring-orange-500 outline-none"
          placeholder="Write your approach, time/space complexity, and code snippets here..."
        />

        <p className="text-xs text-gray-400 mt-3">
          Notes auto-save when clicking outside the box.
        </p>

      </div>
    </div>
  );
};

export default QuestionDetailPage;