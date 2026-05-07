import { create } from 'zustand';

const useProductStore = create((set) => ({
  products: [],
  total: 0,
  currentProduct: null,
  isLoading: false,
  isSubmitting: false,
  error: null,
  // Cache key: "page:search" — skip API call if same params already loaded
  cacheKey: null,

  setProducts: (products, total, cacheKey) => set({ products, total, cacheKey }),
  setCurrentProduct: (product) => set({ currentProduct: product }),
  setLoading: (isLoading) => set({ isLoading }),
  setSubmitting: (isSubmitting) => set({ isSubmitting }),
  setError: (error) => set({ error }),
  clearError: () => set({ error: null }),
  invalidateCache: () => set({ cacheKey: null }),
}));

export default useProductStore;
