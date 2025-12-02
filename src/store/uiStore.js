import { create } from 'zustand';

export const useUIStore = create((set) => ({
  viewMode: 'grid', // 'grid' or 'tile'
  sidebarOpen: true,
  selectedEmployee: null,
  showEmployeeModal: false,

  setViewMode: (mode) => set({ viewMode: mode }),
  toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
  setSidebarOpen: (open) => set({ sidebarOpen: open }),
  
  setSelectedEmployee: (employee) => set({ 
    selectedEmployee: employee,
    showEmployeeModal: !!employee 
  }),
  
  closeEmployeeModal: () => set({ 
    selectedEmployee: null,
    showEmployeeModal: false 
  }),
}));
