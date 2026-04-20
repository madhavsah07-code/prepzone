export const Button = ({ children, variant = 'primary', size = 'md', onClick, disabled, loading, className = '', type = 'button' }) => {
  const baseStyle = "inline-flex items-center justify-center font-semibold rounded-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2";
  const variants = {
    primary: "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md hover:shadow-xl hover:scale-105",
    secondary: "bg-gray-100 text-gray-800 border border-gray-200 hover:bg-gray-200",
    danger: "bg-gradient-to-r from-red-500 to-pink-500 text-white shadow-md hover:shadow-xl hover:scale-105"
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
      className={`${baseStyle} ${variants[variant]} ${sizes[size]} ${disabled ? 'opacity-50 cursor-not-allowed scale-100' : 'active:scale-95'} ${className}`}
    >
      {loading && (
        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-current opacity-90" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      )}
      {children}
    </button>
  );
};

export default Button;