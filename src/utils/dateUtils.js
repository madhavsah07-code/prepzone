export const formatDate = (ts) => {
  if (!ts) return '';
  return new Date(ts).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
};

export const isToday = (ts) => {
  const date = new Date(ts);
  const today = new Date();
  return date.getDate() === today.getDate() &&
         date.getMonth() === today.getMonth() &&
         date.getFullYear() === today.getFullYear();
};

export const daysBetween = (ts1, ts2) => {
  const oneDay = 24 * 60 * 60 * 1000;
  return Math.round(Math.abs((new Date(ts1) - new Date(ts2)) / oneDay));
};

export const getLastNDays = (n) => {
  return Array.from({ length: n }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (n - 1 - i));
    return d.toISOString().split('T')[0];
  });
};

export const calculateStreak = (datesArray) => {
  if (!datesArray || datesArray.length === 0) return { currentStreak: 0, longestStreak: 0 };
  const sortedDates = [...datesArray].sort((a, b) => new Date(b) - new Date(a));
  
  let currentStreak = 0;
  let longestStreak = 0;
  const today = new Date().toISOString().split('T')[0];
  const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];

  if (sortedDates[0] === today || sortedDates[0] === yesterday) {
    currentStreak = 1;
    for (let i = 0; i < sortedDates.length - 1; i++) {
      if (daysBetween(sortedDates[i], sortedDates[i+1]) === 1) currentStreak++;
      else break;
    }
  }

  for (let i = 0; i < sortedDates.length; i++) {
    let tempStreak = 1;
    for (let j = i; j < sortedDates.length - 1; j++) {
       if (daysBetween(sortedDates[j], sortedDates[j+1]) === 1) tempStreak++;
       else break;
    }
    if (tempStreak > longestStreak) longestStreak = tempStreak;
  }

  return { currentStreak, longestStreak: Math.max(longestStreak, currentStreak) };
};