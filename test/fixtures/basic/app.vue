<script setup lang="ts">
const columns = [
  { data: 'id', title: 'ID' },
  { data: 'name', title: 'Name' }
]
const data = [
  { id: 1, name: 'Test Item 1' },
  { id: 2, name: 'Test Item 2' }
]
</script>

<template>
  <div>
    <h1>Nuxt Module Test</h1>
    <!-- MainDataTable should be auto-imported by the module -->
    <MainDataTable 
      :columns="columns" 
      :data="data" 
      wrapper-class="test-datatable-wrapper"
    />
  </div>
</template>
