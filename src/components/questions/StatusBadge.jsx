export const StatusBadge = ({ status }) => {
  const styles = {
    'not-started': 'bg-gray-200 text-gray-700',
    'attempted': 'bg-gradient-to-r from-yellow-400 to-orange-400 text-white shadow-sm',
    'confident': 'bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-sm'
  };

  const labels = {
    'not-started': 'Not Started',
    'attempted': 'Attempted',
    'confident': 'Confident'
  };

  return (
    <span
      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold transition-all duration-300 ${styles[status]} hover:scale-105`}
    >
      {/* Dot indicator */}
      <span className="w-2 h-2 mr-2 rounded-full bg-white/80 animate-pulse"></span>
      {labels[status]}
    </span>
  );
};

export default StatusBadge;