import { useAuth } from '../../hooks/useAuth';
import Button from '../ui/Button';

export const Navbar = () => {
  const { currentUser, logout } = useAuth();

  return (
    <nav className="bg-white border-b border-gray-200 px-6 py-3 flex justify-between items-center shadow-sm z-10 relative">
      <div className="flex items-center space-x-2">
        <span className="text-xl font-bold text-blue-600 tracking-tight">PrepZone</span>
      </div>
      {currentUser && (
        <div className="flex items-center space-x-4">
          <span className="text-sm text-gray-600 hidden md:block font-medium">{currentUser.email}</span>
          <img src={currentUser.photoURL || `https://ui-avatars.com/api/?name=${currentUser.email}&background=random`} alt="Avatar" className="w-8 h-8 rounded-full border border-gray-200" />
          <Button variant="secondary" size="sm" onClick={logout}>Logout</Button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;