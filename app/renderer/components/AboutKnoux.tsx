/**
 * About Knoux Component - قسم عن Knoux | الدعم والمساعدة
 * تصميم فخم مضغوط جاهز للتطبيق مع دعم الوضع الليلي
 */

import React, { useState, useEffect } from 'react';
import { 
  Crown, 
  Shield, 
  Sparkles, 
  Phone, 
  MessageSquare, 
  Mail, 
  Facebook, 
  Image as ImageIcon, 
  Heart, 
  Globe,
  Smartphone,
  Users,
  Code,
  Zap
} from 'lucide-react';

const AboutKnoux: React.FC = () => {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [activeCard, setActiveCard] = useState<string | null>(null);

  // اكتشاف الوضع الليلي تلقائياً
  useEffect(() => {
    const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setTheme(isDark ? 'dark' : 'light');
    
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e: MediaQueryListEvent) => {
      setTheme(e.matches ? 'dark' : 'light');
    };
    
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // معالجة الروابط التفاعلية
  const handleContactClick = (type: string, url: string) => {
    setActiveCard(type);
    setTimeout(() => setActiveCard(null), 300);
    
    switch (type) {
      case 'phone':
        window.open(`tel:${url}`, '_blank');
        break;
      case 'whatsapp':
        window.open(url, '_blank');
        break;
      case 'email':
        window.open(url, '_blank');
        break;
      default:
        window.open(url, '_blank');
    }
  };

  // تعريف الألوان حسب الثيم
  const colors = theme === 'dark' ? {
    bgPrimary: 'rgba(15, 15, 26, 0.95)',
    bgSecondary: 'rgba(26, 26, 46, 0.9)',
    accent: '#8a2be2',
    textPrimary: '#f0f0f0',
    textSecondary: '#b0b0c0',
    border: 'rgba(138, 43, 226, 0.3)',
    glow: 'rgba(138, 43, 226, 0.2)'
  } : {
    bgPrimary: 'rgba(255, 255, 255, 0.95)',
    bgSecondary: 'rgba(248, 248, 255, 0.9)',
    accent: '#6a0dad',
    textPrimary: '#1a1a2e',
    textSecondary: '#4a4a6e',
    border: 'rgba(106, 13, 173, 0.2)',
    glow: 'rgba(106, 13, 173, 0.1)'
  };

  return (
    <div 
      className="relative overflow-hidden rounded-2xl backdrop-blur-lg transition-all duration-300"
      style={{
        background: `linear-gradient(135deg, ${colors.bgPrimary}, ${colors.bgSecondary})`,
        border: `1px solid ${colors.border}`,
        boxShadow: `0 10px 40px ${colors.glow}`
      }}
    >
      {/* خلفية متحركة */}
      <div className="absolute inset-0 overflow-hidden opacity-10">
        <div className="absolute top-0 left-0 w-64 h-64 bg-purple-500 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500 rounded-full translate-x-1/3 translate-y-1/3 blur-3xl"></div>
      </div>

      <div className="relative z-10 p-6">
        {/* HEADER - أعلى الصفحة */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-purple-600 to-blue-600 rounded-2xl shadow-xl mb-4">
            <Crown className="w-10 h-10 text-white" />
          </div>
          
          <h1 
            className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent mb-2"
            style={{ color: colors.textPrimary }}
          >
            Knoux
          </h1>
          
          <div className="flex items-center justify-center gap-3 mb-3">
            <span className="px-3 py-1 bg-gradient-to-r from-purple-500/20 to-blue-500/20 text-purple-300 rounded-full text-sm font-medium">
              التقنية
            </span>
            <span className="px-3 py-1 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 text-blue-300 rounded-full text-sm font-medium">
              الأمان
            </span>
            <span className="px-3 py-1 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 text-cyan-300 rounded-full text-sm font-medium">
              الإبداع
            </span>
          </div>
          
          <p 
            className="max-w-2xl mx-auto text-base leading-relaxed"
            style={{ color: colors.textSecondary }}
          >
            مؤسسة تقنية متخصصة في تطوير التطبيقات الذكية والحلول الرقمية المتقدمة، 
            تجمع بين الأداء العالي، الخصوصية، والتصميم العصري لتقديم تجربة استخدام استثنائية.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* من نحن */}
          <div 
            className="p-5 rounded-xl transition-all duration-300 hover:scale-[1.02]"
            style={{
              background: colors.bgSecondary,
              border: `1px solid ${colors.border}`
            }}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg">
                <Users className="w-5 h-5 text-white" />
              </div>
              <h3 
                className="text-xl font-bold"
                style={{ color: colors.textPrimary }}
              >
                من نحن
              </h3>
            </div>
            
            <p 
              className="text-base leading-relaxed"
              style={{ color: colors.textSecondary }}
            >
              Knoux تعمل على بناء تطبيقات حديثة تعتمد على الابتكار، الذكاء الاصطناعي، 
              والأمن الرقمي، مع التركيز على جودة المنتج وتجربة المستخدم، واضعة الخصوصية 
              والأمان في أعلى الأولويات.
            </p>
          </div>

          {/* المطور */}
          <div 
            className="p-5 rounded-xl transition-all duration-300 hover:scale-[1.02]"
            style={{
              background: colors.bgSecondary,
              border: `1px solid ${colors.border}`
            }}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg">
                <Code className="w-5 h-5 text-white" />
              </div>
              <h3 
                className="text-xl font-bold"
                style={{ color: colors.textPrimary }}
              >
                المطور
              </h3>
            </div>
            
            <p 
              className="text-base leading-relaxed mb-3"
              style={{ color: colors.textSecondary }}
            >
              تم تطوير هذا التطبيق بالكامل بفضل الله على يد:
            </p>
            
            <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-lg">
              <div className="p-2 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg">
                <Crown className="w-5 h-5 text-yellow-300" />
              </div>
              <div>
                <h4 
                  className="font-bold text-lg"
                  style={{ color: colors.textPrimary }}
                >
                  Eng / Sadek Elgazar 👑
                </h4>
                <p 
                  className="text-sm"
                  style={{ color: colors.textSecondary }}
                >
                  المطور الأوحد والمؤسس لتطبيقات وأعمال Knoux
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* كروت التواصل التفاعلية */}
        <div className="mt-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg">
              <Smartphone className="w-5 h-5 text-white" />
            </div>
            <h3 
              className="text-xl font-bold"
              style={{ color: colors.textPrimary }}
            >
              التواصل والمساعدة
            </h3>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {/* اتصال مباشر */}
            <button
              onClick={() => handleContactClick('phone', '0503281920')}
              className={`p-4 rounded-xl transition-all duration-300 flex flex-col items-center justify-center gap-3 ${
                activeCard === 'phone' ? 'scale-95' : 'hover:scale-105'
              }`}
              style={{
                background: `linear-gradient(135deg, ${colors.bgSecondary}, ${colors.bgPrimary})`,
                border: `1px solid ${colors.border}`,
                boxShadow: activeCard === 'phone' 
                  ? `0 0 20px ${colors.glow}` 
                  : 'none'
              }}
            >
              <div className="p-3 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl">
                <Phone className="w-6 h-6 text-white" />
              </div>
              <span 
                className="font-medium text-sm text-center"
                style={{ color: colors.textPrimary }}
              >
                اتصال مباشر
              </span>
              <span 
                className="text-xs opacity-80"
                style={{ color: colors.textSecondary }}
              >
                0503281920
              </span>
            </button>

            {/* WhatsApp */}
            <button
              onClick={() => handleContactClick('whatsapp', 'https://wa.me/971503281920')}
              className={`p-4 rounded-xl transition-all duration-300 flex flex-col items-center justify-center gap-3 ${
                activeCard === 'whatsapp' ? 'scale-95' : 'hover:scale-105'
              }`}
              style={{
                background: `linear-gradient(135deg, ${colors.bgSecondary}, ${colors.bgPrimary})`,
                border: `1px solid ${colors.border}`,
                boxShadow: activeCard === 'whatsapp' 
                  ? `0 0 20px ${colors.glow}` 
                  : 'none'
              }}
            >
              <div className="p-3 bg-gradient-to-r from-green-400 to-teal-500 rounded-xl">
                <MessageSquare className="w-6 h-6 text-white" />
              </div>
              <span 
                className="font-medium text-sm text-center"
                style={{ color: colors.textPrimary }}
              >
                WhatsApp
              </span>
              <span 
                className="text-xs opacity-80"
                style={{ color: colors.textSecondary }}
              >
                دردشة مباشرة
              </span>
            </button>

            {/* Email */}
            <button
              onClick={() => handleContactClick('email', 'mailto:knouxguard@gmail.com')}
              className={`p-4 rounded-xl transition-all duration-300 flex flex-col items-center justify-center gap-3 ${
                activeCard === 'email' ? 'scale-95' : 'hover:scale-105'
              }`}
              style={{
                background: `linear-gradient(135deg, ${colors.bgSecondary}, ${colors.bgPrimary})`,
                border: `1px solid ${colors.border}`,
                boxShadow: activeCard === 'email' 
                  ? `0 0 20px ${colors.glow}` 
                  : 'none'
              }}
            >
              <div className="p-3 bg-gradient-to-r from-red-500 to-pink-500 rounded-xl">
                <Mail className="w-6 h-6 text-white" />
              </div>
              <span 
                className="font-medium text-sm text-center"
                style={{ color: colors.textPrimary }}
              >
                البريد الإلكتروني
              </span>
              <span 
                className="text-xs opacity-80"
                style={{ color: colors.textSecondary }}
              >
                knouxguard@gmail.com
              </span>
            </button>

            {/* Facebook */}
            <button
              onClick={() => handleContactClick('facebook', 'https://www.facebook.com/share/1bXebP7S7D/')}
              className={`p-4 rounded-xl transition-all duration-300 flex flex-col items-center justify-center gap-3 ${
                activeCard === 'facebook' ? 'scale-95' : 'hover:scale-105'
              }`}
              style={{
                background: `linear-gradient(135deg, ${colors.bgSecondary}, ${colors.bgPrimary})`,
                border: `1px solid ${colors.border}`,
                boxShadow: activeCard === 'facebook' 
                  ? `0 0 20px ${colors.glow}` 
                  : 'none'
              }}
            >
              <div className="p-3 bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl">
                <Facebook className="w-6 h-6 text-white" />
              </div>
              <span 
                className="font-medium text-sm text-center"
                style={{ color: colors.textPrimary }}
              >
                Facebook
              </span>
              <span 
                className="text-xs opacity-80"
                style={{ color: colors.textSecondary }}
              >
                صفحتنا الرسمية
              </span>
            </button>

            {/* Pinterest */}
            <button
              onClick={() => handleContactClick('pinterest', 'https://www.pinterest.com/knoux7')}
              className={`p-4 rounded-xl transition-all duration-300 flex flex-col items-center justify-center gap-3 ${
                activeCard === 'pinterest' ? 'scale-95' : 'hover:scale-105'
              }`}
              style={{
                background: `linear-gradient(135deg, ${colors.bgSecondary}, ${colors.bgPrimary})`,
                border: `1px solid ${colors.border}`,
                boxShadow: activeCard === 'pinterest' 
                  ? `0 0 20px ${colors.glow}` 
                  : 'none'
              }}
            >
              <div className="p-3 bg-gradient-to-r from-red-600 to-red-700 rounded-xl">
                <ImageIcon className="w-6 h-6 text-white" />
              </div>
              <span 
                className="font-medium text-sm text-center"
                style={{ color: colors.textPrimary }}
              >
                Pinterest
              </span>
              <span 
                className="text-xs opacity-80"
                style={{ color: colors.textSecondary }}
              >
                knoux7
              </span>
            </button>

            {/* TikTok */}
            <button
              onClick={() => handleContactClick('tiktok', 'https://www.tiktok.com/@knoux_7')}
              className={`p-4 rounded-xl transition-all duration-300 flex flex-col items-center justify-center gap-3 ${
                activeCard === 'tiktok' ? 'scale-95' : 'hover:scale-105'
              }`}
              style={{
                background: `linear-gradient(135deg, ${colors.bgSecondary}, ${colors.bgPrimary})`,
                border: `1px solid ${colors.border}`,
                boxShadow: activeCard === 'tiktok' 
                  ? `0 0 20px ${colors.glow}` 
                  : 'none'
              }}
            >
              <div className="p-3 bg-gradient-to-r from-black to-gray-800 rounded-xl">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <span 
                className="font-medium text-sm text-center"
                style={{ color: colors.textPrimary }}
              >
                TikTok
              </span>
              <span 
                className="text-xs opacity-80"
                style={{ color: colors.textSecondary }}
              >
                @knoux_7
              </span>
            </button>

            {/* Snapchat */}
            <button
              onClick={() => handleContactClick('snapchat', 'https://www.snapchat.com/add/knooux7')}
              className={`p-4 rounded-xl transition-all duration-300 flex flex-col items-center justify-center gap-3 ${
                activeCard === 'snapchat' ? 'scale-95' : 'hover:scale-105'
              }`}
              style={{
                background: `linear-gradient(135deg, ${colors.bgSecondary}, ${colors.bgPrimary})`,
                border: `1px solid ${colors.border}`,
                boxShadow: activeCard === 'snapchat' 
                  ? `0 0 20px ${colors.glow}` 
                  : 'none'
              }}
            >
              <div className="p-3 bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-xl">
                <Sparkles className="w-6 h-6 text-black" />
              </div>
              <span 
                className="font-medium text-sm text-center"
                style={{ color: colors.textPrimary }}
              >
                Snapchat
              </span>
              <span 
                className="text-xs opacity-80"
                style={{ color: colors.textSecondary }}
              >
                knooux7
              </span>
            </button>

            {/* الموقع الإلكتروني */}
            <button
              onClick={() => handleContactClick('website', 'https://knoux.com')}
              className={`p-4 rounded-xl transition-all duration-300 flex flex-col items-center justify-center gap-3 ${
                activeCard === 'website' ? 'scale-95' : 'hover:scale-105'
              }`}
              style={{
                background: `linear-gradient(135deg, ${colors.bgSecondary}, ${colors.bgPrimary})`,
                border: `1px solid ${colors.border}`,
                boxShadow: activeCard === 'website' 
                  ? `0 0 20px ${colors.glow}` 
                  : 'none'
              }}
            >
              <div className="p-3 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-xl">
                <Globe className="w-6 h-6 text-white" />
              </div>
              <span 
                className="font-medium text-sm text-center"
                style={{ color: colors.textPrimary }}
              >
                الموقع الإلكتروني
              </span>
              <span 
                className="text-xs opacity-80"
                style={{ color: colors.textSecondary }}
              >
                knoux.com
              </span>
            </button>
          </div>
        </div>

        {/* FOOTER */}
        <div className="mt-8 pt-6 border-t" style={{ borderColor: colors.border }}>
          <div className="flex flex-col items-center gap-4">
            <div className="flex items-center gap-2">
              <Heart className="w-5 h-5" style={{ color: colors.accent }} />
              <p 
                className="text-lg font-bold text-center"
                style={{ color: colors.textPrimary }}
              >
                Knoux
              </p>
            </div>
            
            <p 
              className="text-center text-sm max-w-md mx-auto leading-relaxed"
              style={{ color: colors.textSecondary }}
            >
              نبني التقنية بثقة، ونصنع التجربة باحتراف.
            </p>
            
            <div className="flex items-center gap-4">
              <Shield className="w-4 h-4" style={{ color: colors.accent }} />
              <span 
                className="text-xs opacity-70"
                style={{ color: colors.textSecondary }}
              >
                {theme === 'dark' ? 'الوضع الليلي' : 'الوضع الفاتح'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutKnoux;
