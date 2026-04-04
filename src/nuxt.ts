import { defineNuxtModule, addComponent, createResolver } from '@nuxt/kit'

export interface ModuleOptions {
  /** Nama komponen global yang didaftarkan (default: "MainDataTable") */
  componentName?: string;
  /** Auto-import CSS Bootstrap DataTables */
  addCss?: boolean;
}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: '@saulpaulus17/vue-datatables-flex',
    configKey: 'vueDatatablesFlex',
    compatibility: {
      nuxt: '>=3.0.0'
    }
  },
  defaults: {
    componentName: 'MainDataTable',
    addCss: true
  },
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setup(options: ModuleOptions, nuxt: any) {
    const resolver = createResolver(import.meta.url)

    // Daftarkan komponen secara global (Default: MainDataTable)
    addComponent({
      name: options.componentName || 'MainDataTable',
      // Point langsung ke file .vue di folder runtime
      filePath: resolver.resolve('./runtime/components/MainDataTable.vue'),
    })

    // Tambah CSS jika diminta
    if (options.addCss) {
      nuxt.options.css.push('datatables.net-bs5/css/dataTables.bootstrap5.min.css')
    }

    // Pastikan library di-transpile oleh Nuxt
    nuxt.options.build.transpile.push('@saulpaulus17/vue-datatables-flex')
  }
})
