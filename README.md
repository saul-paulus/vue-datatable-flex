<div align="center">

# @ixspx-dev/vue-datatables-flex

**A high-performance, responsive DataTable component for Vue 3 and Nuxt 3.**

[![npm version](https://img.shields.io/npm/v/@ixspx-dev/vue-datatables-flex.svg?style=flat-square)](https://www.npmjs.com/package/@ixspx-dev/vue-datatables-flex)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg?style=flat-square)](https://opensource.org/licenses/MIT)
[![Vue Version](https://img.shields.io/badge/Vue-3.x-42b883?style=flat-square&logo=vue.js)](https://vuejs.org/)
[![Nuxt Version](https://img.shields.io/badge/Nuxt-3.x-00dc82?style=flat-square&logo=nuxt.js)](https://nuxt.com/)

[Features](#-features) • [Installation](#-installation) • [Vue 3 Usage](#-usage-in-vue-3) • [Nuxt 3 Usage](#-usage-in-nuxt-3) • [API Reference](#-api-reference)

</div>

---

## ✨ Features

- ⚡ **Optimized Performance**: Built on top of [DataTables.net](https://datatables.net) with efficient DOM handling.
- 🎨 **Premium Aesthetics**: Clean, modern design with custom Bootstrap 5 styling and smooth animations.
- 📱 **Fully Responsive**: Intelligent column adjustment via `ResizeObserver` and native Responsive extension support.
- 🧩 **Nuxt 3 Ready**: First-class support with a built-in auto-registering Nuxt module.
- 🛠️ **Developer Friendly**: TypeScript-first with complete type definitions and an exposed public API.
- 🌏 **Indonesian Locale**: Pre-configured with Indonesian localization (easily customizable).
- 🔄 **State Management**: Built-in Select extension support for row selection.

---

## 🚀 Installation

Install the package:

```bash
npm install @ixspx-dev/vue-datatables-flex
```

### Required Peer Dependencies

Ensure your project has the following essentials installed:

```bash
npm install vue bootstrap datatables.net-bs5
```

---

## 📦 Usage in Vue 3

### Global Registration

Recommended for large applications using the component across multiple pages.

```ts
// main.ts
import { createApp } from "vue";
import { VueDatatablesFlex } from "@ixspx-dev/vue-datatables-flex";
import App from "./App.vue";

// Import Required CSS
import "bootstrap/dist/css/bootstrap.min.css";
import "datatables.net-bs5/css/dataTables.bootstrap5.min.css";

const app = createApp(App);
app.use(VueDatatablesFlex);
app.mount("#app");
```

### Basic Usage

```vue
<template>
  <MainDataTable :data="userRows" :columns="userColumns" scroll-y="500px" @ready="onReady" />
</template>

<script setup lang="ts">
import { ref } from "vue";
import type { Column } from "@ixspx-dev/vue-datatables-flex";

const userColumns: Column[] = [
  { data: "id", title: "ID" },
  { data: "name", title: "Full Name" },
  { data: "email", title: "Email Address" },
];

const userRows = ref([
  { id: 1, name: "Ahmad", email: "ahmad@example.com" },
  { id: 2, name: "Budi", email: "budi@example.com" },
]);

const onReady = (dt: any) => console.log("Table instance:", dt);
</script>
```

---

## 🟢 Usage in Nuxt 3

The simplest way is to use the provided Nuxt module.

### 1. Add to Nuxt Config

```ts
// nuxt.config.ts
export default defineNuxtConfig({
  modules: ["@ixspx-dev/vue-datatables-flex/nuxt"],

  // The module automatically handles client-side registration
  vueDatatablesFlex: {
    componentName: "MainDataTable", // Optional: change global name
  },

  css: ["bootstrap/dist/css/bootstrap.min.css", "datatables.net-bs5/css/dataTables.bootstrap5.min.css"],
});
```

### 2. Implementation

```vue
<!-- pages/users.vue -->
<script setup lang="ts">
const columns = [{ data: "name", title: "Name" }];
const { data: users } = await useFetch("/api/users");
</script>

<template>
  <!-- No import needed! Component is auto-registered as client-only -->
  <MainDataTable :data="users" :columns="columns" />
</template>
```

> [!IMPORTANT]
> Because DataTables relies on DOM access, it will only render on the client-side. The Nuxt module automatically wraps the component in `<ClientOnly>`.

---

## 🛠 API Reference

### Props

| Property     | Type               | Default  | Description                                          |
| :----------- | :----------------- | :------- | :--------------------------------------------------- |
| `data`       | `unknown[]`        | `[]`     | The data array to display (Alias: `dataTableProps`). |
| `columns`    | `Column[]`         | `[]`     | Column definitions (Alias: `columnsProps`).          |
| `options`    | `DataTableOptions` | `{}`     | Advanced DataTables configuration overrides.         |
| `loading`    | `boolean`          | `false`  | Shows a beautiful animated loading overlay.          |
| `responsive` | `boolean`          | `false`  | Enables DataTables Responsive extension.             |
| `scrollY`    | `string \| number` | `'65vh'` | Sets the vertical scroll height.                     |
| `tableClass` | `string`           | `''`     | Custom CSS class for the `<table>` element.          |

### Events

| Event     | Payload           | Description                                               |
| :-------- | :---------------- | :-------------------------------------------------------- |
| `@ready`  | `(instance: Api)` | Fired when initialization is complete.                    |
| `@draw`   | `(settings: any)` | Fired whenever the table is redrawn (sort, filter, page). |
| `@select` | `(items, type)`   | Fired when rows are selected (requires `select: true`).   |
| `@error`  | `(err: Error)`    | Fired if initialization fails.                            |

### Exposed Methods (Template Ref)

Access these by adding a `ref` to your component:

```ts
const table = ref<InstanceType<typeof MainDataTable>>();

// Methods
table.value?.getInstance(); // Get raw DataTables API instance
table.value?.reload(); // Reload AJAX data (if using server-side)
table.value?.adjustColumns(); // recalculate column widths
```

---

## 🎨 Customizing Columns

```ts
const columns: Column[] = [
  {
    data: "status",
    title: "Status",
    className: "text-center",
    render: (data) => {
      const color = data === "Active" ? "success" : "secondary";
      return `<span class="badge bg-${color}">${data}</span>`;
    },
  },
];
```

---

## 🙋 Troubleshooting

**"JQuery is not defined"**
Ensure you are importing the Bootstrap integration correctly in your entry point: `import 'datatables.net-bs5';`.

**CSS Alignment Issues**
Ensure you've imported BOTH the Bootstrap 5 core CSS and the DataTables Bootstrap 5 styling in the correct order.

---

## 📄 License

This package is open-sourced software licensed under the [MIT License](LICENSE).

<div align="center">
  <sub>Built with ❤️ for the Vue ecosystem.</sub>
</div>
