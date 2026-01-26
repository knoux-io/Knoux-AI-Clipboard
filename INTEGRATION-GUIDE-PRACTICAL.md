# 🔗 دليل التكامل العملي - Knoux Systems Integration

# Practical Integration Guide for Developers

---

## 🎯 نظرة عامة

هذا الدليل يشرح كيفية دمج **6 أنظمة جديدة** في التطبيق الحالي.

**الوقت المتوقع:** 2-3 ساعات
**مستوى الصعوبة:** متوسط
**المتطلبات:** React + TypeScript معرفة أساسية

---

## 📦 الأنظمة المطلوب دمجها

```
1. SettingsManager (40+ settings)
2. ThemeManager (Dark/Light/Custom)
3. I18nManager (350+ phrases)
4. VIPManager (3 tiers)
5. AIDatabase (Intents + KB)
6. All supporting utilities
```

---

## ✅ خطوات التكامل

### Step 1: إضافة Providers إلى App.tsx

```typescript
// app/renderer/App.tsx

import React, { useState, useEffect } from 'react';
import { settingsManager } from '../shared/settings-manager';
import { themeManager } from '../shared/theme-manager';
import { i18n } from '../shared/i18n-complete';
import { vipManager } from '../shared/vip-manager';

// Create contexts
const SettingsContext = React.createContext(null);
const ThemeContext = React.createContext(null);
const I18nContext = React.createContext(null);
const VIPContext = React.createContext(null);

export function App() {
  const [settings, setSettings] = useState(settingsManager.getSettings());
  const [theme, setTheme] = useState(themeManager.getCurrentTheme());
  const [language, setLanguage] = useState(i18n.getLanguage());
  const [vipUser, setVipUser] = useState(vipManager.getCurrentUser());

  // Setup listeners for automatic updates
  useEffect(() => {
    const unsubscribeSettings = settingsManager.onChange(setSettings);
    const unsubscribeTheme = themeManager.onChange(setTheme);
    const unsubscribeI18n = i18n.onChange(setLanguage);
    const unsubscribeVIP = vipManager.onChange(setVipUser);

    return () => {
      unsubscribeSettings();
      unsubscribeTheme();
      unsubscribeI18n();
      unsubscribeVIP();
    };
  }, []);

  return (
    <SettingsContext.Provider value={settings}>
      <ThemeContext.Provider value={theme}>
        <I18nContext.Provider value={language}>
          <VIPContext.Provider value={vipUser}>
            {/* Your app components here */}
          </VIPContext.Provider>
        </I18nContext.Provider>
      </ThemeContext.Provider>
    </SettingsContext.Provider>
  );
}

export { SettingsContext, ThemeContext, I18nContext, VIPContext };
```

### Step 2: تحديث SettingsPanel.tsx

```typescript
// app/renderer/components/SettingsPanel.tsx

import React, { useState } from 'react';
import { settingsManager } from '../../shared/settings-manager';
import { i18n, t } from '../../shared/i18n-complete';

export default function SettingsPanel() {
  const [activeCategory, setActiveCategory] = useState('appearance');
  const structure = settingsManager.getSettingsStructure();

  const handleSettingChange = (key: string, value: any) => {
    settingsManager.setSetting(key as any, value);
  };

  const handleReset = (category: string) => {
    if (window.confirm(t('dialog.confirmClear'))) {
      settingsManager.resetCategory(category as any);
    }
  };

  return (
    <div className="settings-panel">
      {/* Category Tabs */}
      <div className="settings-tabs">
        {structure.map(group => (
          <button
            key={group.category}
            onClick={() => setActiveCategory(group.category)}
            className={activeCategory === group.category ? 'active' : ''}
          >
            <i className={group.icon}></i>
            {i18n.isArabic() ? group.label_ar : group.label_en}
          </button>
        ))}
      </div>

      {/* Settings Content */}
      <div className="settings-content">
        {structure.find(g => g.category === activeCategory)?.items.map(item => (
          <div key={item.key} className="setting-item">
            <label>
              {i18n.isArabic() ? item.label_ar : item.label_en}
            </label>
            <p className="description">
              {i18n.isArabic() ? item.description_ar : item.description_en}
            </p>

            {item.type === 'toggle' && (
              <input
                type="checkbox"
                checked={item.value}
                onChange={e => handleSettingChange(item.key, e.target.checked)}
              />
            )}

            {item.type === 'select' && (
              <select
                value={item.value}
                onChange={e => handleSettingChange(item.key, e.target.value)}
              >
                {item.options?.map(opt => (
                  <option key={opt.value} value={opt.value}>
                    {i18n.isArabic() ? opt.label_ar : opt.label_en}
                  </option>
                ))}
              </select>
            )}

            {item.type === 'slider' && (
              <input
                type="range"
                min={item.min}
                max={item.max}
                step="0.1"
                value={item.value}
                onChange={e => handleSettingChange(item.key, parseFloat(e.target.value))}
              />
            )}

            {item.type === 'color' && (
              <input
                type="color"
                value={item.value}
                onChange={e => handleSettingChange(item.key, e.target.value)}
              />
            )}

            {item.type === 'number' && (
              <input
                type="number"
                value={item.value}
                min={item.min}
                max={item.max}
                onChange={e => handleSettingChange(item.key, parseInt(e.target.value))}
              />
            )}
          </div>
        ))}

        {/* Reset Button */}
        <button
          onClick={() => handleReset(activeCategory)}
          className="btn-secondary"
        >
          {t('action.reset')}
        </button>
      </div>
    </div>
  );
}
```

