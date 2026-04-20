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
    <aside className="relative w-64 backdrop-blur-xl bg-white/70 border-r border-white/40 h-full hidden md:block shrink-0 shadow-md">
      <div className="absolute inset-0 bg-gradient-to-b from-blue-500/5 to-purple-500/5 pointer-events-none"></div>
      <nav className="relative z-10 flex flex-col p-4 space-y-2">
        {links.map(link => {
          const isActive = location.pathname.startsWith(link.path);
          return (
            <NavLink
              key={link.name}
              to={link.path}
              className={`group px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 ${isActive ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md' : 'text-gray-700 hover:bg-white/60 hover:shadow-sm hover:scale-[1.02]'}`}
            >
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