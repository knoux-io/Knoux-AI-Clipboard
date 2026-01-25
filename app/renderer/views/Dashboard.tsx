import React, { useState, useEffect, useCallback } from 'react';
import { useClipboard } from '../hooks/useClipboard';
import { useAI } from '../hooks/useAI';
import { useTheme } from '../contexts/ThemeContext';
import { logger } from '../../shared/logger';
import {
  Activity,
  BarChart3,
  Clock,
  Cpu,
  Database,
  Download,
  Globe,
  Hash,
  Layers,
  PieChart,
  RefreshCw,
  Shield,
  Sparkles,
  TrendingUp,
  Users,
  Zap,
  AlertCircle,
  CheckCircle,
  Eye,
  FileText,
  Image as ImageIcon,
  Link,
  Type
} from 'lucide-react';

interface StatCard {
  title: string;
  value: string;
  change: number;
  icon: React.ReactNode;
  color: string;
}

const Dashboard: React.FC = () => {
  const { theme } = useTheme();
  const clipboard = useClipboard({ autoPoll: true, pollInterval: 3000 });
  const ai = useAI();
  
  const [stats, setStats] = useState({
    totalItems: 0,
    todayItems: 0,
    aiProcessed: 0,
    sensitiveItems: 0,
    memoryUsage: '0 MB',
    processingTime: '0ms'
  });
  
  const [recentActivity, setRecentActivity] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [timeRange, setTimeRange] = useState<'day' | 'week' | 'month'>('day');

  useEffect(() => {
    loadDashboardData();
  }, [timeRange]);

  const loadDashboardData = useCallback(async () => {
    try {
      setIsLoading(true);
      
      // Simulate data loading
      setTimeout(() => {
        setStats({
          totalItems: 1247,
          todayItems: 42,
          aiProcessed: 893,
          sensitiveItems: 23,
          memoryUsage: '156 MB',
          processingTime: '128ms'
        });
        
        setRecentActivity([
          { id: 1, type: 'copy', content: 'Meeting notes', time: '5 min ago', icon: <FileText /> },
          { id: 2, type: 'ai', content: 'Code analysis', time: '12 min ago', icon: <Sparkles /> },
          { id: 3, type: 'image', content: 'Screenshot', time: '25 min ago', icon: <ImageIcon /> },
          { id: 4, type: 'link', content: 'Documentation', time: '1 hour ago', icon: <Link /> },
          { id: 5, type: 'text', content: 'Email draft', time: '2 hours ago', icon: <Type /> }
        ]);
        
        setIsLoading(false);
      }, 1000);
      
      logger.info('Dashboard data loaded', { timeRange });
    } catch (error) {
      logger.error('Failed to load dashboard data:', error);
      setIsLoading(false);
    }
  }, [timeRange]);

  const statCards: StatCard[] = [
    {
      title: 'إجمالي العناصر',
      value: stats.totalItems.toLocaleString(),
      change: 12,
      icon: <Database className="w-6 h-6" />,
      color: 'from-blue-500 to-cyan-500'
    },
    {
      title: 'اليوم',
      value: stats.todayItems.toString(),
      change: 8,
      icon: <Activity className="w-6 h-6" />,
      color: 'from-green-500 to-emerald-500'
    },
    {
      title: 'معالجة الذكاء الاصطناعي',
      value: stats.aiProcessed.toLocaleString(),
      change: 24,
      icon: <Sparkles className="w-6 h-6" />,
      color: 'from-purple-500 to-pink-500'
    },
    {
      title: 'عناصر حساسة',
      value: stats.sensitiveItems.toString(),
      change: -3,
      icon: <Shield className="w-6 h-6" />,
      color: 'from-orange-500 to-red-500'
    }
  ];

  const quickActions = [
    { icon: <Download />, label: 'تصدير البيانات', action: () => handleExport() },
    { icon: <RefreshCw />, label: 'مسح السجل', action: () => clipboard.clearAll() },
    { icon: <Eye />, label: 'تحليل الذكاء الاصطناعي', action: () => handleAIAnalysis() },
    { icon: <BarChart3 />, label: 'تقارير متقدمة', action: () => window.location.hash = '#/analytics' }
  ];

  const handleExport = async () => {
    try {
      const response = await window.knoux.exportData('json');
      if (response.success) {
        logger.info('Export completed');
      }
    } catch (error) {
      logger.error('Export failed:', error);
    }
  };

  const handleAIAnalysis = async () => {
    try {
      await ai.analyzeContent(clipboard.items.slice(0, 10).map(i => i.content));
      logger.info('AI analysis completed');
    } catch (error) {
      logger.error('AI analysis failed:', error);
    }
  };

  const formatChange = (change: number) => {
    const sign = change >= 0 ? '+' : '';
    const color = change >= 0 ? 'text-green-500' : 'text-red-500';
    return <span className={`${color} text-sm font-medium`}>{sign}{change}%</span>;
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4 md:p-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            لوحة التحكم
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            نظرة شاملة على أداء ونشاط تطبيق Knoux
          </p>
        </div>
        
        <div className="flex items-center space-x-4 mt-4 md:mt-0">
          <select 
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value as any)}
            className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg px-4 py-2 text-gray-900 dark:text-white"
          >
            <option value="day">آخر 24 ساعة</option>
            <option value="week">آخر أسبوع</option>
            <option value="month">آخر شهر</option>
          </select>
          
          <button
            onClick={loadDashboardData}
            disabled={isLoading}
            className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 disabled:opacity-50 flex items-center"
          >
            <RefreshCw className={`w-4 h-4 ml-2 ${isLoading ? 'animate-spin' : ''}`} />
            تحديث
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statCards.map((card, index) => (
          <div 
            key={index}
            className={`bg-gradient-to-br ${card.color} rounded-2xl p-6 text-white shadow-lg`}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-white/20 rounded-xl">
                {card.icon}
              </div>
              {formatChange(card.change)}
            </div>
            <div className="text-3xl font-bold mb-1">{card.value}</div>
            <div className="text-white/90">{card.title}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Quick Actions */}
        <div className="lg:col-span-1">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
              إجراءات سريعة
            </h2>
            <div className="space-y-3">
              {quickActions.map((action, index) => (
                <button
                  key={index}
                  onClick={action.action}
                  className="w-full p-4 bg-gray-50 dark:bg-gray-900 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors flex items-center justify-between"
                >
                  <div className="flex items-center">
                    <div className="p-2 bg-gray-200 dark:bg-gray-700 rounded-lg ml-3">
                      {action.icon}
                    </div>
                    <span className="text-gray-800 dark:text-gray-300 font-medium">
                      {action.label}
                    </span>
                  </div>
                  <div className="text-gray-400">→</div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="lg:col-span-2">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                النشاط الأخير
              </h2>
              <span className="text-sm text-gray-600 dark:text-gray-400">
                آخر 5 عمليات
              </span>
            </div>
            
            <div className="space-y-4">
              {recentActivity.map((activity) => (
                <div 
                  key={activity.id}
                  className="flex items-center p-4 bg-gray-50 dark:bg-gray-900 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                >
                  <div className="p-3 bg-gray-200 dark:bg-gray-700 rounded-lg ml-4">
                    {activity.icon}
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-gray-900 dark:text-white">
                      {activity.content}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400 flex items-center mt-1">
                      <Clock className="w-3 h-3 ml-1" />
                      {activity.time}
                    </div>
                  </div>
                  <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                    activity.type === 'ai' 
                      ? 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200'
                      : activity.type === 'image'
                      ? 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200'
                      : 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                  }`}>
                    {activity.type === 'ai' ? 'ذكاء اصطناعي' : 
                     activity.type === 'image' ? 'صورة' : 
                     activity.type === 'link' ? 'رابط' : 'نص'}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Performance Metrics */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
            أداء النظام
          </h2>
          <div className="space-y-6">
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-gray-700 dark:text-gray-300">استخدام الذاكرة</span>
                <span className="font-bold text-gray-900 dark:text-white">{stats.memoryUsage}</span>
              </div>
              <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                <div className="h-full bg-blue-500 rounded-full" style={{ width: '65%' }} />
              </div>
            </div>
            
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-gray-700 dark:text-gray-300">وقت المعالجة</span>
                <span className="font-bold text-gray-900 dark:text-white">{stats.processingTime}</span>
              </div>
              <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                <div className="h-full bg-green-500 rounded-full" style={{ width: '45%' }} />
              </div>
            </div>
            
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-gray-700 dark:text-gray-300">كفاءة الذكاء الاصطناعي</span>
                <span className="font-bold text-gray-900 dark:text-white">94%</span>
              </div>
              <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                <div className="h-full bg-purple-500 rounded-full" style={{ width: '94%' }} />
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
            التحليلات والإحصاءات
          </h2>
          <div className="space-y-6">
            <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-900 rounded-xl">
              <div className="flex items-center">
                <Type className="w-5 h-5 text-blue-500 ml-2" />
                <span className="text-gray-800 dark:text-gray-300">النصوص</span>
              </div>
              <span className="font-bold text-gray-900 dark:text-white">68%</span>
            </div>
            
            <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-900 rounded-xl">
              <div className="flex items-center">
                <ImageIcon className="w-5 h-5 text-orange-500 ml-2" />
                <span className="text-gray-800 dark:text-gray-300">الصور</span>
              </div>
              <span className="font-bold text-gray-900 dark:text-white">18%</span>
            </div>
            
            <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-900 rounded-xl">
              <div className="flex items-center">
                <Link className="w-5 h-5 text-green-500 ml-2" />
                <span className="text-gray-800 dark:text-gray-300">الروابط</span>
              </div>
              <span className="font-bold text-gray-900 dark:text-white">9%</span>
            </div>
            
            <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-900 rounded-xl">
              <div className="flex items-center">
                <FileText className="w-5 h-5 text-purple-500 ml-2" />
                <span className="text-gray-800 dark:text-gray-300">أخرى</span>
              </div>
              <span className="font-bold text-gray-900 dark:text-white">5%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Stats */}
      <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 text-center">
          <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
            {clipboard.items.length}
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400">عناصر محملة</p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 text-center">
          <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
            {clipboard.totalCount}
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400">إجمالي العناصر</p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 text-center">
          <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
            {clipboard.items.filter(i => i.metadata?.aiEnhanced).length}
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400">محسن بالذكاء الاصطناعي</p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 text-center">
          <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
            {new Set(clipboard.items.flatMap(i => i.tags || [])).size}
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400">وسوم فريدة</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
