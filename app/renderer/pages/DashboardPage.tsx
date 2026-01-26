/**
 * Dashboard Page - صفحة لوحة التحكم الكاملة
 * Grid Cards عصري مع جميع المعلومات المطلوبة
 */

import React, { useState, useEffect } from "react";
import {
  ClipboardCopy,
  Brain,
  Zap,
  Database,
  Shield,
  BarChart3,
  Activity,
  TrendingUp,
  Clock,
  AlertCircle,
  CheckCircle,
  RefreshCw,
  Trash2,
  Pause,
  Play,
} from "lucide-react";
import { useClipboard } from "../hooks/useClipboard";
import i18n from "../utils/i18n";

interface DashboardStats {
  totalItems: number;
  todayItems: number;
  totalSize: number;
  formats: number;
  sensitiveItems: number;
  urlItems: number;
  aiProcessed: number;
}

interface CardData {
  id: string;
  title: string;
  titleAr: string;
  value: string | number;
  subtitle?: string;
  icon: React.ReactNode;
  color: string;
  gradient: string;
  status?: "active" | "warning" | "error";
}

const DashboardPage: React.FC = () => {
  const clipboard = useClipboard({ autoPoll: true, pollInterval: 3000 });
  const [stats, setStats] = useState<DashboardStats>({
    totalItems: 0,
    todayItems: 0,
    totalSize: 0,
    formats: 0,
    sensitiveItems: 0,
    urlItems: 0,
    aiProcessed: 0,
  });
  const [isMonitoring, setIsMonitoring] = useState(true);

  useEffect(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const items = clipboard.items;
    const todayItems = items.filter(
      (item) => new Date(item.timestamp) >= today,
    ).length;

    const totalSize = items.reduce(
      (sum, item) => sum + (item.content?.length || 0),
      0,
    );
    const formats = new Set(items.map((item) => item.format)).size;
    const sensitiveItems = items.filter(
      (item) => item.metadata?.sensitive,
    ).length;
    const urlItems = items.filter((item) => item.metadata?.isUrl).length;
    const aiProcessed = items.filter(
      (item) => item.metadata?.aiEnhanced,
    ).length;

    setStats({
      totalItems: items.length,
      todayItems,
      totalSize,
      formats,
      sensitiveItems,
      urlItems,
      aiProcessed,
    });
  }, [clipboard.items]);

  const formatBytes = (bytes: number): string => {
    if (bytes === 0) return "0 B";
    const k = 1024;
    const sizes = ["B", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + " " + sizes[i];
  };

  const cards: CardData[] = [
    {
      id: "clipboard-status",
      title: "Clipboard Status",
      titleAr: "حالة الحافظة",
      value: clipboard.isMonitoring ? "Active" : "Paused",
      subtitle: clipboard.isMonitoring
        ? "Monitoring clipboard changes"
        : "Monitoring paused",
      icon: <ClipboardCopy className="w-6 h-6 text-white" />,
      color: "bg-green-500",
      gradient: "from-green-500 to-emerald-500",
      status: clipboard.isMonitoring ? "active" : "warning",
    },
    {
      id: "ai-engine",
      title: "AI Engine Status",
      titleAr: "حالة المحرك الذكي",
      value: aiStatus?.initialized ? "Ready" : "Standby",
      subtitle: aiStatus?.model || "Local Model",
      icon: <Brain className="w-6 h-6 text-white" />,
      color: "bg-purple-500",
      gradient: "from-purple-500 to-indigo-500",
      status: aiStatus?.initialized ? "active" : "active",
    },
    {
      id: "database-status",
      title: "Database Status",
      titleAr: "حالة قاعدة البيانات",
      value: "Connected",
      subtitle: `${stats.totalItems} items stored`,
      icon: <Database className="w-6 h-6 text-white" />,
      color: "bg-blue-500",
      gradient: "from-blue-500 to-cyan-500",
      status: "active",
    },
    {
      id: "memory-usage",
      title: "Memory / Performance",
      titleAr: "الذاكرة / الأداء",
      value: systemInfo ? formatBytes(systemInfo.memoryUsage.rss) : "...",
      subtitle: "Optimized",
      icon: <Activity className="w-6 h-6 text-white" />,
      color: "bg-orange-500",
      gradient: "from-orange-500 to-red-500",
      status: "active",
    },
  ];

  const handleQuickAction = async (action: string) => {
    switch (action) {
      case "clear-clipboard":
        if (
          confirm(
            i18n.t("dashboard.confirmClear") ||
              "Are you sure you want to clear history?",
          )
        ) {
          await clipboard.clearAll();
        }
        break;
      case "pause-monitoring":
        if (clipboard.isMonitoring) {
          clipboard.stopMonitoring();
        } else {
          clipboard.startMonitoring();
        }
        break;
      case "open-ai":
        navigate("/ai");
        break;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white p-6">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent mb-2">
            {i18n.t("dashboard.title")}
          </h1>
          <p className="text-gray-400">
            {i18n.isRTL()
              ? "نظرة شاملة على أداء التطبيق"
              : "Comprehensive overview of application performance"}
          </p>
        </div>

        {/* Grid Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {cards.map((card) => (
            <div
              key={card.id}
              className={`group relative overflow-hidden rounded-2xl p-6 transition-all duration-300 transform hover:scale-105 bg-gradient-to-br ${card.color} shadow-lg`}
            >
              {/* Background Pattern */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent" />
              </div>

              {/* Content */}
              <div className="relative z-10">
                <div className="flex items-start justify-between mb-4">
                  <div
                    className={`p-3 rounded-xl bg-white/20 backdrop-blur-sm ${card.gradient}`}
                  >
                    {card.icon}
                  </div>
                  {card.status && (
                    <div
                      className={`w-3 h-3 rounded-full ${
                        card.status === "active"
                          ? "bg-green-400 animate-pulse"
                          : card.status === "warning"
                            ? "bg-yellow-400"
                            : "bg-red-400"
                      }`}
                    />
                  )}
                </div>

                <div className="mb-2">
                  <h3 className="text-lg font-bold text-white mb-1">
                    {i18n.isRTL() ? card.titleAr : card.title}
                  </h3>
                  <div className="text-3xl font-black text-white mb-1">
                    {card.value}
                  </div>
                  {card.subtitle && (
                    <p className="text-sm text-white/80">{card.subtitle}</p>
                  )}
                </div>
              </div>

              {/* Border Glow */}
              <div className="absolute inset-0 rounded-2xl border-2 border-white/20 group-hover:border-white/40 transition-colors" />
            </div>
          ))}
        </div>

        {/* Additional Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Today's Activity */}
          <div className="bg-black/40 backdrop-blur-xl border border-purple-500/20 rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <Activity className="w-6 h-6 text-purple-400" />
              <h3 className="text-lg font-semibold">
                {i18n.isRTL() ? "نشاط اليوم" : "Today's Activity"}
              </h3>
            </div>
            <div className="text-4xl font-bold text-purple-400 mb-2">
              {stats.todayItems}
            </div>
            <p className="text-sm text-gray-400">
              {i18n.isRTL() ? "عنصر تم نسخه اليوم" : "items copied today"}
            </p>
          </div>

          {/* Total Items */}
          <div className="bg-black/40 backdrop-blur-xl border border-blue-500/20 rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <TrendingUp className="w-6 h-6 text-blue-400" />
              <h3 className="text-lg font-semibold">
                {i18n.isRTL() ? "إجمالي العناصر" : "Total Items"}
              </h3>
            </div>
            <div className="text-4xl font-bold text-blue-400 mb-2">
              {stats.totalItems}
            </div>
            <p className="text-sm text-gray-400">
              {i18n.isRTL() ? "عنصر في السجل" : "items in history"}
            </p>
          </div>

          {/* System Status */}
          <div className="bg-black/40 backdrop-blur-xl border border-green-500/20 rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-4">
              {isMonitoring ? (
                <CheckCircle className="w-6 h-6 text-green-400" />
              ) : (
                <AlertCircle className="w-6 h-6 text-yellow-400" />
              )}
              <h3 className="text-lg font-semibold">
                {i18n.isRTL() ? "حالة النظام" : "System Status"}
              </h3>
            </div>
            <div
              className={`text-2xl font-bold mb-2 ${
                isMonitoring ? "text-green-400" : "text-yellow-400"
              }`}
            >
              {isMonitoring
                ? i18n.isRTL()
                  ? "نشط"
                  : "Active"
                : i18n.isRTL()
                  ? "خامل"
                  : "Idle"}
            </div>
            <p className="text-sm text-gray-400">
              {isMonitoring
                ? i18n.isRTL()
                  ? "المراقبة تعمل"
                  : "Monitoring active"
                : i18n.isRTL()
                  ? "المراقبة متوقفة"
                  : "Monitoring paused"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
