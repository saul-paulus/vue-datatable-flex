import { defineNuxtConfig } from 'nuxt/config'
import MyModule from '../../../src/nuxt'

export default defineNuxtConfig({
  modules: [
    MyModule
  ],
  vueDatatablesFlex: {
    // Optional: override default options for testing
    componentName: 'MainDataTable'
  }
})
