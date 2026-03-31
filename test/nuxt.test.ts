/**
 * @vitest-environment node
 */
import { describe, it, expect } from 'vitest'
import { setup, $fetch, url } from '@nuxt/test-utils/e2e'
import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'

const __dirname = dirname(fileURLToPath(import.meta.url))

await setup({
  rootDir: resolve(__dirname, 'fixtures/basic'),
  server: true,
})

describe('Nuxt Module Registration', () => {

  it('renders the MainDataTable component correctly via auto-import', async () => {
    // Fetch the app page
    const html = await $fetch(url('/'))
    
    expect(html).toContain('<h1>Nuxt Module Test</h1>')
    
    // Check if the DataTable wrapper class exists in the rendered HTML
    expect(html).toContain('test-datatable-wrapper')
    
    // Check if DataTables.net related elements are present in SSR
    expect(html).toContain('dataTable')
    expect(html).toContain('ID')
    expect(html).toContain('Name')
  })
})
