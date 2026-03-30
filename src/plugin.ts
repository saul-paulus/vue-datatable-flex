import type { App, Plugin } from 'vue'
import DataTableMain from './components/MainDataTable.vue'

// ===================================================
//  Plugin Options
// ===================================================
export interface VueDatatablesFlexOptions {
  /** Nama komponen yang didaftarkan secara global (default: "MainDataTable") */
  componentName?: string
}

// ===================================================
//  Vue Plugin
// ===================================================
const VueDatatablesFlex: Plugin = {
  install(app: App, options: VueDatatablesFlexOptions = {}) {
    const componentName = options.componentName ?? 'MainDataTable'
    app.component(componentName, DataTableMain)
  },
}

export default VueDatatablesFlex