### Step 3: إضافة Theme Support للـ Layout

```typescript
// app/renderer/components/Layout.tsx

import React, { useContext } from 'react';
import { ThemeContext } from '../App';

export default function Layout({ children }: any) {
  const theme = useContext(ThemeContext);

  return (
    <div
      className="layout"
      style={{
        '--bg-primary': theme.colors.background,
        '--bg-surface': theme.colors.surface,
        '--text-primary': theme.colors.text.primary,
        '--color-primary': theme.colors.primary,
        // ... more CSS variables
      } as React.CSSProperties}
    >
      {children}
    </div>
  );
}
```

### Step 4: استخدام i18n في Components

```typescript
// Usage in any component:

import { t, i18n } from '../../shared/i18n-complete';

export default function MyComponent() {
  return (
    <div dir={i18n.getTextDirection()}>
      <h1>{t('app.name')}</h1>
      <p>{t('clipboard.empty')}</p>
      <button>{t('action.save')}</button>

      {/* Language switcher */}
      <select onChange={e => i18n.setLanguage(e.target.value as any)}>
        <option value="en">{t('language.english')}</option>
        <option value="ar">{t('language.arabic')}</option>
      </select>
    </div>
  );
}
```

### Step 5: إضافة VIP Page Component

```typescript
// app/renderer/components/VIPPage.tsx

import React, { useContext } from 'react';
import { VIPContext } from '../App';
import { vipManager, VIP_PLANS, VIP_COMPARISON } from '../../shared/vip-manager';
import { t, i18n } from '../../shared/i18n-complete';

export default function VIPPage() {
  const currentUser = useContext(VIPContext);
  const currentTier = vipManager.getCurrentTier();

  return (
    <div className="vip-page">
      {/* Header */}
      <h1>{t('vip.title')}</h1>
      <p>{t('vip.subtitle')}</p>

      {/* Current Status */}
      {currentUser && (
        <div className="current-plan">
          <h2>{t('vip.currentPlan')}</h2>
          <p>Tier: {currentTier}</p>
          <p>Status: {currentUser.status}</p>
          {currentUser.trial_days_left && (
            <p>
              {t('vip.trialEnds')}: {currentUser.trial_days_left} {t('vip.days')}
            </p>
          )}
        </div>
      )}

      {/* Plans Comparison */}
      <div className="plans-grid">
        {Object.values(VIP_PLANS).map(plan => (
          <div key={plan.tier} className="plan-card">
            <h3>{i18n.isArabic() ? plan.name_ar : plan.name_en}</h3>
            <p className="price">
              ${plan.price_monthly}/mo
            </p>
            <ul className="features">
              {plan.benefits.map(benefit => (
                <li key={benefit}>✓ {benefit}</li>
              ))}
            </ul>
            <button className="btn-primary">
              {t('vip.upgrade')}
            </button>
          </div>
        ))}
      </div>

      {/* Comparison Table */}
      <table className="comparison-table">
        <tbody>
          {VIP_COMPARISON.map(item => (
            <tr key={item.feature}>
              <td>{item.feature}</td>
              <td>{String(item.basic)}</td>
              <td>{String(item.elite)}</td>
              <td>{String(item.platinum)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
```

### Step 6: تحسين AI Assistant مع Database

