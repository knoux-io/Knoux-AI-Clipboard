import React, { useState, useEffect } from 'react';
import { uiMorpher, UIMorphProfile, MorphResult } from '../../../backend/ai/ui-morpher';

interface UIMorpherUIProps {
  onThemeChanged?: (result: MorphResult) => void;
}

export const UIMorpherUI: React.FC<UIMorpherUIProps> = ({ onThemeChanged }) => {
  const [currentProfile, setCurrentProfile] = useState<UIMorphProfile | null>(null);
  const [availableProfiles, setAvailableProfiles] = useState<UIMorphProfile[]>([]);
  const [morphing, setMorphing] = useState(false);
  const [lastResult, setLastResult] = useState<MorphResult | null>(null);
  const [selectedContentType, setSelectedContentType] = useState('code');
  const [selectedMood, setSelectedMood] = useState('productive');
  const [selectedRole, setSelectedRole] = useState('developer');

  useEffect(() => {
    loadProfiles();
    setCurrentProfile(uiMorpher.getCurrentProfile());
  }, []);

  const loadProfiles = () => {
    const profiles = uiMorpher.getAvailableProfiles();
    setAvailableProfiles(profiles);
  };

  const handleMorph = async (type: 'content' | 'mood' | 'role' | 'auto') => {
    setMorphing(true);
    try {
      let result: MorphResult;
      
      switch (type) {
        case 'content':
          result = await uiMorpher.morphByContent(selectedContentType);
          break;
        case 'mood':
          result = await uiMorpher.morphByMood(selectedMood);
          break;
        case 'role':
          if (selectedRole === 'developer') {
            result = await uiMorpher.morphForDeveloper();
          } else if (selectedRole === 'writer') {
            result = await uiMorpher.morphForWriter();
          } else {
            result = await uiMorpher.autoMorph({ role: selectedRole });
          }
          break;
        case 'auto':
          result = await uiMorpher.autoMorph({
            contentType: selectedContentType,
            mood: selectedMood,
            role: selectedRole
          });
          break;
        default:
          result = await uiMorpher.autoMorph({});
      }
      
      setLastResult(result);
      setCurrentProfile(uiMorpher.getCurrentProfile());
      onThemeChanged?.(result);
    } catch (error) {
      console.error('Error morphing UI:', error);
    } finally {
      setMorphing(false);
    }
  };

  const switchToProfile = async (profileId: string) => {
    setMorphing(true);
    try {
      const result = await uiMorpher.switchStyle(profileId);
      setLastResult(result);
      setCurrentProfile(uiMorpher.getCurrentProfile());
      onThemeChanged?.(result);
    } catch (error) {
      console.error('Error switching profile:', error);
    } finally {
      setMorphing(false);
    }
  };

  const generateDynamicColors = async () => {
    setMorphing(true);
    try {
      const colors = await uiMorpher.generateDynamicColors('#2196F3', selectedMood, 0.7);
      
      // Apply colors to current theme
      Object.entries(colors).forEach(([key, value]) => {
        document.documentElement.style.setProperty(key, value);
      });
      
      console.log('Dynamic colors applied:', colors);
    } catch (error) {
      console.error('Error generating colors:', error);
    } finally {
      setMorphing(false);
    }
  };

  return (
    <div className="ui-morpher-container">
      <div className="morpher-header">
        <h3>🎨 UI Morphing System</h3>
        <div className="current-profile">
          Current: <span className="profile-name">{currentProfile?.name || 'Loading...'}</span>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="quick-actions">
        <button
          onClick={() => handleMorph('auto')}
          disabled={morphing}
          className="morph-btn auto"
        >
          {morphing ? '⏳ Morphing...' : '🤖 Auto Morph'}
        </button>
        
        <button
          onClick={generateDynamicColors}
          disabled={morphing}
          className="morph-btn colors"
        >
          {morphing ? '⏳ Generating...' : '🌈 Dynamic Colors'}
        </button>
      </div>

      {/* Content Type Morphing */}
      <div className="morph-section">
        <h4>📄 Content-Based Morphing</h4>
        <div className="control-group">
          <select
            value={selectedContentType}
            onChange={(e) => setSelectedContentType(e.target.value)}
            disabled={morphing}
          >
            <option value="code">Code/Programming</option>
            <option value="text">Text/Writing</option>
            <option value="article">Article</option>
            <option value="document">Document</option>
          </select>
          <button
            onClick={() => handleMorph('content')}
            disabled={morphing}
            className="morph-btn content"
          >
            Morph for Content
          </button>
        </div>
      </div>

      {/* Mood-Based Morphing */}
      <div className="morph-section">
        <h4>😊 Mood-Based Morphing</h4>
        <div className="control-group">
          <select
            value={selectedMood}
            onChange={(e) => setSelectedMood(e.target.value)}
            disabled={morphing}
          >
            <option value="productive">Productive</option>
            <option value="calm">Calm</option>
            <option value="energetic">Energetic</option>
            <option value="focused">Focused</option>
            <option value="creative">Creative</option>
          </select>
          <button
            onClick={() => handleMorph('mood')}
            disabled={morphing}
            className="morph-btn mood"
          >
            Morph for Mood
          </button>
        </div>
      </div>

      {/* Role-Based Morphing */}
      <div className="morph-section">
        <h4>👤 Role-Based Morphing</h4>
        <div className="control-group">
          <select
            value={selectedRole}
            onChange={(e) => setSelectedRole(e.target.value)}
            disabled={morphing}
          >
            <option value="developer">Developer</option>
            <option value="writer">Writer</option>
            <option value="designer">Designer</option>
            <option value="general">General User</option>
          </select>
          <button
            onClick={() => handleMorph('role')}
            disabled={morphing}
            className="morph-btn role"
          >
            Morph for Role
          </button>
        </div>
      </div>

      {/* Profile Selector */}
      <div className="morph-section">
        <h4>📚 Available Profiles</h4>
        <div className="profiles-grid">
          {availableProfiles.map((profile) => (
            <div
              key={profile.id}
              className={`profile-card ${currentProfile?.id === profile.id ? 'active' : ''}`}
              onClick={() => switchToProfile(profile.id)}
            >
              <div className="profile-name">{profile.name}</div>
              <div className="profile-type">{profile.type}</div>
              <div className="profile-preview">
                <div
                  className="color-preview"
                  style={{ backgroundColor: profile.theme.colors.primary }}
                />
                <div
                  className="color-preview"
                  style={{ backgroundColor: profile.theme.colors.secondary }}
                />
                <div
                  className="color-preview"
                  style={{ backgroundColor: profile.theme.colors.accent }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Results */}
      {lastResult && (
        <div className="results-section">
          <h4>✅ Morphing Complete</h4>
          <div className="result-stats">
            <div className="stat">
              <span>Type:</span>
              <span>{lastResult.morphType}</span>
            </div>
            <div className="stat">
              <span>Confidence:</span>
              <span>{(lastResult.confidence * 100).toFixed(1)}%</span>
            </div>
          </div>
          
          {lastResult.changes.length > 0 && (
            <div className="changes">
              <h5>Changes Applied:</h5>
              <ul>
                {lastResult.changes.map((change, index) => (
                  <li key={index}>{change}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      <style jsx>{`
        .ui-morpher-container {
          padding: 20px;
          background: linear-gradient(135deg, #74b9ff 0%, #0984e3 100%);
          border-radius: 12px;
          color: white;
          max-width: 600px;
        }

        .morpher-header {
          text-align: center;
          margin-bottom: 20px;
        }

        .morpher-header h3 {
          margin: 0 0 10px 0;
          font-size: 1.5em;
        }

        .current-profile {
          background: rgba(255, 255, 255, 0.1);
          padding: 8px 16px;
          border-radius: 20px;
          display: inline-block;
        }

        .profile-name {
          font-weight: bold;
          color: #ffeaa7;
        }

        .quick-actions {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 10px;
          margin-bottom: 20px;
        }

        .morph-section {
          background: rgba(255, 255, 255, 0.1);
          padding: 15px;
          border-radius: 8px;
          margin-bottom: 15px;
        }

        .morph-section h4 {
          margin: 0 0 15px 0;
          font-size: 1.1em;
        }

        .control-group {
          display: grid;
          grid-template-columns: 2fr 1fr;
          gap: 10px;
          align-items: center;
        }

        .control-group select {
          padding: 10px;
          border: none;
          border-radius: 6px;
          background: rgba(255, 255, 255, 0.9);
          color: #333;
        }

        .morph-btn {
          padding: 10px 15px;
          border: none;
          border-radius: 6px;
          color: white;
          cursor: pointer;
          font-weight: 500;
          transition: all 0.3s ease;
        }

        .morph-btn.auto {
          background: #6c5ce7;
        }

        .morph-btn.colors {
          background: #fd79a8;
        }

        .morph-btn.content {
          background: #00b894;
        }

        .morph-btn.mood {
          background: #fdcb6e;
        }

        .morph-btn.role {
          background: #e17055;
        }

        .morph-btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .morph-btn:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
        }

        .profiles-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
          gap: 10px;
        }

        .profile-card {
          background: rgba(255, 255, 255, 0.1);
          padding: 12px;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.3s ease;
          border: 2px solid transparent;
        }

        .profile-card.active {
          border-color: #ffeaa7;
          background: rgba(255, 234, 167, 0.2);
        }

        .profile-card:hover {
          background: rgba(255, 255, 255, 0.2);
          transform: translateY(-2px);
        }

        .profile-card .profile-name {
          font-weight: bold;
          margin-bottom: 5px;
        }

        .profile-card .profile-type {
          font-size: 0.8em;
          opacity: 0.8;
          margin-bottom: 8px;
        }

        .profile-preview {
          display: flex;
          gap: 3px;
        }

        .color-preview {
          width: 20px;
          height: 20px;
          border-radius: 3px;
          border: 1px solid rgba(255, 255, 255, 0.3);
        }

        .results-section {
          background: rgba(255, 255, 255, 0.1);
          padding: 15px;
          border-radius: 8px;
          margin-top: 20px;
        }

        .results-section h4 {
          margin: 0 0 15px 0;
          color: #00b894;
        }

        .result-stats {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 10px;
          margin-bottom: 15px;
        }

        .stat {
          display: flex;
          justify-content: space-between;
          padding: 8px;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 4px;
        }

        .changes h5 {
          margin: 0 0 10px 0;
        }

        .changes ul {
          margin: 0;
          padding-left: 20px;
        }

        .changes li {
          margin-bottom: 5px;
        }
      `}</style>
    </div>
  );
};

export default UIMorpherUI;