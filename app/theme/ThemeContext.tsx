// theme/ThemeContext.tsx
'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import type { ThemeConfig } from 'antd';

const ThemeContext = createContext<{
  theme: ThemeConfig;
  setTheme: (theme: ThemeConfig) => void;
} | null>(null);

export function ThemeProviderCustom({ 
  children, 
  initialTheme 
}: { 
  children: React.ReactNode; 
  initialTheme: ThemeConfig; 
}) {
  const [theme, setTheme] = useState<ThemeConfig>(initialTheme);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) {
      // 1. Lưu LocalStorage cho Client-side logic khác
      localStorage.setItem('app-theme', JSON.stringify(theme));
      
      // 2. Lưu Cookie (Base64) để Server-side đọc được (getServerTheme.ts)
      const themeString = JSON.stringify(theme);
      const base64Theme = btoa(unescape(encodeURIComponent(themeString)));
      document.cookie = `app-theme=${base64Theme}; path=/; max-age=31536000; SameSite=Lax`;
    }
  }, [theme, mounted]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {/* Bao bọc một div để đảm bảo màu nền/chữ đồng bộ cho cả ứng dụng */}
      <div style={{ 
        backgroundColor: theme.token?.colorBgBase, 
        color: theme.token?.colorTextBase,
        minHeight: '100vh',
        transition: 'all 0.2s' 
      }}>
        {children}
      </div>
    </ThemeContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme must be used within ThemeProviderCustom');
  return context;
};