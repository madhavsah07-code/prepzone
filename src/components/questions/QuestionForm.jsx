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
    <div className="bg-black/40 backdrop-blur-xl p-6 rounded-2xl border border-white/10">

      <form onSubmit={handleSubmit} className="space-y-6">

        {/*  Title */}
        <div>
          <label className="block text-sm text-gray-400 mb-1">
            Question Title
          </label>

          <input
            required
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-2 text-white focus:ring-2 focus:ring-orange-500 outline-none"
          />
        </div>

        {/*  Topic + Difficulty */}
        <div className="grid grid-cols-2 gap-4">

          <div>
            <label className="block text-sm text-gray-400 mb-1">
              Topic
            </label>

            <select
              name="topic"
              value={formData.topic}
              onChange={handleChange}
              className="w-full bg-black/40 border border-white/10 text-gray-300 rounded-xl px-3 py-2 focus:ring-orange-500 outline-none"
            >
              {TOPICS.map(topic => (
                <option key={topic} value={topic} className="bg-black text-white">
                  {topic}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm text-gray-400 mb-1">
              Difficulty
            </label>

            <select
              name="difficulty"
              value={formData.difficulty}
              onChange={handleChange}
              className="w-full bg-black/40 border border-white/10 text-gray-300 rounded-xl px-3 py-2 focus:ring-orange-500 outline-none"
            >
              {DIFFICULTIES.map(d => (
                <option key={d.value} value={d.value} className="bg-black text-white">
                  {d.label}
                </option>
              ))}
            </select>
          </div>

        </div>

        {/* Company */}
        <div>
          <label className="block text-sm text-gray-400 mb-1">
            Company Tags (Optional)
          </label>

          <input
            type="text"
            name="company"
            placeholder="e.g. Google, Amazon"
            value={formData.company}
            onChange={handleChange}
            className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-2 text-white placeholder-gray-500 focus:ring-orange-500 outline-none"
          />
        </div>

        {/*  Notes */}
        <div>
          <label className="block text-sm text-gray-400 mb-1">
            Initial Notes
          </label>

          <textarea
            name="notes"
            rows={4}
            value={formData.notes}
            onChange={handleChange}
            className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-gray-300 focus:ring-orange-500 outline-none"
          />
        </div>

        {/*  Actions */}
        <div className="flex justify-end space-x-3 pt-5 border-t border-white/10">

          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>

          <Button type="submit">
            Save Question
          </Button>

        </div>

      </form>

    </div>
  );
};

export default QuestionForm;