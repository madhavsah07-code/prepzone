import { useMemo } from 'react';

export const useFilter = (questions = [], filters = {}) => {

  const filteredQuestions = useMemo(() => {
    if (!questions.length) return [];

    const search = (filters.search || '').toLowerCase();

    return questions.filter(q => {
      if (!q) return false;

      const matchTopic = filters.topic === 'All' || !filters.topic || q.topic === filters.topic;
      const matchDifficulty = filters.difficulty === 'All' || !filters.difficulty || q.difficulty === filters.difficulty;
      const matchStatus = filters.status === 'All' || !filters.status || q.status === filters.status;

      const matchSearch = !search ||
        (q.title && q.title.toLowerCase().includes(search)) ||
        (q.company && q.company.toLowerCase().includes(search));

      return matchTopic && matchDifficulty && matchStatus && matchSearch;
    });
  }, [questions, filters]);


  const stats = useMemo(() => {
    if (!questions.length) {
      return { total: 0, confident: 0, attempted: 0, notStarted: 0 };
    }

    return questions.reduce((acc, q) => {
      acc.total++;

      if (q.status === 'confident') acc.confident++;
      else if (q.status === 'attempted') acc.attempted++;
      else acc.notStarted++;

      return acc;
    }, { total: 0, confident: 0, attempted: 0, notStarted: 0 });

  }, [questions]);

  return { filteredQuestions, stats };
};

export default useFilter;