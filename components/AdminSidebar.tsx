
import React from 'react';
import { NavLink } from 'react-router-dom';

interface SidebarProps {
  isOpen: boolean;
  toggle: () => void;
}

const AdminSidebar: React.FC<SidebarProps> = ({ isOpen, toggle }) => {
  const menuItems = [
    { name: 'Dashboard', icon: 'fa-solid fa-chart-line', path: '/admin/dashboard' },
    { name: 'Profil Saya', icon: 'fa-solid fa-user-gear', path: '/admin/profile' },
    { name: 'Portofolio', icon: 'fa-solid fa-briefcase', path: '/admin/portfolio' },
    { name: 'Skills', icon: 'fa-solid fa-bolt', path: '/admin/skills' },
    { name: 'Testimonials', icon: 'fa-solid fa-quote-left', path: '/admin/testimonials' },
    { name: 'Media Sosial', icon: 'fa-solid fa-share-nodes', path: '/admin/socials' },
    { name: 'Pesan Masuk', icon: 'fa-solid fa-envelope', path: '/admin/messages' },
  ];

  return (
    <aside className={`${isOpen ? 'w-64' : 'w-20'} bg-white dark:bg-zinc-800 border-r border-gray-200 dark:border-zinc-700 transition-all duration-300 flex flex-col`}>
      <div className="h-16 flex items-center px-6 border-b border-gray-100 dark:border-zinc-700">
        <span className={`font-serif font-bold text-xl text-gray-900 dark:text-white ${!isOpen && 'hidden'}`}>
          ADMIN<span className="text-gold-500">.</span>
        </span>
        <span className={`font-serif font-bold text-xl text-gold-500 ${isOpen && 'hidden'}`}>
          D.
        </span>
      </div>

      <nav className="flex-1 py-6 overflow-y-auto">
        <ul className="space-y-1 px-3">
          {menuItems.map((item) => (
            <li key={item.name}>
              <NavLink 
                to={item.path}
                className={({ isActive }) => `
                  flex items-center gap-4 px-4 py-3 rounded-lg transition-all
                  ${isActive 
                    ? 'bg-gold-500 text-white dark:text-zinc-950 shadow-lg shadow-gold-500/20' 
                    : 'text-gray-500 hover:bg-gray-50 dark:text-zinc-400 dark:hover:bg-zinc-700/50'}
                `}
              >
                <i className={`${item.icon} text-lg w-6 text-center`}></i>
                {isOpen && <span className="text-sm font-semibold">{item.name}</span>}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      <div className="p-4 border-t border-gray-100 dark:border-zinc-700">
        <NavLink 
          to="/"
          className="flex items-center gap-4 px-4 py-3 text-gray-500 hover:text-gold-600 dark:text-zinc-400"
        >
          <i className="fa-solid fa-arrow-left text-lg w-6 text-center"></i>
          {isOpen && <span className="text-sm font-semibold">Ke Website</span>}
        </NavLink>
      </div>
    </aside>
  );
};

export default AdminSidebar;
