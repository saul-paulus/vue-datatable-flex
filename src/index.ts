// ===================================================
//  @saulpaulus17/vue-datatables-flex
//  Entry point — semua ekspor publik library
// ===================================================

// --- Core Component ---
export { default as MainDataTable } from './runtime/components/MainDataTable.vue'

// --- Vue Plugin (app.use()) ---
export { default as VueDatatablesFlex } from './plugin'
export type { VueDatatablesFlexOptions } from './plugin'

// --- Types ---
export type {
  Column,
  DataTableOptions,
  DataTableLanguage,
  DataTableEmits,
} from './runtime/types/index'

// --- Default Options ---
export { defaultOptions } from './runtime/types/index'
