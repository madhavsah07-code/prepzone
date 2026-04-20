import Button from './Button';

export const EmptyState = ({ title, description, action }) => (
  <div className="flex flex-col items-center justify-center text-center py-16 px-6 rounded-2xl bg-black/40 backdrop-blur-xl border border-white/10 shadow-lg">

    {/*  Glow */}
    <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-orange-500/10 to-orange-600/5 blur-xl opacity-20"></div>

    {/* Icon */}
    <div className="relative z-10 w-16 h-16 flex items-center justify-center rounded-full bg-gradient-to-r from-orange-500 to-orange-600 text-white text-2xl shadow-lg mb-5">
      ⚡
    </div>

    {/*  Title */}
    <h3 className="relative z-10 text-lg font-semibold text-white">
      {title}
    </h3>

    {/*  Description */}
    <p className="relative z-10 mt-2 text-sm text-gray-400 max-w-sm">
      {description}
    </p>

    {/*  Action */}
    {action && (
      <div className="relative z-10 mt-6">
        <Button onClick={action.onClick}>
          {action.label}
        </Button>
      </div>
    )}

  </div>
);

export default EmptyState;