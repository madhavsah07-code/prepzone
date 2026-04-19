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
    <aside className="w-64 bg-white border-r border-gray-200 h-full hidden md:block shrink-0">
      <nav className="flex flex-col p-4 space-y-2">
        {links.map(link => {
          const isActive = location.pathname.startsWith(link.path);
          return (
            <NavLink
              key={link.name}
              to={link.path}
              className={`px-4 py-2.5 rounded-md text-sm font-medium transition-colors ${isActive ? 'bg-blue-50 text-blue-700' : 'text-gray-700 hover:bg-gray-100'}`}
            >
              {link.name}
            </NavLink>
          );
        })}
      </nav>
    </aside>
  );
};

export default Sidebar;