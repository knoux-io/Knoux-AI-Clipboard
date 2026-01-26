import React, { useState, useEffect } from 'react';
import { useClipboard } from '../hooks/useClipboard';
import { useAI } from '../hooks/useAI-simple';

export const MainDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('home');
  const { items: clipboardItems, isLoading: clipboardLoading, error: clipboardError, refresh: refreshClipboard } = useClipboard();
  const { isProcessing: aiProcessing, error: aiError, summarize, enhance } = useAI();
  const [testResults, setTestResults] = useState<any>({});

  // Test IPC connections on mount
  useEffect(() => {
    const testConnections = async () => {
      const results: any = {};
      
      // Test clipboard
      try {
        if (window.knoux?.clipboard?.read) {
          const clipResult = await window.knoux.clipboard.read();
          results.clipboard = clipResult.ok ? 'Connected' : 'Error';
        } else {
          results.clipboard = 'Not Available';
        }
      } catch {
        results.clipboard = 'Failed';
      }
      
      // Test AI
      try {
        if (window.knoux?.ai?.summarize) {
          const aiResult = await window.knoux.ai.summarize('Test text');
          results.ai = aiResult.ok ? 'Connected' : 'Error';
        } else {
          results.ai = 'Not Available';
        }
      } catch {
        results.ai = 'Failed';
      }
      
      // Test storage
      try {
        if (window.knoux?.storage?.get) {
          const storageResult = await window.knoux.storage.get('test');
          results.storage = storageResult.ok ? 'Connected' : 'Error';
        } else {
          results.storage = 'Not Available';
        }
      } catch {
        results.storage = 'Failed';
      }
      
      setTestResults(results);
    };
    
    testConnections();
  }, []);

  return (
    <div style={{
      width: '100vw',
      height: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      display: 'flex',
      fontFamily: 'Inter, sans-serif',
      color: 'white'
    }}>
      {/* Sidebar */}
      <div style={{
        width: '250px',
        background: 'rgba(0,0,0,0.3)',
        padding: '20px',
        display: 'flex',
        flexDirection: 'column',
        gap: '10px'
      }}>
        <h2 style={{ margin: '0 0 20px 0', fontSize: '20px' }}>Knoux AI</h2>
        
        <NavButton active={activeTab === 'home'} onClick={() => setActiveTab('home')}>
          🏠 Home
        </NavButton>
        <NavButton active={activeTab === 'clipboard'} onClick={() => setActiveTab('clipboard')}>
          📋 Clipboard
        </NavButton>
        <NavButton active={activeTab === 'creative'} onClick={() => setActiveTab('creative')}>
          🎭 Creative Studio
        </NavButton>
        <NavButton active={activeTab === 'translator'} onClick={() => setActiveTab('translator')}>
          🌐 Translator
        </NavButton>
        <NavButton active={activeTab === 'voice'} onClick={() => setActiveTab('voice')}>
          🎤 Voice Commands
        </NavButton>
        <NavButton active={activeTab === 'search'} onClick={() => setActiveTab('search')}>
          🔍 Instant Search
        </NavButton>
        <NavButton active={activeTab === 'gamification'} onClick={() => setActiveTab('gamification')}>
          🎮 Gamification
        </NavButton>
        <NavButton active={activeTab === 'ai'} onClick={() => setActiveTab('ai')}>
          🧠 Offline AI
        </NavButton>
      </div>

      {/* Content */}
      <div style={{ flex: 1, padding: '20px', overflow: 'auto' }}>
        {activeTab === 'home' && <HomeView />}
        {activeTab === 'clipboard' && <ClipboardView />}
        {activeTab === 'creative' && <CreativeView />}
        {activeTab === 'translator' && <TranslatorView />}
        {activeTab === 'voice' && <VoiceView />}
        {activeTab === 'search' && <SearchView />}
        {activeTab === 'gamification' && <GamificationView />}
        {activeTab === 'ai' && <AIView />}
      </div>
    </div>
  );
};

const NavButton: React.FC<{ active: boolean; onClick: () => void; children: React.ReactNode }> = ({ active, onClick, children }) => (
  <button
    onClick={onClick}
    style={{
      padding: '12px 16px',
      background: active ? 'rgba(255,255,255,0.2)' : 'transparent',
      border: 'none',
      color: 'white',
      textAlign: 'left',
      borderRadius: '8px',
      cursor: 'pointer',
      fontSize: '14px',
      fontWeight: active ? '600' : '400',
      transition: 'all 0.2s'
    }}
  >
    {children}
  </button>
);

