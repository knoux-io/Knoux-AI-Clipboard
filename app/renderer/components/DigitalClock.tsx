/**
 * Digital Clock Component - ساعة رقمية دائرية جميلة
 */

import React, { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';

interface DigitalClockProps {
  className?: string;
}

const DigitalClock: React.FC<DigitalClockProps> = ({ className = '' }) => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const hours = time.getHours().toString().padStart(2, '0');
  const minutes = time.getMinutes().toString().padStart(2, '0');
  const seconds = time.getSeconds().toString().padStart(2, '0');

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <div className="relative w-16 h-16 rounded-full bg-gradient-to-br from-purple-500/20 to-blue-500/20 border-2 border-purple-500/30 flex items-center justify-center backdrop-blur-sm">
        <Clock className="w-6 h-6 text-purple-400" />
      </div>
      <div className="flex flex-col">
        <div className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent font-mono">
          {hours}:{minutes}:{seconds}
        </div>
        <div className="text-xs text-gray-400">
          {time.toLocaleDateString('ar-SA', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
        </div>
      </div>
    </div>
  );
};

export default DigitalClock;
