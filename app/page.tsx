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
} from 'antd';
import ThemeEditor from './theme/ThemeEditor';
import { AppExample } from './AppExample';
import { useTheme } from './theme/ThemeContext';
import { defaultTheme } from './theme/defaultTheme';

const { Title, Paragraph, Text } = Typography;

export default function Home() {
  const { setTheme } = useTheme();

  const handleResetTheme = () => {
    setTheme(defaultTheme);
  };

  return (
    <div style={{ padding: 24, maxWidth: 1200, margin: '0 auto' }}>
      {/* Demo app từ AntD */}
      <AppExample />

      {/* ===== HEADER TOOLBAR ===== */}


      <Space align="start" size="large" wrap>
        {/* ===== THEME EDITOR ===== */}
        <ThemeEditor />





        {/* ===== PREVIEW AREA ===== */}
        <div style={{ flex: 1, minWidth: 420 }}>
          <Button danger onClick={handleResetTheme}>
            Reset Theme
          </Button>
          <Title level={3}>Theme Preview</Title>

          <Card style={{ marginBottom: 24 }}>
            <Title level={4}>Typography</Title>
            <Paragraph>
              Đây là đoạn text để test <Text strong>font</Text>,{' '}
              <Text type="secondary">màu chữ</Text> và{' '}
              <a href="#">link color</a>.
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

          <Card style={{ marginBottom: 24 }}>
            <Title level={4}>Inputs</Title>
            <Space orientation="vertical" style={{ width: 300 }}>
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
                { key: '1', name: 'Nguyễn Văn A', age: 28, status: 'active' },
                { key: '2', name: 'Trần Thị B', age: 32, status: 'inactive' },
              ]}
              pagination={false}
              size="small"
            />
          </Card>

          <Card>
            <Title level={4}>Alert</Title>
            <Alert
              title="Success"
              description="Đây là alert để test background, border, text."
              type="success"
              showIcon
            />
          </Card>
             <Card>
            <Title level={4}>Alert</Title>
            <Alert
              title="Error"
              description="Đây là alert để test background, border, text."
              type="error"
              showIcon
            />
          </Card>
        </div>
      </Space>
    </div>
  );
}