import { Navigate, Route, Routes } from 'react-router-dom';
import { Toaster } from 'sonner';

import { ProductsPage } from '@/pages/ProductsPage';
import { UsersPage } from '@/pages/UsersPage';
import { LoginPage } from '@/pages/LoginPage';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import { RegisterPage } from '@/pages/RegisterPage';

function App(): JSX.Element {
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <ProductsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/users"
          element={
            <ProtectedRoute>
              <UsersPage />
            </ProtectedRoute>
          }
        />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <Toaster richColors position="top-right" closeButton />
    </>
  );
}

export default App;
