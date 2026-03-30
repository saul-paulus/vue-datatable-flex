import type { DefineComponent } from "vue";

import type { Column, DataTableOptions } from "../types";

declare const MainDataTable: DefineComponent<
  // Props
  {
    data?: unknown[];
    dataTableProps?: unknown[];
    columns?: Column[];
    columnsProps?: Column[];
    options?: DataTableOptions;
    scrollY?: string | number | false;
    scrollX?: boolean;
    responsive?: boolean;
    wrapperClass?: string;
    tableClass?: string;
    loading?: boolean;
    loadingText?: string;
  },
  // Emits
  {
    ready: (instance: unknown) => void;
    draw: (settings: unknown) => void;
    select: (items: unknown[], type: string) => void;
    deselect: (items: unknown[], type: string) => void;
    error: (err: Error) => void;
  },
  // Expose
  {
    getInstance: () => unknown;
    reload: () => void;
    redraw: () => void;
    adjustColumns: () => void;
  }
>;

export default MainDataTable;
