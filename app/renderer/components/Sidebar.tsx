import React from 'react';
import { NavLink } from 'react-router-dom';
import {
Clipboard,
Brain,
LayoutDashboard,
Settings,
Shield,
Search
} from 'lucide-react';

const Sidebar: React.FC = () => {
const navItems = [
{ to: '/analytics', label: 'Dashboard', icon: <LayoutDashboard size={20} /> },
{ to: '/clipboard', label: 'Clipboard', icon: <Clipboard size={20} /> },
{ to: '/search', label: 'Search', icon: <Search size={20} /> },
{ to: '/ai', label: 'AI Processor', icon: <Brain size={20} /> },
{ to: '/settings', label: 'Settings', icon: <Settings size={20} /> },
];

return (
<aside className="w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex flex-col transition-colors duration-300">
<div className="h-16 flex items-center px-6 border-b border-gray-100 dark:border-gray-700">
<div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center mr-3">
<Clipboard className="text-white w-5 h-5" />
</div>
<h1 className="font-bold text-lg text-gray-800 dark:text-white">Knoux</h1>
</div>

code
Code
download
content_copy
expand_less
<nav className="flex-1 px-4 py-6 space-y-1">
    {navItems.map((item) => (
      <NavLink
        key={item.to}
        to={item.to}
        className={({ isActive }) => `
          flex items-center px-4 py-3 rounded-lg text-sm font-medium transition-colors
          ${isActive 
            ? 'bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300' 
            : 'text-gray-600 hover:bg-gray-50 dark:text-gray-400 dark:hover:bg-gray-700/50'
          }
        `}
      >
        <span className="mr-3">{item.icon}</span>
        {item.label}
      </NavLink>
    ))}
  </nav>

  <div className="p-4 border-t border-gray-100 dark:border-gray-700">
    <div className="flex items-center px-4 py-2 bg-gray-50 dark:bg-gray-700/30 rounded-lg">
         <div className="w-2 h-2 rounded-full bg-green-500 mr-2"></div>
         <span className="text-xs font-medium text-gray-500 dark:text-gray-400">System Ready</span>
    </div>
  </div>
</aside>

);
};

export default Sidebar;
