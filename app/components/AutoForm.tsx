"use client";
import React, { useState, useEffect } from "react";
import {
  Form,
  Input,
  Select,
  Button,
  Row,
  Col,
  AutoComplete,
  InputNumber,
  Checkbox,
  Upload,
} from "antd";
import { UploadOutlined, InboxOutlined } from "@ant-design/icons";
import type { Rule } from "antd/es/form";
import type { NamePath } from "antd/es/form/interface";
import type { FormInstance } from "antd/es/form";

// ===== Utils =====
const normFile = (e: any) => {
  if (Array.isArray(e)) return e;
  return e?.fileList;
};

// ===== Types =====
export interface Option {
  value: string | number;
  label: string;
}

export type FieldType =
  | "input"
  | "select"
  | "autocomplete"
  | "number"
  | "checkbox"
  | "textarea"
  | "upload"
  | "dragger";

export interface FieldSchema<T> {
  name: keyof T;
  label: string;
  type: FieldType;
  rules?: Rule[];
  api?: string; // dùng cho select
  dependsOn?: keyof T;
  colSpan?: number;
  placeholder?: string;
  options?: Option[];
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
  autoComplete?: string[];
  valuePropName?: string;
}

interface AutoFormProps<T extends Record<string, any>> {
  schema: FieldSchema<T>[];
  onSubmit: (values: T) => void;
  form?: FormInstance<T>;
  renderButtons?: (form: FormInstance<T>) => React.ReactNode;
}

// ===== Component =====
export const AutoForm = <T extends Record<string, any>>({
  schema,
  onSubmit,
  form,
  renderButtons,
}: AutoFormProps<T>) => {
  const [internalForm] = Form.useForm<T>();
  const usedForm = form || internalForm;

  const [optionsMap, setOptionsMap] = useState<Record<string, Option[]>>({});
  const [loadingMap, setLoadingMap] = useState<Record<string, boolean>>({});
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  // Load select options initially
  useEffect(() => {
    schema.forEach((field) => {
      if (field.type === "select" && !field.dependsOn && field.api) {
        fetchOptions(field.name, field.api);
      }
    });
  }, [schema]);

  const fetchOptions = async (name: keyof T, api: string, param?: T[keyof T]) => {
    const key = String(name);
    setLoadingMap((prev) => ({ ...prev, [key]: true }));
    try {
      let url = api;
      if (param !== undefined) url += `?parent=${param}`;
      const res = await fetch(url);
      const data: Option[] = await res.json();
      setOptionsMap((prev) => ({ ...prev, [key]: data }));
    } finally {
      setLoadingMap((prev) => ({ ...prev, [key]: false }));
    }
  };

  const handleFieldChange = <K extends keyof T>(changedName: K, value: T[K]) => {
    schema.forEach((field) => {
      if (field.dependsOn === changedName && field.api) {
        usedForm.setFieldsValue({ [field.name as string]: undefined } as Partial<T>);
        fetchOptions(field.name, field.api, value);
      }
    });
  };

  if (!mounted) return null;

  return (
    <Form<T>
      form={usedForm}
      layout="vertical"
      onFinish={onSubmit}
      onValuesChange={(changedValues: Partial<T>) => {
        const [key, value] = Object.entries(changedValues)[0] as [keyof T, T[keyof T]];
        handleFieldChange(key, value);
      }}
    >
      <Row gutter={16}>
        {schema.map((field) => {
          const colSpan = field.colSpan ?? 24;
          const namePath: NamePath = [field.name as string];
          const dependsPath: NamePath | undefined = field.dependsOn
            ? [field.dependsOn as string]
            : undefined;

          return (
            <Col key={String(field.name)} span={colSpan}>
              {field.type === "input" && (
                <Form.Item name={namePath} label={field.label} rules={field.rules}>
                  <Input placeholder={field.placeholder} />
                </Form.Item>
              )}

              {field.type === "select" && (
                <Form.Item name={namePath} label={field.label} rules={field.rules}>
                  <Select
                    placeholder={field.placeholder ?? `Select ${field.label}`}
                    options={[{ value: "", label: "-- None --" }, ...(optionsMap[String(field.name)] ?? [])]}
                    loading={loadingMap[String(field.name)] ?? false}
                    disabled={dependsPath ? !usedForm.getFieldValue(dependsPath) : false}
                    showSearch
                    filterOption={(input, option) =>
                      (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
                    }
                    allowClear
                  />
                </Form.Item>
              )}

              {field.type === "autocomplete" && field.autoComplete && (
                <Form.Item name={namePath} label={field.label} rules={field.rules}>
                  <AutoComplete
                    options={field.autoComplete.map((v) => ({ value: v, label: v }))}
                    placeholder={field.placeholder}
                  >
                    <Input />
                  </AutoComplete>
                </Form.Item>
              )}

              {field.type === "number" && (
                <Form.Item name={namePath} label={field.label} rules={field.rules}>
                  <InputNumber style={{ width: "100%" }} prefix={field.prefix} suffix={field.suffix} />
                </Form.Item>
              )}

              {field.type === "checkbox" && (
                <Form.Item
                  name={namePath}
                  valuePropName={field.valuePropName ?? "checked"}
                  rules={field.rules}
                >
                  <Checkbox>{field.label}</Checkbox>
                </Form.Item>
              )}

              {field.type === "textarea" && (
                <Form.Item name={namePath} label={field.label} rules={field.rules}>
                  <Input.TextArea showCount maxLength={100} placeholder={field.placeholder} />
                </Form.Item>
              )}

              {field.type === "upload" && (
                <Form.Item
                  name={namePath}
                  label={field.label}
                  valuePropName="fileList"
                  getValueFromEvent={normFile}
                  rules={field.rules}
                >
                  <Upload name="file" action="/upload.do" listType="picture">
                    <Button icon={<UploadOutlined />}>Click to Upload</Button>
                  </Upload>
                </Form.Item>
              )}

              {field.type === "dragger" && (
                <Form.Item
                  name={namePath}
                  label={field.label}
                  valuePropName="fileList"
                  getValueFromEvent={normFile}
                  rules={field.rules}
                >
                  <Upload.Dragger name="files" action="/upload.do" multiple>
                    <p className="ant-upload-drag-icon">
                      <InboxOutlined />
                    </p>
                    <p className="ant-upload-text">Click or drag file to this area to upload</p>
                    <p className="ant-upload-hint">Support single or bulk upload.</p>
                  </Upload.Dragger>
                </Form.Item>
              )}
            </Col>
          );
        })}
      </Row>

      <Form.Item>
        {renderButtons ? renderButtons(usedForm) : <Button type="primary" htmlType="submit">Submit</Button>}
      </Form.Item>
    </Form>
  );
};
