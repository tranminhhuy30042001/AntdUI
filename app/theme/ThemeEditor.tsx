'use client';

import {
  Card,
  ColorPicker,
  InputNumber,
  Switch,
  Space,
  Divider,
  Button,
} from 'antd';
import { theme as antdTheme } from 'antd';
import { useTheme } from './ThemeContext';

export default function ThemeEditor() {
  const { previewTheme, setPreviewTheme, applyTheme } = useTheme();

  const token = previewTheme.token || {};
  const components = previewTheme.components || {};

  const updateToken = (key: string, value: any) => {
    setPreviewTheme({
      ...previewTheme,
      token: {
        ...token,
        [key]: value,
      },
    });
  };

  const updateComponent = (
    component: string,
    key: string,
    value: any
  ) => {
    setPreviewTheme({
      ...previewTheme,
      components: {
        ...components,
        [component]: {
          ...(components as any)[component],
          [key]: value,
        },
      },
    });
  };

  return (
    <Card title="Theme Editor" style={{ maxWidth: 420 }}>
      <Space orientation="vertical" size="middle" style={{ width: '100%' }}>

        {/* COLORS */}
        <Divider>Colors</Divider>

        <Space orientation="vertical">
          <span>Primary</span>
          <ColorPicker
            value={token.colorPrimary}
            onChange={(c) =>
              updateToken('colorPrimary', c.toHexString())
            }
          />
        </Space>

        <Space orientation="vertical">
          <span>Layout background</span>
          <ColorPicker
            value={token.colorBgLayout}
            onChange={(c) =>
              updateToken('colorBgLayout', c.toHexString())
            }
          />
        </Space>

        <Space orientation="vertical">
          <span>Container background</span>
          <ColorPicker
            value={token.colorBgContainer}
            onChange={(c) =>
              updateToken('colorBgContainer', c.toHexString())
            }
          />
        </Space>

        <Space orientation="vertical">
          <span>Text base</span>
          <ColorPicker
            value={token.colorTextBase}
            onChange={(c) =>
              updateToken('colorTextBase', c.toHexString())
            }
          />
        </Space>

        <Space orientation="vertical">
          <span>Border</span>
          <ColorPicker
            value={token.colorBorder}
            onChange={(c) =>
              updateToken('colorBorder', c.toHexString())
            }
          />
        </Space>

        {/* SIZE */}
        <Divider>Size</Divider>

        <Space orientation="vertical">
          <span>Font size</span>
          <InputNumber
            min={12}
            max={20}
            value={token.fontSize}
            onChange={(v) =>
              updateToken('fontSize', v ?? 14)
            }
          />
        </Space>

        <Space orientation="vertical">
          <span>Border radius</span>
          <InputNumber
            min={0}
            max={20}
            value={token.borderRadius}
            onChange={(v) =>
              updateToken('borderRadius', v ?? 6)
            }
          />
        </Space>

        {/* BUTTON */}
        <Divider>Button</Divider>

        <Space orientation="vertical">
          <span>Button height</span>
          <InputNumber
            min={28}
            max={56}
            value={(components as any)?.Button?.controlHeight}
            onChange={(v) =>
              updateComponent('Button', 'controlHeight', v)
            }
          />
        </Space>

        <Space orientation="vertical">
          <span>Button radius</span>
          <InputNumber
            min={0}
            max={20}
            value={(components as any)?.Button?.borderRadius}
            onChange={(v) =>
              updateComponent('Button', 'borderRadius', v)
            }
          />
        </Space>

        {/* MODE */}
        <Divider>Mode</Divider>

        <Space align="center" style={{ justifyContent: 'space-between' }}>
          <span>Dark mode</span>
          <Switch
            checked={
              previewTheme.algorithm === antdTheme.darkAlgorithm
            }
            onChange={(checked) =>
              setPreviewTheme({
                ...previewTheme,
                algorithm: checked
                  ? antdTheme.darkAlgorithm
                  : antdTheme.defaultAlgorithm,
              })
            }
          />
        </Space>
        

        <Divider />

        <Button type="primary" block onClick={applyTheme}>
          Apply
        </Button>
      </Space>
    </Card>
  );
}
