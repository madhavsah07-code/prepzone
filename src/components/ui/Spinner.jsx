export const Spinner = ({ size = 'md', variant = 'dual', overlay = false }) => {
  const sizes = {
    sm: 'h-6 w-6',
    md: 'h-12 w-12',
    lg: 'h-16 w-16'
  };

  const spinner = (
    <div className="relative flex items-center justify-center">
      {/* Glow */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 blur-lg opacity-30 animate-pulse"></div>

      {/* Dual Ring */}
      {variant === 'dual' && (
        <>
          <div className={`absolute border-4 border-blue-400/30 rounded-full ${sizes[size]}`}></div>
          <div className={`border-4 border-t-blue-600 border-purple-600 rounded-full animate-spin ${sizes[size]}`}></div>
        </>
      )}

      {/* Pulse + Rotate */}
      {variant === 'pulse' && (
        <div className={`rounded-full bg-gradient-to-r from-blue-500 to-purple-500 animate-ping ${sizes[size]}`}></div>
      )}
    </div>
  );

  if (overlay) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
        {spinner}
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center">
      {spinner}
    </div>
  );
};

export const Skeleton = ({ className = '' }) => (
  <div className={`animate-pulse bg-gray-200 rounded-lg ${className}`} />
);

export default Spinner;