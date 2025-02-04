'use client';

import React, { useState, useEffect } from 'react';
import { Menu } from 'lucide-react';

interface AdaptiveNavProps {
  children: React.ReactNode;
  className?: string;
}

const AdaptiveNav: React.FC<AdaptiveNavProps> = ({ children, className = '' }) => {
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(true);

  useEffect(() => {
    const checkDevice = () => {
      const mobile = window.matchMedia('(max-width: 640px)').matches;
      const tablet = window.matchMedia('(min-width: 641px) and (max-width: 1024px)').matches;
      setIsMobile(mobile);
      setIsTablet(tablet);
    };

    checkDevice();
    window.addEventListener('resize', checkDevice);
    return () => window.removeEventListener('resize', checkDevice);
  }, []);

  // iOS-style bottom dock for mobile
  if (isMobile) {
    return (
      <nav className="fixed bottom-0 left-0 right-0 bg-[#2A2A2A]/95 backdrop-blur-lg border-t border-white/10 px-2 py-1 z-50">
        <div className="flex justify-around items-center max-w-sm mx-auto">
          {children}
        </div>
      </nav>
    );
  }

// iPadOS-style sidebar
if (isTablet) {
  return (
    <>
      <button
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className="fixed left-0 top-0 w-20 h-16 z-50 hover:bg-[#1E90FF]/10 focus:outline-none focus:ring-2 focus:ring-[#1E90FF] transition-colors flex items-center justify-center"
        aria-label="Toggle navigation menu"
      >
        <Menu className="h-6 w-6 text-gray-400" />
      </button>

      {/* Overlay for closing menu when clicking outside */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black/20 z-40 sm:hidden"
          onClick={() => setIsMenuOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Sidebar */}
      <nav 
        className={`fixed left-0 top-0 bottom-0 w-[280px] sm:w-20 bg-[#2A2A2A]/95 backdrop-blur-lg border-r border-white/10 p-4 flex flex-col items-center transition-transform duration-300 ease-in-out z-40
          ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        <div className="flex flex-col items-center space-y-2 mt-16"> {/* Added mt-16 here */}
          {children}
        </div>
      </nav>
    </>
  );
}

  // macOS-style sidebar for desktop
  return (
    <nav className={`fixed left-0 top-0 bottom-0 w-20 bg-[#2A2A2A] border-r border-[#363636] p-4 flex flex-col items-center ${className}`}>
      {children}
    </nav>
  );
};

// Updated DockItem component
interface DockItemProps {
  icon: React.ReactNode;
  label: string;
  active: boolean;
  onClick: () => void;
}

const DockItem: React.FC<DockItemProps> = ({ icon, label, active, onClick }) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkDevice = () => {
      setIsMobile(window.matchMedia('(max-width: 640px)').matches);
    };

    checkDevice();
    window.addEventListener('resize', checkDevice);
    return () => window.removeEventListener('resize', checkDevice);
  }, []);

  return (
    <button 
      onClick={onClick}
      className={`group flex flex-col items-center justify-center
        ${isMobile 
          ? 'w-16 h-14 py-1' // Tighter spacing for mobile
          : 'w-12 sm:w-14 h-12 sm:h-14 mb-4'
        }
        rounded-xl transition-all duration-200 relative touch-manipulation
        ${active 
          ? 'bg-[#1E90FF]/20' 
          : 'hover:bg-[#1E90FF]/10'
        }
        focus:outline-none focus:ring-2 focus:ring-[#1E90FF]`
      }
      aria-label={`Navigate to ${label} section`}
      aria-current={active ? 'page' : undefined}
    >
      <div 
        className={`
          ${active ? 'text-[#1E90FF]' : 'text-gray-400 group-hover:text-[#1E90FF]'}
          transition-colors
          ${isMobile ? 'scale-90' : ''} // Slightly smaller icons on mobile
        `}
        aria-hidden="true"
      >
        {icon}
      </div>
      {isMobile && (
        <span className="text-[10px] mt-0.5 text-gray-400">
          {label}
        </span>
      )}
      {!isMobile && (
        <span 
          className="hidden sm:block absolute left-16 px-2 py-1 bg-[#2A2A2A] text-sm rounded-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap"
          role="tooltip"
        >
          {label}
        </span>
      )}
    </button>
  );
};

export { AdaptiveNav, DockItem };
export type { AdaptiveNavProps, DockItemProps };