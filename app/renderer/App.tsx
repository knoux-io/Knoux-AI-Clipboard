import React, { useState, useEffect, useCallback } from 'react';
import {
  ClipboardCopy,
  Search,
  Settings,
  Zap,
  Lock,
  RefreshCw,
  Trash2,
  Star,
  Maximize2,
  Copy as CopyIcon,
  Trash,
  Clock,
  Activity,
  Shield,
  TrendingUp,
} from 'lucide-react';
import SplashScreen from './components/SplashScreen';
import SettingsPanel from './components/SettingsPanel';
import AboutKnoux from './components/AboutKnoux';
import DashboardFeatures from './components/DashboardFeatures';
import {
  getClipboardHistory,
  startClipboardMonitoring,
  deleteClipboardItem,
  clearClipboardHistory,
  toggleFavorite,
  initializeClipboardService,
} from './services/ClipboardService';

interface ClipboardItemData {
  id: string;
  content: string;
  format: string;
  timestamp: string;
  tags: string[];
  metadata?: {
    sensitive?: boolean;
    isUrl?: boolean;
  };
  favorite?: boolean;
}

interface DashboardStats {
  totalItems: number;
  formats: number;
  sensitiveItems: number;
  urlItems: number;
  todayItems: number;
  totalSize: number;
}

