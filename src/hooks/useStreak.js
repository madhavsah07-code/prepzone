import { useMemo } from 'react';
import { calculateStreak, isToday } from '../utils/dateUtils';

export const useStreak = (questions) => {
  return useMemo(() => {
    const practiceDates = questions
      .filter(q => q.practiceHistory && q.practiceHistory.length > 0)
      .flatMap(q => q.practiceHistory)
      .map(h => new Date(h.date).toISOString().split('T')[0]);

    const uniqueDates = [...new Set(practiceDates)];
    const { currentStreak, longestStreak } = calculateStreak(uniqueDates);

    const todayCount = questions.filter(q =>
      q.practiceHistory && q.practiceHistory.some(h => isToday(h.date))
    ).length;

    return { currentStreak, longestStreak, todayCount };
  }, [questions]);
};