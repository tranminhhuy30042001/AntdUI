import { theme as antdTheme } from 'antd';
import type { ThemeConfig } from 'antd';

export const defaultTheme: ThemeConfig = {
  algorithm: antdTheme.defaultAlgorithm,
  token: {
    colorPrimary: '#1677ff',
    colorBgBase: '#ffffff',
    colorBgContainer: '#ffffff',
    colorTextBase: '#000000',
    colorTextHeading: '#000000',
    colorLink: '#1677ff',
    colorBorder: '#d9d9d9',
    fontSize: 14,
    borderRadius: 6,
  },
};
