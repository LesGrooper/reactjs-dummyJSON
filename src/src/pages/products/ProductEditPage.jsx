import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useProducts } from '../../hooks/useProducts';
import ProductForm from '../../components/product/ProductForm';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import { Loader } from '../../components/common/Loader';
import styles from './ProductFormPage.module.css';

export default function ProductEditPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { currentProduct, isLoading, isSubmitting, fetchProduct, updateProduct } = useProducts();

  useEffect(() => {
    fetchProduct(id);
  }, [id, fetchProduct]);

  const handleSubmit = async (values) => {
    const success = await updateProduct(id, values);
    if (success) navigate('/products');
  };

  if (isLoading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '4rem' }}>
        <Loader size="lg" />
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <div className={styles.backRow}>
        <Button variant="ghost" onClick={() => navigate('/products')}>
          ← Back to Products
        </Button>
      </div>
      <Card>
        <h2 className={styles.title}>Edit Product</h2>
        {currentProduct && (
          <ProductForm
            initialValues={{
              title: currentProduct.title,
              description: currentProduct.description,
              price: currentProduct.price,
              category: currentProduct.category,
              brand: currentProduct.brand || '',
            }}
            onSubmit={handleSubmit}
            isSubmitting={isSubmitting}
          />
        )}
      </Card>
    </div>
  );
}
