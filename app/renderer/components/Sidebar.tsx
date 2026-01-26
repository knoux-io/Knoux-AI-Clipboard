import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  Clipboard,
  Brain,
  LayoutDashboard,
  Settings,
  Shield,
  History,
  BarChart3,
} from 'lucide-react';
import i18n from '../utils/i18n';

const Sidebar: React.FC = () => {
  const navigate = useNavigate();

  const navItems = [
    { to: '/dashboard', label: i18n.t('sidebar.dashboard'), labelAr: 'لوحة التحكم', icon: <LayoutDashboard size={20} /> },
    { to: '/clipboard', label: i18n.t('sidebar.clipboard'), labelAr: 'الحافظة', icon: <Clipboard size={20} /> },
    { to: '/ai', label: i18n.t('sidebar.aiTools'), labelAr: 'أدوات الذكاء الاصطناعي', icon: <Brain size={20} /> },
    { to: '/analytics', label: i18n.t('sidebar.analytics'), labelAr: 'التحليلات', icon: <BarChart3 size={20} /> },
    { to: '/security', label: 'Security', labelAr: 'الأمان', icon: <Shield size={20} /> },
  ];

  return (
    <aside className="w-64 bg-black/40 backdrop-blur-xl border-r border-purple-500/20 flex flex-col transition-colors duration-300">
      {/* Logo */}
      <div className="h-16 flex items-center px-6 border-b border-purple-500/20">
        <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-blue-500 rounded-lg flex items-center justify-center mr-3">
          <Clipboard className="text-white w-5 h-5" />
        </div>
        <h1 className="font-bold text-lg text-white">Knoux</h1>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-1">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) => `
              flex items-center px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200
              ${isActive 
                ? 'bg-purple-600/40 text-white border border-purple-500/50 shadow-lg shadow-purple-500/20' 
                : 'text-gray-400 hover:bg-purple-500/10 hover:text-white border border-transparent'
              }
            `}
          >
            <span className="mr-3">{item.icon}</span>
            <span>{i18n.isRTL() ? item.labelAr : item.label}</span>
          </NavLink>
        ))}
      </nav>

      {/* Footer Actions */}
      <div className="p-4 border-t border-purple-500/20 space-y-2">
        <button
          onClick={() => navigate('/settings')}
          className="w-full flex items-center px-4 py-2 text-gray-400 hover:text-white hover:bg-purple-500/10 rounded-lg transition-all"
        >
          <Settings className="w-4 h-4 mr-3" />
          <span>{i18n.t('sidebar.settings')}</span>
        </button>
        <button
          onClick={() => navigate('/about')}
          className="w-full flex items-center px-4 py-2 text-gray-400 hover:text-white hover:bg-purple-500/10 rounded-lg transition-all"
        >
          <Shield className="w-4 h-4 mr-3" />
          <span>{i18n.t('sidebar.about')}</span>
        </button>
        <div className="flex items-center px-4 py-2 bg-green-500/20 border border-green-500/30 rounded-lg">
          <div className="w-2 h-2 rounded-full bg-green-500 mr-2 animate-pulse"></div>
          <span className="text-xs font-medium text-green-300">
            {i18n.isRTL() ? 'النظام جاهز' : 'System Ready'}
          </span>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
