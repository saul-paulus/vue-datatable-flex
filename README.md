# vue-datatables-flex

[![npm version](https://badge.fury.io/js/vue-datatables-flex.svg)](https://www.npmjs.com/package/vue-datatables-flex)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A flexible and responsive DataTable component for **Vue 3** and **Nuxt 3**, built on top of [DataTables.net](https://datatables.net).
![alt text](image.png)

## Features

- ✅ Supports **Vue 3** and **Nuxt 3**
- ✅ TypeScript-first with complete type definitions
- ✅ **Premium & Modern** Design (Custom Bootstrap 5)
- ✅ Intelligent Auto-column adjustment using `ResizeObserver`
- ✅ Built-in animated loading overlay
- ✅ Events: `ready`, `draw`, `select`, `deselect`
- ✅ Exposed Public API: `getInstance`, `reload`, `redraw`, `adjustColumns`
- ✅ Default Indonesian locale (customizable)
- ✅ Seamless Bootstrap 5 integration (including Responsive & Select extensions)
- ✅ Ready for Unit & E2E Testing (Vitest & Playwright)

---

## Installation

```bash
npm install vue-datatables-flex datatables.net-vue3
```

### Required Peer Dependencies

```bash
npm install vue datatables.net-vue3
```

### CSS (Required)

Add DataTables and Bootstrap 5 CSS to your project:

```bash
npm install bootstrap datatables.net-bs5
```

---

## Usage in Vue 3

### Method 1: Global Registration (via Plugin)

```ts
// main.ts
import { createApp } from "vue";
import App from "./App.vue";

// Import CSS
import "bootstrap/dist/css/bootstrap.min.css";
import "datatables.net-bs5/css/dataTables.bootstrap5.min.css";

// Import DataTables extensions (as needed)
import "datatables.net-bs5";
import "datatables.net-select-bs5";
import "datatables.net-responsive-bs5"; // optional

import { VueDatatablesFlex } from "vue-datatables-flex";

const app = createApp(App);
app.use(VueDatatablesFlex);
// or with a custom component name:
// app.use(VueDatatablesFlex, { componentName: 'MyTable' })
app.mount("#app");
```

```vue
<!-- MyPage.vue -->
<template>
  <MainDataTable
    :data="rows"
    :columns="columns"
    scroll-y="60vh"
    @ready="onReady"
    @draw="onDraw"
  />
</template>
```

---

### Method 2: Direct Import (Local Component)

```vue
<script setup lang="ts">
import { ref } from "vue";
import { MainDataTable } from "vue-datatables-flex";
import type { Column } from "vue-datatables-flex";

// Import CSS
import "bootstrap/dist/css/bootstrap.min.css";
import "datatables.net-bs5/css/dataTables.bootstrap5.min.css";
import "datatables.net-bs5";

const columns: Column[] = [
  { data: "id", title: "ID" },
  { data: "name", title: "Names" },
  { data: "email", title: "Email" },
  {
    data: "status",
    title: "Status",
    render: (data) =>
      `<span class="badge bg-${data === "active" ? "success" : "danger"}">${data}</span>`,
  },
];

const rows = ref([
  { id: 1, name: "Budi", email: "budi@mail.com", status: "active" },
  { id: 2, name: "Siti", email: "siti@mail.com", status: "inactive" },
  { id: 3, name: "Rudi", email: "rudi@mail.com", status: "active" },
]);

const tableRef = ref();

function onReady(dt: any) {
  console.log("DataTable ready:", dt);
}

function onDraw(settings: any) {
  console.log("Table redrawn");
}
</script>

<template>
  <MainDataTable
    ref="tableRef"
    :data="rows"
    :columns="columns"
    scroll-y="65vh"
    :loading="false"
    @ready="onReady"
    @draw="onDraw"
  />
</template>
```

---

## Usage in Nuxt 3

### Method 1: Nuxt Module (Recommended)

```ts
// nuxt.config.ts
export default defineNuxtConfig({
  modules: ["vue-datatables-flex/nuxt"],

  // Optional module configuration
  vueDatatablesFlex: {
    componentName: "MainDataTable", // default
    addCss: false, // add Bootstrap DT CSS automatically
  },

  css: [
    "bootstrap/dist/css/bootstrap.min.css",
    "datatables.net-bs5/css/dataTables.bootstrap5.min.css",
  ],
});
```

The component will be automatically registered as **client-only** (DataTables requires the DOM):

```vue
<!-- pages/data.vue -->
<script setup lang="ts">
import type { Column } from "vue-datatables-flex";

const columns: Column[] = [
  { data: "id", title: "ID" },
  { data: "name", title: "Name" },
];

const { data: rows } = await useFetch("/api/users");
</script>

<template>
  <!-- Component is available globally without import -->
  <MainDataTable :data="rows ?? []" :columns="columns" />
</template>
```

---

### Method 2: Manual Import in Nuxt (Without Module)

```vue
<!-- components/MyTable.client.vue -->
<!-- Suffix .client.vue is important to ensure it's client-side only! -->
<script setup lang="ts">
import { MainDataTable } from "vue-datatables-flex";
import "datatables.net-bs5";
</script>

<template>
  <MainDataTable v-bind="$attrs" />
</template>
```

---

## Props

| Prop           | Type                        | Default             | Description                                                             |
| -------------- | --------------------------- | ------------------- | ----------------------------------------------------------------------- |
| `data`         | `unknown[]`                 | `[]`                | Data array for the table (Alias: `dataTableProps`)                      |
| `columns`      | `Column[]`                  | `[]`                | Column definitions (Alias: `columnsProps`)                              |
| `options`      | `DataTableOptions`          | `{}`                | Override core DataTables options                                        |
| `scrollY`      | `string \| number \| false` | `'65vh'`            | Vertical scroll height (e.g., "65vh", "400px")                          |
| `scrollX`      | `boolean`                   | `true`              | Enable horizontal scroll (automatically disabled if `responsive: true`) |
| `responsive`   | `boolean`                   | `false`             | Responsive mode (disables horizontal scroll for mobile integration)     |
| `loading`      | `boolean`                   | `false`             | Enable loading overlay                                                  |
| `loadingText`  | `string`                    | `'Loading data...'` | Text displayed on the loading overlay                                   |
| `wrapperClass` | `string`                    | `''`                | Additional CSS class for the wrapper card                               |
| `tableClass`   | `string`                    | `''`                | Additional CSS class for the `<table>` element                          |

---

## Events

| Event      | Parameter                    | Description                                              |
| ---------- | ---------------------------- | -------------------------------------------------------- |
| `ready`    | `instance: any`              | Fired when DataTable initialization is finished          |
| `draw`     | `settings: any`              | Fired when the table is redrawn                          |
| `select`   | `items: any[], type: string` | Fired when rows are selected (requires select extension) |
| `deselect` | `items: any[], type: string` | Fired when rows are deselected                           |
| `error`    | `err: Error`                 | Fired on initialization error                            |

---

## Exposed / Template Ref API

```vue
<MainDataTable ref="tableRef" ... />
```

```ts
const tableRef = ref();

// Access DataTables instance
const dt = tableRef.value.getInstance();
dt.search("keyword").draw();

// Reload AJAX data
tableRef.value.reload();

// Redraw table
tableRef.value.redraw();

// Adjust column width
tableRef.value.adjustColumns();
```

---

## Column Definition

```ts
import type { Column } from "vue-datatables-flex";

const columns: Column[] = [
  {
    data: "name",
    title: "Name",
    width: "200px",
    className: "fw-bold",
    orderable: true,
    searchable: true,
    // Custom render
    render: (data, type, row) => `<a href="/users/${row.id}">${data}</a>`,
  },
  // Column without data (action buttons)
  {
    data: null,
    title: "Action",
    orderable: false,
    searchable: false,
    render: (data, type, row) =>
      `<button class="btn btn-sm btn-danger" data-id="${row.id}">Delete</button>`,
  },
];
```

---

## Default Options (Indonesian Locale)

This package includes default options with Indonesian locale. You can override any of them:

```ts
import { defaultOptions } from "vue-datatables-flex";

// View all default options:
console.log(defaultOptions);
```

---

## Testing

This project is equipped with unit testing (Vitest) and E2E testing (Playwright):

```bash
# Run unit tests
npm run test:unit

# Run E2E tests
npm run test:e2e

# Lint check
npm run lint
```

---

## Troubleshooting

### Error: "DataTables library not set"

If you see this error, ensure you have registered the DataTables library correctly. This component handles registration internally, but if you are using an external version, make sure to call:

```ts
import DataTable from "datatables.net-vue3";
import DataTablesLib from "datatables.net-bs5";
DataTable.use(DataTablesLib);
```

### CSS Not Appearing

Ensure you have imported Bootstrap and DataTables CSS in `main.ts` or `nuxt.config.ts` as described in the Installation section.

---

## 📄 License

This project is open-source software licensed under the MIT License.
See [LICENSE](LICENSE)
