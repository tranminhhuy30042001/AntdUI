'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import type { ThemeConfig } from 'antd';

type ThemeContextType = {
  appliedTheme: ThemeConfig;
  previewTheme: ThemeConfig;
  setPreviewTheme: (theme: ThemeConfig) => void;
  applyTheme: () => void;
  resetTheme: (theme: ThemeConfig) => void;
};

const ThemeContext = createContext<ThemeContextType | null>(null);

export function ThemeProviderCustom({
  children,
  initialTheme,
}: {
  children: React.ReactNode;
  initialTheme: ThemeConfig;
}) {
  const [appliedTheme, setAppliedTheme] = useState(initialTheme);
  const [previewTheme, setPreviewTheme] = useState(initialTheme);

  /** Apply preview -> app */
  const applyTheme = () => {
    setAppliedTheme(previewTheme);
  };

  /** Reset cả preview + applied */
  const resetTheme = (theme: ThemeConfig) => {
    setAppliedTheme(theme);
    setPreviewTheme(theme);
  };

  return (
    <ThemeContext.Provider
      value={{
        appliedTheme,
        previewTheme,
        setPreviewTheme,
        applyTheme,
        resetTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error('useTheme must be used within ThemeProviderCustom');
  }
  return ctx;
};
