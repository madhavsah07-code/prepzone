export const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  onClick,
  disabled,
  loading,
  className = '',
  type = 'button'
}) => {

  const baseStyle =
    "inline-flex items-center justify-center font-semibold rounded-xl transition-all duration-300 focus:outline-none";

  const variants = {

    // MAIN BUTTON
    primary:
      "bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg hover:shadow-orange-500/40 hover:scale-105",

    //  GLASS BUTTON
    secondary:
      "bg-white/10 text-white border border-white/10 backdrop-blur hover:bg-white/20",

    //  DANGER
    danger:
      "bg-gradient-to-r from-red-500 to-red-600 text-white shadow-lg hover:shadow-red-500/40 hover:scale-105"

  };

  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-5 py-2.5 text-base"
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`
        ${baseStyle}
        ${variants[variant]}
        ${sizes[size]}
        ${disabled ? 'opacity-50 cursor-not-allowed scale-100' : 'active:scale-95'}
        ${className}
      `}
    >

      {/*  Spinner */}
      {loading && (
        <svg
          className="animate-spin -ml-1 mr-2 h-4 w-4 text-current opacity-90"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
          ></path>
        </svg>
      )}

      {children}

    </button>
  );
};

export default Button;