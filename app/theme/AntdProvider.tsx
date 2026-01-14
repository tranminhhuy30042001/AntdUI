'use client';

import { ConfigProvider } from 'antd';
import { useTheme } from './ThemeContext';

export default function AntdProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { appliedTheme } = useTheme();

  return (
    <ConfigProvider theme={appliedTheme}>
      {children}
    </ConfigProvider>
  );
}
