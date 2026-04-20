import Button from './Button';

export const EmptyState = ({ title, description, action }) => (
  <div className="flex flex-col items-center justify-center text-center py-16 px-6 rounded-2xl backdrop-blur-xl bg-white/70 border border-white/40 shadow-lg">
    
    {/* Icon */}
    <div className="w-16 h-16 flex items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-white text-2xl shadow-md mb-5">
      ⚡
    </div>

    {/* Title */}
    <h3 className="text-lg font-semibold text-gray-800">
      {title}
    </h3>

    {/* Description */}
    <p className="mt-2 text-sm text-gray-500 max-w-sm">
      {description}
    </p>

    {/* Action Button */}
    {action && (
      <div className="mt-6">
        <Button
          onClick={action.onClick}
          className="px-5 py-2.5"
        >
          {action.label}
        </Button>
      </div>
    )}

  </div>
);

export default EmptyState;