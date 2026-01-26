/**
 * Knoux Clipboard AI - Renderer Main Entry Point
 * React application bootstrap and initialization
 */

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// Import global styles
import './styles/global.css';
import './styles/animations.css';
import './styles/theme-light.css';
import './styles/theme-dark.css';
import './styles/theme-professional.css';
import './styles/theme-ai.css';
import './styles/theme-contrast.css';

// Mount React app into DOM
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