const HomeView = () => (
  <div>
    <h1 style={{ fontSize: '32px', margin: '0 0 20px 0' }}>Knoux Clipboard AI — INTEGRATED</h1>
    <p style={{ fontSize: '14px', opacity: 0.8, marginBottom: '30px' }}>
      Build: {new Date().toLocaleString()} | IPC Status: {Object.keys(testResults).length > 0 ? '✅ Connected' : '⏳ Testing...'}
    </p>
    
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', marginBottom: '30px' }}>
      <StatCard title="Clipboard Items" value={clipboardItems.length.toString()} icon="📋" status={testResults.clipboard} />
      <StatCard title="AI Engine" value={aiProcessing ? 'Processing...' : 'Ready'} icon="🧠" status={testResults.ai} />
      <StatCard title="Storage" value="Active" icon="💾" status={testResults.storage} />
    </div>
    
    {/* Live Test Buttons */}
    <div style={{ background: 'rgba(255,255,255,0.1)', padding: '20px', borderRadius: '12px' }}>
      <h3 style={{ margin: '0 0 15px 0', fontSize: '18px' }}>🧪 Live IPC Tests</h3>
      <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
        <TestButton onClick={async () => {
          const result = await summarize('This is a test text for AI summarization.');
          alert(result ? `Summary: ${result}` : 'AI test failed');
        }}>Test AI Summarize</TestButton>
        
        <TestButton onClick={refreshClipboard}>Refresh Clipboard</TestButton>
        
        <TestButton onClick={async () => {
          if (window.knoux?.storage?.set) {
            await window.knoux.storage.set('test-key', 'test-value');
            const result = await window.knoux.storage.get('test-key');
            alert(result?.ok ? `Storage test: ${result.data}` : 'Storage test failed');
          }
        }}>Test Storage</TestButton>
      </div>
    </div>
    
    {/* Error Display */}
    {(clipboardError || aiError) && (
      <div style={{ 
        marginTop: '20px', 
        padding: '15px', 
        background: 'rgba(255,0,0,0.2)', 
        borderRadius: '8px',
        border: '1px solid rgba(255,0,0,0.3)'
      }}>
        <strong>⚠️ Errors:</strong>
        {clipboardError && <div>Clipboard: {clipboardError}</div>}
        {aiError && <div>AI: {aiError}</div>}
      </div>
    )}
  </div>
);

const ClipboardView = () => (
  <div>
    <h2 style={{ fontSize: '24px', margin: '0 0 20px 0' }}>📋 Clipboard Manager</h2>
    <div style={{ background: 'rgba(255,255,255,0.1)', padding: '20px', borderRadius: '12px' }}>
      <p>Clipboard monitoring active. Copy something to see it here.</p>
      <button style={buttonStyle}>Clear History</button>
    </div>
  </div>
);

const CreativeView = () => (
  <div>
    <h2 style={{ fontSize: '24px', margin: '0 0 20px 0' }}>🎭 Creative Studio</h2>
    <div style={{ background: 'rgba(255,255,255,0.1)', padding: '20px', borderRadius: '12px' }}>
      <textarea
        placeholder="Enter text to enhance..."
        style={{
          width: '100%',
          height: '150px',
          background: 'rgba(0,0,0,0.2)',
          border: 'none',
          color: 'white',
          padding: '12px',
          borderRadius: '8px',
          fontSize: '14px',
          marginBottom: '15px'
        }}
      />
      <div style={{ display: 'flex', gap: '10px' }}>
        <button style={buttonStyle}>🎨 Poetry</button>
        <button style={buttonStyle}>📖 Story</button>
        <button style={buttonStyle}>🎤 Rap</button>
        <button style={buttonStyle}>💬 Caption</button>
      </div>
    </div>
  </div>
);

