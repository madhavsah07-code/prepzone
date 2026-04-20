export const Spinner = ({ size = 'md', variant = 'dual', overlay = false }) => {

  const sizes = {
    sm: 'h-6 w-6',
    md: 'h-12 w-12',
    lg: 'h-16 w-16'
  };

  const spinner = (
    <div className="relative flex items-center justify-center">

      {/*  Glow */}
      <div className="absolute inset-0 rounded-full bg-orange-500/20 blur-xl animate-pulse"></div>

      {/* Dual Ring */}
      {variant === 'dual' && (
        <>
          <div className={`absolute border-4 border-orange-400/20 rounded-full ${sizes[size]}`}></div>
          <div className={`border-4 border-t-orange-500 border-orange-600 rounded-full animate-spin ${sizes[size]}`}></div>
        </>
      )}

      {/* Pulse */}
      {variant === 'pulse' && (
        <div className={`rounded-full bg-orange-500 animate-ping ${sizes[size]}`}></div>
      )}

    </div>
  );

  //  Fullscreen overlay
  if (overlay) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
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


//  Skeleton Loader (Dark Theme)
export const Skeleton = ({ className = '' }) => (
  <div
    className={`animate-pulse bg-white/10 rounded-lg ${className}`}
  />
);

export default Spinner;