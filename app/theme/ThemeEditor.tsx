import { Card, ColorPicker, InputNumber, Switch, Space, Divider } from 'antd';
import { theme as antdTheme } from 'antd';
import { useTheme } from '../theme/ThemeContext';

export default function ThemeEditor() {
  const { theme, setTheme } = useTheme();
  const token = theme.token || {};

  const updateToken = (key: string, value: any) => {
    setTheme({
      ...theme,
      token: {
        ...token,
        [key]: value,
      },
    });
  };

  return (
    <Card title="Theme Editor" style={{ maxWidth: 420 }}>
      <Space orientation="vertical" size="middle" style={{ width: '100%' }}>

        <Divider>Colors</Divider>

        <Space orientation="vertical">
          <span>Primary color</span>
          <ColorPicker
            value={token.colorPrimary}
            onChange={(c) => updateToken('colorPrimary', c.toHexString())}
          />
        </Space>

        <Space orientation="vertical">
          <span>App border</span>
          <ColorPicker
            value={token.colorBgBase}
            onChange={(c) => updateToken('colorBgBase', c.toHexString())}
          />
        </Space>

        <Space orientation="vertical">
          <span>Component background</span>
          <ColorPicker
            value={token.colorBgContainer}
            onChange={(c) => updateToken('colorBgContainer', c.toHexString())}
          />
        </Space>

        <Space orientation="vertical">
          <span>Text color</span>
          <ColorPicker
            value={token.colorTextBase}
            onChange={(c) => updateToken('colorTextBase', c.toHexString())}
          />
        </Space>

        <Space orientation="vertical">
          <span>Heading color</span>
          <ColorPicker
            value={token.colorTextHeading}
            onChange={(c) => updateToken('colorTextHeading', c.toHexString())}
          />
        </Space>

        <Space orientation="vertical">
          <span>Link color</span>
          <ColorPicker
            value={token.colorLink}
            onChange={(c) => updateToken('colorLink', c.toHexString())}
          />
        </Space>

        <Space orientation="vertical">
          <span>Border color</span>
          <ColorPicker
            value={token.colorBorder}
            onChange={(c) => updateToken('colorBorder', c.toHexString())}
          />
        </Space>

        <Divider>Size</Divider>

        <Space orientation="vertical">
          <span>Font size</span>
          <InputNumber
            min={12}
            max={20}
            value={token.fontSize}
            onChange={(v) => updateToken('fontSize', v ?? 14)}
          />
        </Space>

        <Space orientation="vertical">
          <span>Border radius</span>
          <InputNumber
            min={0}
            max={20}
            value={token.borderRadius}
            onChange={(v) => updateToken('borderRadius', v ?? 6)}
          />
        </Space>

        <Space orientation="vertical">
          <span>Success color</span>
          <ColorPicker
            value={token.colorSuccess}
            onChange={(c) => updateToken('colorSuccess', c.toHexString())}
          />
        </Space>

        <Space orientation="vertical">
          <span>Error color</span>
          <ColorPicker
            value={token.colorError}
            onChange={(c) => updateToken('colorError', c.toHexString())}
          />
        </Space>



        <Divider>Mode</Divider>

        <Space align="center" style={{ justifyContent: 'space-between' }}>
          <span>Dark mode</span>
          <Switch
            checked={theme.algorithm === antdTheme.darkAlgorithm}
            onChange={(checked) =>
              setTheme({
                ...theme,
                algorithm: checked
                  ? antdTheme.darkAlgorithm
                  : antdTheme.defaultAlgorithm,
              })
            }
          />
        </Space>
      </Space>
    </Card>
  );
}
