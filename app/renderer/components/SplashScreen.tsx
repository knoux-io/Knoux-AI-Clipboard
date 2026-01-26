import React, { useEffect, useState } from 'react';
import { ClipboardCopy } from 'lucide-react';

interface SplashScreenProps {
  onComplete: () => void;
}

const SplashScreen: React.FC<SplashScreenProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => onComplete(), 500);
          return 100;
        }
        return prev + Math.random() * 40;
      });
    }, 300);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center z-50">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-10 left-10 w-40 h-40 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-blue-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      {/* Main content */}
      <div className="relative z-10 text-center">
        {/* Logo */}
        <div className="mb-8 flex justify-center">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg blur-xl opacity-75 animate-pulse"></div>
            <div className="relative bg-gradient-to-br from-purple-600 to-blue-600 p-6 rounded-lg shadow-2xl">
              <ClipboardCopy className="w-16 h-16 text-white" />
            </div>
          </div>
        </div>

        {/* Title */}
        <h1 className="text-5xl font-bold mb-2">
          <span className="bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent">
            Knoux
          </span>
        </h1>
        <p className="text-2xl font-bold text-white mb-2">Clipboard AI</p>
        <p className="text-gray-400 text-sm mb-12">Intelligent Clipboard Management</p>

        {/* Loading bar */}
        <div className="w-64 h-1 bg-gray-700 rounded-full overflow-hidden mb-4">
          <div
            className="h-full bg-gradient-to-r from-purple-500 to-blue-500 transition-all duration-300"
            style={{ width: `${progress}%` }}
          ></div>
        </div>

        {/* Status text */}
        <div className="text-gray-400 text-xs h-4">
          {progress < 20 && 'Initializing...'}
          {progress >= 20 && progress < 50 && 'Loading services...'}
          {progress >= 50 && progress < 80 && 'Preparing interface...'}
          {progress >= 80 && progress < 100 && 'Almost ready...'}
          {progress >= 100 && 'Ready!'}
        </div>
      </div>

      {/* Footer */}
      <div className="absolute bottom-8 text-center text-gray-500 text-xs">
        <p>© 2026 Knoux. All rights reserved.</p>
      </div>
    </div>
  );
};

export default SplashScreen;