function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [clipboardItems, setClipboardItems] = useState<ClipboardItemData[]>([]);
  const [filteredItems, setFilteredItems] = useState<ClipboardItemData[]>([]);
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [showSettings, setShowSettings] = useState(false);
  const [showAbout, setShowAbout] = useState(false);
  const [stats, setStats] = useState<DashboardStats>({
    totalItems: 0,
    formats: 0,
    sensitiveItems: 0,
    urlItems: 0,
    todayItems: 0,
    totalSize: 0,
  });
  const [lastSync, setLastSync] = useState<Date | null>(null);
  const [isMonitoring, setIsMonitoring] = useState(false);

  // Initialize services
  useEffect(() => {
    const init = async () => {
      await initializeClipboardService();
      const history = getClipboardHistory();
      setClipboardItems(history);
      setLastSync(new Date());

      // Start monitoring
      const stopMonitoring = startClipboardMonitoring((items) => {
        setClipboardItems(items);
        setLastSync(new Date());
      });

      setIsMonitoring(true);

      return () => stopMonitoring();
    };

    init();
  }, []);

  // Calculate stats
  useEffect(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const newStats: DashboardStats = {
      totalItems: clipboardItems.length,
      formats: new Set(clipboardItems.map(i => i.format)).size,
      sensitiveItems: clipboardItems.filter(i => i.metadata?.sensitive).length,
      urlItems: clipboardItems.filter(i => i.metadata?.isUrl).length,
      todayItems: clipboardItems.filter(i => new Date(i.timestamp) >= today).length,
      totalSize: clipboardItems.reduce((sum, item) => sum + item.content.length, 0),
    };

    setStats(newStats);
  }, [clipboardItems]);

  // Apply filters
  useEffect(() => {
    let filtered = clipboardItems;

    if (searchQuery.trim()) {
      filtered = filtered.filter(item =>
        item.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.tags?.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    if (selectedTags.length > 0) {
      filtered = filtered.filter(item =>
        selectedTags.some(tag => item.tags?.includes(tag))
      );
    }

    setFilteredItems(filtered);
  }, [clipboardItems, searchQuery, selectedTags]);

  const handleCopy = useCallback(async (item: ClipboardItemData) => {
    try {
      await navigator.clipboard.writeText(item.content);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  }, []);

  const handleDelete = useCallback((itemId: string) => {
    const updated = deleteClipboardItem(itemId);
    setClipboardItems(updated);
    setSelectedItem(null);
  }, []);

  const handleToggleFavorite = useCallback((itemId: string) => {
    const updated = toggleFavorite(itemId);
    setClipboardItems(updated);
  }, []);

  const handleClearAll = useCallback(() => {
    if (!window.confirm('Clear all clipboard history? This cannot be undone.')) {
      return;
    }
    const updated = clearClipboardHistory();
    setClipboardItems(updated);
    setSelectedItem(null);
  }, []);

  const allTags = Array.from(
    new Set(clipboardItems.flatMap(item => item.tags || []))
  );

  const formatBytes = (bytes: number): string => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
  };

  if (showSplash) {
    return <SplashScreen onComplete={() => setShowSplash(false)} />;
  }

  if (showSettings) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        <SettingsPanel onClose={() => setShowSettings(false)} />
      </div>
    );
  }

  if (showAbout) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-8">
        <div className="container mx-auto max-w-4xl">
          <button
            onClick={() => setShowAbout(false)}
            className="mb-6 px-4 py-2 text-gray-400 hover:text-white bg-purple-500/20 hover:bg-purple-500/30 border border-purple-500/30 rounded-lg transition-all"
          >
            ← العودة
          </button>
          <AboutKnoux />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white overflow-hidden">
      {/* Header */}
      <header className="relative bg-black/40 backdrop-blur-xl border-b border-purple-500/20 sticky top-0 z-40">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-gradient-to-br from-purple-500 to-blue-500 rounded-xl shadow-lg">
                <ClipboardCopy className="w-6 h-6" />
              </div>
              <div>
                <h1 className="text-3xl font-black bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent">
                  Knoux Clipboard AI
                </h1>
                <p className="text-xs text-gray-400">v1.0.0 • Intelligent Management</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="px-3 py-1.5 bg-green-500/20 border border-green-500/30 rounded-lg flex items-center gap-2 text-xs text-green-300">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                {isMonitoring ? 'Monitoring' : 'Idle'}
              </div>

              <button
                onClick={() => {
                  const history = getClipboardHistory();
                  setClipboardItems(history);
                  setLastSync(new Date());
                }}
                className="p-2 text-gray-400 hover:text-white hover:bg-purple-500/20 rounded-lg transition-all"
              >
                <RefreshCw className="w-5 h-5" />
              </button>

              <button
                onClick={() => setShowAbout(true)}
                className="p-2 text-gray-400 hover:text-white hover:bg-purple-500/20 rounded-lg transition-all"
                title="عن Knoux"
              >
                <Shield className="w-5 h-5" />
              </button>

              <button
                onClick={() => setShowSettings(true)}
                className="p-2 text-gray-400 hover:text-white hover:bg-purple-500/20 rounded-lg transition-all"
              >
                <Settings className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="relative container mx-auto px-6 py-8">
        {/* Dashboard Features Section */}
        <div className="mb-12">
          <DashboardFeatures
            stats={{
              totalItems: stats.totalItems,
              todayItems: stats.todayItems,
              totalSize: formatBytes(stats.totalSize)
            }}
            onFormatText={() => console.log('Format text')}
            onClassify={() => console.log('Classify')}
            onTranslate={() => console.log('Translate')}
            onAnalytics={() => console.log('Analytics')}
            onSaveHistory={() => console.log('Save history')}
            onManageRules={() => console.log('Manage rules')}
            onSecurityCheck={() => console.log('Security check')}
            onCustomize={() => handleClearAll()}
          />
        </div>

        {/* Divider */}
        <div className="my-12 border-t border-purple-500/20" />

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4 mb-8">
          <StatCard icon={<ClipboardCopy className="w-8 h-8" />} label="Total Items" value={stats.totalItems} color="purple" />
          <StatCard icon={<Zap className="w-8 h-8" />} label="Formats" value={stats.formats} color="blue" />
          <StatCard icon={<Shield className="w-8 h-8" />} label="Sensitive" value={stats.sensitiveItems} color="red" />
          <StatCard icon={<Activity className="w-8 h-8" />} label="URLs" value={stats.urlItems} color="green" />
          <StatCard icon={<Clock className="w-8 h-8" />} label="Today" value={stats.todayItems} color="orange" />
          <StatCard icon={<TrendingUp className="w-8 h-8" />} label="Size" value={formatBytes(stats.totalSize)} color="cyan" />
        </div>

        {/* Search and Filters */}
        <div className="mb-8 space-y-4">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search clipboard items..."
              className="w-full pl-12 pr-4 py-3 bg-black/40 border border-purple-500/20 rounded-xl focus:ring-2 focus:ring-purple-500/50 focus:border-transparent text-white placeholder-gray-500 transition-all"
            />
          </div>

          {allTags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {allTags.map(tag => (
                <button
                  key={tag}
                  onClick={() =>
                    setSelectedTags(prev =>
                      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
                    )
                  }
                  className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                    selectedTags.includes(tag)
                      ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/50'
                      : 'bg-purple-500/20 text-purple-300 hover:bg-purple-500/30 border border-purple-500/30'
                  }`}
                >
                  #{tag}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Clipboard Items */}
          <div className="lg:col-span-3">
            {filteredItems.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredItems.map(item => (
                  <div
                    key={item.id}
                    onClick={() => setSelectedItem(item.id)}
                    className={`p-4 rounded-xl border transition-all cursor-pointer transform hover:scale-105 ${
                      selectedItem === item.id
                        ? 'bg-purple-600/40 border-purple-400/50 ring-2 ring-purple-500/50'
                        : 'bg-black/40 border-purple-500/20 hover:border-purple-500/40'
                    }`}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <span className="text-xs font-bold px-2 py-1 bg-gradient-to-r from-purple-500 to-blue-500 rounded text-white">
                        {item.format}
                      </span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleToggleFavorite(item.id);
                        }}
                        className="text-yellow-400 hover:scale-110 transition-transform"
                      >
                        <Star className="w-4 h-4" fill={item.favorite ? 'currentColor' : 'none'} />
                      </button>
                    </div>

                    <p className="text-sm text-gray-300 line-clamp-3 mb-2 break-words">
                      {item.content.substring(0, 100)}...
                    </p>

                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span>{new Date(item.timestamp).toLocaleTimeString()}</span>
                      {item.metadata?.sensitive && <Lock className="w-3 h-3 text-red-400" />}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-black/40 border border-purple-500/20 rounded-xl p-12 text-center">
                <Maximize2 className="w-16 h-16 text-gray-600 mx-auto mb-4 opacity-50" />
                <h3 className="text-lg font-semibold text-gray-300 mb-2">No items found</h3>
                <p className="text-gray-500">
                  {searchQuery || selectedTags.length > 0
                    ? 'Try adjusting your search or filters'
                    : 'Start copying to see items here'}
                </p>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <aside className="space-y-4">
            {/* Selected Item Details */}
            {selectedItem && filteredItems.find(i => i.id === selectedItem) && (
              <div className="bg-black/40 border border-purple-500/20 rounded-xl p-4 space-y-4">
                <div>
                  <p className="text-xs text-gray-400 uppercase tracking-wider mb-2">Preview</p>
                  <div className="bg-black/40 rounded-lg p-3 text-xs text-gray-300 max-h-32 overflow-y-auto font-mono border border-purple-500/10">
                    {filteredItems.find(i => i.id === selectedItem)?.content}
                  </div>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => handleCopy(filteredItems.find(i => i.id === selectedItem)!)}
                    className="flex-1 px-3 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg text-sm font-medium transition-all flex items-center justify-center gap-2 shadow-lg shadow-purple-500/30"
                  >
                    <CopyIcon className="w-4 h-4" />
                    Copy
                  </button>
                  <button
                    onClick={() => handleDelete(selectedItem)}
                    className="flex-1 px-3 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-lg text-sm font-medium transition-all flex items-center justify-center gap-2"
                  >
                    <Trash className="w-4 h-4" />
                    Delete
                  </button>
                </div>
              </div>
            )}

            {/* Quick Actions */}
            <div className="bg-black/40 border border-purple-500/20 rounded-xl p-4 space-y-3">
              <p className="text-xs text-gray-400 uppercase tracking-wider font-semibold">Quick Actions</p>

              <button
                onClick={() => {
                  const history = getClipboardHistory();
                  setClipboardItems(history);
                  setLastSync(new Date());
                }}
                className="w-full px-3 py-2 bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 rounded-lg text-sm font-medium transition-all flex items-center justify-center gap-2"
              >
                <RefreshCw className="w-4 h-4" />
                Refresh
              </button>

              <button
                onClick={handleClearAll}
                className="w-full px-3 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-lg text-sm font-medium transition-all flex items-center justify-center gap-2"
              >
                <Trash2 className="w-4 h-4" />
                Clear All
              </button>
            </div>

            {/* Info */}
            <div className="bg-black/40 border border-purple-500/20 rounded-xl p-4 space-y-3 text-xs text-gray-400">
              <div className="pt-2 border-t border-gray-700">
                <p className="flex justify-between mb-2">
                  <span>Last sync:</span>
                  <span className="text-purple-400">{lastSync ? new Date(lastSync).toLocaleTimeString() : 'Never'}</span>
                </p>
                <p className="flex justify-between">
                  <span>Version:</span>
                  <span className="text-purple-400">1.0.0</span>
                </p>
              </div>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}

interface StatCardProps {
  icon: React.ReactNode;
  label: string;
  value: number | string;
  color: 'purple' | 'blue' | 'red' | 'green' | 'orange' | 'cyan';
}

const StatCard: React.FC<StatCardProps> = ({ icon, label, value, color }) => {
  const colorMap = {
    purple: 'from-purple-500/10 to-purple-500/5 border-purple-500/20',
    blue: 'from-blue-500/10 to-blue-500/5 border-blue-500/20',
    red: 'from-red-500/10 to-red-500/5 border-red-500/20',
    green: 'from-green-500/10 to-green-500/5 border-green-500/20',
    orange: 'from-orange-500/10 to-orange-500/5 border-orange-500/20',
    cyan: 'from-cyan-500/10 to-cyan-500/5 border-cyan-500/20',
  };

  const iconColorMap = {
    purple: 'text-purple-500/50',
    blue: 'text-blue-500/50',
    red: 'text-red-500/50',
    green: 'text-green-500/50',
    orange: 'text-orange-500/50',
    cyan: 'text-cyan-500/50',
  };

  return (
    <div className={`bg-gradient-to-br ${colorMap[color]} border rounded-xl p-4 backdrop-blur-sm`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-400 text-xs mb-1">{label}</p>
          <p className="text-2xl font-bold text-white">{value}</p>
        </div>
        <div className={iconColorMap[color]}>{icon}</div>
      </div>
    </div>
  );
};

export default App;
