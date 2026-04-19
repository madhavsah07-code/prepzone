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
  const { filteredQuestions } = useFilter(questions, filters);
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="max-w-7xl mx-auto h-full relative pb-20">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Question Bank</h1>
        <Button onClick={() => setIsModalOpen(true)} className="hidden md:inline-flex">+ Add Question</Button>
      </div>
      
      <FilterBar />

      {filteredQuestions.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {filteredQuestions.map(q => <QuestionCard key={q.id} question={q} />)}
        </div>
      ) : (
        <EmptyState
          title="No questions found"
          description="Adjust your filters or add a new question to your bank."
          action={{ label: 'Add Question', onClick: () => setIsModalOpen(true) }}
        />
      )}

      <div className="fixed bottom-8 right-8 md:hidden">
        <Button onClick={() => setIsModalOpen(true)} className="w-14 h-14 rounded-full shadow-lg text-2xl flex items-center justify-center pb-1">+</Button>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Add New Question">
        <QuestionForm onClose={() => setIsModalOpen(false)} />
      </Modal>
    </div>
  );
};

export default QuestionBankPage;