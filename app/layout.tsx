// app/layout.tsx
import { getServerTheme } from './theme/getServerTheme';
import { ThemeProviderCustom } from './theme/ThemeContext';
import AntdProvider from './theme/AntdProvider';
import { AntdRegistry } from '@ant-design/nextjs-registry';

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  // Lấy cấu hình từ Cookie ngay tại Server
  const theme = await getServerTheme();

  return (
    <html lang="vi">
      <body>
        <AntdRegistry> 
          <ThemeProviderCustom initialTheme={theme}>
            <AntdProvider>
              {children}
            </AntdProvider>
          </ThemeProviderCustom>
        </AntdRegistry>
      </body>
    </html>
  );
}