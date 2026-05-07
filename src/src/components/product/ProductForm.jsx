import { useState } from 'react';
import Input from '../common/Input';
import Button from '../common/Button';
import styles from './ProductForm.module.css';

const defaultValues = {
  title: '',
  description: '',
  price: '',
  category: '',
  brand: '',
};

export default function ProductForm({ initialValues = {}, onSubmit, isSubmitting }) {
  const [form, setForm] = useState({ ...defaultValues, ...initialValues });
  const [errors, setErrors] = useState({});

  const validate = () => {
    const e = {};
    if (!form.title.trim()) e.title = 'Title is required';
    if (!form.description.trim()) e.description = 'Description is required';
    if (!form.price) e.price = 'Price is required';
    else if (isNaN(Number(form.price)) || Number(form.price) <= 0)
      e.price = 'Enter a valid positive price';
    if (!form.category.trim()) e.category = 'Category is required';
    return e;
  };

  const handleChange = (field) => (e) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
    setErrors((prev) => ({ ...prev, [field]: '' }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validation = validate();
    if (Object.keys(validation).length > 0) {
      setErrors(validation);
      return;
    }
    onSubmit({ ...form, price: Number(form.price) });
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate>
      <Input
        label="Title *"
        value={form.title}
        onChange={handleChange('title')}
        error={errors.title}
        placeholder="Product title"
      />
      <div className={styles.field}>
        <label className={styles.label}>Description *</label>
        <textarea
          className={`${styles.textarea} ${errors.description ? styles.textareaError : ''}`}
          value={form.description}
          onChange={handleChange('description')}
          placeholder="Product description"
          rows={4}
        />
        {errors.description && <span className={styles.errMsg}>{errors.description}</span>}
      </div>
      <div className={styles.row}>
        <Input
          label="Price *"
          type="number"
          min="0"
          step="0.01"
          value={form.price}
          onChange={handleChange('price')}
          error={errors.price}
          placeholder="0.00"
        />
        <Input
          label="Category *"
          value={form.category}
          onChange={handleChange('category')}
          error={errors.category}
          placeholder="e.g. smartphones"
        />
      </div>
      <Input
        label="Brand"
        value={form.brand}
        onChange={handleChange('brand')}
        placeholder="Brand name"
      />
      <div className={styles.actions}>
        <Button type="submit" loading={isSubmitting}>
          Save Product
        </Button>
      </div>
    </form>
  );
}
