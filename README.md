This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
# AutoForm Documentation

## Overview
**AutoForm** is a dynamic, type-safe React form built with Ant Design.  
It allows developers to define a form schema that supports:

- Multiple field types (`input`, `select`)
- Validation rules
- Dependent (cascading) selects
- Custom column layouts using Ant Design grid (`Row` / `Col`)
- Automatic API fetching for select options

The form is generic and type-safe, fully leveraging TypeScript for field names and values.

---

## Interfaces

### `Option`
Represents a single selectable item for a Select field.

| Property | Type           | Description                     |
|----------|----------------|---------------------------------|
| value    | `string \| number` | The actual value stored in the form |
| label    | `string`       | The display text for the option |

**Example:**
```ts
{ value: "dev", label: "Development" }
