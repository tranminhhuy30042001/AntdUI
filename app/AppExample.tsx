"use client";
import React from "react";
import { AutoForm, FieldSchema, Option } from "./components-v2/AutoForm";
import { Button, FormInstance } from "antd";

// =======================
// FormValues
// =======================
interface FormValues {
  firstName: string;
  lastName: string;
  department: string;
  team: string;
  role: string;
  country: string;
  city: string;
  age: number;
  agree: boolean;
  bio: string;
  website: string;
  [key: string]: any;
}

// =======================
// Mock API data
// =======================
const mockDepartments: Option[] = [
  { value: "dev", label: "Development" },
  { value: "marketing", label: "Marketing" },
  { value: "sales", label: "Sales" },
];

const mockTeams: Record<string, Option[]> = {
  dev: [
    { value: "frontend", label: "Frontend" },
    { value: "backend", label: "Backend" },
    { value: "fullstack", label: "Fullstack" },
  ],
  marketing: [
    { value: "content", label: "Content" },
    { value: "seo", label: "SEO" },
    { value: "ads", label: "Ads" },
  ],
  sales: [
    { value: "domestic", label: "Domestic" },
    { value: "international", label: "International" },
  ],
};

const mockRoles: Option[] = [
  { value: "manager", label: "Manager" },
  { value: "staff", label: "Staff" },
  { value: "intern", label: "Intern" },
];

const mockCountries: Option[] = [
  { value: "us", label: "United States" },
  { value: "vn", label: "Vietnam" },
  { value: "jp", label: "Japan" },
];

const mockCities: Record<string, Option[]> = {
  us: [
    { value: "ny", label: "New York" },
    { value: "la", label: "Los Angeles" },
  ],
  vn: [
    { value: "hn", label: "Hanoi" },
    { value: "hcm", label: "Ho Chi Minh" },
  ],
  jp: [
    { value: "tk", label: "Tokyo" },
    { value: "os", label: "Osaka" },
  ],
};

// =======================
// Mock fetch client-side
// =======================
// =======================
// Mock fetch client-side - FIX LỖI "o.text is not a function"
// =======================
const fetchApi = (url: string): Promise<Response> => {
  console.log(`🚀 [AutoForm Fetch] Calling: ${url}`);

  return new Promise((resolve) => {
    setTimeout(() => {
      let data: Option[] = [];

      // Logic lấy dữ liệu dựa trên URL (giữ nguyên logic của bạn)
      if (url.includes("/api/departments")) {
        data = mockDepartments;
      } else if (url.includes("/api/teams")) {
        const params = new URLSearchParams(url.split("?")[1]);
        const parent = params.get("parent") || "";
        data = mockTeams[parent] || [];
      } else if (url.includes("/api/roles")) {
        data = mockRoles;
      } else if (url.includes("/api/countries")) {
        data = mockCountries;
      } else if (url.includes("/api/cities")) {
        const params = new URLSearchParams(url.split("?")[1]);
        const country = params.get("parent") || "";
        data = mockCities[country] || [];
      }

      console.log(`✅ [AutoForm Success] Data for ${url}:`, data);

      // TRẢ VỀ RESPONSE ĐÚNG CHUẨN
      resolve({
        ok: true,
        status: 200,
        json: async () => data,
        text: async () => JSON.stringify(data),
        headers: new Headers(),
      } as Response); 
    }, 500);
  });
};

// Override global fetch
if (typeof window !== "undefined") {
  (window as any).fetch = fetchApi;
}

// Override global fetch for AutoForm
if (typeof window !== "undefined") {
  (window as any).fetch = fetchApi;
}

// =======================
// Schema
// =======================
const schema: FieldSchema<FormValues>[] = [
  { name: "firstName", label: "First Name", type: "input", colSpan: 8, rules: [{ required: true, message: "First name is required" }] },
  { name: "lastName", label: "Last Name", type: "input", colSpan: 8, rules: [{ required: true, message: "Last name is required" }] },
  { name: "age", label: "Age", type: "number", colSpan: 8, rules: [{ required: true, message: "Age is required" }], suffix: "years" },
  { name: "department", label: "Department", type: "select", api: "/api/departments", colSpan: 8, rules: [{ required: true, message: "Select a department" }] },
  { name: "team", label: "Team", type: "select", api: "/api/teams", dependsOn: "department", colSpan: 12, rules: [{ required: true, message: "Select a team" }] },
  { name: "role", label: "Role", type: "select", api: "/api/roles", colSpan: 12, rules: [{ required: true, message: "Select a role" }] },
  { name: "country", label: "Country", type: "select", api: "/api/countries", colSpan: 12, rules: [{ required: true, message: "Select a country" }] },
  { name: "city", label: "City", type: "select", api: "/api/cities", dependsOn: "country", colSpan: 12, rules: [{ required: true, message: "Select a city" }] },
  { name: "website", label: "Website", type: "autocomplete", autoComplete: ["google.com", "facebook.com", "twitter.com"], colSpan: 24 },
  { name: "bio", label: "Bio", type: "textarea", colSpan: 24 },
  { name: "agree", label: "I agree to terms", type: "checkbox", colSpan: 24, rules: [{ required: true, message: "You must agree" }] },

  // Upload file
  { name: "profilePicture", label: "Profile Picture", type: "upload", colSpan: 12, rules: [{ required: true, message: "Upload a profile picture" }] },

  // Dragger multiple files
  { name: "attachments", label: "Attachments", type: "dragger", colSpan: 12, rules: [{ required: true, message: "Upload at least one file" }] },
];

// =======================
// AppExample
// =======================
export const AppExample: React.FC = () => {
  const [form, setForm] = React.useState<FormInstance<any>>();

  const handleSubmit = (values: any) => {
    alert(JSON.stringify(values, null, 2));
  };

  return (
    <div style={{ maxWidth: 500, margin: "20px auto" }}>
      <h2>AutoForm Full Example</h2>
      <AutoForm
        schema={schema}
        onSubmit={handleSubmit}
        form={form}
        renderButtons={(form) => (
          <>
            <Button
              type="default"
              onClick={() => console.log("Current form data:", form.getFieldsValue())}
              style={{ marginRight: 8 }}
            >
              Show Data
            </Button>
            <Button type="primary" htmlType="submit">Submit</Button>
          </>
        )}
      />
    </div>
  );
};
