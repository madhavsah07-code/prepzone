export const getCoverageByTopic = (questions = [], topics = []) => {
  if (!questions.length) return [];

  // 🔥 group by topic (O(n))
  const map = {};

  questions.forEach(q => {
    if (!q.topic) return;

    if (!map[q.topic]) {
      map[q.topic] = { topic: q.topic, total: 0, confident: 0 };
    }

    map[q.topic].total++;
    if (q.status === 'confident') map[q.topic].confident++;
  });

  // 🔥 calculate percent + sort
  return Object.values(map)
    .map(item => ({
      ...item,
      percent: item.total === 0 ? 0 : Math.round((item.confident / item.total) * 100)
    }))
    .sort((a, b) => b.percent - a.percent); // highest first
};

export const getWeakTopics = (questions = []) => {
  if (!questions.length) return [];

  const coverage = getCoverageByTopic(questions);

  return coverage
    .filter(c => c.total > 0 && c.percent < 40)
    .sort((a, b) => a.percent - b.percent) // weakest first
    .map(c => c.topic);
};