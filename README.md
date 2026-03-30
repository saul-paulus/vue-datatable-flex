# vue-datatables-flex

[![npm version](https://badge.fury.io/js/vue-datatables-flex.svg)](https://www.npmjs.com/package/vue-datatables-flex)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

Komponen DataTable yang fleksibel dan responsif untuk **Vue 3** dan **Nuxt 3**, dibangun di atas [DataTables.net](https://datatables.net).

## Fitur

- ✅ Support **Vue 3** dan **Nuxt 3**
- ✅ TypeScript-first dengan type definitions lengkap
- ✅ Desain **Premium & Modern** (Custom Bootstrap 5)
- ✅ Auto column adjustment dengan `ResizeObserver` (Intelijen Resize)
- ✅ Loading overlay bawaan yang ter-animasi
- ✅ Event: `ready`, `draw`, `select`, `deselect`
- ✅ Expose public API: `getInstance`, `reload`, `redraw`, `adjustColumns`
- ✅ Locale Indonesia secara default
- ✅ Integrasi Bootstrap 5 penuh (Responsive & Select extensions)
- ✅ Unit & E2E Testing ready (Vitest & Playwright)

---

## Instalasi

```bash
npm install vue-datatables-flex datatables.net-vue3
```

### Peer Dependencies yang Dibutuhkan

```bash
npm install vue datatables.net-vue3
```

### CSS (wajib)

Tambahkan CSS DataTables dan Bootstrap 5 ke project Anda:

```bash
npm install bootstrap datatables.net-bs5
```

---

## Penggunaan di Vue 3

### Cara 1: Registrasi Global (via Plugin)

```ts
// main.ts
import { createApp } from 'vue'
import App from './App.vue'

// Import CSS
import 'bootstrap/dist/css/bootstrap.min.css'
import 'datatables.net-bs5/css/dataTables.bootstrap5.min.css'

// Import DataTables extensions (sesuai kebutuhan)
import 'datatables.net-bs5'
import 'datatables.net-select-bs5'
import 'datatables.net-responsive-bs5' // opsional

import { VueDatatablesFlex } from 'vue-datatables-flex'

const app = createApp(App)
app.use(VueDatatablesFlex)
// atau dengan nama komponen kustom:
// app.use(VueDatatablesFlex, { componentName: 'MyTable' })
app.mount('#app')
```

```vue
<!-- MyPage.vue -->
<template>
  <DataTableMain
    :data="rows"
    :columns="columns"
    scroll-y="60vh"
    @ready="onReady"
    @draw="onDraw"
  />
</template>
```

---

### Cara 2: Import Langsung (per komponen)

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { DataTableMain } from 'vue-datatables-flex'
import type { Column } from 'vue-datatables-flex'

// Import CSS
import 'bootstrap/dist/css/bootstrap.min.css'
import 'datatables.net-bs5/css/dataTables.bootstrap5.min.css'
import 'datatables.net-bs5'

const columns: Column[] = [
  { data: 'id',    title: 'ID'     },
  { data: 'name',  title: 'Nama'   },
  { data: 'email', title: 'Email'  },
  {
    data: 'status',
    title: 'Status',
    render: (data) => `<span class="badge bg-${data === 'active' ? 'success' : 'danger'}">${data}</span>`,
  },
]

const rows = ref([
  { id: 1, name: 'Budi',  email: 'budi@mail.com',  status: 'active'   },
  { id: 2, name: 'Siti',  email: 'siti@mail.com',  status: 'inactive' },
  { id: 3, name: 'Rudi',  email: 'rudi@mail.com',  status: 'active'   },
])

const tableRef = ref()

function onReady(dt: any) {
  console.log('DataTable ready:', dt)
}

function onDraw(settings: any) {
  console.log('Tabel di-draw ulang')
}
</script>

<template>
  <DataTableMain
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

## Penggunaan di Nuxt 3

### Cara 1: Nuxt Module (Rekomendasi)

```ts
// nuxt.config.ts
export default defineNuxtConfig({
  modules: ['vue-datatables-flex/nuxt'],

  // Opsional — konfigurasi module
  vueDatatablesFlex: {
    componentName: 'DataTableMain', // default
    addCss: false,                  // tambah CSS Bootstrap DT otomatis
  },

  css: [
    'bootstrap/dist/css/bootstrap.min.css',
    'datatables.net-bs5/css/dataTables.bootstrap5.min.css',
  ],
})
```

Komponen akan otomatis terdaftar sebagai **client-only** (DataTables membutuhkan DOM):

```vue
<!-- pages/data.vue -->
<script setup lang="ts">
import type { Column } from 'vue-datatables-flex'

const columns: Column[] = [
  { data: 'id',   title: 'ID'   },
  { data: 'nama', title: 'Nama' },
]

const { data: rows } = await useFetch('/api/users')
</script>

<template>
  <!-- Komponen otomatis tersedia tanpa import -->
  <DataTableMain :data="rows ?? []" :columns="columns" />
</template>
```

---

### Cara 2: Import Manual di Nuxt (tanpa module)

```vue
<!-- components/MyTable.client.vue -->
<!-- Suffix .client.vue penting agar tidak di-render di server! -->
<script setup lang="ts">
import { DataTableMain } from 'vue-datatables-flex'
import 'datatables.net-bs5'
</script>

<template>
  <DataTableMain v-bind="$attrs" />
</template>
```

---

## Props

| Prop | Type | Default | Keterangan |
|------|------|---------|------------|
| `data` | `unknown[]` | `[]` | Data array untuk tabel (Alias: `dataTableProps`) |
| `columns` | `Column[]` | `[]` | Definisi kolom (Alias: `columnsProps`) |
| `options` | `DataTableOptions` | `{}` | Override opsi DataTables core |
| `scrollY` | `string \| number \| false` | `'65vh'` | Tinggi scroll vertikal (mis: "65vh", "400px") |
| `scrollX` | `boolean` | `true` | Aktifkan horizontal scroll (otomatis mati jika `responsive: true`) |
| `responsive` | `boolean` | `false` | Mode responsive (disable horizontal scroll untuk integrasi mobile) |
| `loading` | `boolean` | `false` | Aktifkan overlay loading |
| `loadingText` | `string` | `'Memuat data...'` | Teks pada overlay loading |
| `wrapperClass` | `string` | `''` | Class CSS tambahan untuk wrapper card |
| `tableClass` | `string` | `''` | Class CSS tambahan untuk elemen `<table>` |

---

## Events

| Event | Parameter | Keterangan |
|-------|-----------|------------|
| `ready` | `instance: any` | DataTable selesai diinisialisasi |
| `draw` | `settings: any` | Tabel di-draw ulang |
| `select` | `items: any[], type: string` | Baris di-select (butuh select extension) |
| `deselect` | `items: any[], type: string` | Baris di-deselect |
| `error` | `err: Error` | Error saat inisialisasi |

---

## Expose / Template Ref API

```vue
<DataTableMain ref="tableRef" ... />
```

```ts
const tableRef = ref()

// Akses DataTables instance
const dt = tableRef.value.getInstance()
dt.search('keyword').draw()

// Reload data dari AJAX
tableRef.value.reload()

// Redraw tabel
tableRef.value.redraw()

// Adjust lebar kolom
tableRef.value.adjustColumns()
```

---

## Column Definition

```ts
import type { Column } from 'vue-datatables-flex'

const columns: Column[] = [
  {
    data: 'name',
    title: 'Nama',
    width: '200px',
    className: 'fw-bold',
    orderable: true,
    searchable: true,
    // Custom render
    render: (data, type, row) =>
      `<a href="/users/${row.id}">${data}</a>`,
  },
  // Kolom tanpa data (action buttons)
  {
    data: null,
    title: 'Aksi',
    orderable: false,
    searchable: false,
    render: (data, type, row) =>
      `<button class="btn btn-sm btn-danger" data-id="${row.id}">Hapus</button>`,
  },
]
```

---

## Default Options (Indonesian Locale)

Package ini sudah menyertakan opsi default dengan locale Indonesia. Anda bisa mengoverride sebagian atau semuanya:

```ts
import { defaultOptions } from 'vue-datatables-flex'

// Lihat semua default options:
console.log(defaultOptions)
```

---

---

## Testing

Project ini dilengkapi dengan unit testing (Vitest) dan E2E testing (Playwright):

```bash
# Jalankan unit tests
npm run test:unit

# Jalankan E2E tests
npm run test:e2e

# Lint check
npm run lint
```

---

## Troubleshooting

### Error: "DataTables library not set"
Jika Anda mendapatkan error ini, pastikan Anda telah meregistrasi library DataTables dengan benar. Komponen ini sudah melakukan registrasi otomatis di dalam `MainDataTable.vue`, namun jika Anda menggunakan versi eksternal, pastikan panggil:

```ts
import DataTable from 'datatables.net-vue3';
import DataTablesLib from 'datatables.net-bs5';
DataTable.use(DataTablesLib);
```

### CSS Tidak Muncul
Pastikan Anda mengimpor CSS Bootstrap dan DataTables di `main.ts` atau `nuxt.config.ts` seperti yang dijelaskan di bagian Instalasi.

---

## License

MIT © 2024
