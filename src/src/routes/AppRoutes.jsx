import { lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import PublicRoute from './PublicRoute';
import ProtectedRoute from './ProtectedRoute';
import DashboardLayout from '../layouts/DashboardLayout';
import { Loader } from '../components/common/Loader';
import { ROUTES } from '../utils/constants';

// Lazy-loaded pages
const LoginPage = lazy(() => import('../pages/LoginPage'));
const HomePage = lazy(() => import('../pages/HomePage'));
const ProductsPage = lazy(() => import('../pages/products/ProductsPage'));
const ProductDetailPage = lazy(() => import('../pages/products/ProductDetailPage'));
const ProductAddPage = lazy(() => import('../pages/products/ProductAddPage'));
const ProductEditPage = lazy(() => import('../pages/products/ProductEditPage'));

const SuspenseFallback = () => (
  <div style={{ display: 'flex', justifyContent: 'center', marginTop: '4rem' }}>
    <Loader size="lg" />
  </div>
);

export default function AppRoutes() {
  return (
    <Suspense fallback={<SuspenseFallback />}>
      <Routes>
        {/* Public routes */}
        <Route element={<PublicRoute />}>
          <Route path={ROUTES.LOGIN} element={<LoginPage />} />
        </Route>

        {/* Protected routes */}
        <Route element={<ProtectedRoute />}>
          <Route element={<DashboardLayout />}>
            <Route path={ROUTES.HOME} element={<HomePage />} />
            <Route path={ROUTES.PRODUCTS} element={<ProductsPage />} />
            <Route path="/products/add" element={<ProductAddPage />} />
            <Route path="/products/edit/:id" element={<ProductEditPage />} />
            <Route path="/products/:id" element={<ProductDetailPage />} />
          </Route>
        </Route>

        {/* Fallback */}
        <Route path="*" element={<Navigate to={ROUTES.HOME} replace />} />
      </Routes>
    </Suspense>
  );
}
