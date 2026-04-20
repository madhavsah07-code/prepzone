import { useAuth } from '../../hooks/useAuth';
import Button from '../ui/Button';

export const Navbar = () => {
  const { currentUser, logout } = useAuth();

  return (
    <nav className="relative backdrop-blur-xl bg-black/40 border-b border-white/10 px-6 py-3 flex justify-between items-center shadow-lg z-10">

      {/*  Orange Glow Background */}
      <div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 to-orange-600/5 pointer-events-none"></div>

      <div className="relative z-10 flex justify-between items-center w-full">

        {/*  Logo */}
        <div className="flex items-center space-x-2">
          <span className="text-xl font-bold bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent tracking-tight">
            PrepZone
          </span>
        </div>

        {currentUser && (
          <div className="flex items-center space-x-4">

            {/*  Email */}
            <span className="text-sm text-gray-400 hidden md:block font-medium">
              {currentUser.email}
            </span>

            {/*  Avatar */}
            <img
              src={
                currentUser.photoURL ||
                `https://ui-avatars.com/api/?name=${currentUser.email}&background=111&color=fff`
              }
              alt="Avatar"
              className="w-9 h-9 rounded-full border border-white/10 shadow-md"
            />

            {/*  Logout Button */}
            <Button
              variant="secondary"
              size="sm"
              onClick={logout}
              className="bg-white/10 text-white hover:bg-white/20 hover:scale-105 transition"
            >
              Logout
            </Button>

          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;