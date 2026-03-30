import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'node:url'
import { resolve } from 'node:path'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'

// https://vite.dev/guide/build#library-mode
export default defineConfig({
  plugins: [
    vue(),
    dts({
      // Hanya generate DTS untuk types & plugin, bukan .vue component
      // (DTS dari .vue menyebabkan error TS4058 karena tipe internal datatables)
      include: ['src/index.ts', 'src/types/**', 'src/plugin.ts'],
      exclude: ['src/nuxt.ts', 'src/nuxt*', 'src/**/__tests__/**'],
      outDir: 'dist/types',
      tsconfigPath: './tsconfig.app.json',
      cleanVueFileName: true,
      rollupTypes: false,
    }),
  ],

  resolve: {
    alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) },
  },

  build: {
    lib: {
      // Library entry point
      entry: {
        // Main entry
        'vue-datatables-flex': resolve(__dirname, 'src/index.ts'),
        // Nuxt module entry
        'nuxt': resolve(__dirname, 'src/nuxt.ts'),
      },
      name: 'VueDatatablesFlex',
      formats: ['es', 'cjs'],
      fileName: (format, entryName) => {
        if (entryName === 'nuxt') {
          return `nuxt.${format}.js`
        }
        return `vue-datatables-flex.${format}.js`
      },
    },

    rollupOptions: {
      // Externalize peer deps — jangan bundle ke dalam library
      external: [
        'vue',
        'datatables.net-vue3',
        'datatables.net-bs5',
        'datatables.net-responsive',
        'datatables.net-select',
        'datatables.net-select-bs5',
        '@nuxt/kit',
      ],
      output: {
        // Provide global variables to use in UMD builds
        globals: {
          vue: 'Vue',
          'datatables.net-vue3': 'DataTableVue3',
        },
        // Preserve CSS asset name
        assetFileNames: (assetInfo) => {
          if (assetInfo.name === 'style.css') return 'style.css'
          return assetInfo.name ?? 'unknown'
        },
      },
    },

    // Generate sourcemaps for debugging
    sourcemap: true,

    // Tidak diminify agar lebih mudah di-debug oleh user
    minify: false,
  },
})
