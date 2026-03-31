/* eslint-disable @typescript-eslint/no-explicit-any */
<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from "vue";
import DataTableSource from "datatables.net-vue3";
import DataTablesLib from "datatables.net-bs5";
import "datatables.net-responsive-bs5";
import "datatables.net-select-bs5";

import type { Api } from "datatables.net";
import type { Column, DataTableOptions } from "../types";
import { defaultOptions } from "../types";

// Datatables.net component: casting to any avoids leaky types (TS4058 / JQueryDataTables)
const DataTableComponent = DataTableSource as any;

// Konfigurasi DataTables: Register core dan extension
DataTableSource.use(DataTablesLib);

// Datatables.net menggunakan API yang sangat dinamis (any is unavoidable here)
// Semua interaksi publik (props/emits) sudah ditype dengan benar di DataTableMain.vue.d.ts

// ===================================================
//  Props
// ===================================================
interface Props {
  /** Data array untuk tabel (Alias: dataTableProps) */
  data?: unknown[];
  /** Data array untuk tabel (Prop name dari user snippet) */
  dataTableProps?: unknown[];
  /** Definisi kolom (Alias: columnsProps) */
  columns?: Column[];
  /** Definisi kolom (Prop name dari user snippet) */
  columnsProps?: Column[];
  /** Override DataTable options */
  options?: DataTableOptions;
  /** Tinggi scroll vertikal (mis: "65vh", "400px") */
  scrollY?: string | number | false;
  /** Aktifkan horizontal scroll */
  scrollX?: boolean;
  /** Mode responsive (disable scrollX jika aktif) */
  responsive?: boolean;
  /** Class CSS tambahan untuk wrapper div */
  wrapperClass?: string;
  /** Class CSS tambahan untuk elemen table */
  tableClass?: string;
  /** Loading state — tampilkan overlay loading */
  loading?: boolean;
  /** Teks loading */
  loadingText?: string;
}

const props = withDefaults(defineProps<Props>(), {
  data: () => [],
  dataTableProps: () => [],
  columns: () => [],
  columnsProps: () => [],
  options: () => ({}),
  scrollY: "65vh",
  scrollX: true,
  responsive: false,
  wrapperClass: "",
  tableClass: "",
  loading: false,
  loadingText: "Memuat data...",
});

// Compute internal data and columns from aliases
const internalData = computed(() =>
  props.data && props.data.length > 0 ? props.data : props.dataTableProps,
);
const internalColumns = computed(() =>
  props.columns && props.columns.length > 0 ? props.columns : props.columnsProps,
);

// ===================================================
//  Emits
// ===================================================
const emit = defineEmits<{
  /** DataTable selesai diinisialisasi */
  ready: [instance: unknown];
  /** Tabel selesai di-draw */
  draw: [settings: unknown];
  /** Baris di-select */
  select: [items: unknown[], type: string];
  /** Baris di-deselect */
  deselect: [items: unknown[], type: string];
  /** Error saat inisialisasi */
  error: [err: Error];
}>();

// ===================================================
//  Refs (datatables API requires any)
// ===================================================
const containerRef = ref<HTMLElement | null>(null);
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const datatableRef = ref<{ dt: any } | null>(null);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let dtInstance: Api<any> | null = null;
let resizeObserver: ResizeObserver | null = null;

// ===================================================
//  Computed Options — merge defaultOptions + props
// ===================================================
const tableOptions = computed<DataTableOptions>(() => ({
  ...defaultOptions,
  scrollY: props.scrollY,
  scrollX: props.responsive ? false : props.scrollX,
  responsive: props.responsive,
  autoWidth: false,
  deferRender: true,
  ...props.options,
}));

