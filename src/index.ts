// ===================================================
//  vue-datatables-flex
//  Entry point — semua ekspor publik library
// ===================================================

// --- Core Component ---
export { default as MainDataTable } from './components/MainDataTable.vue'

// --- Vue Plugin (app.use()) ---
export { default as VueDatatablesFlex } from './plugin'
export type { VueDatatablesFlexOptions } from './plugin'

// --- Types ---
export type {
  Column,
  DataTableOptions,
  DataTableLanguage,
  DataTableEmits,
} from './types'

// --- Default Options ---
export { defaultOptions } from './types'
