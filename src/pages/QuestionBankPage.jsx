import { useState } from 'react';
import { useQuestions } from '../context/QuestionContext';
import { useFilter } from '../hooks/useFilter';
import FilterBar from '../components/questions/FilterBar';
import QuestionCard from '../components/questions/QuestionCard';
import Modal from '../components/ui/Modal';
import QuestionForm from '../components/questions/QuestionForm';
import EmptyState from '../components/ui/EmptyState';
import Button from '../components/ui/Button';

export const QuestionBankPage = () => {
  const { questions, filters } = useQuestions();
  const [isModalOpen, setIsModalOpen] = useState(false);

  // ✅ Safe filter fallback
  let filteredQuestions = questions;
  try {
    const res = useFilter(questions, filters);
    if (res && Array.isArray(res.filteredQuestions)) {
      filteredQuestions = res.filteredQuestions;
    }
  } catch (e) {
    console.log("Filter error fallback", e);
  }

  return (
    <div className="max-w-7xl mx-auto h-full relative pb-20 px-6 bg-gradient-to-br from-slate-50 via-blue-50 to-purple-100 min-h-screen">

  {/* HEADER */}
  <div className="flex justify-between items-center mb-10">
    <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
      Question Bank
    </h1>

    <Button
      onClick={() => setIsModalOpen(true)}
      className="hidden md:inline-flex bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl shadow-lg hover:scale-105 hover:shadow-xl transition-all duration-300"
    >
      + Add Question
    </Button>
  </div>

  {/* FILTER GLASS CARD */}
  <div className="backdrop-blur-xl bg-white/70 border border-white/40 rounded-2xl shadow-lg p-5 mb-8 hover:shadow-xl transition">
    <FilterBar />
  </div>

  {/* MAIN CARD */}
  <div className="backdrop-blur-xl bg-white/60 border border-white/40 rounded-2xl shadow-xl p-8 min-h-[350px]">

    {filteredQuestions.length > 0 ? (
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-7">
        {filteredQuestions.map((q) => (
          <div
            key={q.id}
            className="group relative bg-white/80 backdrop-blur-lg border border-gray-100 rounded-2xl p-5 shadow-md hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
          >
            {/* glow effect */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition"></div>

            <div className="relative z-10">
              <QuestionCard question={q} />
            </div>
          </div>
        ))}
      </div>
    ) : (
      <div className="flex flex-col items-center justify-center text-center py-20">
        
        <div className="w-20 h-20 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white text-3xl shadow-lg mb-6">
          ?
        </div>

        <p className="text-gray-700 text-xl font-medium mb-2">
          No questions found
        </p>

        <p className="text-gray-500 mb-6">
          Start building your question bank 🚀
        </p>

        <Button
          onClick={() => setIsModalOpen(true)}
          className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2.5 rounded-xl shadow-lg hover:scale-105 transition"
        >
          Add Question
        </Button>
      </div>
    )}
  </div>

  {/* FLOATING BUTTON */}
  <div className="fixed bottom-6 right-6 md:hidden">
    <Button
      onClick={() => setIsModalOpen(true)}
      className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-2xl flex items-center justify-center text-3xl hover:scale-110 transition-all duration-300"
    >
      +
    </Button>
  </div>

  {/* MODAL */}
  <Modal
    isOpen={isModalOpen}
    onClose={() => setIsModalOpen(false)}
    title="Add New Question"
  >
    <QuestionForm onClose={() => setIsModalOpen(false)} />
  </Modal>

</div>
  );
};

export default QuestionBankPage;