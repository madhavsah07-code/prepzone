import { useMemo } from 'react';
import { calculateStreak, isToday } from '../utils/dateUtils';

export const useStreak = (questions = []) => {
  return useMemo(() => {
    if (!questions.length) {
      return { currentStreak: 0, longestStreak: 0, todayCount: 0 };
    }

    const dateSet = new Set();
    let todayCount = 0;

    questions.forEach(q => {
      if (!q.practiceHistory || q.practiceHistory.length === 0) return;

      q.practiceHistory.forEach(h => {
        if (!h?.date) return;

        const dateStr = new Date(h.date).toISOString().split('T')[0];
        dateSet.add(dateStr);

        if (isToday(h.date)) {
          todayCount++;
        }
      });
    });

    const uniqueDates = Array.from(dateSet);
    const { currentStreak, longestStreak } = calculateStreak(uniqueDates);

    return { currentStreak, longestStreak, todayCount };
  }, [questions]);
};

export default useStreak;