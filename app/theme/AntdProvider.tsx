'use client';

import { ConfigProvider } from 'antd';
import { useTheme } from './ThemeContext';

export default function AntdProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { theme } = useTheme();

  return <ConfigProvider theme={theme}>{children}</ConfigProvider>;
}
