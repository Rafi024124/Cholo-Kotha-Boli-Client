import React from 'react';

const AuthImagePattern = ({ title, subtitle, children }) => {
  return (
    <div className="relative hidden lg:block h-full">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-800 to-blue-900" />

      {/* Pattern Overlay */}
      <div className="absolute inset-0 opacity-10 mix-blend-overlay">
        <svg
          className="w-full h-full"
          width="100%"
          height="100%"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern
              id="grid"
              width="40"
              height="40"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 40 0 L 0 0 0 40"
                fill="none"
                stroke="white"
                strokeWidth="0.5"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center text-white px-6">
        {/* Optional Image or Icon Slot */}
        {children}

        {/* Title */}
        {title && (
          <h2 className="text-3xl font-bold mt-4">{title}</h2>
        )}

        {/* Subtitle */}
        {subtitle && (
          <p className="text-sm text-white/80 mt-2 max-w-sm">
            {subtitle}
          </p>
        )}
      </div>
    </div>
  );
};

export default AuthImagePattern;
