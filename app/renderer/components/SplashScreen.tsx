import React, { useEffect, useState } from 'react';
import { ClipboardCopy } from 'lucide-react';

interface SplashScreenProps {
  onComplete: () => void;
}

const SplashScreen: React.FC<SplashScreenProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Simulate initial loading sequence
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => onComplete(), 500);
          return 100;
        }
        // Random progress to simulate real loading
        return prev + Math.random() * 10;
      });
    }, 150);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 bg-knoux-background flex items-center justify-center z-50 overflow-hidden">
      {/* Animated background elements - Neural Network Vibe */}
      <div className="absolute inset-0">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-knoux-primary/10 rounded-full blur-[100px] animate-pulse"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-knoux-secondary/10 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '1s' }}></div>
        
        {/* Particle Effects (Simulated with CSS) */}
        <div className="absolute inset-0 opacity-20">
            <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-knoux-primary rounded-full animate-float"></div>
            <div className="absolute top-3/4 left-1/3 w-1 h-1 bg-knoux-secondary rounded-full animate-float" style={{ animationDelay: '0.5s' }}></div>
            <div className="absolute top-1/2 right-1/4 w-2 h-2 bg-knoux-accent rounded-full animate-float" style={{ animationDelay: '1.2s' }}></div>
            <div className="absolute bottom-1/4 right-1/3 w-1.5 h-1.5 bg-knoux-primary rounded-full animate-float" style={{ animationDelay: '2s' }}></div>
        </div>
      </div>

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center">
        {/* Logo Reveal */}
        <div className="mb-8 relative group">
          <div className="absolute inset-0 bg-gradient-to-br from-knoux-primary to-knoux-secondary rounded-2xl blur-xl opacity-50 group-hover:opacity-75 transition-opacity duration-500 animate-pulse"></div>
          <div className="relative bg-gradient-to-br from-knoux-primary to-knoux-secondary p-8 rounded-2xl shadow-2xl transform transition-transform duration-500 hover:scale-105">
            <ClipboardCopy className="w-20 h-20 text-white animate-bounce-slow" />
          </div>
          
          {/* Neural connections (decorative lines) */}
          <div className="absolute -left-12 top-1/2 w-12 h-[1px] bg-gradient-to-r from-transparent to-knoux-primary/50"></div>
          <div className="absolute -right-12 top-1/2 w-12 h-[1px] bg-gradient-to-l from-transparent to-knoux-secondary/50"></div>
        </div>

        {/* Title */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-black mb-3 tracking-tight">
            <span className="bg-gradient-to-r from-knoux-primary via-knoux-secondary to-knoux-accent bg-clip-text text-transparent animate-gradient-x">
              Knoux
            </span>
          </h1>
          <p className="text-xl font-medium text-knoux-text-secondary">
            Your Clipboard... <span className="text-knoux-primary">Finally Thinks.</span>
          </p>
        </div>

        {/* AI Progress Indicator */}
        <div className="w-80 relative">
            <div className="flex justify-between text-xs text-knoux-text-muted mb-2 font-mono">
                <span>SYSTEM_INIT</span>
                <span>{Math.min(100, Math.round(progress))}%</span>
            </div>
            <div className="h-1.5 bg-knoux-background-lighter rounded-full overflow-hidden">
                <div
                    className="h-full bg-gradient-to-r from-knoux-primary via-knoux-secondary to-knoux-accent transition-all duration-300 ease-out relative"
                    style={{ width: `${progress}%` }}
                >
                    <div className="absolute inset-0 bg-white/20 animate-shimmer"></div>
                </div>
            </div>
            <div className="mt-4 text-center h-6">
                <p className="text-sm text-knoux-text-secondary animate-pulse">
                    {progress < 30 && 'Initializing Neural Core...'}
                    {progress >= 30 && progress < 60 && 'Connecting to Knowledge Base...'}
                    {progress >= 60 && progress < 90 && 'Optimizing Workflow Patterns...'}
                    {progress >= 90 && 'Ready to Serve.'}
                </p>
            </div>
        </div>
      </div>

      {/* Footer */}
      <div className="absolute bottom-8 text-center">
        <p className="text-xs text-knoux-text-muted font-mono">v1.0.0 • AI-Powered Productivity</p>
      </div>
    </div>
  );
};

export default SplashScreen;
