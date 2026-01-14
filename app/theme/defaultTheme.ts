import { theme as antdTheme } from 'antd';
import type { ThemeConfig } from 'antd';

export const defaultTheme: ThemeConfig = {
  algorithm: antdTheme.defaultAlgorithm,

  token: {
    /** PRIMARY */
    colorPrimary: '#1677ff',

    /** BACKGROUND */
    colorBgLayout: '#f5f5f5',
    colorBgBase: '#ffffff',
    colorBgContainer: '#ffffff',
    colorBgElevated: '#ffffff',

    /** TEXT */
    colorTextBase: '#000000',
    colorTextSecondary: '#595959',
    colorTextHeading: '#000000',
    colorLink: '#1677ff',

    /** BORDER */
    colorBorder: '#d9d9d9',
    lineWidth: 1,

    /** STATUS */
    colorSuccess: '#52c41a',
    colorError: '#ff4d4f',

    /** SIZE */
    fontSize: 14,
    borderRadius: 6,
  },

  /** COMPONENT OVERRIDE */
  components: {
    Button: {
      controlHeight: 36,
      borderRadius: 6,
    },
    Card: {
      paddingLG: 16,
    },
    Table: {
      headerBg: '#fafafa',
      rowHoverBg: '#f5f5f5',
    },
    Input: {
      controlHeight: 36,
    },
  },
};
