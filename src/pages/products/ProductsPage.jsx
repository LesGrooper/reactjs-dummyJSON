import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProducts } from '../../hooks/useProducts';
import { ConfirmModal } from '../../components/common/Modal';
import SearchBar from '../../components/common/SearchBar';
import Pagination from '../../components/common/Pagination';
import Button from '../../components/common/Button';
import EmptyState from '../../components/common/EmptyState';
import { SkeletonRow } from '../../components/common/Loader';
import { formatCurrency, truncate } from '../../utils/helpers';
import { PRODUCT_LIMITS } from '../../utils/constants';
import styles from './ProductsPage.module.css';

export default function ProductsPage() {
  const navigate = useNavigate();
  const { products, total, isLoading, fetchProducts, deleteProduct, invalidateCache } = useProducts();

  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    fetchProducts({ page, search });
  }, [page, search, fetchProducts]);

  const handleSearch = (q) => {
    setSearch(q);
    setPage(1);
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    setDeleting(true);
    await deleteProduct(deleteTarget.id);
    setDeleting(false);
    setDeleteTarget(null);
    invalidateCache();
    fetchProducts({ page, search, force: true });
  };

  const totalPages = Math.ceil(total / PRODUCT_LIMITS.PAGE_SIZE);

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <h2 className={styles.title}>Products</h2>
        <div className={styles.actions}>
          <SearchBar value={search} onChange={handleSearch} placeholder="Search products..." />
          <Button onClick={() => navigate('/products/add')}>+ Add Product</Button>
        </div>
      </div>

      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Image</th>
              <th>Title</th>
              <th>Category</th>
              <th>Price</th>
              <th>Rating</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              Array.from({ length: 8 }).map((_, i) => <SkeletonRow key={i} cols={6} />)
            ) : products.length === 0 ? (
              <tr>
                <td colSpan={6}>
                  <EmptyState
                    title="No products found"
                    description={search ? `No results for "${search}"` : 'Add your first product!'}
                  />
                </td>
              </tr>
            ) : (
              products.map((product) => (
                <tr key={product.id}>
                  <td>
                    <img
                      className={styles.thumbnail}
                      src={product.thumbnail}
                      alt={product.title}
                      loading="lazy"
                    />
                  </td>
                  <td>
                    <span className={styles.productTitle}>{truncate(product.title, 40)}</span>
                  </td>
                  <td>
                    <span className={styles.badge}>{product.category}</span>
                  </td>
                  <td>{formatCurrency(product.price)}</td>
                  <td>
                    <span className={styles.rating}>⭐ {product.rating}</span>
                  </td>
                  <td>
                    <div className={styles.actionBtns}>
                      <Button
                        variant="secondary"
                        onClick={() => navigate(`/products/${product.id}`)}
                      >
                        Detail
                      </Button>
                      <Button
                        variant="ghost"
                        onClick={() => navigate(`/products/edit/${product.id}`)}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="danger"
                        onClick={() => setDeleteTarget(product)}
                      >
                        Delete
                      </Button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} />

      <ConfirmModal
        isOpen={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
        loading={deleting}
        title="Delete Product"
        message={`Are you sure you want to delete "${deleteTarget?.title}"? This action cannot be undone.`}
      />
    </div>
  );
}
