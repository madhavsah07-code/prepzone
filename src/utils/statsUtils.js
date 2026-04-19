export const getCoverageByTopic = (questions, topics) => {
  return topics.map(topic => {
    const topicQs = questions.filter(q => q.topic === topic);
    const total = topicQs.length;
    const confident = topicQs.filter(q => q.status === 'confident').length;
    const percent = total === 0 ? 0 : Math.round((confident / total) * 100);
    return { topic, total, confident, percent };
  });
};

export const getWeakTopics = (questions) => {
  const topics = [...new Set(questions.map(q => q.topic))];
  const coverage = getCoverageByTopic(questions, topics);
  return coverage.filter(c => c.total > 0 && c.percent < 40).map(c => c.topic);
};