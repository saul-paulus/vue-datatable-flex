<script setup lang="ts">
import MainDataTable from './MainDataTable.vue'

import kaset from '../data/kaset.json'

const data = kaset

const columns = [
  {
    data: null,
    title: 'No',
    width: '1%',
    className: 'text-center',
    orderable: false,
    searchable: false,
    render: function (data: unknown, type: string, row: unknown, meta: { row: number }) {
      return (meta.row + 1).toString()
    },
  },
  {
    data: 'nmuker',
    name: 'nmuker',
    title: 'Nm&nbsp;Uker',
    width: '5%',
    className: 'text-center text-sm',
    orderable: true,
    searchable: false,
  },
  {
    data: 'no_kaset',
    name: 'no_kaset',
    title: 'No&nbsp;Kaset',
    width: '5%',
    className: 'text-center text-sm',
    orderable: true,
    searchable: false,
  },
  {
    data: 'tipe_mesin',
    name: 'tipe_mesin',
    title: 'Tipe&nbsp;Mesin',
    width: '3%',
    className: 'text-center text-sm',
    orderable: true,
    searchable: false,
  },
  {
    data: 'jenis_kaset',
    name: 'jenis_kaset',
    title: 'Jenis&nbsp;Kaset',
    width: '1%',
    className: 'text-center text-sm',
    orderable: true,
    searchable: false,
  },
  {
    data: 'nm_merek',
    name: 'nm_merek',
    title: 'Nama&nbsp;Merek',
    width: '5%',
    className: 'text-center text-sm',
    orderable: true,
    searchable: false,
  },
  {
    data: 'id_kaset',
    name: 'id_kaset',
    title: 'Aksi',
    width: '1%',
    className: 'text-center text-sm',
    orderable: false,
    searchable: false,
    render: (data: unknown) => {
      return `
          <div class="d-flex justify-content-center align-items-center">
            <a href="javascript:void(0)"
              id="${data}"
              class="mx-1 btn btn-sm btn-primary btn-detail-kaset"
              data-bs-toggle="tooltip"
              data-bs-placement="top"
              title="Detail">
              <i class="bi bi-eye-fill"></i>
            </a>
          </div>
        `
    },
  },
]
</script>

<template>
  <MainDataTable :data="data" :columns="columns" />
</template>
