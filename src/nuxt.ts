/**
 * Nuxt Module untuk vue-datatables-flex
 *
 * Cara pakai di nuxt.config.ts:
 *
 * ```ts
 * export default defineNuxtConfig({
 *   modules: ['@saulpaulus17/vue-datatables-flex/nuxt'],
 * })
 * ```
 *
 * Atau dengan opsi:
 *
 * ```ts
 * export default defineNuxtConfig({
 *   modules: [
 *     ['@saulpaulus17/vue-datatables-flex/nuxt', { componentName: 'DataTableMain', addCss:
 * true }]
 *   ],
 * })
 * ```
 */

// NOTE: @nuxt/kit tersedia saat runtime Nuxt, tidak perlu di-install terpisah.
// Gunakan dynamic import agar tidak error saat build library.

export interface ModuleOptions {
  /** Nama komponen global yang didaftarkan (default: "DataTableMain") */
  componentName?: string
  /** Auto-import CSS Bootstrap DataTables */
  addCss?: boolean
}

// Pakai defineNuxtModule dari @nuxt/kit yang tersedia di runtime Nuxt
export default async function vueDatatablesFlexModule(
    options: ModuleOptions,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    nuxt: Record<string, any>,
) {
  // @ts-expect-error - @nuxt/kit tersedia saat runtime Nuxt, tidak perlu
  // install terpisah
  const nuxtKit = await import('@nuxt/kit')
  const {addComponent, createResolver} = nuxtKit as unknown as {
    addComponent: (opts: Record<string, unknown>) => Promise<void>
    createResolver: (base: string) => {
      resolve: (...paths: string[]) => string
    }
  }

  const resolver = createResolver(import.meta.url)
  const componentName = options.componentName ?? 'MainDataTable'

  // Daftarkan komponen secara global sebagai client-only
  await addComponent({
    name: componentName,
    filePath: resolver.resolve('./components/MainDataTable.vue'),
    mode: 'client',
  })

  // Tambah CSS jika diminta
  if (options.addCss) {
    nuxt.options.css.push(
        'datatables.net-bs5/css/dataTables.bootstrap5.min.css')
  }

  // Transpile package
  nuxt.options.build.transpile.push('@saulpaulus17/vue-datatables-flex')
}
