'use client';

import {
  Button,
  Card,
  Typography,
  Input,
  Select,
  Switch,
  Table,
  Tag,
  Alert,
  Space,
  ConfigProvider,
} from 'antd';
import ThemeEditor from './theme/ThemeEditor';
import { AppExample } from './AppExample';
import { useTheme } from './theme/ThemeContext';
import { defaultTheme } from './theme/defaultTheme';

const { Title, Paragraph, Text } = Typography;

export default function Home() {
  const { resetTheme, previewTheme } = useTheme();

  return (
    <div style={{ padding: 24, maxWidth: 1400, margin: '0 auto' }}>
      <AppExample />

      {/* ===== MAIN LAYOUT ===== */}
      <div
        style={{
          display: 'flex',
          gap: 24,
          alignItems: 'flex-start',
          flexWrap: 'wrap',
        }}
      >
        {/* ===== THEME EDITOR ===== */}
        <div style={{ flex: '0 0 420px' }}>
          <ThemeEditor />
        </div>

        {/* ===== PREVIEW ===== */}
        <ConfigProvider theme={previewTheme}>
          <div
            style={{
              flex: 1,
              minWidth: 600,
              background: previewTheme.token?.colorBgLayout,
              padding: 24,
              borderRadius: previewTheme.token?.borderRadius,
            }}
          >
            <Button danger onClick={() => resetTheme(defaultTheme)}>
              Reset Theme
            </Button>

            <Title level={3} style={{ marginTop: 16 }}>
              Theme Preview
            </Title>

            {/* ===== GRID PREVIEW ===== */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: 24,
              }}
            >
              {/* LEFT COLUMN */}
              <div>
                <Card style={{ marginBottom: 24 }}>
                  <Title level={4}>Typography</Title>
                  <Paragraph>
                    Test <Text strong>font</Text>,{' '}
                    <Text type="secondary">secondary text</Text>,{' '}
                    <a href="#">link</a>
                  </Paragraph>
                </Card>

                <Card style={{ marginBottom: 24 }}>
                  <Title level={4}>Buttons</Title>
                  <Space>
                    <Button type="primary">Primary</Button>
                    <Button>Default</Button>
                    <Button danger>Danger</Button>
                    <Button disabled>Disabled</Button>
                  </Space>
                </Card>

                <Card>
                  <Title level={4}>Alerts</Title>
                  <Space orientation="vertical">
                    <Alert
                      type="success"
                      title="Success"
                      description="Operation completed successfully"
                      showIcon
                    />
                    <Alert
                      type="warning"
                      title="Warning"
                      description="Be careful with this action"
                      showIcon
                    />
                  </Space>
                </Card>
              </div>

              {/* RIGHT COLUMN */}
              <div>
                <Card style={{ marginBottom: 24 }}>
                  <Title level={4}>Inputs</Title>
                  <Space orientation="vertical" style={{ width: '100%' }}>
                    <Input placeholder="Text input" />
                    <Select
                      placeholder="Select option"
                      options={[
                        { label: 'Option 1', value: '1' },
                        { label: 'Option 2', value: '2' },
                      ]}
                    />
                    <Switch defaultChecked />
                  </Space>
                </Card>

                <Card style={{ marginBottom: 24 }}>
                  <Title level={4}>Table</Title>
                  <Table
                    size="small"
                    pagination={false}
                    columns={[
                      { title: 'Name', dataIndex: 'name' },
                      { title: 'Age', dataIndex: 'age' },
                      {
                        title: 'Status',
                        dataIndex: 'status',
                        render: (v: string) =>
                          v === 'active' ? (
                            <Tag color="green">Active</Tag>
                          ) : (
                            <Tag color="red">Inactive</Tag>
                          ),
                      },
                    ]}
                    dataSource={[
                      {
                        key: '1',
                        name: 'Nguyễn Văn A',
                        age: 28,
                        status: 'active',
                      },
                      {
                        key: '2',
                        name: 'Trần Thị B',
                        age: 32,
                        status: 'inactive',
                      },
                    ]}
                  />
                </Card>

                <Card>
                  <Title level={4}>More Alerts</Title>
                  <Alert
                    type="error"
                    title="Error"
                    description="Something went wrong"
                    showIcon
                  />
                </Card>
              </div>
            </div>
          </div>
        </ConfigProvider>
      </div>
    </div>
  );
}
