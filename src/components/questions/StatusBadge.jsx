export const StatusBadge = ({ status }) => {

  const styles = {

    //  Neutral
    'not-started':
      'bg-white/10 text-gray-400 border border-white/10',

    //  In Progress
    'attempted':
      'bg-orange-500/10 text-orange-400 border border-orange-500/20',

    //  Done
    'confident':
      'bg-green-500/10 text-green-400 border border-green-500/20'

  };

  const labels = {
    'not-started': 'Not Started',
    'attempted': 'Attempted',
    'confident': 'Confident'
  };

  return (
    <span
      className={`
        inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold
        backdrop-blur transition-all duration-300
        ${styles[status]}
        hover:scale-105
      `}
    >

      {/*  Dot */}
      <span
        className={`
          w-2 h-2 mr-2 rounded-full animate-pulse
          ${status === 'confident'
            ? 'bg-green-400'
            : status === 'attempted'
            ? 'bg-orange-400'
            : 'bg-gray-500'}
        `}
      />

      {labels[status]}

    </span>
  );
};

export default StatusBadge;