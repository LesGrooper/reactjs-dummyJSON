import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useProducts } from '../../hooks/useProducts';
import { Loader } from '../../components/common/Loader';
import Button from '../../components/common/Button';
import Card from '../../components/common/Card';
import { formatCurrency } from '../../utils/helpers';
import styles from './ProductDetailPage.module.css';

export default function ProductDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { currentProduct, isLoading, fetchProduct } = useProducts();

  useEffect(() => {
    fetchProduct(id);
  }, [id, fetchProduct]);

  if (isLoading) {
    return (
      <div className={styles.centered}>
        <Loader size="lg" />
      </div>
    );
  }

  if (!currentProduct) return null;

  const p = currentProduct;

  return (
    <div className={styles.page}>
      <div className={styles.backRow}>
        <Button variant="ghost" onClick={() => navigate('/products')}>
          ← Back to Products
        </Button>
      </div>

      <Card className={styles.card}>
        <div className={styles.grid}>
          <div className={styles.imageCol}>
            <img
              className={styles.image}
              src={p.thumbnail}
              alt={p.title}
            />
            <div className={styles.gallery}>
              {p.images?.slice(0, 4).map((img, i) => (
                <img key={i} src={img} alt={`${p.title} ${i + 1}`} className={styles.galleryThumb} />
              ))}
            </div>
          </div>

          <div className={styles.infoCol}>
            <span className={styles.category}>{p.category}</span>
            <h1 className={styles.title}>{p.title}</h1>
            <p className={styles.description}>{p.description}</p>

            <div className={styles.priceRow}>
              <span className={styles.price}>{formatCurrency(p.price)}</span>
              {p.discountPercentage > 0 && (
                <span className={styles.discount}>-{p.discountPercentage}%</span>
              )}
            </div>

            <div className={styles.meta}>
              <MetaItem label="Brand" value={p.brand || '—'} />
              <MetaItem label="Stock" value={p.stock} />
              <MetaItem
                label="Rating"
                value={
                  <span>⭐ {p.rating} / 5</span>
                }
              />
              <MetaItem label="SKU" value={p.sku || '—'} />
            </div>

            <div className={styles.btnRow}>
              <Button onClick={() => navigate(`/products/edit/${p.id}`)}>
                Edit Product
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}

function MetaItem({ label, value }) {
  return (
    <div className={styles.metaItem}>
      <span className={styles.metaLabel}>{label}</span>
      <span className={styles.metaValue}>{value}</span>
    </div>
  );
}
