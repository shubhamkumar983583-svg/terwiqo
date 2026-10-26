import React from 'react';

interface BrandLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'dark' | 'light' | 'orange' | 'yellow';
  className?: string;
  showTagline?: boolean;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  size = 'md',
  variant = 'yellow',
  className = '',
  showTagline = false
}) => {
  const iconSizes = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-10 h-10',
    xl: 'w-14 h-14'
  };

  const textSizes = {
    sm: 'text-lg',
    md: 'text-2xl',
    lg: 'text-3xl',
    xl: 'text-5xl'
  };

  const textColors = {
    dark: 'text-neutral-900',
    light: 'text-white',
    orange: 'text-[#E8713C]',
    yellow: 'text-[#E6FF00]'
  };

  const iconFill = {
    dark: '#101113',
    light: '#FFFFFF',
    orange: '#E8713C',
    yellow: '#E6FF00'
  };

  if (variant === 'yellow') {
    return (
      <div className={`flex items-center gap-2.5 select-none ${className}`}>
        <div className="flex items-center font-black tracking-tighter">
          <span className="text-[#E6FF00] text-3xl font-black">&gt;</span>
        </div>
        <div className="flex flex-col">
          <span className={`font-black tracking-tight leading-none text-[#E6FF00] ${textSizes[size]}`}>
            WorkPulse AI
          </span>
          {showTagline && (
            <span className="text-[10px] tracking-wider uppercase text-neutral-400 font-mono mt-1">
              Face Recognition Attendance System
            </span>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      {/* Organic clover/leaf icon inspired by the brand reference */}
      <div className={`shrink-0 ${iconSizes[size]} relative flex items-center justify-center`}>
        <svg
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full transform transition-transform hover:scale-105 duration-200"
        >
          {/* Top-right leaf */}
          <path
            d="M50 15C50 34.33 65.67 50 85 50C85 30.67 69.33 15 50 15Z"
            fill={iconFill[variant]}
          />
          {/* Bottom-left leaf */}
          <path
            d="M50 85C50 65.67 34.33 50 15 50C15 69.33 30.67 85 50 85Z"
            fill={iconFill[variant]}
          />
          {/* Center stem bridge */}
          <path
            d="M28 28C28 40.15 37.85 50 50 50C37.85 50 28 59.85 28 72C39.6 72 49.2 62.8 49.9 51.3C50 50.9 50 50.4 50 50C50 49.6 50 49.1 49.9 48.7C49.2 37.2 39.6 28 28 28Z"
            fill={iconFill[variant]}
            opacity="0.92"
          />
        </svg>
      </div>

      <div className="flex flex-col">
        <span
          className={`font-bold tracking-tight lowercase leading-none font-sans ${textSizes[size]} ${textColors[variant]}`}
        >
          workpulse
        </span>
        {showTagline && (
          <span className="text-[10px] tracking-wider uppercase text-neutral-400 font-mono mt-1">
            Workforce AI & Payroll
          </span>
        )}
      </div>
    </div>
  );
};
