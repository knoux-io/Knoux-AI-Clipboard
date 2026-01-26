/**
 * VIP View - Knoux Clipboard AI
 * Premium membership page with glassmorphic design
 */

import React, { useState, useEffect } from 'react';
import { useLanguage } from '../hooks/useLanguage';
import { useTheme } from '../hooks/useTheme';
import { Crown, Star, Zap, Shield, Cloud, Gift, Check, X } from 'lucide-react';
import './VIP.css';

interface VIPStatus {
  isVIP: boolean;
  activationDate?: number;
  expiryDate?: number;
  features: string[];
}

const VIP: React.FC = () => {
  const { t, language, isRTL } = useLanguage();
  const { theme } = useTheme();
  const [vipStatus, setVIPStatus] = useState<VIPStatus>({
    isVIP: false,
    features: []
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadVIPStatus();
  }, []);

  const loadVIPStatus = async () => {
    try {
      const response = await window.electron.ipcRenderer.invoke('vip:get-status');
      if (response.success) {
        setVIPStatus(response.data);
      }
    } catch (err) {
      console.error('Failed to load VIP status:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const vipFeatures = [
    {
      icon: <Zap className="w-6 h-6" />,
      title: 'Unlimited Clipboard History',
      description: 'Never lose any clipboard item with unlimited storage',
      included: true
    },
    {
      icon: <Cloud className="w-6 h-6" />,
      title: 'Cloud Sync',
      description: 'Sync your clipboard across all your devices',
      included: true
    },
    {
      icon: <Star className="w-6 h-6" />,
      title: 'Advanced AI Models',
      description: 'Access to GPT-4, Claude, and other premium AI models',
      included: true
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: 'Enhanced Security',
      description: 'End-to-end encryption and secure cloud storage',
      included: true
    },
    {
      icon: <Gift className="w-6 h-6" />,
      title: 'Premium Themes',
      description: 'Exclusive glassmorphic themes and customizations',
      included: true
    },
    {
      icon: <Crown className="w-6 h-6" />,
      title: 'Priority Support',
      description: '24/7 dedicated support with faster response times',
      included: true
    }
  ];

  const freeFeatures = [
    {
      icon: <Star className="w-6 h-6" />,
      title: 'Basic Clipboard History',
      description: 'Last 100 items saved locally',
      included: true
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: 'Basic AI Assistant',
      description: 'Local AI processing with essential features',
      included: true
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: 'Standard Security',
      description: 'Local encryption and basic privacy features',
      included: true
    }
  ];

  const handleUpgrade = () => {
    // In a real app, this would open payment gateway
    console.log('Upgrade to VIP clicked');
    alert('Payment integration coming soon! This would open the payment gateway.');
  };

  if (isLoading) {
    return (
      <div className={`vip-view ${isRTL ? 'rtl' : 'ltr'}`}>
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading VIP status...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`vip-view ${isRTL ? 'rtl' : 'ltr'}`}>
      <div className="vip-container">
        
        {/* Header */}
        <div className="vip-header">
          <div className="vip-title">
            <Crown className="w-12 h-12" />
            <h1>{t('vip.title')}</h1>
          </div>
          <p className="vip-subtitle">
            Unlock the full potential of Knoux Clipboard AI
          </p>
        </div>

        {/* Current Status */}
        <div className="status-card glass-card">
          <h2>{t('vip.currentStatus')}</h2>
          <div className={`status-badge ${vipStatus.isVIP ? 'premium' : 'free'}`}>
            {vipStatus.isVIP ? (
              <>
                <Crown className="w-5 h-5" />
                <span>VIP MEMBER</span>
              </>
            ) : (
              <>
                <Star className="w-5 h-5" />
                <span>{t('vip.free')}</span>
              </>
            )}
          </div>
          
          {vipStatus.isVIP && vipStatus.expiryDate && (
            <div className="expiry-info">
              <p>Valid until: {new Date(vipStatus.expiryDate).toLocaleDateString()}</p>
            </div>
          )}
        </div>

        {/* Features Comparison */}
        <div className="features-section">
          <h2>Compare Plans</h2>
          
          <div className="features-comparison">
            {/* VIP Features */}
            <div className="plan-card premium-plan">
              <div className="plan-header">
                <Crown className="w-8 h-8" />
                <h3>VIP Premium</h3>
                <div className="price">
                  <span className="currency">$</span>
                  <span className="amount">9.99</span>
                  <span className="period">/month</span>
                </div>
              </div>
              
              <div className="features-list">
                {vipFeatures.map((feature, index) => (
                  <div key={index} className="feature-item included">
                    <Check className="w-4 h-4" />
                    <div className="feature-content">
                      <h4>{feature.title}</h4>
                      <p>{feature.description}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <button 
                className={`upgrade-button ${vipStatus.isVIP ? 'current' : ''}`}
                onClick={handleUpgrade}
                disabled={vipStatus.isVIP}
              >
                {vipStatus.isVIP ? 'Current Plan' : 'Upgrade Now'}
              </button>
            </div>

            {/* Free Features */}
            <div className="plan-card free-plan">
              <div className="plan-header">
                <Star className="w-8 h-8" />
                <h3>Free Plan</h3>
                <div className="price">
                  <span className="currency">$</span>
                  <span className="amount">0</span>
                  <span className="period">/forever</span>
                </div>
              </div>
              
              <div className="features-list">
                {freeFeatures.map((feature, index) => (
                  <div key={index} className="feature-item included">
                    <Check className="w-4 h-4" />
                    <div className="feature-content">
                      <h4>{feature.title}</h4>
                      <p>{feature.description}</p>
                    </div>
                  </div>
                ))}
                
                {vipFeatures.slice(0, 3).map((feature, index) => (
                  <div key={`locked-${index}`} className="feature-item locked">
                    <X className="w-4 h-4" />
                    <div className="feature-content">
                      <h4>{feature.title}</h4>
                      <p>{feature.description}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <button className="upgrade-button current" disabled>
                Current Plan
              </button>
            </div>
          </div>
        </div>

        {/* Benefits */}
        <div className="benefits-section">
          <h2>Why Choose VIP?</h2>
          <div className="benefits-grid">
            <div className="benefit-card glass-card">
              <Zap className="w-8 h-8" />
              <h3>Lightning Fast</h3>
              <p>Priority processing and faster AI responses</p>
            </div>
            
            <div className="benefit-card glass-card">
              <Cloud className="w-8 h-8" />
              <h3>Cloud Backup</h3>
              <p>Never lose your data with automatic cloud sync</p>
            </div>
            
            <div className="benefit-card glass-card">
              <Shield className="w-8 h-8" />
              <h3>Enhanced Privacy</h3>
              <p>Advanced encryption and privacy controls</p>
            </div>
            
            <div className="benefit-card glass-card">
              <Gift className="w-8 h-8" />
              <h3>Exclusive Features</h3>
              <p>Access to beta features and premium content</p>
            </div>
          </div>
        </div>

        {/* Developer Note */}
        <div className="developer-note glass-card">
          <div className="note-content">
            <h3>💡 Developer Note</h3>
            <p>
              VIP activation system will be connected to payment gateway in future releases. 
              All premium features are fully functional and ready for activation.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default VIP;
