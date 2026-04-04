import { describe, it, expect, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import MainDataTable from '../../runtime/components/MainDataTable.vue';

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

  it('renders correctly with default props', async () => {
    const wrapper = mount(MainDataTable, {
      props: {
        columns,
        data
      }
    });
    
    // Wait for onMounted and nextTick inside it
    await wrapper.vm.$nextTick();
    await wrapper.vm.$nextTick(); // One more for the internal async onMounted
    
    expect(wrapper.find('.dt-wrapper').exists()).toBe(true);
    // Since we mock it, we can look for the mock component
    expect(wrapper.find('.datatable-mock').exists()).toBe(true);
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

  it('applies custom classes correctly', async () => {
    const wrapper = mount(MainDataTable, {
      props: {
        columns,
        data,
        wrapperClass: 'custom-wrapper',
        tableClass: 'custom-table'
      }
    });
    
    await wrapper.vm.$nextTick();
    await wrapper.vm.$nextTick();
    
    expect(wrapper.find('.dt-wrapper.custom-wrapper').exists()).toBe(true);
    // The tableClass is passed to the DataTable component mock
    const dtComponent = wrapper.find('.datatable-mock');
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
