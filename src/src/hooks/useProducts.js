import { useCallback } from 'react';
import toast from 'react-hot-toast';
import useProductStore from '../store/productStore';
import { productService } from '../services/productService';
import { PRODUCT_LIMITS } from '../utils/constants';

export function useProducts() {
  const {
    products,
    total,
    currentProduct,
    isLoading,
    isSubmitting,
    cacheKey,
    setProducts,
    setCurrentProduct,
    setLoading,
    setSubmitting,
    setError,
    invalidateCache,
  } = useProductStore();

  const fetchProducts = useCallback(
    async ({ page = 1, search = '', force = false } = {}) => {
      const key = `${page}:${search}`;
      // Skip fetch if same params are already cached
      if (!force && cacheKey === key) return;

      setLoading(true);
      try {
        const skip = (page - 1) * PRODUCT_LIMITS.PAGE_SIZE;
        const data = await productService.getAll({
          limit: PRODUCT_LIMITS.PAGE_SIZE,
          skip,
          search,
        });
        setProducts(data.products, data.total, key);
      } catch (err) {
        setError(err.message);
        toast.error(err.message);
      } finally {
        setLoading(false);
      }
    },
    [cacheKey, setLoading, setProducts, setError]
  );

  const fetchProduct = useCallback(
    async (id) => {
      setLoading(true);
      try {
        const data = await productService.getById(id);
        setCurrentProduct(data);
      } catch (err) {
        setError(err.message);
        toast.error(err.message);
      } finally {
        setLoading(false);
      }
    },
    [setLoading, setCurrentProduct, setError]
  );

  const createProduct = useCallback(
    async (payload) => {
      setSubmitting(true);
      try {
        await productService.create(payload);
        toast.success('Product created successfully!');
        return true;
      } catch (err) {
        toast.error(err.message);
        return false;
      } finally {
        setSubmitting(false);
      }
    },
    [setSubmitting]
  );

  const updateProduct = useCallback(
    async (id, payload) => {
      setSubmitting(true);
      try {
        await productService.update(id, payload);
        toast.success('Product updated successfully!');
        return true;
      } catch (err) {
        toast.error(err.message);
        return false;
      } finally {
        setSubmitting(false);
      }
    },
    [setSubmitting]
  );

  const deleteProduct = useCallback(
    async (id) => {
      try {
        await productService.remove(id);
        toast.success('Product deleted successfully!');
        return true;
      } catch (err) {
        toast.error(err.message);
        return false;
      }
    },
    []
  );

  return {
    products,
    total,
    currentProduct,
    isLoading,
    isSubmitting,
    fetchProducts,
    fetchProduct,
    createProduct,
    updateProduct,
    deleteProduct,
    invalidateCache,
  };
}
