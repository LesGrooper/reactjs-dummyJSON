import axiosInstance from '../api/axiosInstance';

// Products API has no rate limit issues — using real API directly
export const productService = {
  async getAll({ limit = 10, skip = 0, search = '' } = {}) {
    if (search) {
      const { data } = await axiosInstance.get(
        `/products/search?q=${encodeURIComponent(search)}&limit=${limit}&skip=${skip}`
      );
      return data;
    }
    const { data } = await axiosInstance.get(
      `/products?limit=${limit}&skip=${skip}`
    );
    return data;
  },

  async getById(id) {
    const { data } = await axiosInstance.get(`/products/${id}`);
    return data;
  },

  async create(payload) {
    const { data } = await axiosInstance.post('/products/add', payload);
    return data;
  },

  async update(id, payload) {
    const { data } = await axiosInstance.put(`/products/${id}`, payload);
    return data;
  },

  async remove(id) {
    const { data } = await axiosInstance.delete(`/products/${id}`);
    return data;
  },
};
