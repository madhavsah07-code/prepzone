import { useMemo } from 'react';

export const useFilter = (questions, filters) => {
  const filteredQuestions = useMemo(() => {
    return questions.filter(q => {
      const matchTopic = filters.topic === 'All' || q.topic === filters.topic;
      const matchDifficulty = filters.difficulty === 'All' || q.difficulty === filters.difficulty;
      const matchStatus = filters.status === 'All' || q.status === filters.status;
      const matchSearch = q.title.toLowerCase().includes(filters.search.toLowerCase()) ||
                          (q.company && q.company.toLowerCase().includes(filters.search.toLowerCase()));
      return matchTopic && matchDifficulty && matchStatus && matchSearch;
    });
  }, [questions, filters]);

  const stats = useMemo(() => {
    const initial = { total: questions.length, confident: 0, attempted: 0, notStarted: 0 };
    return questions.reduce((acc, q) => {
      if (q.status === 'confident') acc.confident++;
      else if (q.status === 'attempted') acc.attempted++;
      else acc.notStarted++;
      return acc;
    }, initial);
  }, [questions]);

  return { filteredQuestions, stats };
};