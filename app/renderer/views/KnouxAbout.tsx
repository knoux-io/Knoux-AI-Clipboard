/**
 * KnouxAbout - قسم "عن Knoux | الدعم والمساعدة"
 * تصميم عصري فخم بلون أسود/بنفسجي/رمادي مع دعم الوضع الليلي
 */

import React from 'react';
import './KnouxAbout.css';

const KnouxAbout: React.FC = () => {
  // دالة لفتح الروابط الخارجية
  const openExternalLink = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  // دالة لفتح تطبيقات الهاتف
  const openPhoneLink = (type: 'tel' | 'whatsapp' | 'email', value: string) => {
    switch (type) {
      case 'tel':
        window.location.href = `tel:${value}`;
        break;
      case 'whatsapp':
        openExternalLink(`https://wa.me/${value}`);
        break;
      case 'email':
        window.location.href = `mailto:${value}`;
        break;
    }
  };

  return (
    <div className="knoux-about-container">
      {/* Header Section */}
      <header className="knoux-header">
        <h1 className="main-title">Knoux</h1>
        <div className="subtitle">التقنية • الأمان • الإبداع</div>
        <p className="header-description">
          Knoux مؤسسة تقنية متخصصة في تطوير التطبيقات الذكية والحلول الرقمية المتقدمة، 
          تجمع بين الأداء العالي، الخصوصية، والتصميم العصري لتقديم تجربة استخدام استثنائية.
        </p>
      </header>

      {/* About Section */}
      <section className="about-section">
        <h2 className="section-title">
          <span className="title-icon">●</span>
          من نحن
        </h2>
        <p className="section-content">
          Knoux تعمل على بناء تطبيقات حديثة تعتمد على الابتكار، الذكاء الاصطناعي، والأمن الرقمي، 
          مع التركيز على جودة المنتج وتجربة المستخدم، واضعة الخصوصية والأمان في أعلى الأولويات.
        </p>
      </section>

      {/* Developer Section */}
      <section className="developer-section">
        <h2 className="section-title">
          <span className="title-icon">●</span>
          المطور
        </h2>
        <p className="section-content">
          تم تطوير هذا التطبيق بالكامل بفضل الله على يد:
        </p>
        <div className="developer-card">
          <div className="developer-name">
            Eng / Sadek Elgazar 👑
          </div>
          <p className="developer-role">
            المطور الأوحد والمؤسس لتطبيقات وأعمال Knoux
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="contact-section">
        <h2 className="section-title">
          <span className="title-icon">●</span>
          التواصل والروابط
        </h2>
        <div className="contact-grid">
          {/* Phone */}
          <button 
            className="contact-card"
            onClick={() => openPhoneLink('tel', '0503281920')}
          >
            <div className="contact-icon">📞</div>
            <div className="contact-text">اتصال مباشر</div>
          </button>

          {/* WhatsApp */}
          <button 
            className="contact-card"
            onClick={() => openPhoneLink('whatsapp', '971503281920')}
          >
            <div className="contact-icon">💬</div>
            <div className="contact-text">WhatsApp</div>
          </button>

          {/* Email */}
          <button 
            className="contact-card"
            onClick={() => openPhoneLink('email', 'knouxguard@gmail.com')}
          >
            <div className="contact-icon">📧</div>
            <div className="contact-text">Email</div>
          </button>

          {/* Facebook */}
          <button 
            className="contact-card"
            onClick={() => openExternalLink('https://www.facebook.com/share/1bXebP7S7D/')}
          >
            <div className="contact-icon">🌐</div>
            <div className="contact-text">Facebook</div>
          </button>

          {/* Pinterest */}
          <button 
            className="contact-card"
            onClick={() => openExternalLink('https://www.pinterest.com/knoux7')}
          >
            <div className="contact-icon">📌</div>
            <div className="contact-text">Pinterest</div>
          </button>

          {/* TikTok */}
          <button 
            className="contact-card"
            onClick={() => openExternalLink('https://www.tiktok.com/@knoux_7')}
          >
            <div className="contact-icon">🎵</div>
            <div className="contact-text">TikTok</div>
          </button>

          {/* Snapchat */}
          <button 
            className="contact-card"
            onClick={() => openExternalLink('https://www.snapchat.com/add/knooux7')}
          >
            <div className="contact-icon">👻</div>
            <div className="contact-text">Snapchat</div>
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="knoux-footer">
        <div className="footer-content">
          Knoux — نبني التقنية بثقة، ونصنع التجربة باحتراف.
        </div>
      </footer>
    </div>
  );
};

export default KnouxAbout;
