// ===================================================
//  Column Definition
// ===================================================
export interface Column {
  /** Field name dari data object (dot notation didukung, misal: "user.name") */
  data: string|null
  /** Judul kolom yang ditampilkan di header */
  title: string
  /** Custom render function */
  render?:
      (data: unknown, type: string, row: unknown,
       meta: {row: number; col: number}) => string
  /** Lebar kolom: "100px", "10%", dll */
  width?: string
  /** Class CSS untuk kolom */
  className?: string
  /** Apakah kolom bisa di-sort */
  orderable?: boolean
  /** Apakah kolom bisa di-search */
  searchable?: boolean
  /** Apakah kolom visible secara default */
  visible?: boolean
  /** Index kolom yang dipakai untuk sorting */
  orderData?: number|number[]
  /** Default sort untuk kolom ini */
  orderSequence?: ('asc'|'desc')[]
}

// ===================================================
//  Language Definition
// ===================================================
export interface DataTableLanguage {
  search?: string
  searchPlaceholder?: string
  lengthMenu?: string
  info?: string
  infoEmpty?: string
  infoFiltered?: string
  zeroRecords?: string
  emptyTable?: string
  paginate?: {first?: string
  last?: string
  next?: string
    previous?: string
  }
  aria?: {
    sortAscending?: string
    sortDescending?: string
    paginate?: {first?: string
    last?: string
    next?: string
      previous?: string
    }
  }
}

// ===================================================
//  DataTable Options
// ===================================================
export interface DataTableOptions {
  processing?: boolean
  serverSide?: boolean
  ajax?: string|object
  displayLength?: number
  scrollY?: string|number|false
  scrollX?: boolean
  scrollCollapse?: boolean
  responsive?: boolean
  autoWidth?: boolean
  destroy?: boolean
  deferRender?: boolean
  paging?: boolean
  pagingType?: 'simple'|'simple_numbers'|'full'|'full_numbers'|'input'|
      'firstLastNumbers'
  lengthChange?: boolean
  pageLength?: number
  lengthMenu?: [number[], (number | string)[]]|number[]
  ordering?: boolean
  order?: [number, 'asc'|'desc'][]
  searching?: boolean
  info?: boolean
  fixedHeader?: boolean
  language?: DataTableLanguage
  columnDefs?: Record<string, unknown|string|boolean|number>[]
  dom?: string
  select?: boolean|object
  buttons?: object[]
  [key: string]: unknown
}

// ===================================================
//  Default Options (Indonesian locale)
// ===================================================
export const defaultOptions: DataTableOptions = {
  processing: false,
  serverSide: false,
  displayLength: 50,
  scrollY: '65vh',
  scrollX: true,
  scrollCollapse: true,
  responsive: false,
  autoWidth: false,
  destroy: true,
  deferRender: true,
  paging: true,
  pagingType: 'simple_numbers',
  lengthChange: true,
  pageLength: 50,
  lengthMenu: [
    [50, 100, 200, 400, 600, 800, 1000, -1],
    [50, 100, 200, 400, 600, 800, 1000, 'All'],
  ],
  ordering: true,
  searching: true,
  info: true,
  fixedHeader: true,
  language: {
    search: '_INPUT_',
    searchPlaceholder: 'Cari data...',
    paginate: {
      previous: '&laquo;',
      next: '&raquo;',
    },
    lengthMenu: 'Tampilkan _MENU_ entri',
    info: 'Menampilkan _START_ hingga _END_ dari _TOTAL_ entri',
    zeroRecords: 'Tidak ada data yang ditemukan',
    infoEmpty: 'Tidak ada entri yang tersedia',
    infoFiltered: '(difilter dari total _MAX_ entri)',
  },
  columnDefs: [
    {
      targets: '_all',
      className: 'align-middle',
    },
  ],
  dom: '<\'row mb-3\'<\'col-sm-12 col-md-6\'l><\'col-sm-12 col-md-6\'f>>' +
      '<\'row\'<\'col-sm-12\'tr>>' +
      '<\'row mt-3\'<\'col-sm-5 col-12\'i><\'col-sm-7 col-12 d-flex justify-content-lg-end justify-content-center\'p>>',
}

// ===================================================
//  Component Events
// ===================================================
export interface DataTableEmits {
  /** Saat DataTable selesai diinisialisasi, mengembalikan instance DT */
  ready: [instance: unknown]
  /** Setiap kali tabel di-draw ulang */
  draw: [settings: unknown]
  /** Saat baris di-select (butuh datatables select extension) */
  select: [items: unknown[], type: string]
  /** Saat baris di-deselect */
  deselect: [items: unknown[], type: string]
}
