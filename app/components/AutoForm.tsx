"use client";
import React, { useState, useEffect } from "react";
import { Form, Input, Select, Button, Row, Col } from "antd";
import type { Rule } from "antd/es/form";
import type { NamePath } from "antd/es/form/interface";
import type { FormInstance } from "antd/es/form";

export interface Option {
  value: string | number;
  label: string;
}

export type FieldType = "input" | "select";

export interface FieldSchema<T> {
  name: keyof T;
  label: string;
  type: FieldType;
  rules?: Rule[];
  api?: string;
  dependsOn?: keyof T;
  colSpan?: number;
}

interface AutoFormProps<T extends Record<string, any>> {
  schema: FieldSchema<T>[];
  onSubmit: (values: T) => void;
  form?: FormInstance<T>; // optional, để lấy dữ liệu live
  renderButtons?: (form: FormInstance<T>) => React.ReactNode; // custom nút trước/sau submit
}

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

  // Load initial options for selects without dependsOn
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

  if (!mounted) return null; // tránh render server-side

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
          const nameStr = String(field.name);
          const dependsName: NamePath | undefined = field.dependsOn ? String(field.dependsOn) : undefined;

          return (
            <Col key={nameStr} span={colSpan}>
              {field.type === "input" && (
                <Form.Item name={nameStr} label={field.label} rules={field.rules}>
                  <Input />
                </Form.Item>
              )}
              {field.type === "select" && (
                <Form.Item name={nameStr} label={field.label} rules={field.rules}>
                  <Select
                    placeholder={`Select ${field.label}`}
                    options={[{ value: '', label: "-- None --" }, ...(optionsMap[nameStr] ?? [])]}
                    loading={loadingMap[nameStr] ?? false}
                    disabled={dependsName ? !usedForm.getFieldValue(dependsName) : false}
                    showSearch
                    filterOption={(input, option) =>
                      (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
                    }
                    allowClear
                  />
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
