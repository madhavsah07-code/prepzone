import { useState, useCallback } from 'react';
import { useQuestions } from '../../context/QuestionContext';
import { TOPICS } from '../../constants/topics';
import { DIFFICULTIES } from '../../constants/difficulty';
import Button from '../ui/Button';

export const QuestionForm = ({ initialData, onClose }) => {
  const { addQuestion, updateQuestion } = useQuestions();
  const [formData, setFormData] = useState({
    title: initialData?.title || '',
    topic: initialData?.topic || TOPICS[0],
    difficulty: initialData?.difficulty || 'medium',
    company: initialData?.company || '',
    notes: initialData?.notes || '',
    status: initialData?.status || 'not-started',
    practiceHistory: initialData?.practiceHistory || []
  });

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (initialData?.id) {
      await updateQuestion(initialData.id, formData);
    } else {
      await addQuestion(formData);
    }
    onClose();
  };

  return (
    <div className="backdrop-blur-xl bg-white/70 p-6 rounded-2xl border border-white/40 shadow-lg">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">Question Title</label>
          <input required type="text" name="title" value={formData.title} onChange={handleChange} className="w-full border-gray-200 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none px-4 py-2 bg-white/80" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Topic</label>
            <select name="topic" value={formData.topic} onChange={handleChange} className="w-full border-gray-200 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none px-3 py-2 bg-white/80">
              {TOPICS.map(topic => <option key={topic} value={topic}>{topic}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Difficulty</label>
            <select name="difficulty" value={formData.difficulty} onChange={handleChange} className="w-full border-gray-200 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none px-3 py-2 bg-white/80">
              {DIFFICULTIES.map(d => <option key={d.value} value={d.value}>{d.label}</option>)}
            </select>
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">Company Tags (Optional)</label>
          <input type="text" name="company" placeholder="e.g. Google, Amazon" value={formData.company} onChange={handleChange} className="w-full border-gray-200 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none px-4 py-2 bg-white/80" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">Initial Notes</label>
          <textarea name="notes" rows={4} value={formData.notes} onChange={handleChange} className="w-full border-gray-200 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none px-4 py-3 bg-white/80" />
        </div>
        <div className="flex justify-end space-x-3 pt-5 border-t border-gray-200">
          <Button variant="secondary" onClick={onClose}>Cancel</Button>
          <Button type="submit">Save Question</Button>
        </div>
      </form>
    </div>
  );
};

export default QuestionForm;