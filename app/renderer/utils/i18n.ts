/**
 * i18n Utility - نظام الترجمة
 * Supports Arabic (RTL) and English (LTR)
 */

import arTranslations from '../i18n/ar.json';
import enTranslations from '../i18n/en.json';

export type Language = 'ar' | 'en';

interface Translations {
  [key: string]: any;
}

class I18nManager {
  private currentLanguage: Language = 'ar';
  private translations: Record<Language, Translations> = {
    ar: arTranslations,
    en: enTranslations,
  };
  private listeners: ((lang: Language) => void)[] = [];

  constructor() {
    // Detect system language
    const systemLang = this.detectSystemLanguage();
    this.setLanguage(systemLang);
  }

  private detectSystemLanguage(): Language {
    try {
      // Try Electron app locale
      if (typeof window !== 'undefined' && (window as any).electron) {
        const locale = (window as any).electron.app?.getLocale?.()?.slice(0, 2);
        if (locale === 'ar') return 'ar';
      }
      
      // Try browser locale
      const browserLang = navigator.language.slice(0, 2);
      if (browserLang === 'ar') return 'ar';
      
      // Try localStorage
      const stored = localStorage.getItem('knoux_language');
      if (stored === 'ar' || stored === 'en') return stored as Language;
    } catch (error) {
      console.error('Failed to detect language:', error);
    }
    
    return 'ar'; // Default to Arabic
  }

  setLanguage(lang: Language): void {
    if (this.currentLanguage !== lang) {
      this.currentLanguage = lang;
      localStorage.setItem('knoux_language', lang);
      
      // Update document direction
      document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
      document.documentElement.lang = lang;
      
      this.notifyListeners();
    }
  }

  getLanguage(): Language {
    return this.currentLanguage;
  }

  t(key: string, params?: Record<string, string | number>): string {
    const keys = key.split('.');
    let value: any = this.translations[this.currentLanguage];
    
    for (const k of keys) {
      value = value?.[k];
      if (value === undefined) {
        // Fallback to English
        value = this.translations.en;
        for (const k2 of keys) {
          value = value?.[k2];
        }
        break;
      }
    }
    
    if (typeof value !== 'string') {
      return key; // Return key if translation not found
    }
    
    // Replace parameters
    if (params) {
      return value.replace(/\{\{(\w+)\}\}/g, (match, paramKey) => {
        return params[paramKey]?.toString() || match;
      });
    }
    
    return value;
  }

  onChange(callback: (lang: Language) => void): () => void {
    this.listeners.push(callback);
    return () => {
      this.listeners = this.listeners.filter(l => l !== callback);
    };
  }

  private notifyListeners(): void {
    this.listeners.forEach(listener => listener(this.currentLanguage));
  }

  isRTL(): boolean {
    return this.currentLanguage === 'ar';
  }
}

export const i18n = new I18nManager();
export default i18n;
