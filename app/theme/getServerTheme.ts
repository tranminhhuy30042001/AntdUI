import { cookies } from 'next/headers';
import type { ThemeConfig } from 'antd';
import { defaultTheme } from './defaultTheme';

export async function getServerTheme(): Promise<ThemeConfig> {
  const cookieStore = await cookies();
  const themeCookie = cookieStore.get('app-theme');

  if (!themeCookie) return defaultTheme;

  try {
    return JSON.parse(
      Buffer.from(themeCookie.value, 'base64').toString('utf-8')
    );
  } catch {
    return defaultTheme;
  }
}
