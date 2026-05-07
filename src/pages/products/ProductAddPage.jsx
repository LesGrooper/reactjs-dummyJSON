import { useNavigate } from 'react-router-dom';
import { useProducts } from '../../hooks/useProducts';
import ProductForm from '../../components/product/ProductForm';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import styles from './ProductFormPage.module.css';

export default function ProductAddPage() {
  const navigate = useNavigate();
  const { createProduct, isSubmitting } = useProducts();

  const handleSubmit = async (values) => {
    const success = await createProduct(values);
    if (success) navigate('/products');
  };

  return (
    <div className={styles.page}>
      <div className={styles.backRow}>
        <Button variant="ghost" onClick={() => navigate('/products')}>
          ← Back to Products
        </Button>
      </div>
      <Card>
        <h2 className={styles.title}>Add New Product</h2>
        <ProductForm onSubmit={handleSubmit} isSubmitting={isSubmitting} />
      </Card>
    </div>
  );
}