// ===================================================
//  Init
// ===================================================
onMounted(async () => {
  await nextTick();

  if (!datatableRef.value) return;

  try {
    dtInstance = datatableRef.value.dt;
    if (!dtInstance) return;

    // Adjust columns setelah mount
    dtInstance.columns.adjust();

    // Event: ready
    emit("ready", dtInstance);

    // Event: draw
    dtInstance.on("draw", (e: Event, settings: unknown) => {
      emit("draw", settings);
    });

    // Event: select / deselect (jika pakai select extension)
    dtInstance.on("select", (_e: Event, _dt: unknown, type: string, indexes: number[]) => {
      if (!dtInstance) return;
      const rows = dtInstance.rows(indexes).data().toArray();
      emit("select", rows, type);
    });

    dtInstance.on("deselect", (_e: Event, _dt: unknown, type: string, indexes: number[]) => {
      if (!dtInstance) return;
      const rows = dtInstance.rows(indexes).data().toArray();
      emit("deselect", rows, type);
    });

    // ResizeObserver untuk handle container resize
    if (containerRef.value) {
      resizeObserver = new ResizeObserver(() => {
        if (!dtInstance) return;
        dtInstance.columns.adjust();
        setTimeout(() => dtInstance?.columns.adjust(), 150);
        setTimeout(() => dtInstance?.columns.adjust(), 400);
      });
      resizeObserver.observe(containerRef.value);
    }

    window.addEventListener("resize", handleResize);
  } catch (err) {
    emit("error", err instanceof Error ? err : new Error(String(err)));
  }
});

// ===================================================
//  Resize Handler
// ===================================================
const handleResize = () => {
  dtInstance?.columns.adjust();
};

// ===================================================
//  Watch: Data changes
// ===================================================
watch(
  () => internalData.value,
  async (newData) => {
    if (!dtInstance) return;
    await nextTick();

    dtInstance.clear();

    if (Array.isArray(newData) && newData.length > 0) {
      dtInstance.rows.add(newData);
    }

    dtInstance.draw(false);
    dtInstance.columns.adjust();

    if (props.responsive) {
      dtInstance.responsive?.recalc();
    }
  },
  { deep: false },
);

// ===================================================
//  Expose public API
// ===================================================
defineExpose({
  /** Dapatkan DataTables instance untuk akses API langsung */
  getInstance: (): Api<any> | null => dtInstance,
  /** Reload data secara manual */
  reload: () => {
    if (!dtInstance) return;
    dtInstance.ajax?.reload(undefined, false);
  },
  /** Clear & redraw tabel */
  redraw: () => {
    if (!dtInstance) return;
    dtInstance.draw(false);
  },
  /** Adjust column widths */
  adjustColumns: () => {
    dtInstance?.columns.adjust();
  },
});

// ===================================================
//  Cleanup
// ===================================================
onBeforeUnmount(() => {
  window.removeEventListener("resize", handleResize);

  if (dtInstance) {
    dtInstance.off("draw");
    dtInstance.off("select");
    dtInstance.off("deselect");
  }

  resizeObserver?.disconnect();
  resizeObserver = null;

  dtInstance?.destroy(true);
  dtInstance = null;
});
</script>

<template>
  <div ref="containerRef" :class="['dt-wrapper', wrapperClass]" style="position: relative">
    <!-- Loading Overlay -->
    <Transition name="dt-fade">
      <div v-if="loading" class="dt-loading-overlay">
        <div class="dt-loading-spinner" />
        <span class="dt-loading-text">{{ loadingText }}</span>
      </div>
    </Transition>

    <DataTableComponent
      ref="datatableRef"
      :class="['table', 'table-hover', 'table-bordered', 'table-sm', 'w-100', tableClass]"
      :columns="internalColumns as any"
      :data="internalData"
      :options="tableOptions as unknown as any"
    >
      <slot />
    </DataTableComponent>
  </div>
</template>

<style scoped>
.dt-wrapper {
  width: 100%;
  overflow: hidden;
}

/* ---- Loading Overlay ---- */
.dt-loading-overlay {
  position: absolute;
  inset: 0;
  z-index: 10;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: var(--space-3);
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(4px);
  border-radius: var(--radius-lg);
  transition: var(--transition);
}

.dt-loading-spinner {
  width: 40px;
  height: 40px;
  border: 3px solid var(--bg-mute);
  border-top-color: var(--primary);
  border-radius: 50%;
  animation: dt-spin 0.8s cubic-bezier(0.4, 0, 0.2, 1) infinite;
}

.dt-loading-text {
  font-size: var(--fs-sm);
  color: var(--text-soft);
  font-weight: var(--fw-medium);
  letter-spacing: 0.025em;
}

@keyframes dt-spin {
  to {
    transform: rotate(360deg);
  }
}

/* ---- Fade Transition ---- */
.dt-fade-enter-active,
.dt-fade-leave-active {
  transition: opacity 0.3s ease;
}

.dt-fade-enter-from,
.dt-fade-leave-to {
  opacity: 0;
}
</style>