```typescript
// app/renderer/components/AIAssistant.tsx

import React, { useState } from 'react';
import { aiHelper } from '../../backend/ai/ai-database';
import { i18n, t } from '../../shared/i18n-complete';

export default function AIAssistant() {
  const [messages, setMessages] = useState<Array<any>>([]);
  const [input, setInput] = useState('');
  const language = i18n.getLanguage();

  const handleSend = () => {
    if (!input.trim()) return;

    // Add user message
    const userMsg = { role: 'user', text: input };
    setMessages(prev => [...prev, userMsg]);

    // Get AI response
    const intent = aiHelper.detectIntent(input, language);
    const answers = aiHelper.findAnswers(input, language, 2);

    let response = '';
    if (answers.length > 0) {
      response = language === 'en' ? answers[0].answer_en : answers[0].answer_ar;
    } else {
      response = aiHelper.getFallbackResponse('unknown', language);
    }

    // Add AI response
    const aiMsg = { role: 'ai', text: response };
    setMessages(prev => [...prev, aiMsg]);

    setInput('');
  };

  return (
    <div className="ai-assistant" dir={i18n.getTextDirection()}>
      <h2>{t('ai.assistant')}</h2>

      {/* Messages */}
      <div className="messages">
        {messages.map((msg, idx) => (
          <div key={idx} className={`message ${msg.role}`}>
            {msg.text}
          </div>
        ))}
      </div>

      {/* Input */}
      <div className="input-area">
        <input
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyPress={e => e.key === 'Enter' && handleSend()}
          placeholder={t('ai.askMe')}
        />
        <button onClick={handleSend}>{t('action.send')}</button>
      </div>
    </div>
  );
}
```

---

## 🔍 اختبار الدمج

```bash
# 1. تأكد من عدم وجود أخطاء TypeScript
npm run type-check

# 2. شغّل التطبيق في وضع التطوير
npm run dev

# 3. اختبر كل نظام:
# - Settings: تغيير إعداد ويتحقق من الحفظ
# - Theme: تبديل بين Dark/Light
# - i18n: تبديل اللغة وتحقق من RTL
# - VIP: استعرض صفحة VIP
# - AI: اسأل مساعد الذكاء الاصطناعي

# 4. بناء النسخة النهائية
npm run build:renderer
```

---

## 🎨 CSS Variables للـ Theme

أضف هذا في `global.css`:

```css
:root {
  /* Background & Surfaces */
  --bg-primary: var(--color-bg-primary);
  --bg-surface: var(--color-bg-surface);
  --bg-surface-variant: var(--color-bg-surface-variant);
  --border-color: var(--color-border);

  /* Text Colors */
  --text-primary: var(--color-text-primary);
  --text-secondary: var(--color-text-secondary);
  --text-tertiary: var(--color-text-tertiary);

  /* Component Colors */
  --color-primary: var(--color-primary);
  --color-secondary: var(--color-secondary);
  --color-accent: var(--color-accent);

  /* Semantic */
  --semantic-divider: var(--color-divider);
  --semantic-disabled: var(--color-disabled);
  --semantic-hover: var(--color-hover);
  --semantic-focus: var(--color-focus);
  --semantic-active: var(--color-active);
}

body {
  background-color: var(--bg-primary);
  color: var(--text-primary);
  direction: var(--text-direction);
}

[dir="rtl"] {
  text-align: right;
}

[dir="ltr"] {
  text-align: left;
}
```

---

## 📋 Checklist التكامل النهائي

- [ ] تم إضافة Providers إلى App.tsx
- [ ] تم تحديث SettingsPanel
- [ ] تم إضافة Layout مع Theme support
- [ ] تم استخدام i18n في جميع Texts
- [ ] تم إضافة VIP Page
- [ ] تم تحسين AI Assistant
- [ ] تم اختبار RTL Layout
- [ ] تم بناء نسخة بدون أخطاء
- [ ] تم اختبار جميع الأنظمة الجديدة
- [ ] تم توثيق التغييرات

---

## 🆘 استكشاف الأخطاء

### الخطأ: `import not found`

→ تأكد من المسار الكامل: `../../shared/settings-manager`

### الخطأ: `Context is undefined`

→ تأكد من وضع Provider حول التطبيق

### المظهر لا يتغير

→ تأكد من تطبيق CSS variables في global.css

### اللغة لا تتغير

→ تأكد من استدعاء `i18n.setLanguage()` وليس فقط `i18n.getLanguage()`

### Settings لا تحفظ

→ تأكد من أن localStorage متاح (ليس في private mode)

---

## 🎯 الخطوات التالية

بعد التكامل الناجح:

1. **Customization**: خصص الألوان والخطوط حسب العلامة التجارية
2. **Testing**: اختبر شامل في بيئات مختلفة
3. **Documentation**: وثّق أي تغييرات إضافية
4. **Release**: أطلق النسخة الجديدة

---

**آخر تحديث:** January 26, 2026
**الحالة:** ✅ جاهز للتطبيق