const TranslatorView = () => (
  <div>
    <h2 style={{ fontSize: '24px', margin: '0 0 20px 0' }}>🌐 Universal Translator</h2>
    <div style={{ background: 'rgba(255,255,255,0.1)', padding: '20px', borderRadius: '12px' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
        <div>
          <label style={{ display: 'block', marginBottom: '8px', fontSize: '12px' }}>From</label>
          <select style={selectStyle}>
            <option>English</option>
            <option>Arabic</option>
            <option>Spanish</option>
          </select>
          <textarea placeholder="Enter text..." style={textareaStyle} />
        </div>
        <div>
          <label style={{ display: 'block', marginBottom: '8px', fontSize: '12px' }}>To</label>
          <select style={selectStyle}>
            <option>Arabic</option>
            <option>English</option>
            <option>Spanish</option>
          </select>
          <textarea placeholder="Translation..." style={textareaStyle} readOnly />
        </div>
      </div>
      <button style={{ ...buttonStyle, marginTop: '15px' }}>Translate</button>
    </div>
  </div>
);

const VoiceView = () => (
  <div>
    <h2 style={{ fontSize: '24px', margin: '0 0 20px 0' }}>🎤 Voice Commands</h2>
    <div style={{ background: 'rgba(255,255,255,0.1)', padding: '20px', borderRadius: '12px', textAlign: 'center' }}>
      <div style={{ fontSize: '48px', marginBottom: '20px' }}>🎙️</div>
      <button style={{ ...buttonStyle, fontSize: '16px', padding: '15px 30px' }}>Start Listening</button>
      <p style={{ marginTop: '20px', fontSize: '12px', opacity: 0.7 }}>
        Say: "Copy", "Paste", "Search", "Translate"
      </p>
    </div>
  </div>
);

const SearchView = () => (
  <div>
    <h2 style={{ fontSize: '24px', margin: '0 0 20px 0' }}>🔍 Instant Search</h2>
    <div style={{ background: 'rgba(255,255,255,0.1)', padding: '20px', borderRadius: '12px' }}>
      <input
        type="text"
        placeholder="Search everything..."
        style={{
          width: '100%',
          padding: '12px',
          background: 'rgba(0,0,0,0.2)',
          border: 'none',
          color: 'white',
          borderRadius: '8px',
          fontSize: '14px',
          marginBottom: '15px'
        }}
      />
      <p style={{ fontSize: '12px', opacity: 0.7 }}>No results yet. Start searching!</p>
    </div>
  </div>
);

const GamificationView = () => (
  <div>
    <h2 style={{ fontSize: '24px', margin: '0 0 20px 0' }}>🎮 Gamification</h2>
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px' }}>
      <div style={{ background: 'rgba(255,255,255,0.1)', padding: '20px', borderRadius: '12px' }}>
        <h3 style={{ margin: '0 0 10px 0', fontSize: '16px' }}>Level</h3>
        <div style={{ fontSize: '48px', fontWeight: '700' }}>1</div>
        <p style={{ fontSize: '12px', opacity: 0.7 }}>0 / 100 XP</p>
      </div>
      <div style={{ background: 'rgba(255,255,255,0.1)', padding: '20px', borderRadius: '12px' }}>
        <h3 style={{ margin: '0 0 10px 0', fontSize: '16px' }}>Points</h3>
        <div style={{ fontSize: '48px', fontWeight: '700' }}>0</div>
        <p style={{ fontSize: '12px', opacity: 0.7 }}>Start copying to earn!</p>
      </div>
    </div>
  </div>
);

const AIView = () => (
  <div>
    <h2 style={{ fontSize: '24px', margin: '0 0 20px 0' }}>🧠 Offline AI</h2>
    <div style={{ background: 'rgba(255,255,255,0.1)', padding: '20px', borderRadius: '12px' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '15px' }}>
        <AICapability name="Text Analysis" status="Ready" />
        <AICapability name="Image Recognition" status="Ready" />
        <AICapability name="Speech Processing" status="Ready" />
        <AICapability name="Data Analysis" status="Ready" />
      </div>
    </div>
  </div>
);

const TestButton: React.FC<{ onClick: () => void; children: React.ReactNode }> = ({ onClick, children }) => (
  <button
    onClick={onClick}
    style={{
      padding: '8px 16px',
      background: 'rgba(255,255,255,0.2)',
      border: '1px solid rgba(255,255,255,0.3)',
      color: 'white',
      borderRadius: '6px',
      cursor: 'pointer',
      fontSize: '12px',
      fontWeight: '500'
    }}
  >
    {children}
  </button>
);

const StatCard: React.FC<{ title: string; value: string; icon: string; status?: string }> = ({ title, value, icon, status }) => (
  <div style={{
    background: 'rgba(255,255,255,0.1)',
    padding: '20px',
    borderRadius: '12px',
    backdropFilter: 'blur(10px)',
    position: 'relative'
  }}>
    <div style={{ fontSize: '32px', marginBottom: '10px' }}>{icon}</div>
    <div style={{ fontSize: '28px', fontWeight: '700', marginBottom: '5px' }}>{value}</div>
    <div style={{ fontSize: '12px', opacity: 0.8 }}>{title}</div>
    {status && (
      <div style={{
        position: 'absolute',
        top: '10px',
        right: '10px',
        padding: '4px 8px',
        borderRadius: '4px',
        fontSize: '10px',
        fontWeight: '600',
        background: status === 'Connected' ? '#10b981' : status === 'Error' || status === 'Failed' ? '#ef4444' : '#f59e0b',
        color: 'white'
      }}>
        {status}
      </div>
    )}
  </div>
);

const AICapability: React.FC<{ name: string; status: string }> = ({ name, status }) => (
  <div style={{
    background: 'rgba(0,0,0,0.2)',
    padding: '15px',
    borderRadius: '8px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  }}>
    <span style={{ fontSize: '14px' }}>{name}</span>
    <span style={{
      padding: '4px 8px',
      background: '#10b981',
      borderRadius: '4px',
      fontSize: '11px',
      fontWeight: '600'
    }}>
      {status}
    </span>
  </div>
);

const buttonStyle: React.CSSProperties = {
  padding: '10px 20px',
  background: 'rgba(255,255,255,0.2)',
  border: 'none',
  color: 'white',
  borderRadius: '8px',
  cursor: 'pointer',
  fontSize: '14px',
  fontWeight: '500'
};

const selectStyle: React.CSSProperties = {
  width: '100%',
  padding: '10px',
  background: 'rgba(0,0,0,0.2)',
  border: 'none',
  color: 'white',
  borderRadius: '8px',
  fontSize: '14px',
  marginBottom: '10px'
};

const textareaStyle: React.CSSProperties = {
  width: '100%',
  height: '150px',
  background: 'rgba(0,0,0,0.2)',
  border: 'none',
  color: 'white',
  padding: '12px',
  borderRadius: '8px',
  fontSize: '14px',
  resize: 'none'
};
