import { NavLink, useLocation } from 'react-router-dom';

export const Sidebar = () => {
  const location = useLocation();

  const links = [
    { name: 'Dashboard', path: '/dashboard' },
    { name: 'Question Bank', path: '/questions' },
    { name: 'Company Tracker', path: '/companies' },
    { name: 'Goals', path: '/goals' }
  ];

  return (
    <aside className="relative w-64 bg-black/40 backdrop-blur-xl border-r border-white/10 h-full hidden md:block shrink-0 shadow-xl">

      {/*  Orange Glow Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-orange-500/10 to-orange-600/5 pointer-events-none"></div>

      <nav className="relative z-10 flex flex-col p-4 space-y-3">

        {links.map(link => {
          const isActive = location.pathname.startsWith(link.path);

          return (
            <NavLink
              key={link.name}
              to={link.path}
              className={`group px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 flex items-center ${
                isActive
                  ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg shadow-orange-500/20'
                  : 'text-gray-300 hover:bg-white/10 hover:shadow-md hover:scale-[1.03]'
              }`}
            >
              {/*  Text with subtle animation */}
              <span className="group-hover:translate-x-1 transition-transform duration-200 inline-block">
                {link.name}
              </span>
            </NavLink>
          );
        })}

      </nav>
    </aside>
  );
};

export default Sidebar;