/**
 * Dashboard View - Knoux Clipboard AI
 * Real-time dashboard with clock and system status
 */

import React, { useState, useEffect } from 'react';
import { useDatabase } from '../hooks/useDatabase';
import { useAISimple } from '../hooks/useAISimple';
import { useTheme } from '../hooks/useTheme';
import { useLanguage } from '../hooks/useLanguage';
import { useSettings } from '../hooks/useSettings';
import {
  Activity,
  Clock,
  Database,
  Cpu,
  Zap,
  Shield,
  Trash2,
  Pause,
  Play,
  RefreshCw
} from 'lucide-react';
import './Dashboard.css';

interface SystemStatus {
  clipboard: 'active' | 'idle';
  ai: 'active' | 'idle' | 'error';
  database: 'active' | 'idle' | 'error';
  memory: number;
}

const Dashboard: React.FC = () => {
  const { t, language, isRTL } = useLanguage();
  const { theme } = useTheme();
  const { settings } = useSettings();
  const { items, stats, isLoading } = useDatabase();
  const { isAIReady, modelStatus } = useAISimple();
  
  const [currentTime, setCurrentTime] = useState(new Date());
  const [systemStatus, setSystemStatus] = useState<SystemStatus>({
    clipboard: 'active',
    ai: isAIReady ? 'active' : 'idle',
    database: 'active',
    memory: 0
  });

  // Update clock every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Update system status periodically
  useEffect(() => {
    const updateStatus = async () => {
      try {
        const memoryUsage = await window.electron.ipcRenderer.invoke('system:get-memory-usage');
        const clipboardStatus = await window.electron.ipcRenderer.invoke('clipboard-monitor:status');
        
        setSystemStatus(prev => ({
          ...prev,
          clipboard: clipboardStatus ? 'active' : 'idle',
          ai: isAIReady ? 'active' : 'error',
          memory: memoryUsage || 0
        }));
      } catch (err) {
        console.error('Failed to update system status:', err);
      }
    };

    updateStatus();
    const interval = setInterval(updateStatus, 5000);
    return () => clearInterval(interval);
  }, [isAIReady]);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString(language === 'ar' ? 'ar-SA' : 'en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString(language === 'ar' ? 'ar-SA' : 'en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const handleClearClipboard = async () => {
    try {
      await window.electron.ipcRenderer.invoke('clipboard:clear');
      console.log('Clipboard cleared');
    } catch (err) {
      console.error('Failed to clear clipboard:', err);
    }
  };

  const handleToggleMonitoring = async () => {
    try {
      const isActive = systemStatus.clipboard === 'active';
      if (isActive) {
        await window.electron.ipcRenderer.invoke('clipboard-monitor:stop');
      } else {
        await window.electron.ipcRenderer.invoke('clipboard-monitor:start');
      }
    } catch (err) {
      console.error('Failed to toggle monitoring:', err);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-green-400';
      case 'idle': return 'text-yellow-400';
      case 'error': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return <CheckCircle className="w-4 h-4" />;
      case 'idle': return <Pause className="w-4 h-4" />;
      case 'error': return <AlertCircle className="w-4 h-4" />;
      default: return <div className="w-4 h-4" />;
    }
  };

  return (
    <div className={`dashboard-view ${isRTL ? 'rtl' : 'ltr'}`}>
      <div className="dashboard-container">
        
        {/* Header with Clock */}
        <div className="dashboard-header">
          <div className="clock-section">
            <div className="digital-clock">
              <div className="time-display">
                {formatTime(currentTime)}
              </div>
              <div className="date-display">
                {formatDate(currentTime)}
              </div>
            </div>
            <div className="clock-title">
              <h2>{t('dashboard.officialTime')}</h2>
            </div>
          </div>
        </div>

        {/* System Status Cards */}
        <div className="status-grid">
          <div className="glass-card status-card">
            <div className="status-header">
              <div className="status-icon">
                <Database className="w-6 h-6" />
              </div>
              <div className="status-info">
                <h3>{t('dashboard.clipboardStatus')}</h3>
                <div className={`status-indicator ${getStatusColor(systemStatus.clipboard)}`}>
                  {getStatusIcon(systemStatus.clipboard)}
                  <span>{t(`dashboard.${systemStatus.clipboard}`)}</span>
                </div>
              </div>
            </div>
            <div className="status-stats">
              <div className="stat">
                <span className="stat-value">{stats.total}</span>
                <span className="stat-label">Total Items</span>
              </div>
              <div className="stat">
                <span className="stat-value">{stats.favorites}</span>
                <span className="stat-label">Favorites</span>
              </div>
            </div>
          </div>

          <div className="glass-card status-card">
            <div className="status-header">
              <div className="status-icon">
                <Cpu className="w-6 h-6" />
              </div>
              <div className="status-info">
                <h3>{t('dashboard.aiStatus')}</h3>
                <div className={`status-indicator ${getStatusColor(systemStatus.ai)}`}>
                  {getStatusIcon(systemStatus.ai)}
                  <span>{modelStatus}</span>
                </div>
              </div>
            </div>
            <div className="status-stats">
              <div className="stat">
                <span className="stat-value">{isAIReady ? '✓' : '✗'}</span>
                <span className="stat-label">Ready</span>
              </div>
            </div>
          </div>

          <div className="glass-card status-card">
            <div className="status-header">
              <div className="status-icon">
                <Activity className="w-6 h-6" />
              </div>
              <div className="status-info">
                <h3>{t('dashboard.databaseStatus')}</h3>
                <div className={`status-indicator ${getStatusColor(systemStatus.database)}`}>
                  {getStatusIcon(systemStatus.database)}
                  <span>{t(`dashboard.${systemStatus.database}`)}</span>
                </div>
              </div>
            </div>
            <div className="status-stats">
              <div className="stat">
                <span className="stat-value">{systemStatus.memory.toFixed(1)}MB</span>
                <span className="stat-label">Memory</span>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="quick-actions">
          <h3>Quick Actions</h3>
          <div className="actions-grid">
            <button 
              className="glass-button action-button"
              onClick={handleClearClipboard}
              disabled={isLoading}
            >
              <Trash2 className="w-4 h-4" />
              <span>{t('dashboard.clearClipboard')}</span>
            </button>

            <button 
              className="glass-button action-button"
              onClick={handleToggleMonitoring}
              disabled={isLoading}
            >
              {systemStatus.clipboard === 'active' ? (
                <Pause className="w-4 h-4" />
              ) : (
                <Play className="w-4 h-4" />
              )}
              <span>{t('dashboard.pauseMonitoring')}</span>
            </button>

            <button 
              className="glass-button action-button"
              onClick={() => window.location.reload()}
            >
              <RefreshCw className="w-4 h-4" />
              <span>Refresh</span>
            </button>
          </div>
        </div>

        {/* Recent Items Preview */}
        <div className="recent-items">
          <h3>Recent Clipboard Items</h3>
          <div className="items-preview">
            {items.slice(0, 3).map(item => (
              <div key={item.id} className="glass-card item-preview">
                <div className="item-content">
                  <span className="item-type">{item.type}</span>
                  <p className="item-text">
                    {item.content.substring(0, 100)}
                    {item.content.length > 100 && '...'}
                  </p>
                </div>
                <div className="item-meta">
                  <span className="item-time">
                    {new Date(item.timestamp).toLocaleTimeString()}
                  </span>
                  {item.isFavorite && (
                    <span className="favorite-indicator">⭐</span>
                  )}
                </div>
              </div>
            ))}
            
            {items.length === 0 && (
              <div className="empty-state">
                <p>No clipboard items yet</p>
                <small>Copy something to get started!</small>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};

export default Dashboard;
