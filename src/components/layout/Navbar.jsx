import { useAuth } from '../../hooks/useAuth';
import Button from '../ui/Button';

export const Navbar = () => {
  const { currentUser, logout } = useAuth();

  return (
    <nav className="relative backdrop-blur-xl bg-white/70 border-b border-white/40 px-6 py-3 flex justify-between items-center shadow-md z-10">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 pointer-events-none"></div>
      <div className="relative z-10 flex justify-between items-center w-full">
        <div className="flex items-center space-x-2">
          <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent tracking-tight">PrepZone</span>
        </div>
        {currentUser && (
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-600 hidden md:block font-medium">{currentUser.email}</span>
            <img src={currentUser.photoURL || `https://ui-avatars.com/api/?name=${currentUser.email}&background=random`} alt="Avatar" className="w-9 h-9 rounded-full border border-white/40 shadow-sm" />
            <Button variant="secondary" size="sm" onClick={logout} className="hover:scale-105 transition">Logout</Button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;