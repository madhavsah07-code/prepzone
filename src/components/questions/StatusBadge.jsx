export const StatusBadge = ({ status }) => {
  const styles = {
    'not-started': 'bg-gray-100 text-gray-800 border-gray-200',
    'attempted': 'bg-yellow-50 text-yellow-800 border-yellow-200',
    'confident': 'bg-green-50 text-green-800 border-green-200'
  };
  const labels = {
    'not-started': 'Not Started',
    'attempted': 'Attempted',
    'confident': 'Confident'
  };

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${styles[status]}`}>
      {labels[status]}
    </span>
  );
};

export default StatusBadge;