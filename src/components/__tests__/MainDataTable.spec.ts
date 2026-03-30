import { describe, it, expect, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import MainDataTable from '../MainDataTable.vue';

// Mock DataTables registration as it might fail in JSDOM or lack necessary globals
vi.mock('datatables.net-vue3', () => ({
  default: {
    use: vi.fn(),
    name: 'DataTable',
    template: '<div class="datatable-mock"><slot /></div>'
  }
}));

vi.mock('datatables.net-bs5', () => ({
  default: vi.fn()
}));

describe('MainDataTable.vue', () => {
  const columns = [
    { data: 'id', title: 'ID' },
    { data: 'name', title: 'Name' }
  ];
  
  const data = [
    { id: 1, name: 'Item 1' },
    { id: 2, name: 'Item 2' }
  ];

  it('renders correctly with default props', () => {
    const wrapper = mount(MainDataTable, {
      props: {
        columns,
        data
      }
    });
    
    expect(wrapper.find('.dt-wrapper').exists()).toBe(true);
    expect(wrapper.findComponent({ name: 'DataTable' }).exists()).toBe(true);
  });

  it('shows loading overlay when loading prop is true', async () => {
    const wrapper = mount(MainDataTable, {
      props: {
        columns,
        data,
        loading: true,
        loadingText: 'Testing Loading...'
      }
    });
    
    expect(wrapper.find('.dt-loading-overlay').exists()).toBe(true);
    expect(wrapper.find('.dt-loading-text').text()).toBe('Testing Loading...');
  });

  it('applies custom classes correctly', () => {
    const wrapper = mount(MainDataTable, {
      props: {
        columns,
        data,
        wrapperClass: 'custom-wrapper',
        tableClass: 'custom-table'
      }
    });
    
    expect(wrapper.find('.dt-wrapper.custom-wrapper').exists()).toBe(true);
    // The tableClass is passed to the DataTable component
    const dtComponent = wrapper.findComponent({ name: 'DataTable' });
    expect(dtComponent.classes()).toContain('custom-table');
  });

  it('exposes professional API methods', () => {
    const wrapper = mount(MainDataTable, {
      props: { columns, data }
    });
    
    expect(typeof wrapper.vm.getInstance).toBe('function');
    expect(typeof wrapper.vm.reload).toBe('function');
    expect(typeof wrapper.vm.redraw).toBe('function');
    expect(typeof wrapper.vm.adjustColumns).toBe('function');
  });
});
