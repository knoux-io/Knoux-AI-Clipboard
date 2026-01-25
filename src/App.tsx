import React from 'react';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div className="logo">📋</div>
        <h1>Knoux Clipboard AI</h1>
        <p className="subtitle">مدير الحافظة الذكي مع تحليل الذكاء الاصطناعي</p>
        
        <div className="status">
          <p>✅ التطبيق يعمل بنجاح!</p>
          <p>يمكنك الآن استخدام جميع الميزات:</p>
        </div>
        
        <div className="features">
          <div className="feature">
            <span className="feature-icon">🤖</span>
            <h3>تحليل الذكاء الاصطناعي</h3>
            <p>تحليل وتلخيص المحتوى تلقائياً</p>
          </div>
          <div className="feature">
            <span className="feature-icon">🔒</span>
            <h3>حماية متقدمة</h3>
            <p>تشفير البيانات الحساسة</p>
          </div>
          <div className="feature">
            <span className="feature-icon">⚡</span>
            <h3>أداء سريع</h3>
            <p>معالجة فورية للمحتوى</p>
          </div>
        </div>
        
        <div className="actions">
          <button className="btn primary" onClick={() => window.location.hash = '#/clipboard'}>
            عرض الحافظة
          </button>
          <button className="btn secondary" onClick={() => window.location.hash = '#/about'}>
            عن Knoux
          </button>
        </div>
        
        <div className="contact">
          <p>📞 للدعم: 0503281920</p>
          <p>📧 البريد: knouxguard@gmail.com</p>
        </div>
      </header>
    </div>
  );
}

export default App;
